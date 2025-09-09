# 🎨 Equal DS UI

[![npm version](https://badge.fury.io/js/equal-ds-ui.svg)](https://badge.fury.io/js/equal-ds-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Production-ready React components** for the Equal Design System. Built with TypeScript, featuring comprehensive design tokens, and optimized for modern React applications.

## 🚀 Quick Start

```bash
npm install equal-ds-ui
npm install @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react tailwindcss
```

### Basic Usage

```tsx
import { FinProSidebar, SidebarProvider } from 'equal-ds-ui'
import 'equal-ds-ui/tokens.css'
import 'equal-ds-ui/animations.css'

function App() {
  return (
    <SidebarProvider>
      <FinProSidebar headerText="My App" />
    </SidebarProvider>
  )
}
```

## 📦 What's Included

### 🎯 Core Components

| Component | Description | Key Features |
|-----------|-------------|--------------|
| `FinProSidebar` | Advanced sidebar with filtering | Multi-select dropdowns, drag & drop, animations |
| `Sidebar` | Basic sidebar container | Responsive, accessible, customizable |
| `Dropdown` | Versatile dropdown menu | Single/multi-select, search, custom triggers |
| `DatePicker` | Date selection component | Calendar, time picker, range selection |

### 🎨 Design System

| Feature | Description |
|---------|-------------|
| **Design Tokens** | Comprehensive CSS variables for colors, typography, spacing |
| **Tailwind Preset** | Pre-configured Tailwind configuration |
| **Animations** | Smooth transitions and micro-interactions |
| **Accessibility** | Full ARIA support, keyboard navigation, screen readers |

### 🔧 Utilities

| Utility | Purpose | Example |
|---------|---------|---------|
| `cn` | Class name utility | `cn('base-class', conditional && 'active')` |
| `useHoverAnimation` | Hover state management | `useHoverAnimation({ duration: 200 })` |
| `ChevronIcon` | Animated chevron component | `<ChevronIcon isOpen={isOpen} />` |

## ✨ What's New in v1.3.0

- 📅 **Complete Date Picker Suite**: New date picker, time picker, and date range picker components
- 🎯 **Accessible Date Selection**: Full keyboard navigation and screen reader support
- ⏰ **Time Picker Integration**: Combined date and time selection capabilities
- 📊 **Date Range Selection**: Visual date range picker with start/end date selection
- 🎨 **Design System Integration**: Seamless integration with Equal DS UI design tokens
- 📱 **Mobile Responsive**: Touch-friendly date picker interfaces for all devices

## 📦 Installation

```bash
npm install equal-ds-ui

# Required peer dependencies
npm install @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react tailwindcss

# Development dependencies (for custom setup)
npm install -D tailwindcss postcss autoprefixer
```


## 🎯 Selective Format Installation

**Choose your preferred module format** for optimal bundle sizes and compatibility. This package supports both ESM and CommonJS with automatic format detection.

### Quick Format Selection

```bash
# Install the package
npm install equal-ds-ui

# Choose your format (choose one):
npx equal-ds-format esm    # ESM format (~34KB) - Modern bundlers
npx equal-ds-format cjs    # CommonJS format (~36KB) - Legacy bundlers
npx equal-ds-format auto   # Auto-detect based on your project
```

### 📊 Format Comparison

| Format | Bundle Size | Best For | Command |
|--------|-------------|----------|---------|
| **ESM Only** | ~34KB | Vite, Next.js, esbuild | `npx equal-ds-format esm` |
| **CommonJS Only** | ~36KB | Webpack, CRA, legacy | `npx equal-ds-format cjs` |
| **Auto-Detect** | Optimized | Any project | `npx equal-ds-format auto` |
| **Both Formats** | ~70KB | Maximum compatibility | Default |

### 🔧 For Package Publishers

```bash
# Build format-specific versions
npm run build:esm          # ESM-only build
npm run build:cjs          # CommonJS-only build
npm run build              # Both formats (default)

# Publish selective versions
npm run prepublishOnly:esm # Publish ESM-only
npm run prepublishOnly:cjs # Publish CommonJS-only
npm run prepublishOnly     # Publish both formats
```

> **💡 Pro Tip:** The CLI automatically detects your project's bundler (Vite, Webpack, Next.js, etc.) and recommends the optimal format!

## 🚨 Migration Notice (v1.2.0)

**Dropdown components now include automatic rotating chevrons by default.** If you're upgrading from v1.1.1 or earlier:

- ✅ **Simple migration**: Just remove manual chevron state management
- 📖 **Full guide**: See [Dropdown Migration Guide](./docs/DROPDOWN-MIGRATION-GUIDE.md)
- 🎯 **Breaking change**: Default behavior now includes rotating chevrons

```tsx
// Before (v1.1.1)
<Dropdown onOpenChange={setIsOpen}>
  <DropdownTrigger>
    Select Option
    {isOpen ? <ChevronUp /> : <ChevronDown />}
  </DropdownTrigger>
</Dropdown>

// After (v1.2.0) - Automatic!
<Dropdown>
  <DropdownTrigger>
    Select Option
  </DropdownTrigger>
</Dropdown>
```

## ⚙️ Quick Setup

Get started with Equal DS UI in just 3 simple steps:

### 1. Initialize Tailwind CSS
```bash
npx tailwindcss init -p  # Creates tailwind.config.js and postcss.config.js
```

### 2. Configure with our Design System
```javascript
// tailwind.config.js
import preset from 'equal-ds-ui/tailwind-preset'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/equal-ds-ui/dist/**/*.{js,jsx,ts,tsx}', // Important!
  ],
  presets: [preset], // Our complete design system
}
```

### 3. Import Design System Styles
```css
/* src/index.css */

/* Import Equal DS UI design system FIRST */
@import 'equal-ds-ui/tokens.css';
@import 'equal-ds-ui/animations.css';

/* Then Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🚀 Quick Start

Here's a complete example to get you started:

```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupTrigger,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  // New in v1.2.0: Automatic rotating chevrons!
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  // New in v1.3.0: Complete date picker suite!
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
  TimePickerContent,
  DateRangePickerContent,
} from 'equal-ds-ui'

export default function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background-secondary">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader className="border-b border-border-default">
            <div className="px-4 py-3">
              <h1 className="font-semibold text-text-primary">My App</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup defaultOpen>
              <SidebarGroupTrigger>
                <SidebarGroupLabel>Menu</SidebarGroupLabel>
              </SidebarGroupTrigger>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton itemId="home">Home</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton itemId="settings">Settings</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4">☰ Toggle Sidebar</SidebarTrigger>
          <h1 className="text-2xl font-bold text-text-primary">Welcome to Equal DS UI!</h1>
          <p className="text-text-secondary mt-2">Your sidebar is ready to use.</p>
        </main>
      </div>
    </SidebarProvider>
  )
}
```

### Dropdown with Automatic Rotating Chevrons ✨

```tsx
import { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator, DropdownItemMultiselect } from 'equal-ds-ui'

