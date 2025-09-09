# Dropdown Component Migration Guide

## Overview

Version 1.2.0 introduces automatic rotating chevrons for all dropdown components. This is a **breaking change** that improves the user experience but requires updating existing implementations.

## 🚨 Breaking Changes

### Default Behavior Change
- **Before**: Dropdown triggers showed no chevron by default
- **After**: Dropdown triggers automatically show a rotating chevron

### Animation Improvements
- **Before**: 200ms transitions
- **After**: 300ms ease-out transitions for smoother UX

## ✅ Migration Steps

### Step 1: Remove Manual State Management

**Before (v1.1.1):**
```tsx
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dropdown onOpenChange={setIsOpen}>
      <DropdownTrigger>
        Select Option
        {isOpen ? (
          <ChevronUp className="h-4 w-4 ml-2" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-2" />
        )}
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
```

**After (v1.2.0):**
```tsx
function MyComponent() {
  return (
    <Dropdown>
      <DropdownTrigger>
        Select Option
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}
```

### Step 2: Remove Chevron Imports (if not used elsewhere)

```tsx
// Remove these imports if no longer needed
// import { ChevronDown, ChevronUp } from 'lucide-react'
```

### Step 3: Test Your Implementation

1. Open/close dropdowns to verify chevron rotation
2. Check animation smoothness (300ms ease-out)
3. Verify no duplicate chevrons appear

## 🎨 Customization Options

### Disable Chevron
```tsx
<Dropdown>
  <DropdownTrigger showChevron={false}>
    Select Option
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Option 1</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Custom Chevron Icons
```tsx
import { ChevronDown, ChevronUp } from 'lucide-react'

<Dropdown>
  <DropdownTrigger
    chevronIcons={{
      open: <ChevronUp className="h-5 w-5 text-blue-500" />,
      closed: <ChevronDown className="h-5 w-5 text-gray-500" />
    }}
  >
    Select Option
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Option 1</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Advanced: Manual Control (if needed)
```tsx
const [isOpen, setIsOpen] = useState(false)

<Dropdown onOpenChange={setIsOpen}>
  <DropdownTrigger showChevron={false}>
    Select Option
    {/* Your custom chevron logic */}
    {isOpen ? <CustomUpIcon /> : <CustomDownIcon />}
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Option 1</DropdownItem>
  </DropdownContent>
</Dropdown>
```

## 🔧 New Props Reference

### DropdownTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showChevron` | `boolean` | `true` | Whether to show the rotating chevron |
| `chevronIcons` | `{open: ReactNode, closed: ReactNode}` | Default icons | Custom chevron icons |

### Dropdown Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback when dropdown state changes |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |

## 🧪 Testing Checklist

- [ ] Dropdown opens/closes correctly
- [ ] Chevron rotates smoothly (300ms animation)
- [ ] No duplicate chevrons visible
- [ ] Custom chevron icons work (if used)
- [ ] Keyboard navigation still works
- [ ] Focus states are preserved

## 🚀 Benefits of Migration

1. **Better UX**: Automatic chevron provides clear visual feedback
2. **Less Code**: No manual state management needed
3. **Consistent Behavior**: All dropdowns work the same way
4. **Smooth Animations**: Optimized 300ms transitions
5. **Type Safety**: Full TypeScript support

## 🆘 Troubleshooting

### Duplicate Chevrons
If you see two chevrons:
1. Remove manual chevron rendering from DropdownTrigger children
2. Remove `onOpenChange` from Dropdown if just for chevron state

### Animation Issues
- Ensure you're using the latest version (1.2.0+)
- Check that CSS transitions aren't being overridden

### Custom Styling
- Use `chevronIcons` prop for custom icons
- Use `showChevron={false}` to disable automatic chevron
- Style the automatic chevron using CSS classes

## 📞 Support

If you encounter issues during migration:
1. Check the [CHANGELOG.md](../CHANGELOG.md) for version 1.2.0
2. Review the Storybook examples
3. Test with a minimal reproduction case

---

**Migration completed?** ✅ Update your package.json to use `^1.2.0` and enjoy the enhanced dropdown experience!
