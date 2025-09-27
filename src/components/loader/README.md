# Loader Component

A reusable ripple loading animation component that uses the design system's color palette.

## Usage

```tsx
import { Loader } from 'equal-ds'

function MyComponent() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `undefined` | Total size of the loader in pixels. If not provided, calculated from `cells`, `cellSize`, and `cellSpacing` |
| `cellSize` | `number` | `52` | Size of each individual cell in pixels |
| `cellSpacing` | `number` | `1` | Spacing between cells in pixels |
| `cells` | `number` | `3` | Number of cells per row and column (creates a square grid) |

## Examples

### Default Loader (3x3 grid)
```tsx
<Loader />
```

### Smaller Loader (2x2 grid)
```tsx
<Loader cells={2} cellSize={40} />
```

### Custom Sized Loader
```tsx
<Loader size={200} />
```

## Design System Integration

The loader uses colors from the design system's CSS custom properties:
- Primary colors: `--color-primary-400`, `--color-primary-500`, etc.
- Brand colors: `--color-brand-primary`, `--color-brand-secondary`

Each cell in the ripple animation cycles through these colors in sequence.