export default function DropdownExamples() {
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  return (
    <div className="p-6 space-y-6">
      {/* Basic Dropdown */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Basic Dropdown</h3>
        <Dropdown>
          <DropdownTrigger className="w-64">
            {selectedValue || 'Select an option'}
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onClick={() => setSelectedValue('Option 1')}>
              Option 1
            </DropdownItem>
            <DropdownItem onClick={() => setSelectedValue('Option 2')}>
              Option 2
            </DropdownItem>
            <DropdownItem onClick={() => setSelectedValue('Option 3')}>
              Option 3
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>

      {/* Multi-select Dropdown */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Multi-select Dropdown</h3>
        <Dropdown>
          <DropdownTrigger className="w-64">
            {selectedItems.length ? `${selectedItems.length} selected` : 'Select items'}
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItemMultiselect
              checked={selectedItems.includes('item1')}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedItems([...selectedItems, 'item1'])
                } else {
                  setSelectedItems(selectedItems.filter(item => item !== 'item1'))
                }
              }}
            >
              Item 1
            </DropdownItemMultiselect>
            <DropdownItemMultiselect
              checked={selectedItems.includes('item2')}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedItems([...selectedItems, 'item2'])
                } else {
                  setSelectedItems(selectedItems.filter(item => item !== 'item2'))
                }
              }}
            >
              Item 2
            </DropdownItemMultiselect>
            <DropdownSeparator />
            <DropdownItemMultiselect
              checked={selectedItems.includes('item3')}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedItems([...selectedItems, 'item3'])
                } else {
                  setSelectedItems(selectedItems.filter(item => item !== 'item3'))
                }
              }}
            >
              Item 3
            </DropdownItemMultiselect>
          </DropdownContent>
        </Dropdown>
      </div>

      {/* Custom Styled Dropdown */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Custom Chevron Icons</h3>
        <Dropdown>
          <DropdownTrigger
            className="w-64 bg-primary-50 border-primary-200"
            chevronIcons={{
              open: <span className="text-primary-600">▲</span>,
              closed: <span className="text-primary-600">▼</span>
            }}
          >
            Custom styled dropdown
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Custom Option 1</DropdownItem>
            <DropdownItem>Custom Option 2</DropdownItem>
            <DropdownItem>Custom Option 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  )
}
```

> **💡 Ready to go!** This example uses our design tokens for consistent styling. Make sure you've completed the setup steps above.

## 📅 Date Picker Components

Equal DS UI now includes a complete suite of date picker components with full accessibility support and seamless design system integration.

### Basic Date Picker

```tsx
import { useState } from 'react'
import { DatePicker, DatePickerTrigger, DatePickerContent } from 'equal-ds-ui'

