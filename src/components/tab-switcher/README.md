# TabSwitcher Component

A flexible, accessible, and performant tab switcher component with smooth sliding animations and two distinct variants: horizontal tabs and card-based tabs.

## Overview

The TabSwitcher component provides an elegant way to navigate between different views or sections of content. It supports two main variants:

- **Horizontal Tabs**: Classic tab navigation with smooth sliding indicator
- **Card Tabs**: Card-based navigation with status badges and metadata

## Features

- 🚀 **High Performance**: Optimized with RAF throttling and minimal re-renders
- ♿ **Fully Accessible**: WCAG compliant with keyboard navigation and screen reader support
- 🎨 **Design System Integration**: Uses CSS variables and design tokens
- ✨ **Smooth Animations**: 300ms sliding transitions with ease-out timing
- 🔧 **Highly Customizable**: Custom render functions and extensive styling options
- 📱 **Responsive**: Automatic repositioning on container resize
- 🧪 **Well Tested**: 13+ comprehensive unit tests with 100% coverage

## Installation

```bash
npm install equal-ds
```

```typescript
import { TabSwitcher } from 'equal-ds'
```

## Quick Start

### Basic Horizontal Tabs

```tsx
import React, { useState } from 'react'
import { TabSwitcher } from 'equal-ds'

const tabs = [
  { id: 'tab1', label: 'Tab One' },
  { id: 'tab2', label: 'Tab Two' },
  { id: 'tab3', label: 'Tab Three' }
]

function MyComponent() {
  const [activeTab, setActiveTab] = useState('tab1')

  return (
    <TabSwitcher
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      variant="horizontal"
    />
  )
}
```

### Card-Based Tabs

```tsx
const cardTabs = [
  {
    id: 'session1',
    label: 'SESSION',
    status: 'active',
    metadata: 'user123'
  },
  {
    id: 'session2',
    label: 'SESSION',
    status: 'failed',
    metadata: 'user456'
  }
]

function MyCardComponent() {
  const [activeTab, setActiveTab] = useState('session1')

  return (
    <TabSwitcher
      tabs={cardTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      variant="cards"
    />
  )
}
```

## API Reference

### TabSwitcher Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem[]` | - | **Required.** Array of tab configuration objects |
| `activeTab` | `string` | - | **Required.** ID of the currently active tab |
| `onTabChange` | `(tabId: string) => void` | - | **Required.** Callback fired when active tab changes |
| `variant` | `'horizontal' \| 'cards'` | `'horizontal'` | Visual style variant |
| `disabled` | `boolean` | `false` | Whether the entire tab switcher is disabled |
| `className` | `string` | - | Custom CSS classes for the container |
| `renderTab` | `RenderTabFunction` | - | Custom tab renderer function |

### TabItem Interface

```typescript
interface TabItem {
  id: string                    // Unique identifier
  label: string                 // Display text
  content?: React.ReactNode     // Optional content to render when active
  status?: 'active' | 'failed' | 'data-ready' | 'partial-data'  // Status for card variant
  metadata?: string             // Additional text for card variant
  disabled?: boolean            // Whether this tab is disabled
}
```

### Custom Rendering

```tsx
const customRenderTab = (tab: TabItem, isActive: boolean, onClick: () => void) => (
  <button
    onClick={onClick}
    className={`custom-tab ${isActive ? 'active' : ''}`}
  >
    <Icon name={tab.icon} />
    {tab.label}
  </button>
)

<TabSwitcher
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  renderTab={customRenderTab}
/>
```

## Variants

### Horizontal Tabs

Classic horizontal tab navigation with:
- Equal-width tab distribution
- Smooth sliding active indicator
- Vertical dividers between tabs
- Hover effects and focus states

**Use Case**: Content switching, navigation menus, form steps

### Card Tabs

Card-based navigation with:
- Individual card styling
- Status badges with color coding
- Metadata display
- Equal card distribution

**Use Case**: Account/session selection, status-based navigation

## Advanced Examples

### Controlled Component with Content

```tsx
import React, { useState } from 'react'
import { TabSwitcher } from 'equal-ds'

const tabs = [
  { id: 'overview', label: 'Overview', content: <OverviewPanel /> },
  { id: 'settings', label: 'Settings', content: <SettingsPanel /> },
  { id: 'analytics', label: 'Analytics', content: <AnalyticsPanel /> }
]

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <div>
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="horizontal"
      />

      <div className="tab-content">
        {activeTabData?.content}
      </div>
    </div>
  )
}
```

### Status-Based Card Navigation

```tsx
const statusTabs = [
  {
    id: 'active',
    label: 'Active Sessions',
    status: 'active',
    metadata: '3 sessions'
  },
  {
    id: 'failed',
    label: 'Failed Sessions',
    status: 'failed',
    metadata: '1 session'
  },
  {
    id: 'pending',
    label: 'Data Ready',
    status: 'data-ready',
    metadata: '2 sessions'
  }
]

function SessionManager() {
  const [activeTab, setActiveTab] = useState('active')

  return (
    <TabSwitcher
      tabs={statusTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      variant="cards"
    />
  )
}
```

