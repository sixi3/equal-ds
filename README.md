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

### License

MIT © Equal DS


