---
description: Creates atomic commits following Conventional Commits best practices
---

Analyzes all pending repository changes and creates **atomic commits** following Conventional Commits best practices.

The goal is to transform mixed working changes into clean, logical commit history.

---

## Steps

### 1. Repository Analysis

Use `git-commit` skill to:

- Check repository state
- Detect:
  - staged files
  - unstaged files
  - renamed/deleted files
- Analyze full diff

Commands:

```
git status --porcelain
git diff
git diff --staged
```

Determine if changes represent:
- multiple features
- fixes
- refactors
- formatting noise
- config updates

---

### 2. Change Classification

Group files into **logical commit units**.

Each commit MUST represent:

✅ One responsibility
✅ One intent
✅ One conventional commit type

Possible grouping strategies:

- By feature/module
- By folder
- By concern
- By change type

Examples:

```
feat(auth): login implementation
fix(api): handle null response
refactor(ui): extract button component
test(auth): add login tests
```

If grouping is unclear, ask user using `conversation-manager`.

---

### 3. Atomic Commit Plan

Before committing:

Generate a commit plan:

```
Proposed commits:

1. feat(auth): add login service
- src/auth/login.service.ts
- src/auth/types.ts

2. refactor(ui): simplify navbar state
- src/components/navbar.ts

3. test(auth): add authentication tests
- tests/auth/*
```

Request approval before execution.

---

### 4. Intelligent Staging

Use `git-commit` skill to stage files per commit:

```
git add <files>
```

Rules:

- Never mix unrelated changes
- Avoid partial logical commits
- Prefer smaller commits
- Use interactive staging if needed:

```
git add -p
```

---

### 5. Commit Generation

For each atomic group:

Automatically generate:


```
<type>[scope]: <description>
```

Optional:
- body when context needed
- breaking change footer

Then execute:


```
git commit -m "message"
```

---

### 6. Validation

After all commits:

Verify clean state:


```
git status
```

Output summary:


✅ 3 atomic commits created


Show commit log preview:


```
git log --oneline -5
```

---

## Commit Rules

Always enforce:

- Conventional Commits
- Imperative mood
- Present tense
- <72 character title
- No secrets committed
- Atomic changes only

---

## Safety Protocol

NEVER:

- force push
- amend commits automatically
- commit secrets
- modify git config
- bypass hooks

Ask user if risky action detected.

---

## Usage Examples

```
/commit
/commit split changes
/commit create atomic commits
/commit group by feature
```

---

## Interactive Questions (if needed)

Ask only when necessary:

- Should commits be minimal or grouped?
- Prefer feature-based or file-based commits?
- Include formatting changes separately?

Default behavior:
→ smallest logical atomic commits.
