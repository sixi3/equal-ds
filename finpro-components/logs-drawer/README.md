# FinProLogsDrawer

A specialized drawer component designed for viewing system logs and monitoring real-time system activity. Features a fixed 1200px width for optimal log readability and includes built-in styling for different log levels.

## Features

- **Fixed 1200px width** - Optimized for log viewing with guaranteed width using inline styles
- **Log level styling** - Built-in CSS classes for error, warning, info, and debug log levels
- **Scrollable content** - Automatic scrolling for long log streams
- **Dark theme support** - Terminal-style dark theme for debugging
- **Responsive design** - Adapts to smaller screens with mobile optimizations
- **Compact mode** - Space-efficient layout for embedded use

## Installation

```typescript
import { FinProLogsDrawer } from 'equal-ds/finpro-components/logs-drawer'
import { DrawerProvider, DrawerTrigger, DrawerOverlay } from 'equal-ds'
```

## Basic Usage

```tsx
import React from 'react'
import { DrawerProvider, DrawerTrigger, DrawerOverlay } from 'equal-ds'
import { FinProLogsDrawer } from 'equal-ds/finpro-components/logs-drawer'
import { Menu } from 'lucide-react'

const App = () => (
  <DrawerProvider side="right">
    <div className="relative h-screen bg-gray-100">
      {/* Trigger Button */}
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Menu className="w-5 h-5" />
      </DrawerTrigger>

      {/* Main Content */}
      <div className="p-8">
        <h1>System Dashboard</h1>
        <p>Click the menu to view logs</p>
      </div>

      {/* Overlay */}
      <DrawerOverlay />

      {/* Logs Drawer */}
      <FinProLogsDrawer />
    </div>
  </DrawerProvider>
)
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"View Logs"` | Title displayed in the drawer header |
| `subtitle` | `string` | `"Monitor system activity, errors, and performance metrics in real-time"` | Subtitle below the title |
| `icon` | `React.ReactNode` | `<FileText />` | Icon displayed in the header |
| `children` | `React.ReactNode` | `undefined` | Content to render inside the drawer |
| `className` | `string` | `""` | Additional CSS classes |

## Log Content Examples

### Basic Log Display

```tsx
<FinProLogsDrawer title="System Logs">
  <div className="finpro-logs-scrollable finpro-logs-content">
    <div className="finpro-log-entry finpro-log-info">
      <span className="finpro-log-timestamp">2024-01-15 10:30:45</span>
      <span className="finpro-log-message">Server started successfully</span>
    </div>
    <div className="finpro-log-entry finpro-log-error">
      <span className="finpro-log-timestamp">2024-01-15 10:33:22</span>
      <span className="finpro-log-message">Failed to process request</span>
    </div>
  </div>
</FinProLogsDrawer>
```

### Dark Theme

```tsx
<FinProLogsDrawer
  className="finpro-logs-drawer-dark"
  title="Debug Console"
>
  <div className="finpro-logs-scrollable finpro-logs-content p-4">
    <div className="text-green-400">[INFO] Application startup complete</div>
    <div className="text-red-400">[ERROR] Connection timeout</div>
  </div>
</FinProLogsDrawer>
```

### Compact Mode

```tsx
<FinProLogsDrawer
  className="finpro-logs-drawer-compact"
  title="Mobile Logs"
>
  <div className="finpro-logs-scrollable finpro-logs-content">
    {/* Compact log entries */}
  </div>
</FinProLogsDrawer>
```

## CSS Classes

### Log Entry Styling

- `.finpro-logs-content` - Monospace font for log readability
- `.finpro-log-entry` - Base styling for log entries
- `.finpro-log-error` - Error level styling (red)
- `.finpro-log-warn` - Warning level styling (yellow)
- `.finpro-log-info` - Info level styling (blue)
- `.finpro-log-debug` - Debug level styling (gray)
- `.finpro-log-timestamp` - Timestamp styling
- `.finpro-log-message` - Message content styling

### Layout Classes

- `.finpro-logs-scrollable` - Scrollable container for long logs
- `.finpro-logs-drawer-dark` - Dark theme for terminal-style viewing
- `.finpro-logs-drawer-compact` - Compact layout for smaller screens

## Configuration

The component uses configuration from `finpro-logs-drawer-config.ts`:

```typescript
export const FINPRO_LOGS_DRAWER_CONFIG = {
  fixedWidth: 1200, // Fixed width for logs viewing
  // ... other config
}
```

## Examples

See `FinProLogsDrawerExamples.tsx` for complete usage examples including:

- Basic logs drawer
- Logs with sample content
- Dark theme terminal style
- Compact mobile layout

## Dependencies

- `equal-ds` - Core drawer components
- `lucide-react` - Icons (FileText icon)

## Notes

- The drawer has a fixed width of 1200px for optimal log viewing
- Always wrap with `DrawerProvider` and include `DrawerOverlay` for proper functionality
- Use the provided CSS classes for consistent log styling across your application
