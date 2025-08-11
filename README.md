## Equal DS UI

Production-ready React sidebar components and Tailwind helpers for the Equal Design System, built with shadcn + Radix.

### Installation

```bash
npm install equal-ds-ui
# peer deps
npm install react react-dom @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react tailwindcss
```

### Optional: Drag & Drop (DnD) Support

The sidebar supports optional drag-and-drop reordering of groups. To enable this feature, install the required DnD packages:

```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

**Without DnD packages installed:**
- Sidebar renders normally with static group ordering
- No drag handles are shown
- Reduced bundle size
- Perfect for simple navigation without reordering needs

**With DnD packages installed:**
- Enable reordering by passing `reorderGroups` prop to `SidebarContent`
- Drag handles appear on hover
- Groups can be reordered via drag and drop

```tsx
// Example with reordering enabled
<SidebarContent reorderGroups onGroupOrderChange={handleOrderChange}>
  <SidebarGroup id="group1">...</SidebarGroup>
  <SidebarGroup id="group2">...</SidebarGroup>
</SidebarContent>
```

**Bundle size impact:**
- Without DnD: ~15-20% smaller bundle
- With DnD: Full functionality including reordering

### Styles

Import the CSS once in your app root:

```tsx
import 'equal-ds-ui/theme.css';        // base theme (alias of shadcn-theme.css)
import 'equal-ds-ui/animations.css';   // motion helpers
```

### Quick start

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
import 'equal-ds-ui/theme.css'
import 'equal-ds-ui/animations.css'

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>My App</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupTrigger>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              </SidebarGroupTrigger>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton itemId="home" href="/">Home</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <SidebarRail />
        <main className="flex-1 p-6">
          <SidebarTrigger>☰</SidebarTrigger>
        </main>
      </div>
    </SidebarProvider>
  )
}
```

### Advanced: Conditional DnD Loading

For applications that want to conditionally enable DnD based on user permissions or feature flags:

```tsx
import { SidebarContent } from 'equal-ds-ui'

function MySidebar({ userCanReorder = false }) {
  return (
    <SidebarContent reorderGroups={userCanReorder}>
      {/* Groups will only be reorderable if userCanReorder is true */}
    </SidebarContent>
  )
}
```

The component automatically detects if DnD packages are available and gracefully degrades when they're not.

### Tailwind preset (optional)

Add the preset to your Tailwind config:

```js
// tailwind.config.js / tailwind.config.ts
module.exports = {
  presets: [require('equal-ds-ui/tailwind-preset')],
}
```

### Design tokens (optional)

```ts
import tokens from 'equal-ds-ui/tokens'
```

### Local testing

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

### Release & publish

1) Ensure you are logged in to npm and have 2FA set up.

```bash
npm login
```

2) Bump version and publish:

```bash
npm version patch   # or minor / major
npm publish --access public
git push --follow-tags
```

### Compatibility

- React 18 or 19
- Tailwind CSS 3.4+
- **Optional:** @dnd-kit/core ^6.3.1, @dnd-kit/sortable ^8.0.0 (for reordering)

### License

MIT © Equal DS


