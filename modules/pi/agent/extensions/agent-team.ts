/**
 * Agent Team — Dispatcher-only orchestrator with grid dashboard
 *
 * The primary Pi agent has NO codebase tools. It can ONLY delegate work
 * to specialist agents via the `dispatch_agent` tool. Each specialist
 * maintains its own Pi session for cross-invocation memory.
 *
 * Loads agent definitions from agents/*.md, .claude/agents/*.md, .pi/agents/*.md.
 * Teams are defined in .pi/agents/teams.yaml — on boot a select dialog lets
 * you pick which team to work with. Only team members are available for dispatch.
 *
 * Commands:
 *   /agents-team          — switch active team
 *   /agents-list          — list loaded agents
 *   /agents-grid N        — set column count (default 2)
 *
 * Usage: pi -e extensions/agent-team.ts
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { getAgentDir } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";
import { Text, type AutocompleteItem, truncateToWidth, visibleWidth } from "@mariozechner/pi-tui";
import { spawn } from "child_process";
import { readdirSync, readFileSync, existsSync, mkdirSync, unlinkSync } from "fs";
import { homedir } from "os";
import { join, resolve } from "path";

// ── Types ────────────────────────────────────────

interface AgentDef {
	name: string;
	description: string;
	tools: string;
	systemPrompt: string;
	file: string;
}

interface AgentState {
	def: AgentDef;
	status: "idle" | "running" | "done" | "error";
	task: string;
	toolCount: number;
	elapsed: number;
	lastWork: string;
	contextPct: number;
	sessionFile: string | null;
	runCount: number;
	timer?: ReturnType<typeof setInterval>;
}

// ── Display Name Helper ──────────────────────────

function displayName(name: string): string {
	return name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ── Teams YAML Parser ────────────────────────────

function parseTeamsYaml(raw: string): Record<string, string[]> {
	const teams: Record<string, string[]> = {};
	let current: string | null = null;
	for (const line of raw.split("\n")) {
		const teamMatch = line.match(/^(\S[^:]*):$/);
		if (teamMatch) {
			current = teamMatch[1].trim();
			teams[current] = [];
			continue;
		}
		const itemMatch = line.match(/^\s+-\s+(.+)$/);
		if (itemMatch && current) {
			teams[current].push(itemMatch[1].trim());
		}
	}
	return teams;
}

// ── Frontmatter Parser ───────────────────────────

function parseAgentFile(filePath: string): AgentDef | null {
	try {
		const raw = readFileSync(filePath, "utf-8");
		const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
		if (!match) return null;

		const frontmatter: Record<string, string> = {};
		for (const line of match[1].split("\n")) {
			const idx = line.indexOf(":");
			if (idx > 0) {
				frontmatter[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
			}
		}

		if (!frontmatter.name) return null;

		return {
			name: frontmatter.name,
			description: frontmatter.description || "",
			tools: frontmatter.tools || "read,grep,find,ls",
			systemPrompt: match[2].trim(),
			file: filePath,
		};
	} catch {
		return null;
	}
}

function scanAgentDirs(cwd: string): AgentDef[] {
	const userHome = homedir();
	const dirs = [
		// Prioridad 1: Entorno del proyecto
		join(cwd, ".pi", "agents"),
		// Prioridad 2: Entorno global del usuario
		join(userHome, ".pi", "agent", "agents"),
		// Mantenemos el directorio por defecto de la extensión por si acaso
		join(getAgentDir(), "agents"),
	];

	const agents: AgentDef[] = [];
	const seen = new Set<string>();

	for (const dir of dirs) {
		if (!existsSync(dir)) continue;
		try {
			for (const file of readdirSync(dir)) {
				if (!file.endsWith(".md")) continue;
				const fullPath = resolve(dir, file);
				const def = parseAgentFile(fullPath);
				if (def && !seen.has(def.name.toLowerCase())) {
					seen.add(def.name.toLowerCase());
					agents.push(def);
				}
			}
		} catch {}
	}

	return agents;
}

// ── Extension ────────────────────────────────────

export default function (pi: ExtensionAPI) {
	const agentStates: Map<string, AgentState> = new Map();
	let allAgentDefs: AgentDef[] = [];
	let teams: Record<string, string[]> = {};
	let activeTeamName = "";
	let gridCols = 2;
	let widgetCtx: any;
	let sessionDir = "";
	let contextWindow = 0;

	function loadAgents(cwd: string) {
		// Create session storage dir
		sessionDir = join(cwd, ".pi", "agent-sessions");
		if (!existsSync(sessionDir)) {
			mkdirSync(sessionDir, { recursive: true });
		}

		// Load all agent definitions
		allAgentDefs = scanAgentDirs(cwd);

		// --- NUEVA LÓGICA DE CARGA DE TEAMS ---
		const userHome = homedir();
		
		// Definimos las posibles rutas ordenadas por prioridad (Local > Global)
		// y soportando tanto .yaml como .yml
		const possibleTeamPaths = [
			join(cwd, ".pi", "agents", "teams.yaml"),
			join(cwd, ".pi", "agents", "teams.yml"),
			join(userHome, ".pi", "agent", "agents", "teams.yaml"),
			join(userHome, ".pi", "agent", "agents", "teams.yml"),
		];

		let rawTeams = "";
		for (const teamsPath of possibleTeamPaths) {
			if (existsSync(teamsPath)) {
				try {
					rawTeams = readFileSync(teamsPath, "utf-8");
					break; // Detener la búsqueda en cuanto encontremos el primer archivo válido
				} catch (e) {
					// Si hay error leyendo, intentamos con el siguiente
					continue;
				}
			}
		}

		if (rawTeams) {
			try {
				teams = parseTeamsYaml(rawTeams);
			} catch {
				teams = {};
			}
		} else {
			teams = {};
		}

		// If no teams defined, create a default "all" team
		if (Object.keys(teams).length === 0) {
			teams = { all: allAgentDefs.map(d => d.name) };
		}
	}

	function activateTeam(teamName: string) {
		activeTeamName = teamName;
		const members = teams[teamName] || [];
		const defsByName = new Map(allAgentDefs.map(d => [d.name.toLowerCase(), d]));

		agentStates.clear();
		for (const member of members) {
			const def = defsByName.get(member.toLowerCase());
			if (!def) continue;
			const key = def.name.toLowerCase().replace(/\s+/g, "-");
			const sessionFile = join(sessionDir, `${key}.json`);
			agentStates.set(def.name.toLowerCase(), {
				def,
				status: "idle",
				task: "",
				toolCount: 0,
				elapsed: 0,
				lastWork: "",
				contextPct: 0,
				sessionFile: existsSync(sessionFile) ? sessionFile : null,
				runCount: 0,
			});
		}

		// Auto-size grid columns based on team size
		const size = agentStates.size;
		gridCols = size <= 3 ? size : size === 4 ? 2 : 3;
	}

	// ── Grid Rendering ───────────────────────────

	function renderCard(state: AgentState, colWidth: number, theme: any): string[] {
		const w = colWidth - 2;
		const truncate = (s: string, max: number) => s.length > max ? s.slice(0, max - 3) + "..." : s;

		const statusColor = state.status === "idle" ? "dim"
			: state.status === "running" ? "accent"
			: state.status === "done" ? "success" : "error";
		const statusIcon = state.status === "idle" ? "○"
			: state.status === "running" ? "●"
			: state.status === "done" ? "✓" : "✗";

		const name = displayName(state.def.name);
		const nameStr = theme.fg("accent", theme.bold(truncate(name, w)));
		const nameVisible = Math.min(name.length, w);

		const statusStr = `${statusIcon} ${state.status}`;
		const timeStr = state.status !== "idle" ? ` ${Math.round(state.elapsed / 1000)}s` : "";
		const statusLine = theme.fg(statusColor, statusStr + timeStr);
		const statusVisible = statusStr.length + timeStr.length;

		// Context bar: 5 blocks + percent
		const filled = Math.ceil(state.contextPct / 20);
		const bar = "#".repeat(filled) + "-".repeat(5 - filled);
		const ctxStr = `[${bar}] ${Math.ceil(state.contextPct)}%`;
		const ctxLine = theme.fg("dim", ctxStr);
		const ctxVisible = ctxStr.length;

		const workRaw = state.task
			? (state.lastWork || state.task)
			: state.def.description;
		const workText = truncate(workRaw, Math.min(50, w - 1));
		const workLine = theme.fg("muted", workText);
		const workVisible = workText.length;

		const top = "┌" + "─".repeat(w) + "┐";
		const bot = "└" + "─".repeat(w) + "┘";
		const border = (content: string, visLen: number) =>
			theme.fg("dim", "│") + content + " ".repeat(Math.max(0, w - visLen)) + theme.fg("dim", "│");

		return [
			theme.fg("dim", top),
			border(" " + nameStr, 1 + nameVisible),
			border(" " + statusLine, 1 + statusVisible),
			border(" " + ctxLine, 1 + ctxVisible),
			border(" " + workLine, 1 + workVisible),
			theme.fg("dim", bot),
		];
	}

	function updateWidget() {
		if (!widgetCtx) return;

		widgetCtx.ui.setWidget("agent-team", (_tui: any, theme: any) => {
			const text = new Text("", 0, 1);

			return {
				render(width: number): string[] {
					if (agentStates.size === 0) {
						text.setText(theme.fg("dim", "No agents found. Add .md files to agents/"));
						return text.render(width);
					}

					const cols = Math.min(gridCols, agentStates.size);
					const gap = 1;
					const colWidth = Math.floor((width - gap * (cols - 1)) / cols);
					const agents = Array.from(agentStates.values());
					const rows: string[][] = [];

					for (let i = 0; i < agents.length; i += cols) {
						const rowAgents = agents.slice(i, i + cols);
						const cards = rowAgents.map(a => renderCard(a, colWidth, theme));

						while (cards.length < cols) {
							cards.push(Array(6).fill(" ".repeat(colWidth)));
						}

						const cardHeight = cards[0].length;
						for (let line = 0; line < cardHeight; line++) {
							rows.push(cards.map(card => card[line] || ""));
						}
					}

					const output = rows.map(cols => cols.join(" ".repeat(gap)));
					text.setText(output.join("\n"));
					return text.render(width);
				},
				invalidate() {
					text.invalidate();
				},
			};
		});
	}

	// ── Dispatch Agent (returns Promise) ─────────

	function dispatchAgent(
		agentName: string,
		task: string,
		ctx: any,
	): Promise<{ output: string; exitCode: number; elapsed: number }> {
		const key = agentName.toLowerCase();
		const state = agentStates.get(key);
		if (!state) {
			return Promise.resolve({
				output: `Agent "${agentName}" not found. Available: ${Array.from(agentStates.values()).map(s => displayName(s.def.name)).join(", ")}`,
				exitCode: 1,
				elapsed: 0,
			});
		}

		if (state.status === "running") {
			return Promise.resolve({
				output: `Agent "${displayName(state.def.name)}" is already running. Wait for it to finish.`,
				exitCode: 1,
				elapsed: 0,
			});
		}

		state.status = "running";
		state.task = task;
		state.toolCount = 0;
		state.elapsed = 0;
		state.lastWork = "";
		state.runCount++;
		updateWidget();

		const startTime = Date.now();
		state.timer = setInterval(() => {
			state.elapsed = Date.now() - startTime;
			updateWidget();
		}, 1000);

		const model = ctx.model
			? `${ctx.model.provider}/${ctx.model.id}`
			: "openrouter/google/gemini-3-flash-preview";

		// Session file for this agent
		const agentKey = state.def.name.toLowerCase().replace(/\s+/g, "-");
		const agentSessionFile = join(sessionDir, `${agentKey}.json`);

		// Build args — first run creates session, subsequent runs resume
		const args = [
			"--mode", "json",
			"-p",
			"--no-extensions",
			"--model", model,
			"--tools", state.def.tools,
			"--thinking", "off",
			"--append-system-prompt", state.def.systemPrompt,
			"--session", agentSessionFile,
		];

		// Continue existing session if we have one
		if (state.sessionFile) {
			args.push("-c");
		}

		args.push(task);

		const textChunks: string[] = [];

		return new Promise((resolve) => {
			const proc = spawn("pi", args, {
				stdio: ["ignore", "pipe", "pipe"],
				env: { ...process.env },
			});

			let buffer = "";

			proc.stdout!.setEncoding("utf-8");
			proc.stdout!.on("data", (chunk: string) => {
				buffer += chunk;
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";
				for (const line of lines) {
					if (!line.trim()) continue;
					try {
						const event = JSON.parse(line);
						if (event.type === "message_update") {
							const delta = event.assistantMessageEvent;
							if (delta?.type === "text_delta") {
								textChunks.push(delta.delta || "");
								const full = textChunks.join("");
								const last = full.split("\n").filter((l: string) => l.trim()).pop() || "";
								state.lastWork = last;
								updateWidget();
							}
						} else if (event.type === "tool_execution_start") {
							state.toolCount++;
							updateWidget();
						} else if (event.type === "message_end") {
							const msg = event.message;
							if (msg?.usage && contextWindow > 0) {
								state.contextPct = ((msg.usage.input || 0) / contextWindow) * 100;
								updateWidget();
							}
						} else if (event.type === "agent_end") {
							const msgs = event.messages || [];
							const last = [...msgs].reverse().find((m: any) => m.role === "assistant");
							if (last?.usage && contextWindow > 0) {
								state.contextPct = ((last.usage.input || 0) / contextWindow) * 100;
								updateWidget();
							}
						}
					} catch {}
				}
			});

			proc.stderr!.setEncoding("utf-8");
			proc.stderr!.on("data", () => {});

			proc.on("close", (code) => {
				if (buffer.trim()) {
					try {
						const event = JSON.parse(buffer);
						if (event.type === "message_update") {
							const delta = event.assistantMessageEvent;
							if (delta?.type === "text_delta") textChunks.push(delta.delta || "");
						}
					} catch {}
				}

				clearInterval(state.timer);
				state.elapsed = Date.now() - startTime;
				state.status = code === 0 ? "done" : "error";

				// Mark session file as available for resume
				if (code === 0) {
					state.sessionFile = agentSessionFile;
				}

				const full = textChunks.join("");
				state.lastWork = full.split("\n").filter((l: string) => l.trim()).pop() || "";
				updateWidget();

				ctx.ui.notify(
					`${displayName(state.def.name)} ${state.status} in ${Math.round(state.elapsed / 1000)}s`,
					state.status === "done" ? "success" : "error"
				);

				resolve({
					output: full,
					exitCode: code ?? 1,
					elapsed: state.elapsed,
				});
			});

			proc.on("error", (err) => {
				clearInterval(state.timer);
				state.status = "error";
				state.lastWork = `Error: ${err.message}`;
				updateWidget();
				resolve({
					output: `Error spawning agent: ${err.message}`,
					exitCode: 1,
					elapsed: Date.now() - startTime,
				});
			});
		});
	}

	// ── dispatch_agent Tool (registered at top level) ──

	pi.registerTool({
		name: "dispatch_agent",
		label: "Dispatch Agent",
		description: "Dispatch a task to a specialist agent. The agent will execute the task and return the result. Use the system prompt to see available agent names.",
		parameters: Type.Object({
			agent: Type.String({ description: "Agent name (case-insensitive)" }),
			task: Type.String({ description: "Task description for the agent to execute" }),
		}),

		async execute(_toolCallId, params, _signal, onUpdate, ctx) {
			const { agent, task } = params as { agent: string; task: string };

			try {
				if (onUpdate) {
					onUpdate({
						content: [{ type: "text", text: `Dispatching to ${agent}...` }],
						details: { agent, task, status: "dispatching" },
					});
				}

				const result = await dispatchAgent(agent, task, ctx);

				const truncated = result.output.length > 8000
					? result.output.slice(0, 8000) + "\n\n... [truncated]"
					: result.output;

				const status = result.exitCode === 0 ? "done" : "error";
				const summary = `[${agent}] ${status} in ${Math.round(result.elapsed / 1000)}s`;

				return {
					content: [{ type: "text", text: `${summary}\n\n${truncated}` }],
					details: {
						agent,
						task,
						status,
						elapsed: result.elapsed,
						exitCode: result.exitCode,
						fullOutput: result.output,
					},
				};
			} catch (err: any) {
				return {
					content: [{ type: "text", text: `Error dispatching to ${agent}: ${err?.message || err}` }],
					details: { agent, task, status: "error", elapsed: 0, exitCode: 1, fullOutput: "" },
				};
			}
		},

		renderCall(args, theme) {
			const agentName = (args as any).agent || "?";
			const task = (args as any).task || "";
			const preview = task.length > 60 ? task.slice(0, 57) + "..." : task;
			return new Text(
				theme.fg("toolTitle", theme.bold("dispatch_agent ")) +
				theme.fg("accent", agentName) +
				theme.fg("dim", " — ") +
				theme.fg("muted", preview),
				0, 0,
			);
		},

		renderResult(result, options, theme) {
			const details = result.details as any;
			if (!details) {
				const text = result.content[0];
				return new Text(text?.type === "text" ? text.text : "", 0, 0);
			}

			// Streaming/partial result while agent is still running
			if (options.isPartial || details.status === "dispatching") {
				return new Text(
					theme.fg("accent", `● ${details.agent || "?"}`) +
					theme.fg("dim", " working..."),
					0, 0,
				);
			}

			const icon = details.status === "done" ? "✓" : "✗";
			const color = details.status === "done" ? "success" : "error";
			const elapsed = typeof details.elapsed === "number" ? Math.round(details.elapsed / 1000) : 0;
			const header = theme.fg(color, `${icon} ${details.agent}`) +
				theme.fg("dim", ` ${elapsed}s`);

			if (options.expanded && details.fullOutput) {
				const output = details.fullOutput.length > 4000
					? details.fullOutput.slice(0, 4000) + "\n... [truncated]"
					: details.fullOutput;
				return new Text(header + "\n" + theme.fg("muted", output), 0, 0);
			}

			return new Text(header, 0, 0);
		},
	});

	// ── Commands ─────────────────────────────────

	pi.registerCommand("agents-team", {
		description: "Select a team to work with",
		handler: async (_args, ctx) => {
			widgetCtx = ctx;
			const teamNames = Object.keys(teams);
			if (teamNames.length === 0) {
				ctx.ui.notify("No teams defined in .pi/agents/teams.yaml", "warning");
				return;
			}

			const options = teamNames.map(name => {
				const members = teams[name].map(m => displayName(m));
				return `${name} — ${members.join(", ")}`;
			});

			const choice = await ctx.ui.select("Select Team", options);
			if (choice === undefined) return;

			const idx = options.indexOf(choice);
			const name = teamNames[idx];
			activateTeam(name);
			updateWidget();
			ctx.ui.setStatus("agent-team", `Team: ${name} (${agentStates.size})`);
			ctx.ui.notify(`Team: ${name} — ${Array.from(agentStates.values()).map(s => displayName(s.def.name)).join(", ")}`, "info");
		},
	});

	pi.registerCommand("agents-list", {
		description: "List all loaded agents",
		handler: async (_args, _ctx) => {
			widgetCtx = _ctx;
			const names = Array.from(agentStates.values())
				.map(s => {
					const session = s.sessionFile ? "resumed" : "new";
					return `${displayName(s.def.name)} (${s.status}, ${session}, runs: ${s.runCount}): ${s.def.description}`;
				})
				.join("\n");
			_ctx.ui.notify(names || "No agents loaded", "info");
		},
	});

	pi.registerCommand("agents-grid", {
		description: "Set grid columns: /agents-grid <1-6>",
		getArgumentCompletions: (prefix: string): AutocompleteItem[] | null => {
			const items = ["1", "2", "3", "4", "5", "6"].map(n => ({
				value: n,
				label: `${n} columns`,
			}));
			const filtered = items.filter(i => i.value.startsWith(prefix));
			return filtered.length > 0 ? filtered : items;
		},
		handler: async (args, _ctx) => {
			widgetCtx = _ctx;
			const n = parseInt(args?.trim() || "", 10);
			if (n >= 1 && n <= 6) {
				gridCols = n;
				_ctx.ui.notify(`Grid set to ${gridCols} columns`, "info");
				updateWidget();
			} else {
				_ctx.ui.notify("Usage: /agents-grid <1-6>", "error");
			}
		},
	});

	// ── System Prompt Override ───────────────────

	pi.on("before_agent_start", async (_event, _ctx) => {
		// Build dynamic agent catalog from active team only
		const agentCatalog = Array.from(agentStates.values())
			.map(s => `### ${displayName(s.def.name)}\n**Dispatch as:** \`${s.def.name}\`\n${s.def.description}\n**Tools:** ${s.def.tools}`)
			.join("\n\n");

		const teamMembers = Array.from(agentStates.values()).map(s => displayName(s.def.name)).join(", ");

		return {
			systemPrompt: `You are a hybrid orchestrator with access to both team-based delegation and direct subagent execution.

## Active Team: ${activeTeamName}
Members: ${teamMembers}

## Delegation Strategy
**dispatch_agent** → Use when:
- Delegating work to team members who specialize in specific domains
- The task is complex and requires a specialist's expertise
- You want to parallelize work across multiple agents
- Example: Dispatch a feature request to the builder agent on the team

**subagent** → Use when:
- You need to run focused, tactical commands outside the team context
- Working with external tools or batch processing
- Quick exploration before full team delegation
- Example: Run a batch file processing task, then dispatch results to builder

## How to Work
- Analyze the user's request and determine if it needs team coordination or tactical execution
- For feature building, complex refactoring, or cross-cutting changes → dispatch_agent
- For batch processing, quick exploration, or external tool usage → subagent
- You can chain both: e.g., run subagent for data prep, then dispatch_agent to builder
- Review results and dispatch follow-up agents if needed
- Summarize the outcome for the user

## Rules
- NEVER try to access the codebase directly — use the appropriate tool
- Use dispatch_agent for team-based work; use subagent for tactical execution
- You can dispatch the same agent multiple times with different tasks
- You can chain subagent → dispatch_agent or dispatch_agent → subagent
- Keep tasks focused — one clear objective per invocation
- Prefer dispatch_agent for feature work; subagent for batch/exploratory work

## Agents

${agentCatalog}`,
		};
	});

	// ── Session Start ────────────────────────────

	pi.on("session_start", async (_event, _ctx) => {
		// Clear widgets from previous session
		if (widgetCtx) {
			widgetCtx.ui.setWidget("agent-team", undefined);
		}
		widgetCtx = _ctx;
		contextWindow = _ctx.model?.contextWindow || 0;

		// Preserve agent session files for hybrid execution (dispatch_agent + subagent)
		// Sessions are cleared only when explicitly requested via /agents-reset
		const sessDir = join(_ctx.cwd, ".pi", "agent-sessions");
		if (!existsSync(sessDir)) {
			mkdirSync(sessDir, { recursive: true });
		}

		loadAgents(_ctx.cwd);

		// Default to first team — use /agents-team to switch
		const teamNames = Object.keys(teams);
		if (teamNames.length > 0) {
			activateTeam(teamNames[0]);
		}

		// Enable hybrid delegation: both dispatch_agent and subagent tools
		pi.setActiveTools(["dispatch_agent", "subagent"]);

		_ctx.ui.setStatus("agent-team", `Team: ${activeTeamName} (${agentStates.size}) | Hybrid: ON`);
		const members = Array.from(agentStates.values()).map(s => displayName(s.def.name)).join(", ");
		_ctx.ui.notify(
			`Team: ${activeTeamName} (${members})\n` +
			`Hybrid orchestration enabled (dispatch_agent + subagent)\n\n` +
			`/agents-team          Select a team\n` +
			`/agents-list          List active agents and status\n` +
			`/agents-grid <1-6>    Set grid column count`,
			"info",
		);
		updateWidget();

		// Footer: model | team | context bar
		_ctx.ui.setFooter((_tui, theme, _footerData) => ({
			dispose: () => {},
			invalidate() {},
			render(width: number): string[] {
				const model = _ctx.model?.id || "no-model";
				const usage = _ctx.getContextUsage();
				const pct = usage ? usage.percent : 0;
				const filled = Math.round(pct / 10);
				const bar = "#".repeat(filled) + "-".repeat(10 - filled);

				const left = theme.fg("dim", ` ${model}`) +
					theme.fg("muted", " · ") +
					theme.fg("accent", activeTeamName);
				const right = theme.fg("dim", `[${bar}] ${Math.round(pct)}% `);
				const pad = " ".repeat(Math.max(1, width - visibleWidth(left) - visibleWidth(right)));

				return [truncateToWidth(left + pad + right, width)];
			},
		}));
	});
}
