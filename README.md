## Equal DS UI

Production-ready React sidebar components and Tailwind helpers for the Equal Design System, built with custom design tokens and optimized for performance.

> **🚨 Version 1.0.4 Breaking Changes:** This major release includes a complete design system migration and fixes export path issues. Please read the [Migration Guide](#migration-guide) below.

### Installation

```bash
npm install equal-ds-ui
# Required peer dependencies
npm install @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react tailwindcss
# Dev dependencies for build process
npm install -D tailwindcss postcss autoprefixer
```

### Setup

#### 1. Initialize Tailwind CSS
```bash
npx tailwindcss init
```

#### 2. Configure Tailwind with our preset
```javascript
// tailwind.config.js or tailwind.config.cjs
const preset = require('equal-ds-ui/tailwind-preset')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [preset],  // This provides all design token classes
}
```

#### 3. Import CSS files
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import equal-ds-ui design system */
@import 'equal-ds-ui/tokens.css';
@import 'equal-ds-ui/animations.css';
```

### Quick Start

```tsx
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupTrigger,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
} from 'equal-ds-ui'

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background-secondary">
        <Sidebar>
          <SidebarHeader className="border-b border-border-default">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h1 className="font-semibold text-text-primary">Equal DS</h1>
                <p className="text-xs text-text-secondary">Design System</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup defaultOpen>
              <SidebarGroupTrigger>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              </SidebarGroupTrigger>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton itemId="home" href="/">
                      Home
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border-default">
            <div className="p-4">
              <p className="text-sm text-text-secondary">Footer content</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarRail />
        
        <main className="flex-1 p-6">
          <SidebarTrigger>☰</SidebarTrigger>
          <h1 className="text-2xl font-bold text-text-primary">Welcome!</h1>
        </main>
      </div>
    </SidebarProvider>
  )
}
```

**Important:** Make sure you've followed the setup steps above to import the CSS and configure Tailwind with our preset!

### Reordering (tabs and groups)

- Drag handles appear on hover over the icon (tabs) and next to group labels (groups). Dragging is handle-only to prevent accidental drags.
- Reordering is disabled automatically when the sidebar is collapsed.
- Container-level drop: you can drop anywhere in the column (no dead zones between items).
- Drop indicators use your theme primary color and appear slightly offset from edges for clarity.
- Smooth, lightweight animations:
  - Tabs: pop-in on the moved tab
  - Groups: subtle slide-in for groups whose vertical position changed

#### Reorder tabs (items)

```tsx
const [order, setOrder] = React.useState([ 'home', 'billing', 'settings' ])
const byId = {
  home: { icon: <HomeIcon/>, label: 'Home' },
  billing: { icon: <CreditCard/>, label: 'Billing' },
  settings: { icon: <Cog/>, label: 'Settings' },
}