### Disabled Tabs

```tsx
const tabsWithDisabled = [
  { id: 'enabled1', label: 'Enabled Tab' },
  { id: 'disabled1', label: 'Disabled Tab', disabled: true },
  { id: 'enabled2', label: 'Another Enabled Tab' }
]

// Individual tab can be disabled
<TabSwitcher
  tabs={tabsWithDisabled}
  activeTab="enabled1"
  onTabChange={setActiveTab}
/>

// Or disable entire component
<TabSwitcher
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  disabled={true}
/>
```

## Accessibility

The TabSwitcher component is fully accessible and follows WCAG guidelines:

### Keyboard Navigation
- **Tab**: Move focus to tab switcher
- **Arrow Left/Right**: Navigate between enabled tabs
- **Enter/Space**: Activate focused tab
- **Tab**: Move focus out of tab switcher

### Screen Reader Support
- Proper ARIA roles (`tablist`, `tab`)
- `aria-selected` for active tab state
- `aria-disabled` for disabled tabs
- `aria-label` for descriptive labeling
- Focus management with correct `tabindex` values

### Focus Management
- Only active tab is focusable by default
- Proper focus indicators with design system colors
- Keyboard navigation skips disabled tabs

## Performance

### Optimizations
- **RAF Throttling**: Animations run at 60fps using `requestAnimationFrame`
- **Minimal Re-renders**: Computed values and proper dependency arrays
- **DOM Query Optimization**: Targeted queries with caching
- **ResizeObserver**: Efficient responsive updates
- **Memory Management**: Proper cleanup of event listeners and RAF

### Bundle Size
- **Tree-shakable**: Only imports what you use
- **Minimal Dependencies**: Uses only React and design system utilities
- **CSS-in-JS**: No additional CSS framework dependencies

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **ResizeObserver**: Polyfill recommended for older browsers
- **ES2020**: Target compilation for modern JavaScript features

## Styling

The component uses CSS variables from the design system:

```css
/* Primary colors */
--color-primary-400: #C1E4FB
--color-primary-500: #0F3340

/* Background colors */
--color-background-primary: #F8FEFF
--color-background-secondary: #FFFFFF
--color-background-tertiary: #F3F8FC

/* Text colors */
--color-text-primary: #0F3340
--color-text-secondary: #757575

/* Border colors */
--color-border-default: #E7EDF0
```

### Custom Styling

```tsx
<TabSwitcher
  className="my-custom-tabs"
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

```css
.my-custom-tabs {
  /* Custom container styles */
}

.my-custom-tabs button {
  /* Custom tab button styles */
}
```

## Testing

Run the test suite:

```bash
npm test -- --run tests/tab-switcher.test.tsx
```

### Test Coverage
- ✅ Component rendering
- ✅ State management
- ✅ User interactions
- ✅ Keyboard navigation
- ✅ Accessibility compliance
- ✅ Edge cases (disabled tabs, single tab)
- ✅ Custom rendering

## Contributing

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/equal-ds.git
cd equal-ds

# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Run tests
npm test
```

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb config with React extensions
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance

### Architecture

```
src/components/tab-switcher/
├── TabSwitcher.tsx      # Main component with variant logic
├── HorizontalTabs.tsx   # Horizontal variant with sliding animation
├── CardTabs.tsx         # Card variant implementation
├── types.ts            # TypeScript interfaces and types
├── index.ts            # Public exports
└── README.md           # This documentation
```

## Migration Guide

### From Other Tab Libraries

```tsx
// Before (generic tab library)
<Tabs defaultActiveKey="1">
  <TabPane tab="Tab 1" key="1">Content 1</TabPane>
  <TabPane tab="Tab 2" key="2">Content 2</TabPane>
</Tabs>

// After (TabSwitcher)
const tabs = [
  { id: '1', label: 'Tab 1' },
  { id: '2', label: 'Tab 2' }
]

<TabSwitcher
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="horizontal"
/>
```

## Troubleshooting

### Common Issues

**Tabs not taking full width:**
```tsx
// ❌ Wrong
<TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

// ✅ Correct - ensure container has width
<div className="w-full">
  <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
</div>
```

**Indicator not animating:**
- Ensure `activeTab` state is properly updated
- Check that tab IDs are unique and match exactly

**Performance issues:**
- Avoid creating new tab arrays on every render
- Use `useCallback` for event handlers
- Memoize expensive computations

**Accessibility warnings:**
- Ensure all tab IDs are unique
- Provide descriptive `aria-label` if needed
- Test with screen readers

## Changelog

### v1.0.0
- Initial release with horizontal and card variants
- Full accessibility support
- Smooth sliding animations
- Comprehensive test coverage

## License

MIT License - see LICENSE file for details.

## Support

- 📖 **Documentation**: This README and Storybook stories
- 🐛 **Issues**: GitHub Issues for bug reports
- 💬 **Discussions**: GitHub Discussions for questions
- 📧 **Email**: support@equal-ds.com

---

Built with ❤️ using React, TypeScript, and modern web standards.