export default function DatePickerExample() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
      <DatePicker value={date} onChange={setDate}>
        <DatePickerTrigger className="w-64">
          {date ? date.toLocaleDateString() : 'Pick a date'}
        </DatePickerTrigger>
        <DatePickerContent />
      </DatePicker>
    </div>
  )
}
```

### Time Picker

```tsx
import { useState } from 'react'
import { DatePicker, DatePickerTrigger, TimePickerContent } from 'equal-ds-ui'

export default function TimePickerExample() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Select Time</h2>
      <DatePicker value={date} onChange={setDate}>
        <DatePickerTrigger className="w-64">
          {date ? date.toLocaleTimeString() : 'Pick a time'}
        </DatePickerTrigger>
        <TimePickerContent />
      </DatePicker>
    </div>
  )
}
```

### Date Range Picker

```tsx
import { useState } from 'react'
import { DatePicker, DatePickerTrigger, DateRangePickerContent } from 'equal-ds-ui'

export default function DateRangeExample() {
  const [dateRange, setDateRange] = useState<{start?: Date, end?: Date}>({})

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Select Date Range</h2>
      <DatePicker value={dateRange} onChange={setDateRange}>
        <DatePickerTrigger className="w-80">
          {dateRange.start && dateRange.end
            ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
            : 'Pick date range'
          }
        </DatePickerTrigger>
        <DateRangePickerContent />
      </DatePicker>
    </div>
  )
}
```

### Advanced Date Picker with Custom Formatting

```tsx
import { useState } from 'react'
import { DatePicker, DatePickerTrigger, DatePickerContent } from 'equal-ds-ui'

export default function AdvancedDatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Advanced Date Picker</h2>
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={new Date()} // Disable past dates
        maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
      >
        <DatePickerTrigger className="w-96">
          {date ? formatDate(date) : 'Choose a future date'}
        </DatePickerTrigger>
        <DatePickerContent />
      </DatePicker>
    </div>
  )
}
```

### 📋 Date Picker Features

| Feature | Description |
|---------|-------------|
| **Accessibility** | Full ARIA support, keyboard navigation, screen reader compatible |
| **Internationalization** | Locale-aware date formatting and parsing |
| **Responsive Design** | Mobile-friendly interfaces with touch support |
| **Customizable Styling** | Uses design tokens for consistent theming |
| **Flexible Date Formats** | Support for various date display formats |
| **Validation** | Min/max date constraints and custom validation |
| **Time Selection** | Combined date and time picker functionality |
| **Range Selection** | Visual date range picker with start/end dates |
| **Animation** | Smooth 300ms ease-out transitions |

### 🎨 Date Picker Props

#### DatePicker
```tsx
interface DatePickerProps {
  value?: Date | {start?: Date, end?: Date}
  onChange?: (date: Date | {start?: Date, end?: Date}) => void
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  placeholder?: string
  className?: string
  children: React.ReactNode
}
```

#### DatePickerTrigger
```tsx
interface DatePickerTriggerProps {
  className?: string
  disabled?: boolean
  children: React.ReactNode
}
```

#### DatePickerContent
```tsx
interface DatePickerContentProps {
  className?: string
  showTimeSelect?: boolean
  timeIntervals?: number
  dateFormat?: string
}
```

## 🧪 Testing & Development

### Quick Test with Vite
```bash
# Create and setup a test project
mkdir test-equal-ds && cd test-equal-ds
npm create vite@latest . -- --template react
npm install equal-ds-ui @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Essential Configuration
```javascript
// tailwind.config.js
import preset from 'equal-ds-ui/tailwind-preset'

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/equal-ds-ui/dist/**/*.{js,jsx,ts,tsx}', // Required!
  ],
  presets: [preset],
}
```

```css
/* src/index.css */
@import 'equal-ds-ui/tokens.css';
@import 'equal-ds-ui/animations.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| **Unstyled sidebar** | Add `node_modules/equal-ds-ui/dist/**/*` to Tailwind content |
| **CSS variables not working** | Import design system CSS before Tailwind |
| **Module resolution errors** | Check your bundler configuration |
| **Format compatibility** | Run `npx equal-ds-format auto` after installation |

## 🎨 Custom Design Tokens

Extend Equal DS UI with your own design tokens using our `design-tokens-sync` tool.

### Quick Setup
```bash
# Install the sync tool
npm install -D design-tokens-sync

# Create your tokens file
echo '{
  "color": {
    "primary": {"500": "#your-color"},
    "text": {"primary": "#your-text"}
  }
}' > design-tokens.json

