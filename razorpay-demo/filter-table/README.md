# FilterTable Component

A comprehensive filter table component with multiple multiselect dropdowns and a date range picker. This component is extracted from the MultiselectFilter story and provides a reusable solution for filtering data tables.

## Features

- **Multiple Filter Dropdowns**: Includes four multiselect dropdowns (Template, Purpose Code, Status, Aggregator) and a date range picker
- **Expandable/Collapsible**: Click the header to expand or collapse the filter panel
- **Customizable Options**: Provide your own filter options or use defaults
- **Hover Effects**: Smooth hover animations on all dropdown triggers
- **Status Tags**: Special rendering for consent status with color-coded tags
- **Callbacks**: Get notified when any filter selection changes
- **Flexible Styling**: Customize colors, spacing, typography, and more

## Installation

The component is part of the `razorpay-demo` package. Import it using:

```typescript
import { FilterTable } from './razorpay-demo/filter-table/FilterTable'
```

## Basic Usage

```tsx
import { FilterTable } from './razorpay-demo/filter-table/FilterTable'

function MyComponent() {
  return (
    <FilterTable />
  )
}
```

## Props

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes for the container |
| `title` | `string` | `'Filter Table'` | Title displayed in the header |
| `defaultExpanded` | `boolean` | `false` | Whether the filter panel is expanded by default |

### Filter Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `templateOptions` | `FilterOption[]` | `DEFAULT_TEMPLATE_OPTIONS` | Options for the template dropdown |
| `purposeCodeOptions` | `FilterOption[]` | `DEFAULT_PURPOSE_CODE_OPTIONS` | Options for the purpose code dropdown |
| `statusOptions` | `FilterOption[]` | `DEFAULT_STATUS_OPTIONS` | Options for the status dropdown |
| `aggregatorOptions` | `FilterOption[]` | `DEFAULT_AGGREGATOR_OPTIONS` | Options for the aggregator dropdown |

### Initial Selections

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialSelectedTemplates` | `string[]` | All options selected | Initial template selections |
| `initialSelectedPurposeCodes` | `string[]` | All options selected | Initial purpose code selections |
| `initialSelectedStatuses` | `string[]` | All options selected | Initial status selections |
| `initialSelectedAggregators` | `string[]` | All options selected | Initial aggregator selections |
| `initialSelectedDateRange` | `DateRangeValue` | Smart defaults | Initial date range selection |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onTemplateChange` | `(selected: string[]) => void` | Called when template selection changes |
| `onPurposeCodeChange` | `(selected: string[]) => void` | Called when purpose code selection changes |
| `onStatusChange` | `(selected: string[]) => void` | Called when status selection changes |
| `onAggregatorChange` | `(selected: string[]) => void` | Called when aggregator selection changes |
| `onDateRangeChange` | `(range: DateRangeValue) => void` | Called when date range changes |
| `onExpandedChange` | `(expanded: boolean) => void` | Called when expansion state changes |

### Layout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerGap` | `string` | `'mb-4'` | Gap between header and dropdowns |
| `dropdownGap` | `string` | `'gap-4'` | Gap between dropdown components |

### Style Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | `'--color-background-secondary'` | Background color CSS variable |
| `textColor` | `string` | `'--color-text-primary'` | Text color CSS variable |
| `borderColor` | `string` | `'--color-border-default'` | Border color CSS variable |
| `hoverBackgroundColor` | `string` | `'--color-background-primary'` | Hover background color CSS variable |
| `hoverTextColor` | `string` | `'--color-text-primary'` | Hover text color CSS variable |
| `hoverBorderColor` | `string` | `'--color-border-hover'` | Hover border color CSS variable |
| `fontSize` | `string` | `'--typography-fontSize-sm'` | Font size CSS variable |
| `fontWeight` | `string` | `'--typography-fontWeight-medium'` | Font weight CSS variable |
| `letterSpacing` | `string` | `'0.05em'` | Letter spacing value |
| `padding` | `string` | `'--spacing-2'` | Padding CSS variable |
| `borderRadius` | `string` | `'--border-radius-lg'` | Border radius CSS variable |
| `borderWidth` | `string` | `'1px'` | Border width |
| `borderStyle` | `string` | `'solid'` | Border style |
| `borderBottomWidth` | `string` | `'2px'` | Bottom border width |
| `hoverBorderBottomWidth` | `string` | `'3px'` | Hover bottom border width |
| `boxShadow` | `string` | `'--core-shadows-sm'` | Box shadow CSS variable |
| `hoverBoxShadow` | `string` | `'--shadow-md'` | Hover box shadow CSS variable |

