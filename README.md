# 🎨 Equal DS UI

[![npm version](https://badge.fury.io/js/equal-ds-ui.svg)](https://badge.fury.io/js/equal-ds-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Production-ready React sidebar components and Tailwind helpers** for the Equal Design System. Built with custom design tokens, optimized for performance, and featuring **selective ESM/CJS format installation** for maximum bundle efficiency.

## ✨ What's New in v1.0.7

- 🚀 **Selective Format Installation**: Choose ESM or CommonJS during installation for ~50% smaller bundles
- 🎯 **Smart Auto-Detection**: Automatically detects your project's bundler and format preferences
- ⚡ **CLI Tools**: `npx equal-ds-format` for easy format selection and optimization

## 📦 Installation

```bash
npm install equal-ds-ui

# Required peer dependencies
npm install @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react tailwindcss

# Development dependencies (for custom setup)
npm install -D tailwindcss postcss autoprefixer
```


## 🎯 Selective Format Installation

**Choose your preferred module format** for optimal bundle sizes and compatibility. This package supports both ESM and CommonJS with automatic format detection.

### Quick Format Selection

```bash
# Install the package
npm install equal-ds-ui

# Choose your format (choose one):
npx equal-ds-format esm    # ESM format (~34KB) - Modern bundlers
npx equal-ds-format cjs    # CommonJS format (~36KB) - Legacy bundlers
npx equal-ds-format auto   # Auto-detect based on your project
```

### 📊 Format Comparison

| Format | Bundle Size | Best For | Command |
|--------|-------------|----------|---------|
| **ESM Only** | ~34KB | Vite, Next.js, esbuild | `npx equal-ds-format esm` |
| **CommonJS Only** | ~36KB | Webpack, CRA, legacy | `npx equal-ds-format cjs` |
| **Auto-Detect** | Optimized | Any project | `npx equal-ds-format auto` |
| **Both Formats** | ~70KB | Maximum compatibility | Default |

### 🔧 For Package Publishers

```bash
# Build format-specific versions
npm run build:esm          # ESM-only build
npm run build:cjs          # CommonJS-only build
npm run build              # Both formats (default)

# Publish selective versions
npm run prepublishOnly:esm # Publish ESM-only
npm run prepublishOnly:cjs # Publish CommonJS-only
npm run prepublishOnly     # Publish both formats
```

> **💡 Pro Tip:** The CLI automatically detects your project's bundler (Vite, Webpack, Next.js, etc.) and recommends the optimal format!

## ⚙️ Quick Setup

Get started with Equal DS UI in just 3 simple steps:

### 1. Initialize Tailwind CSS
```bash
npx tailwindcss init -p  # Creates tailwind.config.js and postcss.config.js
```

### 2. Configure with our Design System
```javascript
// tailwind.config.js
import preset from 'equal-ds-ui/tailwind-preset'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/equal-ds-ui/dist/**/*.{js,jsx,ts,tsx}', // Important!
  ],
  presets: [preset], // Our complete design system
}
```

### 3. Import Design System Styles
```css
/* src/index.css */

/* Import Equal DS UI design system FIRST */
@import 'equal-ds-ui/tokens.css';
@import 'equal-ds-ui/animations.css';

/* Then Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🚀 Quick Start

Here's a complete example to get you started:

```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupTrigger,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from 'equal-ds-ui'

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background-secondary">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader className="border-b border-border-default">
            <div className="px-4 py-3">
              <h1 className="font-semibold text-text-primary">My App</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup defaultOpen>
              <SidebarGroupTrigger>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
              </SidebarGroupTrigger>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton itemId="home">Home</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton itemId="settings">Settings</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4">☰ Toggle Sidebar</SidebarTrigger>
          <h1 className="text-2xl font-bold text-text-primary">Welcome to Equal DS UI!</h1>
          <p className="text-text-secondary mt-2">Your sidebar is ready to use.</p>
        </main>
      </div>
    </SidebarProvider>
  )
}
```

> **💡 Ready to go!** This example uses our design tokens for consistent styling. Make sure you've completed the setup steps above.

## 🧪 Testing & Development

### Quick Test with Vite
```bash
# Create and setup a test project
mkdir test-equal-ds && cd test-equal-ds
npm create vite@latest . -- --template react
npm install equal-ds-ui @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Essential Configuration
```javascript
// tailwind.config.js
import preset from 'equal-ds-ui/tailwind-preset'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/equal-ds-ui/dist/**/*.{js,jsx,ts,tsx}', // Required!
  ],
  presets: [preset],
}
```

```css
/* src/index.css */
@import 'equal-ds-ui/tokens.css';
@import 'equal-ds-ui/animations.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| **Unstyled sidebar** | Add `node_modules/equal-ds-ui/dist/**/*` to Tailwind content |
| **CSS variables not working** | Import design system CSS before Tailwind |
| **Module resolution errors** | Check your bundler configuration |
| **Format compatibility** | Run `npx equal-ds-format auto` after installation |

## 🎨 Custom Design Tokens

Extend Equal DS UI with your own design tokens using our `design-tokens-sync` tool.

### Quick Setup
```bash
# Install the sync tool
npm install -D design-tokens-sync