<SidebarMenu reorderable onReorder={setOrder}>
  {order.map((id) => (
    <SidebarMenuItem key={id} draggable dragId={id}>
      <SidebarMenuButton itemId={id} icon={byId[id].icon}>
        {byId[id].label}
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

Props involved:
- `SidebarMenu`
  - `reorderable?: boolean`
  - `onReorder?: (nextOrder: string[]) => void`
- `SidebarMenuItem`
  - `draggable?: boolean` (enable handle-only dragging)
  - `dragId?: string` (stable id used for ordering)

Notes:
- Only the icon area shows the `GripVertical` handle on hover. Dragging starts from the handle.
- The drop indicator is hidden when hovering the dragged item itself (no-op move).

#### Reorder groups

```tsx
const [groupOrder, setGroupOrder] = React.useState([ 'analytics', 'admin', 'docs' ])

<SidebarContent reorderableGroups onGroupReorder={setGroupOrder}>
  {groupOrder.map((gid) => (
    <SidebarGroup key={gid} groupId={gid} defaultOpen>
      <SidebarGroupTrigger>
        <SidebarGroupLabel>{gid.toUpperCase()}</SidebarGroupLabel>
      </SidebarGroupTrigger>
      <SidebarGroupContent>
        {/* ...SidebarMenu... */}
      </SidebarGroupContent>
    </SidebarGroup>
  ))}
</SidebarContent>
```

Props involved:
- `SidebarContent`
  - `reorderableGroups?: boolean`
  - `onGroupReorder?: (nextOrder: string[]) => void`
- `SidebarGroup`
  - `groupId?: string` (required for reordering)

Behavior:
- Handle-only drag next to the group label
- All groups auto-collapse while dragging; restored afterwards
- Container-level drop eliminates dead zones between groups

## 🚨 Migration Guide (v0.2.2 → v1.0.4)

### Breaking Changes

This major release includes a complete design system migration. Here's what you need to know:

#### 1. Color System Overhaul
All color classes have been renamed to use the new design token system:

```tsx
// ❌ OLD (v0.2.2)
'text-foreground'
'bg-background'
'border-border'
'focus-visible:ring-ring'

// ✅ NEW (v1.0.4)
'text-text-primary'
'bg-background-secondary'
'border-border-default'
'focus-visible:ring-primary-400'
```

#### 2. Preset System Change
The Tailwind preset now exports the auto-generated preset with all design tokens:

```js
// ❌ OLD (v0.2.2)
presets: [require('equal-ds-ui/tailwind-preset')]

// ✅ NEW (v1.0.4)
presets: [require('equal-ds-ui/tailwind-preset')]  // Now points to auto-generated preset
```

#### 3. CSS Import Changes
Update your CSS imports:

```tsx
// ❌ OLD (v0.2.2)
import 'equal-ds-ui/theme.css'        // shadcn-theme.css

// ✅ NEW (v1.0.4)
@import 'equal-ds-ui/tokens.css';     // New design tokens
@import 'equal-ds-ui/animations.css'; // Motion helpers
```

#### 4. Migration Steps
1. **Update package version**: `npm install equal-ds-ui@^1.0.4`
2. **Update CSS imports**: Replace `theme.css` with `tokens.css`
3. **Update Tailwind config**: Use new preset path
4. **Test thoroughly**: Verify all components render correctly
5. **Update custom styles**: Replace any hardcoded old color references

### What's New in v1.0.4

- ✨ **Enhanced UX**: Smooth transitions, layout stability, improved tooltips
- 🎨 **Design System**: Custom color tokens with auto-generated Tailwind preset
- 🐛 **Bug Fixes**: Resolved text cutoff, color consistency, and layout shift issues
- 🔧 **Performance**: Optimized animations and improved text rendering
- 🚀 **Export Fix**: Fixed tailwind-preset export path to resolve installation issues

---

### Customization

- Indicator color follows CSS variable `--color-primary-400` via inline style. Adjust via theme tokens in `tokens.css`.
- Spacing uses padding (not margins) so indicators sit between padded edges.
- Animations are defined in `animations.css`:
  - `.animate-sidebar-pop-in` for the moved tab
  - `.animate-sidebar-reorder-slide` for groups that moved

### Available Design Token Classes

Our Tailwind preset provides these design token classes:

#### Colors
```tsx
// Background colors
'bg-background-primary'    // Primary background
'bg-background-secondary'  // Secondary background  
'bg-background-tertiary'   // Tertiary background
'bg-primary-500'          // Primary brand color
'bg-primary-100'          // Light primary
'bg-white'                // Pure white

// Text colors
'text-text-primary'       // Primary text
'text-text-secondary'     // Secondary text
'text-text-muted'         // Muted text
'text-text-inverse'       // Inverse text (white)

// Border colors
'border-border-default'    // Default border
'border-border-hover'      // Hover border
'border-border-focus'      // Focus border
'border-border-light'      // Light border
```

#### Typography
```tsx
// Font weights
'font-thin'               // 100
'font-light'              // 300
'font-normal'             // 400
'font-medium'             // 500
'font-semibold'           // 600
'font-bold'               // 700

// Letter spacing
'tracking-tight'          // Tight
'tracking-normal'         // Normal
'tracking-wide'           // Wide
'tracking-wider'          // Wider
'tracking-widest'         // Widest
```

### Tailwind Preset

Our preset automatically provides all design token classes:

```js
// tailwind.config.js or tailwind.config.cjs
const preset = require('equal-ds-ui/tailwind-preset')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [preset],  // This gives you all the classes above
}
```

### Design tokens (optional)

```ts
import tokens from 'equal-ds-ui/tokens'
```

### Troubleshooting

#### Common Issues

**1. Sidebar not styled / colors not working**
- ✅ Ensure you've imported `equal-ds-ui/tokens.css` in your CSS
- ✅ Ensure Tailwind is configured with our preset
- ✅ Check that all peer dependencies are installed

**2. Tailwind classes not found**
- ✅ Verify your `tailwind.config.js` includes our preset
- ✅ Ensure content paths are correct
- ✅ Restart your dev server after config changes

**3. CSS variables not defined**
- ✅ Import `equal-ds-ui/tokens.css` before Tailwind directives
- ✅ Check that the CSS file is being loaded in your build

#### Complete Working Example

```tsx
// App.tsx
import { Sidebar, SidebarProvider, /* ... */ } from 'equal-ds-ui'

// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import 'equal-ds-ui/tokens.css';
@import 'equal-ds-ui/animations.css';

// tailwind.config.js
const preset = require('equal-ds-ui/tailwind-preset')
module.exports = { presets: [preset] }
```

### Local Testing

```bash
npm run build
npm pack                           # creates equal-ds-ui-x.y.z.tgz
mkdir -p ~/test-equal-ds && cd ~/test-equal-ds && npm init -y
npm install /absolute/path/to/equal-ds-ui-*.tgz
```

### Development

```bash
npm install
npm run storybook
npm test
```

### 🎨 Design System Automation

This design system includes **zero-touch automation** for keeping everything in sync:

- **🔄 Auto-Sync**: Design tokens automatically sync from Figma
- **⚙️ Auto-Generate**: Storybook controls automatically generated
- **📝 Auto-Update**: Stories automatically updated with new tokens
- **🤖 GitHub Actions**: Everything syncs automatically on git push

**Quick Start:**
```bash
# Full automation (recommended)
npm run full:update

# Test GitHub Actions workflow
npm run test:workflow

# Start Storybook
npm run storybook
```

**For complete automation setup, see:**
- [Design Controls Guide](docs/DESIGN-CONTROLS.md)
- [GitHub Actions Setup](docs/GITHUB-ACTIONS-SETUP.md)
- [Automation Summary](docs/AUTOMATION-SUMMARY.md)

### Release & publish

1) Ensure you are logged in to npm and have 2FA set up.

```bash
npm login
```

2) Bump version and publish:

```bash
npm version minor   # or patch / major
npm publish --access public
git push --follow-tags
```

### Compatibility

- React 18 or 19
- Tailwind CSS 3.4+

### License

MIT © Equal DS


