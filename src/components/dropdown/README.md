# Dropdown Components

## FinPro Dropdown Styles & Interactions

The FinPro dropdown styling and interactions have been comprehensively exported in multiple formats for maximum flexibility and reusability.

## 🎯 **Multiple Usage Options**

### 1. **Ready-to-Use Component**

```tsx
import { FinProDropdown } from '../src/components/dropdown'

function MyComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
      <FinProDropdown label="Consent Template" />
      <FinProDropdown label="Purpose Code" />
      <FinProDropdown label="Consent Status" />
    </div>
  )
}
```

### 2. **CSS Classes Approach**

```tsx
import { getFinProDropdownClasses, getFinProLabelClasses } from '../src/components/dropdown'

function MyComponent() {
  return (
    <div>
      <label className={getFinProLabelClasses()}>
        Consent Template
      </label>
      <DropdownTrigger className={getFinProDropdownClasses()}>
        <span>Consent Template</span>
        <ChevronDown className="h-4 w-4 opacity-70" />
      </DropdownTrigger>
    </div>
  )
}
```

### 3. **React Hook with State Management**

```tsx
import { useFinProDropdownState } from '../src/components/dropdown'

function MyComponent() {
  const dropdownState = useFinProDropdownState()

  return (
    <DropdownTrigger
      className={dropdownState.triggerClasses}
      onMouseEnter={dropdownState.handleMouseEnter}
      onMouseLeave={dropdownState.handleMouseLeave}
      onFocus={dropdownState.handleFocus}
      onBlur={dropdownState.handleBlur}
    >
      <span>Content</span>
    </DropdownTrigger>
  )
}
```

### 4. **Inline Styles with Dynamic Theming**

```tsx
import { generateFinProInlineStyles } from '../src/components/dropdown'

function MyComponent() {
  const [isHovered, setIsHovered] = useState(false)

  const styles = generateFinProInlineStyles({
    backgroundColor: '--color-background-secondary',
    hoverBackgroundColor: '--color-background-tertiary',
    // ... other config
  }, isHovered)

  return (
    <DropdownTrigger
      style={styles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>Content</span>
    </DropdownTrigger>
  )
}
```

### 5. **CSS Custom Properties Theming**

```tsx
import { generateFinProCSSVariables } from '../src/components/dropdown'

function MyComponent() {
  const themeVariables = generateFinProCSSVariables('--my-prefix')

  return (
    <div style={themeVariables}>
      <DropdownTrigger style={{
        backgroundColor: 'var(--my-prefix-background)',
        borderColor: 'var(--my-prefix-border)',
        // ... other properties
      }}>
        <span>Content</span>
      </DropdownTrigger>
    </div>
  )
}
```

## 📋 **Available Exports**

### Configuration Objects
- `finProDropdownConfig` - Complete styling configuration
- `finProTheme` - CSS custom properties theme object

### React Hooks
- `useDropdownHoverInteractions(config)` - Hover/click state management
- `useFinProDropdownState()` - Complete dropdown state with class generation

### Utility Functions
- `getFinProDropdownClasses(options)` - Generate CSS classes
- `getFinProLabelClasses(customClasses)` - Generate label CSS classes
- `getFinProContainerClasses(customClasses)` - Generate container CSS classes
- `getFinProContentClasses(customClasses)` - Generate content CSS classes
- `generateFinProInlineStyles(config, isHovered)` - Generate inline styles
- `generateFinProCSSVariables(prefix)` - Generate CSS custom properties
- `getLabelStyles(config)` - Generate label inline styles
- `getDropdownContentStyles(config)` - Generate content inline styles

### Components
- `FinProDropdown` - Ready-to-use component
- `FinProExamples` - Collection of example implementations

### CSS File
- Import `./finpro-styles.css` for ready-to-use CSS classes

## 🎨 **Styling Properties**

| Category | Properties |
|----------|------------|
| **Colors** | `backgroundColor`, `textColor`, `borderColor` |
| **Hover Colors** | `hoverBackgroundColor`, `hoverTextColor`, `hoverBorderColor` |
| **Typography** | `fontSize`, `fontWeight`, `letterSpacing` |
| **Spacing** | `padding`, `borderRadius`, `borderWidth` |
| **Effects** | `boxShadow`, `hoverBoxShadow`, `transform` |
| **Layout** | `headerGap`, `dropdownGap` |

## ✨ **Interactive Features**

- **Hover Effects**: Background color change, transform, box shadow
- **Click Effects**: Transform reset on click
- **Focus States**: Accessible focus indicators
- **Smooth Transitions**: 0.2s ease-in-out for all interactions
- **Accessibility**: Proper ARIA attributes and keyboard navigation

## 🔧 **Customization**

Override any configuration:

```tsx
const customConfig = {
  ...finProDropdownConfig,
  backgroundColor: '--color-background-primary',
  borderRadius: '--border-radius-sm',
  hoverBackgroundColor: '--color-background-accent'
}

<FinProDropdown label="Custom" config={customConfig} />
```

## 📖 **Complete Examples**

See `FinProExamples.tsx` for comprehensive usage examples including:
- CSS classes implementation
- Hook-based state management
- Inline styles with theming
- CSS custom properties approach
- Complete filter section layouts

## 🚀 **Quick Start**

1. Import the styles: `import './components/dropdown/finpro-styles.css'`
2. Use the component: `<FinProDropdown label="Your Label" />`
3. Or use utilities: `const classes = getFinProDropdownClasses()`

All exports maintain the exact same visual appearance and interactions as the original FinPro story!