# Generate CSS and Tailwind preset
npx design-tokens-sync sync
```

### Integration
```javascript
// tailwind.config.js
import equalDSPreset from 'equal-ds-ui/tailwind-preset'
import customPreset from './tokens.tailwind.preset.js'

export default {
  presets: [equalDSPreset, customPreset], // Custom overrides Equal DS
  content: ['./src/**/*.{js,jsx,ts,tsx}']
}
```

```css
/* src/index.css */
@import './tokens.css';           /* Your tokens first */
@import 'equal-ds-ui/tokens.css'; /* Equal DS base */
@import 'equal-ds-ui/animations.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 🎯 Token Priority
1. **Your custom tokens** (highest)
2. **Equal DS UI tokens** (medium)
3. **Tailwind defaults** (lowest)

Your tokens override ours, giving you full customization control!

## 🔀 Drag & Drop Reordering

Equal DS UI supports intuitive drag-and-drop for both menu items and groups.

### Menu Items Reordering
```tsx
const [itemOrder, setItemOrder] = useState(['home', 'settings', 'profile'])

<SidebarMenu reorderable onReorder={setItemOrder}>
  {itemOrder.map(id => (
    <SidebarMenuItem key={id} draggable dragId={id}>
      <SidebarMenuButton itemId={id}>
        {menuItems[id].label}
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

### Group Reordering
```tsx
const [groupOrder, setGroupOrder] = useState(['main', 'admin', 'tools'])

<SidebarContent reorderableGroups onGroupReorder={setGroupOrder}>
  {groupOrder.map(id => (
    <SidebarGroup key={id} groupId={id}>
      {/* Group content */}
    </SidebarGroup>
  ))}
</SidebarContent>
```

### ✨ Features
- **Handle-only dragging** - Prevents accidental moves
- **Smooth animations** - Visual feedback during reordering
- **Auto-collapse** - Groups collapse during drag for clarity
- **Container drops** - Drop anywhere in the column
- **Theme integration** - Uses your design tokens for indicators

## 🚀 What's New in v1.0.7

- 🎯 **Selective Format Installation**: Choose ESM or CommonJS for ~50% smaller bundles
- ⚡ **Smart CLI Tools**: `npx equal-ds-format` for easy format selection
- 🔍 **Auto-Detection**: Automatically detects your project's bundler preferences
- 🎨 **Enhanced Design System**: Improved token system and customization options

## 🚨 Migration Guide (v1.0.6 → v1.0.7)

### ✨ New Features (Non-Breaking)
- **Format Selection**: Choose ESM or CommonJS during installation
- **CLI Tools**: New `equal-ds-format` command for format optimization
- **Auto-Detection**: Smart bundler detection for optimal format selection

### Migration Steps
```bash
# Update to latest version
npm install equal-ds-ui@latest

# Optional: Optimize format for your project
npx equal-ds-format auto
```

### Breaking Changes from v0.2.2 → v1.0.4
If upgrading from older versions, update your color classes:

```tsx
// OLD → NEW
'text-foreground' → 'text-text-primary'
'bg-background' → 'bg-background-secondary'
'border-border' → 'border-border-default'
'focus:ring-ring' → 'focus:ring-primary-400'
```

## 📚 Component API Reference

### 🎯 FinProSidebar Component

The most advanced sidebar component with built-in filtering, drag & drop, and multi-select functionality.

#### Basic Usage

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

#### Props

```typescript
interface FinProSidebarProps {
  // Basic configuration
  headerText?: string                    // Header text (default: "/*workasaur 🦖")
  defaultSelected?: string              // Initially selected menu item
  defaultExpanded?: boolean             // Whether filters start expanded

  // Custom configuration (optional)
  customItems?: Record<string, any>     // Override default menu items
  customFilters?: Record<string, any>   // Override default filters

  // Styling
  className?: string                    // Additional CSS classes
}
```

#### Features

- ✅ **Multi-select dropdowns** for templates, purpose codes, statuses, aggregators
- ✅ **Date range picker** with start/end date selection
- ✅ **Drag & drop reordering** for menu items and groups
- ✅ **Responsive design** with mobile support
- ✅ **Keyboard navigation** and accessibility
- ✅ **Smooth animations** and hover effects

---

### 🎨 Sidebar Components

#### SidebarProvider

Context provider that manages sidebar state across your application.

```tsx
<SidebarProvider defaultOpen={true} onOpenChange={setIsOpen}>
  <App />
</SidebarProvider>
```

**Props:**
- `defaultOpen?: boolean` - Initial open state
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - State change handler

#### Sidebar

Main sidebar container with responsive behavior.

```tsx
<Sidebar aria-label="Main navigation">
  <SidebarHeader>...</SidebarHeader>
  <SidebarContent>...</SidebarContent>
  <SidebarFooter>...</SidebarFooter>