### Label Typography Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `labelFontSize` | `string` | `'--typography-fontSize-xs'` | Label font size CSS variable |
| `labelFontWeight` | `string` | `'--typography-fontWeight-medium'` | Label font weight CSS variable |
| `labelLetterSpacing` | `string` | `'0.05em'` | Label letter spacing value |
| `labelTextColor` | `string` | `'--color-text-secondary'` | Label text color CSS variable |
| `showLabel` | `boolean` | `true` | Whether to show labels above dropdowns |

## Examples

### Basic Usage

```tsx
<FilterTable />
```

### With Callbacks

```tsx
<FilterTable
  onTemplateChange={(selected) => console.log('Templates:', selected)}
  onPurposeCodeChange={(selected) => console.log('Purpose codes:', selected)}
  onStatusChange={(selected) => console.log('Statuses:', selected)}
  onAggregatorChange={(selected) => console.log('Aggregators:', selected)}
  onDateRangeChange={(range) => console.log('Date range:', range)}
/>
```

### Custom Options

```tsx
const customTemplates = [
  { value: 't1', label: 'Template 1' },
  { value: 't2', label: 'Template 2' },
]

<FilterTable
  templateOptions={customTemplates}
  initialSelectedTemplates={['t1']}
/>
```

### Pre-selected Filters

```tsx
<FilterTable
  initialSelectedTemplates={['template-1', 'template-2']}
  initialSelectedPurposeCodes={['purpose-101']}
  initialSelectedStatuses={['active']}
  initialSelectedAggregators={['agg-1']}
/>
```

### Expanded by Default

```tsx
<FilterTable
  defaultExpanded={true}
/>
```

### Custom Styling

```tsx
<FilterTable
  backgroundColor="--color-background-primary"
  hoverBackgroundColor="--color-background-tertiary"
  borderColor="--color-border-focus"
  borderRadius="--border-radius-xl"
  dropdownGap="gap-8"
/>
```

### Controlled Expansion

```tsx
const [isExpanded, setIsExpanded] = useState(false)

<FilterTable
  defaultExpanded={isExpanded}
  onExpandedChange={setIsExpanded}
/>
```

## FilterOption Interface

```typescript
interface FilterOption {
  value: string
  label: string
}
```

## DateRangeValue Interface

The `DateRangeValue` type is imported from the design system:

```typescript
import { DateRangeValue } from '../../../src'
```

## Dependencies

This component requires the following from the design system:

- `Dropdown`, `DropdownTrigger`, `DropdownContentMultiselect`
- `DatePicker`
- `ChevronIcon`
- `getConsentStatusTag`
- `getSmartDefaults`

## Styling

The component uses CSS variables from the design system. Make sure your application includes the design system's CSS files:

```css
@import 'equal-ds-ui/dist/index.css';
```

Custom styles can be applied using the provided style props or by overriding CSS variables.

## Notes

- All filter dropdowns initialize with all options selected by default
- The date range picker uses smart defaults (current time rounded to last 30 minutes)
- Status dropdown displays a color-coded tag when a single status is selected
- The component is fully responsive with a grid layout that adapts to screen size
- Hover effects are applied to all dropdown triggers for better UX

## See Also

- `FilterTableExamples.tsx` - More usage examples
- `filter-table-config.ts` - Default configurations
- `filter-table-utils.ts` - Utility functions

