# FinPro Sidebar Component

A comprehensive sidebar component with advanced filtering capabilities, built using the Equal Design System components.

## Features

- **Reorderable Groups & Items**: Drag and drop to reorder sidebar groups and menu items
- **Advanced Filtering**: Multiple filter dropdowns with search, multiselect, and date range picker
- **Hover Animations**: Smooth hover effects with CSS variable-based styling
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Status Badges**: Visual status indicators for consent statuses
- **Collapsible Filters**: Expandable/collapsible filter section

## Installation

The FinProSidebar component is included in the `eq-ds-ui` package. Install it using:

```bash
npm install eq-ds-ui
```

## Basic Usage

```tsx
import { FinProSidebar } from 'eq-ds-ui'

function App() {
  return (
    <div className="h-screen">
      <FinProSidebar />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes for the container |
| `headerText` | `string` | `'/*workasaur 🦖'` | Text to display in the sidebar header |
| `defaultSelected` | `string` | `'consent-templates'` | Default selected menu item ID |
| `defaultExpanded` | `boolean` | `false` | Whether filters should be expanded by default |

## Advanced Usage

### Custom Configuration

```tsx
import { FinProSidebar } from 'eq-ds-ui'

function CustomSidebar() {
  return (
    <div className="h-screen">
      <FinProSidebar
        headerText="My Custom App"
        defaultSelected="account-aggregator"
        defaultExpanded={true}
        className="shadow-xl"
      />
    </div>
  )
}
```

### With Custom Styling

```tsx
import { FinProSidebar } from 'eq-ds-ui'
import './custom-sidebar-styles.css'

function StyledSidebar() {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <FinProSidebar
        headerText="Analytics Dashboard"
        className="border-r-2 border-blue-200"
      />
    </div>
  )
}
```

## Filter Types

The sidebar includes several filter types:

### 1. Multiselect Dropdowns
- **Consent Template**: Select multiple consent templates
- **Purpose Code**: Filter by purpose codes
- **Account Aggregator**: Choose account aggregators
- **Consent Status**: Filter by status with visual badges

### 2. Date Range Picker
- **Consent Created On**: Select date ranges for filtering

### 3. Search Functionality
All multiselect dropdowns include search functionality for easy filtering of options.

## Menu Structure

The sidebar organizes items into the following groups:

- **AA ECOSYSTEM**: Account Aggregator, FIP, Purpose, Consent Templates, etc.
- **BULK OPERATIONS**: Bulk consent operations, data fetching, etc.
- **ANALYTICS**: Insights, analytics, and reporting
- **ADMIN & SETUP**: Settings, app management, admin functions
- **REFERENCE & DOCS**: Documentation and reference materials

## Customization

### CSS Variables

The component uses CSS variables for consistent theming. You can override these in your CSS:

```css
:root {
  --color-background-primary: #ffffff;
  --color-background-secondary: #f9fafb;
  --color-background-tertiary: #f3f4f6;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-border-default: #d1d5db;
  --color-border-hover: #9ca3af;
  --typography-fontSize-sm: 0.875rem;
  --typography-fontWeight-medium: 500;
  --spacing-2: 0.5rem;
  --border-radius-lg: 0.5rem;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Custom Icons

You can customize the icons by modifying the `SIDEBAR_ITEMS` configuration in `finpro-sidebar-config.ts`.

## Examples

See `FinProSidebarExamples.tsx` for comprehensive usage examples including:

- Basic usage
- Custom header and selection
- Expanded filters by default
- Custom styling
- Responsive design
- Hover animations

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- Focus management for dropdowns
- ARIA labels and descriptions
- High contrast support

## Performance

- Optimized re-renders with React.useMemo
- Debounced search inputs
- Efficient state management
- CSS-in-JS for dynamic styling

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Dependencies

- React 16.8+
- eq-ds-ui components (sidebar, dropdown, datepicker)
- Lucide React icons
- Tailwind CSS for styling

## Contributing

When contributing to this component:

1. Follow the existing code structure
2. Add TypeScript types for new props
3. Include accessibility considerations
4. Test on multiple screen sizes
5. Update examples and documentation

## License

This component is part of the Equal Design System and follows the same license terms.