</Sidebar>
```

**Props:**
- `className?: string` - CSS classes
- `aria-label?: string` - Accessibility label

#### SidebarMenu

Container for menu items with optional drag & drop reordering.

```tsx
<SidebarMenu reorderable onReorder={handleReorder}>
  {items.map(item => (
    <SidebarMenuItem key={item.id} draggable dragId={item.id}>
      <SidebarMenuButton itemId={item.id}>
        {item.label}
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
```

**Props:**
- `reorderable?: boolean` - Enable drag & drop
- `onReorder?: (newOrder: string[]) => void` - Reorder handler

---

### 📂 Dropdown Components

#### Basic Dropdown

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from 'equal-ds-ui'

<Dropdown>
  <DropdownTrigger>Select Option</DropdownTrigger>
  <DropdownContent>
    <DropdownItem onClick={() => setValue('option1')}>
      Option 1
    </DropdownItem>
    <DropdownItem onClick={() => setValue('option2')}>
      Option 2
    </DropdownItem>
  </DropdownContent>
</Dropdown>
```

#### Multi-Select Dropdown

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItemMultiselect } from 'equal-ds-ui'

<Dropdown>
  <DropdownTrigger>
    {selected.length ? `${selected.length} selected` : 'Select items'}
  </DropdownTrigger>
  <DropdownContent>
    {options.map(option => (
      <DropdownItemMultiselect
        key={option.id}
        checked={selected.includes(option.id)}
        onCheckedChange={(checked) => {
          if (checked) {
            setSelected([...selected, option.id])
          } else {
            setSelected(selected.filter(id => id !== option.id))
          }
        }}
      >
        {option.label}
      </DropdownItemMultiselect>
    ))}
  </DropdownContent>
</Dropdown>
```

#### Dropdown with Search

```tsx
<Dropdown>
  <DropdownTrigger>Search items</DropdownTrigger>
  <DropdownContent enableSearch searchPlaceholder="Type to search...">
    {filteredOptions.map(option => (
      <DropdownItem key={option.id} onClick={() => handleSelect(option.id)}>
        {option.label}
      </DropdownItem>
    ))}
  </DropdownContent>
</Dropdown>
```

#### Custom Trigger Icons

```tsx
<Dropdown>
  <DropdownTrigger
    chevronIcons={{
      open: <span className="text-green-500">▲</span>,
      closed: <span className="text-red-500">▼</span>
    }}
  >
    Custom chevrons
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Item 1</DropdownItem>
  </DropdownContent>
</Dropdown>
```

---

### 📅 Date Picker Components

#### Basic Date Picker

```tsx
import { DatePicker, DatePickerTrigger, DatePickerContent } from 'equal-ds-ui'

function BasicDatePicker() {
  const [date, setDate] = useState<Date>()

  return (
    <DatePicker value={date} onChange={setDate}>
      <DatePickerTrigger>
        {date ? date.toLocaleDateString() : 'Pick a date'}
      </DatePickerTrigger>
      <DatePickerContent />
    </DatePicker>
  )
}
```

#### Date Range Picker

```tsx
import { DatePicker, DatePickerTrigger, DateRangePickerContent } from 'equal-ds-ui'

function DateRangePicker() {
  const [dateRange, setDateRange] = useState<{start?: Date, end?: Date}>({})

  return (
    <DatePicker value={dateRange} onChange={setDateRange}>
      <DatePickerTrigger>
        {dateRange.start && dateRange.end
          ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
          : 'Select date range'
        }
      </DatePickerTrigger>
      <DateRangePickerContent />
    </DatePicker>
  )
}
```

#### Time Picker

```tsx
import { DatePicker, DatePickerTrigger, TimePickerContent } from 'equal-ds-ui'

function TimePicker() {
  const [time, setTime] = useState<{hours: number, minutes: number, period: 'AM'|'PM'}>()

  return (
    <DatePicker value={time} onChange={setTime}>
      <DatePickerTrigger>
        {time ? `${time.hours}:${time.minutes.toString().padStart(2, '0')} ${time.period}` : 'Pick time'}
      </DatePickerTrigger>
      <TimePickerContent />
    </DatePicker>
  )
}
```

#### Advanced Configuration

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}                    // Disable past dates
  maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
>
  <DatePickerTrigger className="w-64" disabled={false}>
    {date ? date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'Choose a date'}
  </DatePickerTrigger>
  <DatePickerContent
    showTimeSelect={true}
    timeIntervals={15}
    dateFormat="MMMM dd, yyyy"
  />
</DatePicker>
```

---

### 🎨 Design Tokens & Styling

#### Color System

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

#### Typography Scale

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
```

#### Spacing Scale

```css
--spacing-0: 0;
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-3: 0.75rem;    /* 12px */
--spacing-4: 1rem;       /* 16px */
--spacing-6: 1.5rem;     /* 24px */
--spacing-8: 2rem;       /* 32px */
```

#### Using Design Tokens in Components

```tsx
// Direct CSS usage
<div style={{
  backgroundColor: 'var(--color-background-primary)',
  color: 'var(--color-text-primary)',
  padding: 'var(--spacing-4)',
  borderRadius: 'var(--border-radius-lg)'
}}>
  Styled with design tokens
</div>

// Tailwind classes (when using preset)
<div className="bg-background-primary text-text-primary p-4 rounded-lg">
  Styled with Tailwind
</div>
```

---

### 🔧 Utility Functions

#### `cn()` - Class Name Utility

Combines and conditionally applies CSS classes.

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

// Multiple conditions
const className = cn(
  'card',
  {
    'card--featured': isFeatured,
    'card--selected': isSelected,
    'card--disabled': isDisabled
  }
)
```

#### `useHoverAnimation()` - Hover State Management

Manages hover animations and interactions.

```typescript
import { useHoverAnimation } from 'equal-ds-ui'

function AnimatedButton() {
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

#### `ChevronIcon` - Animated Chevron

Animated chevron icon with rotation states.

```tsx
import { ChevronIcon } from 'equal-ds-ui'

<ChevronIcon
  isOpen={isExpanded}
  size="default"          // 'sm' | 'default' | 'lg'
  opacity={70}           // 0-100
  className="custom-class"
/>
```

---

### 🎯 Advanced Usage Patterns

#### Custom Sidebar with Theming

```tsx
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger } from 'equal-ds-ui'

function CustomSidebar() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <Sidebar className="bg-gradient-to-b from-blue-600 to-blue-800 text-white">
          <SidebarHeader className="border-b border-blue-500">
            <div className="p-4">
              <h1 className="text-xl font-bold">My App</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {/* Custom sidebar content */}
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
          <SidebarTrigger className="bg-blue-600 text-white hover:bg-blue-700">
            ☰
          </SidebarTrigger>
        </main>
      </div>
    </SidebarProvider>
  )
}
```

#### Form Integration with Validation

```tsx
import { DatePicker, Dropdown } from 'equal-ds-ui'

