# Timeline Component

A comprehensive timeline component for displaying chronological events with status indicators, actions, and detailed tooltips. Perfect for financial data flows, transaction tracking, and activity feeds.

## 🎯 **Features**

- **Dynamic Spacing**: Automatically distributes timeline items to fill available container height
- **Status Indicators**: 6 status types with appropriate icons and colors (success, warning, error, info, pending, neutral)
- **Copy Actions**: Built-in copy-to-clipboard functionality for transaction IDs
- **Rich Tooltips**: Detailed information displays using Radix UI tooltips
- **Status Badges**: Optional status labels (like "PENDING") with colored backgrounds
- **Flexible Layout**: Adapts to any container size and shape
- **Accessible**: Full keyboard navigation and ARIA support

## 📖 **Basic Usage**

```tsx
import { Timeline } from 'equal-ds-ui'

const items = [
  {
    id: '1',
    timestamp: new Date(),
    status: { type: 'success' },
    title: 'Data request sent',
    description: 'Request forwarded to Account Aggregator',
    action: {
      type: 'copy',
      label: 'Txn ID: 53242143z...',
      value: '53242143z122133123x1'
    },
    tooltip: {
      title: 'Request Details',
      content: 'Additional information about this request',
      details: {
        'Request ID': 'REQ-2024-001',
        'Status': 'In Progress'
      }
    }
  }
]

function MyComponent() {
  return (
    <div className="h-96 w-full">
      <Timeline items={items} />
    </div>
  )
}
```

## 🎨 **Component API**

### Timeline Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TimelineItemType[]` | - | Array of timeline items to display |
| `variant` | `'default' \| 'compact'` | `'default'` | Visual variant |
| `showConnectors` | `boolean` | `true` | Whether to show connector lines |
| `connectorGap` | `number` | `4` | Gap in pixels before/after connectors relative to status icons |
| `className` | `string` | - | Additional CSS classes |

### TimelineItem Structure

```typescript
interface TimelineItem {
  id: string                    // Unique identifier
  timestamp: string | Date      // Event timestamp
  status: TimelineStatus        // Status configuration
  title: string                 // Event title
  description?: string          // Optional description
  action?: TimelineAction       // Optional copy action
  tooltip?: TimelineTooltip     // Optional tooltip content
}
```

### Status Types

- `success` - Green filled checkmark icon (CheckCircle2)
- `warning` - Yellow alert triangle icon
- `error` - Red filled alert circle icon
- `info` - Blue info icon
- `pending` - Blue clock icon
- `neutral` - Gray filled circle icon

## 🔧 **Advanced Usage**

### With Status Badges

```tsx
const items = [
  {
    id: 'pending',
    timestamp: new Date(),
    status: { type: 'pending', label: 'PENDING' },
    title: 'Transaction processing',
    description: 'Waiting for confirmation'
  }
]
```

### With Rich Tooltips

```tsx
const items = [
  {
    id: 'detailed',
    timestamp: new Date(),
    status: { type: 'success' },
    title: 'Data processed',
    tooltip: {
      title: 'Processing Complete',
      content: 'All data has been successfully processed and validated.',
      details: {
        'Records Processed': '1,250',
        'Processing Time': '2.3 seconds',
        'Validation': 'Passed'
      }
    }
  }
]
```

### Compact Variant

```tsx
<Timeline items={items} variant="compact" />
```

### Without Connectors

```tsx
<Timeline items={items} showConnectors={false} />
```

## 🎨 **Styling & Theming**

The timeline component uses your design system's CSS custom properties:

- **Colors**: `--color-success-100`, `--color-warning-100`, etc.
- **Typography**: System font stack with proper line heights
- **Spacing**: Consistent gap spacing using design tokens
- **Layout**: Flexbox-based responsive layout

## 📱 **Responsive Design**

The timeline automatically adapts to container size:

- **Full Height**: Takes 100% of parent container height
- **Dynamic Spacing**: Items distribute evenly across available space
- **Flexible Width**: Adapts to container width with proper text wrapping
- **Mobile Friendly**: Touch-friendly interactions and readable text

## ⚡ **Performance**

- **Direct DOM Manipulation**: Connector positioning uses direct DOM style updates instead of React state
- **Throttled Resize Handling**: ResizeObserver events are throttled using `requestAnimationFrame`
- **Defensive Error Handling**: Graceful fallbacks when DOM measurements fail
- **Minimal Re-renders**: Optimized to avoid unnecessary React reconciliation
- **Memory Efficient**: No large state objects for positioning data

## ♿ **Accessibility**

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators
- **Color Contrast**: Meets WCAG guidelines
- **Tooltip Accessibility**: Radix UI provides proper ARIA attributes

## 🚀 **Bundle Size**

- **Lightweight**: Minimal bundle impact with tree-shaking support
- **Fast Tooltips**: Radix UI tooltip with hardware acceleration
- **No External Dependencies**: Uses only existing design system components

## 📋 **Available Exports**

### Components
- `Timeline` - Main timeline container
- `TimelineItem` - Individual timeline item
- `TimelineEventInfo` - Event information display
- `TimelineAction` - Action buttons (copy, etc.)
- `TimelineConnector` - Visual connectors
- `TimelineTooltip` - Tooltip component

### Types
- `TimelineProps` - Main component props
- `TimelineItemType` - Timeline item structure
- `TimelineStatus` - Status configuration
- `TimelineActionType` - Action configuration

## 🔍 **Storybook Examples**

See `stories/Timeline.stories.tsx` for comprehensive examples including:

- Basic timeline with all status types
- Timelines with copy actions
- Rich tooltips with detailed information
- Status badges and labels
- Error states and warnings
- Compact variants
- Full featured examples

## 🎯 **Use Cases**

- **Financial Data Flows**: Track FIU → AA → FIU data exchanges
- **Transaction Monitoring**: Display payment processing steps
- **Activity Feeds**: Show user actions and system events
- **Status Tracking**: Monitor approval workflows and processes
- **Audit Trails**: Display chronological event logs

## 🚀 **Quick Start**

1. Import the component: `import { Timeline } from 'equal-ds-ui'`
2. Create timeline items with proper structure
3. Wrap in a container with defined height
4. Add optional actions and tooltips as needed

The timeline component integrates seamlessly with your existing design system and provides a flexible, accessible way to display chronological information.
