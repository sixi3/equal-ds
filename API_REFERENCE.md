# 📚 Equal DS UI - Complete API Reference

*This document is optimized for AI assistants and developers to quickly understand and use Equal DS UI components.*

## 🎯 Component Index

### Core Components
- [`FinProSidebar`](#finprosidebar) - Advanced sidebar with filtering
- [`SidebarProvider`](#sidebarprovider) - Context provider for sidebar state
- [`Sidebar`](#sidebar) - Basic sidebar container
- [`Dropdown`](#dropdown) - Versatile dropdown component
- [`DatePicker`](#datepicker) - Complete date/time picker

### Utility Components
- [`ChevronIcon`](#chevronicon) - Animated chevron icon
- [`HoverIndicator`](#hoverindicator) - Hover state indicator

### Utility Functions
- [`cn()`](#cn) - Class name utility
- [`useHoverAnimation()`](#usehoveranimation) - Hover animation hook

---

## 🎯 FinProSidebar

**Description:** Advanced sidebar component with built-in filtering, drag & drop, and multi-select functionality.

### Basic Usage

```tsx
import { FinProSidebar, SidebarProvider } from 'equal-ds-ui'

function App() {
  return (
    <SidebarProvider>
      <FinProSidebar
        headerText="My Application"
        defaultSelected="dashboard"
        defaultExpanded={true}
      />
    </SidebarProvider>
  )
}
```

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerText` | `string` | `"/*workasaur 🦖"` | Text displayed in sidebar header |
| `defaultSelected` | `string` | `undefined` | Initially selected menu item ID |
| `defaultExpanded` | `boolean` | `false` | Whether filters start expanded |
| `customItems` | `Record<string, any>` | `undefined` | Override default menu items |
| `customFilters` | `Record<string, any>` | `undefined` | Override default filters |
| `className` | `string` | `undefined` | Additional CSS classes |

### Built-in Features

- ✅ Multi-select dropdowns (Templates, Purpose Codes, Statuses, Aggregators)
- ✅ Date range picker with validation
- ✅ Drag & drop menu item reordering
- ✅ Responsive design with mobile support
- ✅ Keyboard navigation and accessibility
- ✅ Smooth animations and hover effects

---

## 🎨 SidebarProvider

**Description:** React context provider that manages sidebar state across your application.

### Usage

```tsx
<SidebarProvider defaultOpen={true} onOpenChange={setIsOpen}>
  <App />
</SidebarProvider>
```

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultOpen` | `boolean` | `false` | Initial sidebar open state |
| `open` | `boolean` | `undefined` | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | State change callback |

---

## 📂 Sidebar

**Description:** Basic sidebar container with responsive behavior.

### Usage

```tsx
<Sidebar aria-label="Main navigation">
  <SidebarHeader>...</SidebarHeader>
  <SidebarContent>...</SidebarContent>
  <SidebarFooter>...</SidebarFooter>
</Sidebar>
```

### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | CSS classes |
| `aria-label` | `string` | `undefined` | Accessibility label |

### Sub-components

#### SidebarHeader
```tsx
<SidebarHeader className="border-b border-border-default">
  <div className="px-4 py-3">
    <h1 className="font-semibold text-text-primary">My App</h1>
  </div>
</SidebarHeader>
```

#### SidebarContent
```tsx
<SidebarContent reorderableGroups onGroupReorder={handleReorder}>
  {/* Sidebar groups and menu items */}
</SidebarContent>
```

#### SidebarFooter
```tsx
<SidebarFooter>
  <div className="p-4">
    <button className="w-full text-left">Settings</button>
  </div>
</SidebarFooter>
```

---

## 📂 Dropdown Components

### Dropdown (Root)

**Description:** Main dropdown container component.

```tsx
<Dropdown>
  <DropdownTrigger>Select Option</DropdownTrigger>
  <DropdownContent>
    <DropdownItem onClick={handleSelect}>Option 1</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### DropdownTrigger

**Description:** Button that triggers dropdown opening.

```tsx
<DropdownTrigger
  className="w-64"
  chevronIcons={{
    open: <span className="text-green-500">▲</span>,
    closed: <span className="text-red-500">▼</span>
  }}
>
  Select option
</DropdownTrigger>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | CSS classes |
| `disabled` | `boolean` | `false` | Disable interaction |
| `chevronIcons` | `{open: ReactNode, closed: ReactNode}` | `undefined` | Custom chevron icons |

### DropdownContent

**Description:** Container for dropdown items with optional search.

```tsx
<DropdownContent
  enableSearch
  searchPlaceholder="Search items..."
  maxHeight="200px"
>
  <DropdownItem onClick={handleSelect}>Item 1</DropdownItem>
  <DropdownItemMultiselect
    checked={isSelected}
    onCheckedChange={setSelected}
  >
    Multi-select item
  </DropdownItemMultiselect>
</DropdownContent>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableSearch` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `maxHeight` | `string` | `"200px"` | Maximum content height |
| `className` | `string` | `undefined` | Additional CSS classes |

### DropdownItem

**Description:** Single selectable dropdown item.

```tsx
<DropdownItem
  onClick={() => setValue('option1')}
  disabled={false}
>
  Option 1
</DropdownItem>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | `undefined` | Click handler |
| `disabled` | `boolean` | `false` | Disable interaction |

### DropdownItemMultiselect

**Description:** Multi-select dropdown item with checkbox.

```tsx
<DropdownItemMultiselect
  checked={selectedItems.includes('item1')}
  onCheckedChange={(checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, 'item1'])
    } else {
      setSelectedItems(selectedItems.filter(id => id !== 'item1'))
    }
  }}
  isStatusTag={false}
>
  Item 1
</DropdownItemMultiselect>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checkbox state |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | State change handler |
| `disabled` | `boolean` | `false` | Disable interaction |
| `isStatusTag` | `boolean` | `false` | Style as status badge |

### DropdownSeparator

**Description:** Visual separator between dropdown items.

```tsx
<DropdownSeparator className="my-2" />
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | CSS classes |

---

## 📅 Date Picker Components

### DatePicker (Root)

**Description:** Main date picker container with flexible date/time selection.

```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date()}
  maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
>
  <DatePickerTrigger>
    {selectedDate?.toLocaleDateString() || 'Pick a date'}
  </DatePickerTrigger>
  <DatePickerContent />
</DatePicker>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| {start?: Date, end?: Date}` | `undefined` | Selected date or date range |
| `onChange` | `(date: Date \| {start?: Date, end?: Date}) => void` | `undefined` | Date change handler |
| `minDate` | `Date` | `undefined` | Minimum selectable date |
| `maxDate` | `Date` | `undefined` | Maximum selectable date |
| `disabled` | `boolean` | `false` | Disable interaction |

### DatePickerTrigger

**Description:** Button that opens the date picker.

```tsx
<DatePickerTrigger
  className="w-64"
  disabled={false}
  showCalendarIcon={true}
>
  {displayText}
</DatePickerTrigger>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | CSS classes |
| `disabled` | `boolean` | `false` | Disable interaction |
| `showCalendarIcon` | `boolean` | `true` | Show calendar icon |
| `showChevron` | `boolean` | `true` | Show chevron |

### DatePickerContent

**Description:** Calendar popup for date selection.

```tsx
<DatePickerContent
  showTimeSelect={false}
  timeIntervals={15}
  dateFormat="medium"
  showNavigation={true}
/>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showTimeSelect` | `boolean` | `false` | Enable time selection |
| `timeIntervals` | `number` | `30` | Time interval minutes |
| `dateFormat` | `string` | `"medium"` | Date display format |
| `showNavigation` | `boolean` | `true` | Show month navigation |

### DateRangePickerContent

**Description:** Calendar popup for date range selection.

```tsx
<DateRangePickerContent
  enableHoverAnimation={true}
  hoverVariant="default"
/>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableHoverAnimation` | `boolean` | `true` | Enable hover animations |
| `hoverVariant` | `"default" \| "subtle" \| "primary" \| "accent"` | `"default"` | Hover animation style |

### TimePickerContent

**Description:** Time selection popup.

```tsx
<TimePickerContent
  format="24h"
  interval={30}
  startHour={0}
  endHour={23}
  maxHeight="200px"
/>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `format` | `"12h" \| "24h"` | `"24h"` | Time format |
| `interval` | `number` | `30` | Minute intervals |
| `startHour` | `number` | `0` | Start hour (0-23) |
| `endHour` | `number` | `23` | End hour (0-23) |
| `maxHeight` | `string` | `"200px"` | Maximum height |

---

## 🎨 Utility Components

### ChevronIcon

**Description:** Animated chevron icon with rotation states.

```tsx
import { ChevronIcon } from 'equal-ds-ui'

<ChevronIcon
  isOpen={isExpanded}
  size="default"
  opacity={70}
  className="custom-class"
/>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Open/closed state |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Icon size |
| `opacity` | `number` | `70` | Icon opacity (0-100) |
| `className` | `string` | `undefined` | CSS classes |

### HoverIndicator

**Description:** Visual indicator for hover states.

```tsx
import { HoverIndicator } from 'equal-ds-ui'

<HoverIndicator
  indicator={hoverState}
  variant="default"
  zIndex={0}
/>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `indicator` | `{top: number, left: number, width: number, height: number, visible: boolean}` | `undefined` | Indicator position and visibility |
| `variant` | `"default" \| "subtle" \| "primary" \| "accent"` | `"default"` | Visual style |
| `zIndex` | `number` | `0` | CSS z-index |

---

## 🔧 Utility Functions

### cn()

**Description:** Utility for combining and conditionally applying CSS classes.

```typescript
import { cn } from 'equal-ds-ui'

// Basic usage
const className = cn('base-class', 'another-class')

// Conditional classes
const className = cn(
  'button',
  isActive && 'button--active',
  isDisabled && 'button--disabled'
)

// Object syntax
const className = cn('component', {
  'component--active': isActive,
  'component--disabled': isDisabled,
  'component--loading': isLoading
})
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `...inputs` | `ClassValue[]` | CSS classes to combine |

#### Returns

`string` - Combined class name string

### useHoverAnimation()

**Description:** Hook for managing hover animations and interactions.

```typescript
import { useHoverAnimation } from 'equal-ds-ui'

function AnimatedComponent() {
  const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
    itemSelector: '[data-hoverable]',
    duration: 200,
    enabled: true
  })

  return (
    <div ref={setContainerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <HoverIndicator indicator={indicator} />
      <button data-hoverable>Hover me</button>
    </div>
  )
}
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `options.itemSelector` | `string` | `'[data-hoverable]'` | CSS selector for hoverable elements |
| `options.duration` | `number` | `200` | Animation duration in ms |
| `options.enabled` | `boolean` | `true` | Enable/disable animations |

#### Returns

```typescript
{
  indicator: {
    top: number
    left: number
    width: number
    height: number
    visible: boolean
  }
  handleMouseMove: (event: MouseEvent) => void
  handleMouseLeave: () => void
  setContainerRef: (element: HTMLElement | null) => void
}
```

---

## 🎨 Design Tokens

### Color System

```css
/* Background Colors */
--color-background-primary: #ffffff;
--color-background-secondary: #f8fafc;
--color-background-tertiary: #f1f5f9;

/* Text Colors */
--color-text-primary: #0f3340;
--color-text-secondary: #64748b;
--color-text-muted: #94a3b8;

/* Border Colors */
--color-border-default: #e2e8f0;
--color-border-hover: #cbd5e1;
--color-border-focus: #0f3340;

/* Status Colors */
--color-status-success: #10b981;
--color-status-error: #ef4444;
--color-status-warning: #f59e0b;
```

### Typography Scale

```css
/* Font Sizes */
--typography-fontSize-xs: 0.75rem;    /* 12px */
--typography-fontSize-sm: 0.875rem;   /* 14px */
--typography-fontSize-md: 1rem;       /* 16px */
--typography-fontSize-lg: 1.125rem;   /* 18px */
--typography-fontSize-xl: 1.25rem;    /* 20px */

/* Font Weights */
--typography-fontWeight-normal: 400;
--typography-fontWeight-medium: 500;
--typography-fontWeight-semibold: 600;
--typography-fontWeight-bold: 700;

/* Letter Spacing */
--typography-letterSpacing-tight: -0.025em;
--typography-letterSpacing-normal: 0em;
--typography-letterSpacing-wide: 0.025em;
```

### Spacing Scale

```css
--spacing-0: 0;
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-3: 0.75rem;    /* 12px */
--spacing-4: 1rem;       /* 16px */
--spacing-6: 1.5rem;     /* 24px */
--spacing-8: 2rem;       /* 32px */
--spacing-10: 2.5rem;    /* 40px */
--spacing-12: 3rem;      /* 48px */
```

### Border Radius

```css
--border-radius-sm: 0.125rem;    /* 2px */
--border-radius-md: 0.375rem;    /* 6px */
--border-radius-lg: 0.5rem;      /* 8px */
--border-radius-xl: 0.75rem;     /* 12px */
--border-radius-full: 9999px;    /* Fully rounded */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

---

## 🚀 Quick Import Reference

### Most Common Imports

```typescript
// Core components
import { FinProSidebar, SidebarProvider } from 'equal-ds-ui'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from 'equal-ds-ui'
import { DatePicker, DatePickerTrigger, DatePickerContent } from 'equal-ds-ui'

// Sidebar components
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from 'equal-ds-ui'

// Utilities
import { cn, useHoverAnimation, ChevronIcon } from 'equal-ds-ui'

// Styles (required)
import 'equal-ds-ui/tokens.css'
import 'equal-ds-ui/animations.css'
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/equal-ds-ui/dist/**/*.{js,jsx,ts,tsx}', // Required!
  ],
  presets: [require('equal-ds-ui/tailwind-preset')]
}
```

---

## 🐛 Common Issues & Solutions

### Component Not Styled

**Problem:** Components appear unstyled
**Solution:**
```typescript
// Ensure CSS imports are in correct order
import 'equal-ds-ui/tokens.css'      // First
import 'equal-ds-ui/animations.css'  // Second
// Then other CSS imports
```

### Tailwind Classes Not Working

**Problem:** Design system classes not recognized
**Solution:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/equal-ds-ui/dist/**/*.{js,jsx,ts,tsx}', // Add this!
  ],
  presets: [require('equal-ds-ui/tailwind-preset')]
}
```

### TypeScript Errors

**Problem:** TypeScript can't find component types
**Solution:**
```bash
# Install peer dependencies
npm install @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react tailwindcss
```

### Bundle Size Issues

**Problem:** Large bundle size
**Solution:**
```bash
# Use selective format installation
npx equal-ds-format esm    # ESM only (~78KB)
npx equal-ds-format cjs    # CommonJS only (~84KB)
```

---

*This API reference is designed to be comprehensive yet easy to scan. For detailed examples, see the main README.md file.*