function BookingForm() {
  const [formData, setFormData] = useState({
    checkIn: undefined,
    checkOut: undefined,
    roomType: ''
  })

  const [errors, setErrors] = useState({})

  const validateDates = () => {
    if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
      setErrors({ dates: 'Check-out must be after check-in' })
      return false
    }
    setErrors({})
    return true
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          value={formData.checkIn}
          onChange={(date) => setFormData(prev => ({ ...prev, checkIn: date }))}
        >
          <DatePickerTrigger className="w-full">
            {formData.checkIn?.toLocaleDateString() || 'Check-in date'}
          </DatePickerTrigger>
          <DatePickerContent />
        </DatePicker>

        <DatePicker
          value={formData.checkOut}
          onChange={(date) => setFormData(prev => ({ ...prev, checkOut: date }))}
          minDate={formData.checkIn}
        >
          <DatePickerTrigger className="w-full">
            {formData.checkOut?.toLocaleDateString() || 'Check-out date'}
          </DatePickerTrigger>
          <DatePickerContent />
        </DatePicker>
      </div>

      <Dropdown>
        <DropdownTrigger className="w-full">
          {formData.roomType || 'Select room type'}
        </DropdownTrigger>
        <DropdownContent className="w-full">
          <DropdownItem onClick={() => setFormData(prev => ({ ...prev, roomType: 'Standard' }))}>
            Standard Room
          </DropdownItem>
          <DropdownItem onClick={() => setFormData(prev => ({ ...prev, roomType: 'Deluxe' }))}>
            Deluxe Room
          </DropdownItem>
          <DropdownItem onClick={() => setFormData(prev => ({ ...prev, roomType: 'Suite' }))}>
            Suite
          </DropdownItem>
        </DropdownContent>
      </Dropdown>

      {errors.dates && (
        <div className="text-red-500 text-sm">{errors.dates}</div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        disabled={!formData.checkIn || !formData.checkOut || !formData.roomType}
      >
        Book Room
      </button>
    </form>
  )
}
```

---

## 🤖 LLM Usage Guide

This section is specifically designed to help AI assistants and developers understand and use Equal DS UI effectively.

### 🎯 Most Common Use Cases

#### 1. Basic Application Layout with Sidebar

```tsx
// Pattern: Sidebar + Main Content Layout
import { SidebarProvider, FinProSidebar } from 'equal-ds-ui'
import 'equal-ds-ui/tokens.css'

function AppLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-background-secondary">
        <FinProSidebar headerText="My App" />
        <main className="flex-1 p-6 overflow-auto">
          {/* Your main content here */}
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        </main>
      </div>
    </SidebarProvider>
  )
}
```

#### 2. Form with Multiple Dropdowns and Date Picker

```tsx
// Pattern: Complex Form with Multiple Components
import { useState } from 'react'
import {
  Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownItemMultiselect,
  DatePicker, DatePickerTrigger, DatePickerContent
} from 'equal-ds-ui'

