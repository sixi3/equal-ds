# Typography System

Our design system uses a comprehensive typography token system built around **Helvetica Neue** as the primary font family, with fallbacks to Helvetica and Arial for cross-platform compatibility.

## Font Families

### Primary Fonts
- **`--font-sans`**: `"Helvetica Neue", Helvetica, Arial, sans-serif` - Default sans-serif font
- **`--font-display`**: `"Helvetica Neue", Helvetica, Arial, sans-serif` - For headings and display text
- **`--font-body`**: `"Helvetica Neue", Helvetica, Arial, sans-serif` - For body text and paragraphs
- **`--font-ui`**: `"Helvetica Neue", Helvetica, Arial, sans-serif` - For UI elements and labels

### Monospace Font
- **`--font-mono`**: `ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace` - For code and technical content

## Font Sizes

| Token | Value | Use Case |
|-------|-------|----------|
| `--font-size-xs` | `0.75rem` (12px) | Captions, small labels |
| `--font-size-sm` | `0.875rem` (14px) | Body small, UI labels |
| `--font-size-base` | `1rem` (16px) | Body text, default size |
| `--font-size-lg` | `1.125rem` (18px) | Body large, h4 headings |
| `--font-size-xl` | `1.25rem` (20px) | h3 headings |
| `--font-size-2xl` | `1.5rem` (24px) | h2 headings |
| `--font-size-3xl` | `1.875rem` (30px) | h1 headings |
| `--font-size-4xl` | `2.25rem` (36px) | Display small |
| `--font-size-5xl` | `3rem` (48px) | Display medium |
| `--font-size-6xl` | `3.75rem` (60px) | Display large |
| `--font-size-7xl` | `4.5rem` (72px) | Hero text |
| `--font-size-8xl` | `6rem` (96px) | Large hero text |
| `--font-size-9xl` | `8rem` (128px) | Extra large hero text |

## Font Weights

| Token | Value | Use Case |
|-------|-------|----------|
| `--font-weight-thin` | `100` | Ultra light text |
| `--font-weight-extralight` | `200` | Extra light text |
| `--font-weight-light` | `300` | Light text |
| `--font-weight-normal` | `400` | Regular text |
| `--font-weight-medium` | `500` | Medium text |
| `--font-weight-semibold` | `600` | Semi-bold text |
| `--font-weight-bold` | `700` | Bold text |
| `--font-weight-extrabold` | `800` | Extra bold text |
| `--font-weight-black` | `900` | Black text |

## Line Heights

| Token | Value | Use Case |
|-------|-------|----------|
| `--line-height-none` | `1` | Single line text |
| `--line-height-tight` | `1.25` | Headings, display text |
| `--line-height-snug` | `1.375` | Subheadings |
| `--line-height-normal` | `1.5` | Body text, UI elements |
| `--line-height-relaxed` | `1.625` | Large body text |
| `--line-height-loose` | `2` | Spacious text |

## Letter Spacing

| Token | Value | Use Case |
|-------|-------|----------|
| `--letter-spacing-tighter` | `-0.05em` | Tight headings |
| `--letter-spacing-tight` | `-0.025em` | Display text |
| `--letter-spacing-normal` | `0em` | Default text |
| `--letter-spacing-wide` | `0.025em` | UI labels, captions |
| `--letter-spacing-wider` | `0.05em` | Small text |
| `--letter-spacing-widest` | `0.1em` | All caps text |

## Predefined Text Styles

### Display Text
- **`.text-display-large`**: Large hero text (60px, bold, tight spacing)
- **`.text-display-medium`**: Medium hero text (48px, bold, tight spacing)
- **`.text-display-small`**: Small hero text (36px, bold, tight spacing)

### Headings
- **`.text-h1`**: Main heading (30px, bold, tight spacing)
- **`.text-h2`**: Section heading (24px, semibold, tight spacing)
- **`.text-h3`**: Subsection heading (20px, semibold, snug spacing)
- **`.text-h4`**: Subheading (18px, medium, snug spacing)
- **`.text-h5`**: Minor heading (16px, medium, normal spacing)
- **`.text-h6`**: Small heading (14px, medium, normal spacing)

### Body Text
- **`.text-body-large`**: Large body text (18px, normal, relaxed spacing)
- **`.text-body-base`**: Standard body text (16px, normal, normal spacing)
- **`.text-body-small`**: Small body text (14px, normal, normal spacing)
- **`.text-body-xs`**: Extra small body text (12px, normal, normal spacing)

### UI Text
- **`.text-ui-label`**: Form labels, UI text (14px, medium, normal spacing)
- **`.text-ui-button`**: Button text (14px, medium, normal spacing)
- **`.text-ui-caption`**: Captions, helper text (12px, normal, wide spacing)

## Usage Examples

### CSS Variables
```css
.my-heading {
  font-family: var(--font-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
```

### Utility Classes
```html
<h1 class="text-h1">Main Heading</h1>
<h2 class="text-h2">Section Heading</h2>
<p class="text-body-base">Regular paragraph text</p>
<label class="text-ui-label">Form Label</label>
<button class="text-ui-button">Button Text</button>
```

### Tailwind Classes
```html
<h1 class="text-2xl font-bold leading-tight tracking-tight">Heading</h1>
<p class="text-base font-normal leading-normal">Body text</p>
<label class="text-sm font-medium leading-normal">Label</label>
```

## Responsive Typography

The typography system includes responsive breakpoints that automatically adjust font sizes for smaller screens:

- **Mobile (≤640px)**: Reduced heading sizes for better mobile readability
- **Tablet (≤768px)**: Medium-sized adjustments for tablet devices

## Adding New Fonts

To add a new font family in the future:

1. **Update tokens.json**: Add new font family values
2. **Update CSS variables**: Modify the font family CSS variables
3. **Update Tailwind preset**: Add new font family to the Tailwind configuration
4. **Update typography utilities**: Add new font family utility classes

The typography styles (sizes, weights, line heights, letter spacing) will remain the same, ensuring consistency across different font choices.

## Best Practices

1. **Use predefined styles**: Leverage the predefined text styles for consistency
2. **Maintain hierarchy**: Use appropriate heading levels (h1-h6) for document structure
3. **Consider readability**: Use appropriate line heights and letter spacing for different text sizes
4. **Be consistent**: Use the same typography tokens across similar UI elements
5. **Test accessibility**: Ensure sufficient contrast and readability across different devices

## CSS Custom Properties

All typography tokens are available as CSS custom properties, making them easy to use in custom CSS:

```css
:root {
  --font-sans: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-size-base: 1rem;
  --font-weight-medium: 500;
  --line-height-normal: 1.5;
  --letter-spacing-normal: 0em;
}
```

This system provides a solid foundation for consistent typography across your entire application while maintaining flexibility for future font additions.
