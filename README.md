## Equal DS UI

Production-ready React sidebar components and Tailwind helpers for the Equal Design System, built with shadcn + Radix.

### Installation

```bash
npm install equal-ds-ui
# peer deps
npm install react react-dom @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react tailwindcss
```

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
              </SidebarGroupContent>
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

### Customization

- Indicator color follows CSS variable `--primary-400` via inline style. Adjust via theme tokens in `shadcn-theme.css`.
- Spacing uses padding (not margins) so indicators sit between padded edges.
- Animations are defined in `animations.css`:
  - `.animate-sidebar-pop-in` for the moved tab
  - `.animate-sidebar-reorder-slide` for groups that moved

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
npm version minor   # or patch / major
npm publish --access public
git push --follow-tags
```

### Compatibility

- React 18 or 19
- Tailwind CSS 3.4+

### License

MIT © Equal DS


