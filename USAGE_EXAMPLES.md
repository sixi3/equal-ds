# 🚀 Equal DS UI - Usage Examples

*Quick copy-paste examples for common use cases*

## 🎯 Basic App Layout

```tsx
import { FinProSidebar, SidebarProvider } from 'equal-ds-ui'
import 'equal-ds-ui/tokens.css'
import 'equal-ds-ui/animations.css'

function App() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-background-secondary">
        <FinProSidebar headerText="My App" />

        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-2">Welcome to your app!</p>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default App
```

## 📂 Dropdown Examples

### Single Select Dropdown

```tsx
import { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from 'equal-ds-ui'

function SingleSelectExample() {
  const [selectedValue, setSelectedValue] = useState('')

  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ]

  return (
    <Dropdown>
      <DropdownTrigger className="w-64">
        {selectedValue || 'Select an option'}
      </DropdownTrigger>
      <DropdownContent>
        {options.map(option => (
          <DropdownItem
            key={option.id}
            onClick={() => setSelectedValue(option.label)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  )
}
```

### Multi-Select Dropdown

```tsx
import { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItemMultiselect } from 'equal-ds-ui'

function MultiSelectExample() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const options = [
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', label: 'Item 2' },
    { id: 'item3', label: 'Item 3' }
  ]

  const handleSelectionChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId])
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId))
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger className="w-64">
        {selectedItems.length ? `${selectedItems.length} selected` : 'Select items'}
      </DropdownTrigger>
      <DropdownContent>
        {options.map(option => (
          <DropdownItemMultiselect
            key={option.id}
            checked={selectedItems.includes(option.id)}
            onCheckedChange={(checked) => handleSelectionChange(option.id, checked)}
          >
            {option.label}
          </DropdownItemMultiselect>
        ))}
      </DropdownContent>
    </Dropdown>
  )
}
```

### Dropdown with Search

```tsx
import { useState, useMemo } from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from 'equal-ds-ui'

function SearchableDropdown() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  const allOptions = [
    { id: 'apple', label: 'Apple' },
    { id: 'banana', label: 'Banana' },
    { id: 'cherry', label: 'Cherry' },
    { id: 'date', label: 'Date' },
    { id: 'elderberry', label: 'Elderberry' }
  ]

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return allOptions
    return allOptions.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, allOptions])

  return (
    <Dropdown>
      <DropdownTrigger className="w-64">
        {selectedValue || 'Select a fruit'}
      </DropdownTrigger>
      <DropdownContent
        enableSearch
        searchPlaceholder="Search fruits..."
      >
        {filteredOptions.map(option => (
          <DropdownItem
            key={option.id}
            onClick={() => setSelectedValue(option.label)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  )
}
```

## 📅 Date Picker Examples

### Basic Date Picker

```tsx
import { useState } from 'react'
import { DatePicker, DatePickerTrigger, DatePickerContent } from 'equal-ds-ui'

function BasicDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <DatePicker value={selectedDate} onChange={setSelectedDate}>
      <DatePickerTrigger className="w-64">
        {selectedDate ? selectedDate.toLocaleDateString() : 'Pick a date'}
      </DatePickerTrigger>
      <DatePickerContent />
    </DatePicker>
  )
}
```

### Date Range Picker

```tsx
import { useState } from 'react'
import { DatePicker, DatePickerTrigger, DateRangePickerContent } from 'equal-ds-ui'

function DateRangePicker() {
  const [dateRange, setDateRange] = useState<{start?: Date, end?: Date}>({})

  return (
    <DatePicker value={dateRange} onChange={setDateRange}>
      <DatePickerTrigger className="w-80">
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

### Time Picker

```tsx
import { useState } from 'react'
import { DatePicker, DatePickerTrigger, TimePickerContent } from 'equal-ds-ui'

function TimePicker() {
  const [selectedTime, setSelectedTime] = useState<{hours: number, minutes: number, period: 'AM'|'PM'}>()

  return (
    <DatePicker value={selectedTime} onChange={setSelectedTime}>
      <DatePickerTrigger className="w-64">
        {selectedTime
          ? `${selectedTime.hours}:${selectedTime.minutes.toString().padStart(2, '0')} ${selectedTime.period}`
          : 'Pick a time'
        }
      </DatePickerTrigger>
      <TimePickerContent />
    </DatePicker>
  )
}
```

## 🎨 Theming Examples

### Using Design Tokens Directly

```tsx
function ThemedComponent() {
  const customStyles = {
    backgroundColor: 'var(--color-background-primary)',
    color: 'var(--color-text-primary)',
    borderColor: 'var(--color-border-default)',
    padding: 'var(--spacing-4)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-md)'
  }

  return (
    <div style={customStyles}>
      <h2 style={{
        fontSize: 'var(--typography-fontSize-lg)',
        fontWeight: 'var(--typography-fontWeight-semibold)',
        marginBottom: 'var(--spacing-2)'
      }}>
        Themed Component
      </h2>
      <p style={{
        fontSize: 'var(--typography-fontSize-sm)',
        color: 'var(--color-text-secondary)'
      }}>
        This component uses design tokens for consistent styling.
      </p>
    </div>
  )
}
```

### Using Tailwind Classes

```tsx
function TailwindThemedComponent() {
  return (
    <div className="bg-background-primary text-text-primary border border-border-default p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-text-primary mb-2">
        Tailwind Themed Component
      </h2>
      <p className="text-sm text-text-secondary">
        This component uses Tailwind classes with design system tokens.
      </p>
      <button className="bg-primary-500 text-primary-50 px-4 py-2 rounded-md hover:bg-primary-600 mt-3">
        Primary Button
      </button>
    </div>
  )
}
```

## 🔧 Utility Examples

### Class Name Utility (cn)

```tsx
import { cn } from 'equal-ds-ui'