# Create your tokens file
echo '{
  "color": {
    "primary": {"500": "#your-color"},
    "text": {"primary": "#your-text"}
  }
}' > design-tokens.json

# Generate CSS and Tailwind preset
npx design-tokens-sync sync
```

### Integration
```javascript
// tailwind.config.js
import equalDSPreset from 'equal-ds-ui/tailwind-preset'
import customPreset from './tokens.tailwind.preset.js'

export default {
  presets: [equalDSPreset, customPreset], // Custom overrides Equal DS
  content: ['./src/**/*.{js,jsx,ts,tsx}']
}
```

```css
/* src/index.css */
@import './tokens.css';           /* Your tokens first */
@import 'equal-ds-ui/tokens.css'; /* Equal DS base */
@import 'equal-ds-ui/animations.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 🎯 Token Priority
1. **Your custom tokens** (highest)
2. **Equal DS UI tokens** (medium)
3. **Tailwind defaults** (lowest)

Your tokens override ours, giving you full customization control!

## 🔀 Drag & Drop Reordering

Equal DS UI supports intuitive drag-and-drop for both menu items and groups.

### Menu Items Reordering
```tsx
const [itemOrder, setItemOrder] = useState(['home', 'settings', 'profile'])

<SidebarMenu reorderable onReorder={setItemOrder}>
  {itemOrder.map(id => (
    <SidebarMenuItem key={id} draggable dragId={id}>
      <SidebarMenuButton itemId={id}>
        {menuItems[id].label}
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

### Group Reordering
```tsx
const [groupOrder, setGroupOrder] = useState(['main', 'admin', 'tools'])

<SidebarContent reorderableGroups onGroupReorder={setGroupOrder}>
  {groupOrder.map(id => (
    <SidebarGroup key={id} groupId={id}>
      {/* Group content */}
    </SidebarGroup>
  ))}
</SidebarContent>
```

### ✨ Features
- **Handle-only dragging** - Prevents accidental moves
- **Smooth animations** - Visual feedback during reordering
- **Auto-collapse** - Groups collapse during drag for clarity
- **Container drops** - Drop anywhere in the column
- **Theme integration** - Uses your design tokens for indicators

## 🚀 What's New in v1.0.7

- 🎯 **Selective Format Installation**: Choose ESM or CommonJS for ~50% smaller bundles
- ⚡ **Smart CLI Tools**: `npx equal-ds-format` for easy format selection
- 🔍 **Auto-Detection**: Automatically detects your project's bundler preferences
- 🎨 **Enhanced Design System**: Improved token system and customization options

## 🚨 Migration Guide (v1.0.6 → v1.0.7)

### ✨ New Features (Non-Breaking)
- **Format Selection**: Choose ESM or CommonJS during installation
- **CLI Tools**: New `equal-ds-format` command for format optimization
- **Auto-Detection**: Smart bundler detection for optimal format selection

### Migration Steps
```bash
# Update to latest version
npm install equal-ds-ui@latest

# Optional: Optimize format for your project
npx equal-ds-format auto
```

### Breaking Changes from v0.2.2 → v1.0.4
If upgrading from older versions, update your color classes:

```tsx
// OLD → NEW
'text-foreground' → 'text-text-primary'
'bg-background' → 'bg-background-secondary'
'border-border' → 'border-border-default'
'focus:ring-ring' → 'focus:ring-primary-400'
```

## 📚 Component API

### Core Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `SidebarProvider` | Context provider | `defaultOpen`, `onOpenChange` |
| `Sidebar` | Main sidebar container | `className`, `aria-label` |
| `SidebarHeader` | Top section | `children` |
| `SidebarContent` | Main content area | `reorderableGroups`, `onGroupReorder` |
| `SidebarFooter` | Bottom section | `children` |
| `SidebarGroup` | Logical grouping | `groupId`, `defaultOpen` |
| `SidebarMenu` | Menu container | `reorderable`, `onReorder` |
| `SidebarMenuItem` | Individual menu item | `draggable`, `dragId` |
| `SidebarTrigger` | Toggle button | `srLabel`, `children` |

### 🎨 Design Tokens

Our Tailwind preset includes comprehensive design tokens:

```tsx
// Colors
'bg-background-primary/secondary/tertiary'
'text-text-primary/secondary/muted/inverse'
'border-border-default/hover/focus/light'
'bg-primary-50/100/200/.../900'

// Typography
'font-thin/light/normal/medium/semibold/bold'
'tracking-tight/normal/wide/wider/widest'

// Animations (via animations.css)
'animate-sidebar-pop-in'
'animate-sidebar-reorder-slide'
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development
npm run storybook    # Storybook development
npm run dev          # Vite development
npm test            # Run tests

# Build for publishing
npm run build:esm    # ESM only
npm run build:cjs    # CommonJS only
npm run build        # Both formats

# Publish
npm run prepublishOnly  # Prepares for publishing
npm publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

**MIT** © Equal DS

---

<div align="center">
  <p><strong>Built with ❤️ for modern React applications</strong></p>
  <p>
    <a href="#installation">Installation</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#selective-format-installation">Format Selection</a> •
    <a href="#custom-design-tokens">Custom Tokens</a>
  </p>
</div>


