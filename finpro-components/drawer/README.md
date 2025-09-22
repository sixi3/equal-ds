# FinProDrawer

A comprehensive drawer component for FinPro applications, built on top of the Equal Design System. Features smooth slide animations, configurable width, and flexible content areas.

## Features

- **Smooth Animations**: Slide-in/out animations with directional shadows
- **Configurable Width**: Support for CSS values or numeric pixel values
- **Flexible Positioning**: Left or right side placement
- **Multiple Variants**: Overlay and floating display modes
- **Customizable Content**: Header with title, subtitle, and icon support
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Installation

```bash
npm install equal-ds-ui
```

## Basic Usage

```tsx
import {
  DrawerProvider,
  DrawerTrigger,
  DrawerOverlay
} from 'equal-ds-ui'
import { FinProDrawer } from 'equal-ds-ui/finpro-components/drawer/FinProDrawer'
import { Menu } from 'lucide-react'

function App() {
  return (
    <DrawerProvider>
      <div className="relative h-screen bg-gray-100">
        {/* Your main app content goes here */}
        <div className="p-8">
          <h1>Main Content</h1>
          <p>Your application content...</p>
        </div>

        {/* Drawer trigger */}
        <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg">
          <Menu className="w-5 h-5" />
        </DrawerTrigger>

        {/* Drawer overlay (for overlay variant) */}
        <DrawerOverlay />

        {/* FinProDrawer component */}
        <FinProDrawer />
      </div>
    </DrawerProvider>
  )
}
```

## Advanced Usage

```tsx
import {
  DrawerProvider,
  DrawerTrigger,
  DrawerOverlay
} from 'equal-ds-ui'
import { FinProDrawer } from 'equal-ds-ui/finpro-components/drawer/FinProDrawer'
import { Settings } from 'lucide-react'

function CustomDrawer() {
  return (
    <DrawerProvider side="right" defaultOpen={false}>
      <div className="relative h-screen bg-gray-100">
        {/* Main content area */}
        <div className="p-8">
          <h1>Your App Content</h1>
          {/* Your main application content */}
        </div>

        {/* Custom trigger */}
        <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-blue-500 text-white rounded-md shadow-lg">
          <Settings className="w-5 h-5" />
        </DrawerTrigger>

        {/* Overlay */}
        <DrawerOverlay />

        {/* Customized FinProDrawer */}
        <FinProDrawer
          title="Settings Panel"
          subtitle="Manage your application preferences"
          icon={<Settings className="w-5 h-5" />}
          variant="overlay"
          width={600}
        >
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">General Settings</h3>
              <p>Configure your general preferences here.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Advanced Options</h3>
              <p>Advanced configuration options.</p>
            </div>
          </div>
        </FinProDrawer>
      </div>
    </DrawerProvider>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Edit Columns"` | Title displayed in the drawer header |
| `subtitle` | `string` | `"Use the controls below..."` | Subtitle displayed below the title |
| `icon` | `React.ReactNode` | `<Columns3 />` | Icon displayed in the header |
| `variant` | `"overlay" \| "floating"` | `"overlay"` | Display mode - overlay shows backdrop, floating is elevated |
| `width` | `DrawerWidth` | `1000` | Drawer width - see Width Customization below |
| `children` | `React.ReactNode` | - | Content to display in the drawer |
| `className` | `string` | - | Additional CSS classes for the drawer |

## Architecture

**FinProDrawer** is designed to work with the Equal Design System's drawer components:

- **`DrawerProvider`**: Manages drawer state and side positioning
- **`DrawerTrigger`**: Button to open/close the drawer (place anywhere in your app)
- **`DrawerOverlay`**: Backdrop overlay for overlay variant (optional)
- **`FinProDrawer`**: Pre-styled drawer content with header and body

This modular approach allows you to:
- Control drawer state from anywhere in your application
- Use multiple drawers in the same app
- Customize trigger placement and styling
- Integrate with existing layout structures

## Width Customization

The drawer supports simple and flexible width customization:

### Basic Usage
```tsx
// Numbers (auto-converted to px)
<FinProDrawer width={400} />    // 400px wide
<FinProDrawer width={600} />    // 600px wide

// CSS values
<FinProDrawer width="400px" />    // Explicit pixels
<FinProDrawer width="50vw" />     // 50% of viewport width

// Tailwind classes
<FinProDrawer width="w-64" />     // 16rem (256px)
<FinProDrawer width="w-96" />     // 24rem (384px)
```

### Responsive Widths
```tsx
<FinProDrawer width="w-72 sm:w-80 md:w-96 lg:w-[500px]" />
```

### CSS Custom Properties
```tsx
<FinProDrawer width="var(--drawer-width)" />
```

## Examples

### Basic Drawer
```tsx
<FinProDrawer />
```

### Left-Side Drawer with Custom Width
```tsx
<FinProDrawer
  side="left"
  width={500}
  title="Navigation"
/>
```

### Floating Drawer
```tsx
<FinProDrawer
  variant="floating"
  width="400px"
  title="Quick Actions"
/>
```

### Custom Trigger Styling
```tsx
<FinProDrawer
  triggerClassName="fixed top-4 right-4 z-30 p-3 bg-red-500 text-white rounded-full"
  triggerContent={<Plus className="w-6 h-6" />}
  title="Add New Item"
/>
```

## Styling

Import the component-specific styles for additional customization options:

```tsx
import 'equal-ds-ui/finpro-components/drawer/finpro-drawer-styles.css'
```

Available CSS classes:
- `.finpro-drawer-trigger-custom` - Alternative trigger styling
- `.finpro-drawer-content-compact` - Reduced content padding
- `.finpro-drawer-content-spacious` - Increased content padding
- `.finpro-drawer-header-compact` - Smaller header text
- `.finpro-drawer-header-large` - Larger header text
- `.finpro-drawer-dark` - Dark theme variant
- `.finpro-drawer-slow` - Slower animations
- `.finpro-drawer-fast` - Faster animations

## Accessibility

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus management within the drawer
- High contrast mode support

## Dependencies

- React 16.8+
- equal-ds-ui (Equal Design System)
- lucide-react (for icons)

## Contributing

This component follows the FinPro component export standards. See the main README for contribution guidelines.