function Button({ variant, size, disabled, children }) {
  const className = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    // Size variants
    {
      'px-3 py-2 text-sm': size === 'sm',
      'px-4 py-2 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg'
    },
    // Style variants
    {
      'bg-primary-500 text-white hover:bg-primary-600': variant === 'primary',
      'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
      'border border-gray-300 bg-white hover:bg-gray-50': variant === 'outline'
    },
    // States
    disabled && 'opacity-50 cursor-not-allowed'
  )

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  )
}
```

### Hover Animation Hook

```tsx
import { useHoverAnimation, HoverIndicator } from 'equal-ds-ui'

function AnimatedList() {
  const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
    itemSelector: '[data-hoverable]',
    duration: 200,
    enabled: true
  })

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

  return (
    <div
      ref={setContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="space-y-2"
    >
      <HoverIndicator indicator={indicator} variant="primary" />

      {items.map((item, index) => (
        <div
          key={index}
          data-hoverable
          className="p-3 border border-border-default rounded-md hover:bg-background-tertiary transition-colors cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  )
}
```

## 📊 Complete Form Example

```tsx
import { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownItemMultiselect } from 'equal-ds-ui'
import { DatePicker, DatePickerTrigger, DatePickerContent } from 'equal-ds-ui'

function CompleteForm() {
  const [formData, setFormData] = useState({
    selectedOption: '',
    selectedItems: [] as string[],
    selectedDate: undefined as Date | undefined,
    selectedRange: {} as {start?: Date, end?: Date}
  })

  const [errors, setErrors] = useState({})

  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ]

  const multiselectOptions = [
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', label: 'Item 2' },
    { id: 'item3', label: 'Item 3' }
  ]

  const handleMultiSelectChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        selectedItems: [...prev.selectedItems, itemId]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        selectedItems: prev.selectedItems.filter(id => id !== itemId)
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const newErrors = {}
    if (!formData.selectedOption) {
      newErrors.selectedOption = 'Please select an option'
    }
    if (!formData.selectedDate) {
      newErrors.selectedDate = 'Please select a date'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
      // Handle form submission
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-md">
      <h2 className="text-xl font-semibold text-text-primary">Complete Form</h2>

      {/* Single Select Dropdown */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Select Option
        </label>
        <Dropdown>
          <DropdownTrigger className="w-full">
            {formData.selectedOption || 'Choose an option'}
          </DropdownTrigger>
          <DropdownContent className="w-full">
            {options.map(option => (
              <DropdownItem
                key={option.id}
                onClick={() => setFormData(prev => ({ ...prev, selectedOption: option.label }))}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
        {errors.selectedOption && (
          <p className="text-red-500 text-sm mt-1">{errors.selectedOption}</p>
        )}
      </div>

      {/* Multi-Select Dropdown */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Select Multiple Items
        </label>
        <Dropdown>
          <DropdownTrigger className="w-full">
            {formData.selectedItems.length
              ? `${formData.selectedItems.length} items selected`
              : 'Select items'
            }
          </DropdownTrigger>
          <DropdownContent className="w-full">
            {multiselectOptions.map(option => (
              <DropdownItemMultiselect
                key={option.id}
                checked={formData.selectedItems.includes(option.id)}
                onCheckedChange={(checked) => handleMultiSelectChange(option.id, checked)}
              >
                {option.label}
              </DropdownItemMultiselect>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>

      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Select Date
        </label>
        <DatePicker
          value={formData.selectedDate}
          onChange={(date) => setFormData(prev => ({ ...prev, selectedDate: date }))}
        >
          <DatePickerTrigger className="w-full">
            {formData.selectedDate?.toLocaleDateString() || 'Pick a date'}
          </DatePickerTrigger>
          <DatePickerContent />
        </DatePicker>
        {errors.selectedDate && (
          <p className="text-red-500 text-sm mt-1">{errors.selectedDate}</p>
        )}
      </div>

      {/* Date Range Picker */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Select Date Range
        </label>
        <DatePicker
          value={formData.selectedRange}
          onChange={(range) => setFormData(prev => ({ ...prev, selectedRange: range }))}
        >
          <DatePickerTrigger className="w-full">
            {formData.selectedRange.start && formData.selectedRange.end
              ? `${formData.selectedRange.start.toLocaleDateString()} - ${formData.selectedRange.end.toLocaleDateString()}`
              : 'Select date range'
            }
          </DatePickerTrigger>
          <DateRangePickerContent />
        </DatePicker>
      </div>

      <button
        type="submit"
        className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors"
      >
        Submit Form
      </button>
    </form>
  )
}

export default CompleteForm
```

## 🎯 Copy-Paste Ready Examples

These examples are designed to be copied and pasted directly into your project with minimal modifications. Each example includes:

- ✅ Complete import statements
- ✅ Proper TypeScript types
- ✅ Error handling where appropriate
- ✅ Accessibility considerations
- ✅ Responsive design patterns
- ✅ Consistent with design system patterns

For more advanced examples and API documentation, see `API_REFERENCE.md`.