function ComplexForm() {
  const [formState, setFormState] = useState({
    selectedOption: '',
    selectedItems: [] as string[],
    selectedDate: undefined as Date | undefined
  })

  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ]

  return (
    <div className="space-y-4 p-6">
      {/* Single Select Dropdown */}
      <Dropdown>
        <DropdownTrigger className="w-64">
          {formState.selectedOption || 'Select option'}
        </DropdownTrigger>
        <DropdownContent>
          {options.map(option => (
            <DropdownItem
              key={option.id}
              onClick={() => setFormState(prev => ({ ...prev, selectedOption: option.label }))}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>

      {/* Multi-Select Dropdown */}
      <Dropdown>
        <DropdownTrigger className="w-64">
          {formState.selectedItems.length ? `${formState.selectedItems.length} selected` : 'Select items'}
        </DropdownTrigger>
        <DropdownContent>
          {options.map(option => (
            <DropdownItemMultiselect
              key={option.id}
              checked={formState.selectedItems.includes(option.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFormState(prev => ({
                    ...prev,
                    selectedItems: [...prev.selectedItems, option.id]
                  }))
                } else {
                  setFormState(prev => ({
                    ...prev,
                    selectedItems: prev.selectedItems.filter(id => id !== option.id)
                  }))
                }
              }}
            >
              {option.label}
            </DropdownItemMultiselect>
          ))}
        </DropdownContent>
      </Dropdown>

      {/* Date Picker */}
      <DatePicker
        value={formState.selectedDate}
        onChange={(date) => setFormState(prev => ({ ...prev, selectedDate: date }))}
      >
        <DatePickerTrigger className="w-64">
          {formState.selectedDate?.toLocaleDateString() || 'Pick a date'}
        </DatePickerTrigger>
        <DatePickerContent />
      </DatePicker>
    </div>
  )
}
```

#### 3. Theming and Customization

```tsx
// Pattern: Custom Theming with Design Tokens
import 'equal-ds-ui/tokens.css'

// Using design tokens directly in CSS
const customStyles = {
  backgroundColor: 'var(--color-background-primary)',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-border-default)',
  padding: 'var(--spacing-4)',
  borderRadius: 'var(--border-radius-lg)'
}

// Using Tailwind classes with design tokens
function ThemedComponent() {
  return (
    <div className="bg-background-primary text-text-primary border border-border-default p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Themed Component</h2>
      <p className="text-text-secondary">This component uses design system tokens.</p>
    </div>
  )
}
```

### 🔍 Quick Component Reference

#### Import Patterns
```typescript
// Most common imports
import { FinProSidebar, SidebarProvider } from 'equal-ds-ui'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from 'equal-ds-ui'
import { DatePicker, DatePickerTrigger, DatePickerContent } from 'equal-ds-ui'

// Utility imports
import { cn, useHoverAnimation, ChevronIcon } from 'equal-ds-ui'

// Style imports (required)
import 'equal-ds-ui/tokens.css'
import 'equal-ds-ui/animations.css'
```

#### Component Props Quick Reference

```typescript
// FinProSidebar
<FinProSidebar
  headerText="My App"           // string
  defaultSelected="dashboard"   // string
  defaultExpanded={true}        // boolean
  className="custom-class"       // string
/>

// Dropdown
<Dropdown>
  <DropdownTrigger className="w-64" chevronIcons={customIcons}>
    Trigger Text
  </DropdownTrigger>
  <DropdownContent enableSearch searchPlaceholder="Search...">
    <DropdownItem onClick={handleClick}>Item 1</DropdownItem>
    <DropdownItemMultiselect checked={isChecked} onCheckedChange={setChecked}>
      Multi-select Item
    </DropdownItemMultiselect>
  </DropdownContent>
</Dropdown>

// DatePicker
<DatePicker
  value={selectedDate}          // Date | undefined
  onChange={setSelectedDate}    // (date: Date) => void
  minDate={new Date()}          // Date
  maxDate={futureDate}          // Date
>
  <DatePickerTrigger className="w-64">
    {selectedDate?.toLocaleDateString() || 'Pick date'}
  </DatePickerTrigger>
  <DatePickerContent showTimeSelect={false} />
