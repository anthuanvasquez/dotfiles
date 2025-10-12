# Mac Dev Setup - Documentación Web

Una página web interactiva que presenta todas las herramientas necesarias para configurar un entorno de desarrollo web en Mac.

## Características

- 🎨 Diseño moderno y responsivo con Tailwind CSS
- 📋 Comandos copiables con un clic
- 📊 Tracking de progreso de instalación
- 🔗 Enlaces directos a documentación oficial
- 📱 Optimizado para dispositivos móviles

## Tecnologías

- Vue.js 3 with Composition API
- TypeScript
- Vite
- Tailwind CSS
- PostCSS

## Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar servidor de desarrollo
pnpm run dev

# Construir para producción
pnpm run build
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── ToolCard.vue          # Tarjeta individual de herramienta
│   └── ExtensionsCard.vue    # Tarjeta de extensiones VS Code
├── data/
│   └── setupData.ts          # Datos de todas las herramientas
├── views/
│   └── HomeView.vue          # Página principal
├── assets/
│   └── main.css              # Estilos principales
└── main.ts                   # Punto de entrada
```

## Funcionalidades

### ToolCard Component
- Muestra información de cada herramienta
- Comandos de instalación copiables
- Enlaces a documentación oficial
- Checkbox de progreso
- Notas adicionales de configuración

### ExtensionsCard Component
- Lista todas las extensiones de VS Code
- Comando para instalar todas las extensiones
- Comandos individuales para cada extensión

### Tracking de Progreso
- Barra de progreso global
- Checkboxes para marcar herramientas instaladas
- Contador de herramientas completadas

## Categorías de Herramientas

1. **Initial Setup** - Configuración inicial del sistema
2. **Development Tools** - Herramientas de desarrollo
3. **Applications** - Aplicaciones útiles
4. **Code Editor** - VS Code y extensiones

## Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Ejecutar servidor de desarrollo
pnpm run dev

# Construir para producción
pnpm run build

# Linting
pnpm run lint
```

## Despliegue

El proyecto puede desplegarse en cualquier servicio de hosting estático como:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
