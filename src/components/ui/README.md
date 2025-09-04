# Hover Animation System

A reusable hover animation system that provides smooth, cursor-following animations for interactive elements.

## Components

### `HoverIndicator`

A visual indicator component that smoothly animates position and size changes.

```tsx
import { HoverIndicator } from '@equal-ds/ui'

<HoverIndicator 
  indicator={indicator} 
  variant="primary" 
  duration={200}
  zIndex={1}
/>
```

#### Props

- `indicator`: Position and dimensions object with `top`, `left`, `width`, `height`, and `visible` properties
- `variant`: Visual style variant (`'default' | 'subtle' | 'primary' | 'accent'`)
- `duration`: Animation duration in milliseconds (default: 200)
- `zIndex`: CSS z-index value (default: 0)

### `useHoverAnimation`

A React hook that manages hover animation state and provides event handlers.

```tsx
import { useHoverAnimation } from '@equal-ds/lib'

const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
  itemSelector: '[data-hoverable]',
  duration: 200,
  enabled: true
})
```

#### Options

- `itemSelector`: CSS selector for hoverable items (default: `'[data-hoverable]'`)
- `duration`: Animation duration in milliseconds (default: 200)
- `enabled`: Whether to enable the animation (default: true)

#### Returns

- `indicator`: Current indicator state object
- `handleMouseMove`: Mouse move event handler
- `handleMouseLeave`: Mouse leave event handler
- `setContainerRef`: Function to set the container element reference

## Usage Examples

### Basic Implementation

```tsx
import { useHoverAnimation, HoverIndicator } from '@equal-ds'

function MyComponent() {
  const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
    itemSelector: '[data-item]'
  })

  return (
    <div
      ref={setContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <HoverIndicator indicator={indicator} />
      
      <div data-item>Item 1</div>
      <div data-item>Item 2</div>
      <div data-item>Item 3</div>
    </div>
  )
}
```

### With Dropdown Components

The hover animation is automatically integrated into `DropdownContent`:

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@equal-ds'

<Dropdown>
  <DropdownTrigger>Open Menu</DropdownTrigger>
  <DropdownContent hoverVariant="primary">
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem>Sign out</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Custom Styling

You can customize the hover indicator appearance:

```tsx
<HoverIndicator 
  indicator={indicator} 
  variant="accent"
  className="rounded-xl shadow-lg"
  duration={300}
/>
```

## Performance Features

- **RequestAnimationFrame batching**: Updates are batched to prevent excessive re-renders
- **Efficient DOM queries**: Uses `closest()` to find hoverable elements
- **Minimal re-renders**: Only updates when necessary
- **Smooth transitions**: CSS transitions handle the visual animation

## Integration with Existing Components

The hover animation system is designed to work seamlessly with existing components:

1. **DropdownContent**: Automatically includes hover animation with configurable variants
2. **SidebarMenu**: Already uses a similar system (can be migrated to use this reusable version)
3. **Custom components**: Easy to integrate with any container that has hoverable items

## Browser Support

- Modern browsers with CSS transitions support
- Uses `requestAnimationFrame` for smooth animations
- Graceful degradation for older browsers