</DatePicker>
```

### 🎨 Design Token Usage Examples

#### Color Tokens
```css
/* Background Colors */
.primary-bg { background-color: var(--color-background-primary); }
.secondary-bg { background-color: var(--color-background-secondary); }
.tertiary-bg { background-color: var(--color-background-tertiary); }

/* Text Colors */
.primary-text { color: var(--color-text-primary); }
.secondary-text { color: var(--color-text-secondary); }
.muted-text { color: var(--color-text-muted); }

/* Status Colors */
.success { color: var(--color-status-success); }
.error { color: var(--color-status-error); }
.warning { color: var(--color-status-warning); }
```

#### Spacing & Typography
```css
/* Spacing */
.small-padding { padding: var(--spacing-2); }      /* 8px */
.medium-padding { padding: var(--spacing-4); }     /* 16px */
.large-padding { padding: var(--spacing-6); }      /* 24px */

/* Typography */
.small-text { font-size: var(--typography-fontSize-sm); }
.medium-text { font-size: var(--typography-fontSize-md); }
.large-text { font-size: var(--typography-fontSize-lg); }

.semibold { font-weight: var(--typography-fontWeight-semibold); }
.bold { font-weight: var(--typography-fontWeight-bold); }
```

#### Tailwind Classes
```tsx
// Using design system classes
<div className="bg-background-primary text-text-primary p-4 rounded-lg">
  <h2 className="text-xl font-semibold text-text-primary mb-2">Title</h2>
  <p className="text-text-secondary">Description text</p>
  <button className="bg-primary-500 text-primary-50 px-4 py-2 rounded-md hover:bg-primary-600">
    Button
  </button>
</div>
```

### 🛠️ Troubleshooting Common Issues

#### Issue: Components not styled correctly
```bash
# Solution: Ensure CSS imports are in correct order
import 'equal-ds-ui/tokens.css'      // First: design tokens
import 'equal-ds-ui/animations.css'  // Second: animations
// Then: other CSS imports
```

#### Issue: Tailwind classes not working
```javascript
// Solution: Add to tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/equal-ds-ui/dist/**/*.{js,jsx,ts,tsx}', // Required!
  ],
  presets: [require('equal-ds-ui/tailwind-preset')]
}
```

#### Issue: TypeScript errors
```typescript
// Solution: Install peer dependencies
npm install @radix-ui/react-collapsible @radix-ui/react-tooltip @radix-ui/react-visually-hidden lucide-react tailwindcss
```

### 📊 Bundle Size Information

| Format | Size | Best For |
|--------|------|----------|
| **ESM** | ~78 KB | Modern bundlers (Vite, esbuild) |
| **CommonJS** | ~84 KB | Legacy bundlers (Webpack 4) |
| **Both** | ~162 KB | Maximum compatibility |

### 🔄 Migration Guide

#### From v0.x to v1.x
```tsx
// OLD (v0.x)
import { Sidebar } from 'equal-ds-ui'

// NEW (v1.x)
import { FinProSidebar, SidebarProvider } from 'equal-ds-ui'

function App() {
  return (
    <SidebarProvider>
      <FinProSidebar headerText="My App" />
    </SidebarProvider>
  )
}
```

#### Updating Color Classes
```tsx
// OLD → NEW
'text-foreground' → 'text-text-primary'
'bg-background' → 'bg-background-secondary'
'border-border' → 'border-border-default'
'focus:ring-ring' → 'focus:ring-primary-400'
```

---

## 📚 Documentation

### 📖 Complete API Reference
For detailed API documentation, see [`API_REFERENCE.md`](./API_REFERENCE.md) - a comprehensive guide optimized for developers and AI assistants.

### 🚀 Usage Examples
Quick copy-paste examples for common use cases in [`USAGE_EXAMPLES.md`](./USAGE_EXAMPLES.md).

### 🤖 LLM-Friendly Documentation
This package includes documentation specifically designed for AI assistants:
- **Structured API Reference** with clear prop types and examples
- **Copy-paste ready examples** for immediate use
- **Common patterns** with real-world usage scenarios
- **Troubleshooting guides** for frequent issues

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development
npm run storybook    # Storybook development
npm run dev          # Vite development
npm test            # Run tests

# Build for publishing
npm run build:esm    # ESM only
npm run build:cjs    # CommonJS only
npm run build        # Both formats

# Publish
npm run prepublishOnly  # Prepares for publishing
npm publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

**MIT** © Equal DS

---

<div align="center">
  <p><strong>Built with ❤️ for modern React applications</strong></p>
  <p>
    <a href="#installation">Installation</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#selective-format-installation">Format Selection</a> •
    <a href="#custom-design-tokens">Custom Tokens</a>
  </p>
</div>


