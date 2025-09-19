# Search Bar Component Design Specification

## Overview

The Search Bar component provides a flexible search interface with two variants:
1. **Simple Search Bar** - Basic input with search icon
2. **Search Bar with Domain Selector** - Search input with attached dropdown for domain filtering

## Figma Reference
**Source**: https://www.figma.com/design/dI1Z4VPAMnv2lRrFxnS7Xf/FinPro-Console?node-id=6222-27603&t=gaMzQ5rm5BMEdb8h-11

## Layout Specifications

### Overall Container (`Search Container`)
- **Layout**: Horizontal flex (row)
- **Height**: 48px (fixed)
- **Width**: Hug contents
- **Border Radius**: `--border-radius-lg` (0.5rem / 8px)
- **Border**: 1px solid `--color-primary-100` (#F0F9FF)
- **Clips Content**: Yes

### Search Input Container
- **Layout**: Horizontal flex (row)
- **Alignment**: Center (vertically)
- **Gap**: 6px (≈ `--spacing-1` + 2px)
- **Padding**: `--spacing-3` (0.75rem / 12px)
- **Width**: 320px (fixed)
- **Height**: Fill parent
- **Border Radius**: 10px (left) / `--border-radius-none` (0px right)
- **Background**: `--color-background-secondary` (#FFFFFF)
- **Flex Direction**: Row
- **Justify Content**: Flex start

### Filter Container (Domain Selector)
- **Layout**: Horizontal flex (row)
- **Alignment**: Center (both axes)
- **Gap**: 2px
- **Padding**: `--spacing-2` `--spacing-3` (0.5rem 0.75rem / 8px 12px)
- **Width**: Hug contents
- **Height**: Fill parent
- **Border**: 1px solid `--color-primary-100` (#F0F9FF) (left side only)
- **Border Radius**: `--border-radius-none` (0px left) / `--border-radius-lg` (0.5rem / 8px right)
- **Background**: `--color-gray-100` (#F6FCFF)
- **Flex Direction**: Row
- **Justify Content**: Center

## Typography

### Search Placeholder Text
- **Text**: "Search Mobile Numbers"
- **Font Family**: `--typography-fontFamily-sans` (Helvetica Neue,Inter,system-ui,sans-serif)
- **Font Weight**: `--typography-fontWeight-normal` (400)
- **Font Size**: `--typography-fontSize-xs` (0.75rem / 12px)
- **Line Height**: `--typography-lineHeight-tight` (1.22)
- **Letter Spacing**: 2%
- **Color**: `--color-text-tertiary` (#909BAA)
- **Text Align**: Left
- **Text Transform**: None

### Filter Label Text
- **Text**: "Mobile Number"
- **Font Family**: `--typography-fontFamily-sans` (Helvetica Neue,Inter,system-ui,sans-serif)
- **Font Weight**: `--typography-fontWeight-medium` (500)
- **Font Size**: `--typography-fontSize-xs` (0.75rem / 12px)
- **Line Height**: `--typography-lineHeight-tight` (1.22)
- **Letter Spacing**: 2%
- **Color**: `--color-text-primary` (#0F3340)
- **Text Align**: Left
- **Text Transform**: None

## Assets

### Search Icon (`lucide/search`)
- **Type**: SVG Vector
- **Size**: 12px × 12px
- **Position**: X: 14px, Y: 18px (relative to container)
- **Stroke Color**: `--color-text-primary` (#0F3340)
- **Stroke Width**: 2px
- **Fill**: None

### Dropdown Arrow Icon (`keyboard_arrow_up`)
- **Type**: SVG Vector
- **Size**: 7.43px × 4.38px
- **Position**: X: 427.28px, Y: 22.02px (relative to container)
- **Fill Color**: `--color-text-primary` (#0F3340)
- **Stroke Width**: 0.025px

## Design Token Mapping

### Colors
```css
/* Background Colors */
--color-background-secondary: #FFFFFF;    /* Search input background */
--color-gray-100: #F6FCFF;                /* Dropdown background (#FAFAFA closest match) */

/* Text Colors */
--color-text-primary: #0F3340;            /* Primary text, icons, filter label */
--color-text-tertiary: #909BAA;           /* Placeholder text (#919CAB closest match) */

/* Border Colors */
--color-primary-100: #F0F9FF;             /* Container border (#D9F0FF closest match) */

/* State Colors */
--color-primary-200: #E5F5FF;             /* Hover border */
--color-primary-500: #0F3340;            /* Focus/active border */
--color-background-tertiary: #F3F8FC;    /* Active background */
--color-text-muted: #708497;             /* Disabled text/icons */
--color-border-light: #E7EDF0;           /* Disabled border */
```

### Spacing
```css
--spacing-3: 0.75rem;     /* 12px - Container padding */
--spacing-2: 0.5rem;      /* 8px - Dropdown padding */
--spacing-1: 0.25rem;     /* 4px - Small gaps */
--spacing-0: 0rem;        /* 0px - Reset margins */
```

### Border Radius
```css
--border-radius-base: 0.25rem;    /* 4px - Base radius */
--border-radius-lg: 0.5rem;       /* 8px - Container radius */
--border-radius-xl: 0.75rem;      /* 12px - Alternative radius */
```

### Typography
```css
--typography-fontFamily-sans: Helvetica Neue,Inter,system-ui,sans-serif;
--typography-fontSize-sm: 0.875rem;        /* 14px */
--typography-fontSize-xs: 0.75rem;         /* 12px */
--typography-fontWeight-normal: 400;
--typography-fontWeight-medium: 500;
--typography-lineHeight-tight: 1.22;
--typography-lineHeight-normal: 1.5;
```

### Shadows & Effects
```css
--shadow-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
--shadow-base: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
```

## Component States

### Default State
- **Border**: `--color-primary-100` (#F0F9FF)
- **Background**: `--color-background-secondary` (#FFFFFF) / `--color-gray-100` (#F6FCFF)
- **Text**: `--color-text-tertiary` (#909BAA)
- **Icons**: `--color-text-primary` (#0F3340)

### Hover State
- **Border**: `--color-primary-200` (#E5F5FF)
- **Background**: `--color-background-secondary` (#FFFFFF) / `--color-gray-100` (#F6FCFF)
- **Text**: `--color-text-primary` (#0F3340)
- **Icons**: `--color-text-primary` (#0F3340)

### Focus State
- **Border**: `--color-primary-500` (#0F3340)
- **Background**: `--color-background-secondary` (#FFFFFF) / `--color-gray-100` (#F6FCFF)
- **Text**: `--color-text-primary` (#0F3340)
- **Shadow**: `--shadow-sm`
- **Icons**: `--color-text-primary` (#0F3340)

### Active/Pressed State
- **Border**: `--color-primary-500` (#0F3340)
- **Background**: `--color-background-tertiary` (#F3F8FC)
- **Text**: `--color-text-primary` (#0F3340)
- **Icons**: `--color-text-primary` (#0F3340)

### Disabled State
- **Border**: `--color-border-light` (#E7EDF0)
- **Background**: `--color-gray-100` (#F6FCFF)
- **Text**: `--color-text-muted` (#708497)
- **Icons**: `--color-text-muted` (#708497)
- **Opacity**: `--opacity-50` (0.5)

## Responsive Behavior

### Breakpoint Considerations
- **Mobile (< `--breakpoint-sm` / 640px)**: Stack vertically, full width
- **Tablet (`--breakpoint-sm` / 640px - `--breakpoint-lg` / 1024px)**: Maintain horizontal layout, adjust widths
- **Desktop (> `--breakpoint-lg` / 1024px)**: Full horizontal layout as designed

### Spacing Adjustments
- **Mobile**: Reduce padding to `--spacing-2` (0.5rem / 8px)
- **Tablet**: Standard spacing
- **Desktop**: Standard spacing with potential for larger gaps

## Accessibility

### Color Contrast
- **Text on Background**: Minimum 4.5:1 contrast ratio
- **Icons**: Minimum 3:1 contrast ratio against background
- **Focus Indicators**: Minimum 3:1 contrast ratio

### Focus Management
- **Tab Order**: Search input → Dropdown trigger
- **Focus Indicators**: 2px solid border using `--color-primary-500` (#0F3340)
- **Keyboard Navigation**: Arrow keys for dropdown, Enter to search

### Screen Reader Support
- **ARIA Labels**: Descriptive labels for search input and dropdown
- **Role Attributes**: `search` role for main container
- **Live Regions**: For search results and state changes

## Implementation Notes

### CSS Classes Structure
```css
.search-bar {
  /* Container styles */
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-primary-100);
}

.search-bar__input-container {
  /* Search input section */
  background: var(--color-background-secondary);
  padding: var(--spacing-3);
  border-radius: 10px 0 0 10px;
}

.search-bar__input {
  /* Input field styles */
  color: var(--color-text-primary);
  font-family: var(--typography-fontFamily-sans);
  font-size: var(--typography-fontSize-xs);
}

.search-bar__input::placeholder {
  color: var(--color-text-tertiary);
}

.search-bar__icon {
  /* Search icon styles */
  color: var(--color-text-primary);
}

.search-bar__dropdown-container {
  /* Domain selector section */
  background: var(--color-gray-100);
  padding: var(--spacing-2) var(--spacing-3);
  border-left: 1px solid var(--color-primary-100);
  border-radius: 0 var(--border-radius-lg) var(--border-radius-lg) 0;
}

.search-bar__dropdown-trigger {
  /* Dropdown trigger styles */
  color: var(--color-text-primary);
  font-family: var(--typography-fontFamily-sans);
  font-size: var(--typography-fontSize-xs);
  font-weight: var(--typography-fontWeight-medium);
}

.search-bar__dropdown-arrow {
  /* Arrow icon styles */
  color: var(--color-text-primary);
}

/* State modifiers */
.search-bar--focus {
  border-color: var(--color-primary-500);
  box-shadow: var(--shadow-sm);
}

.search-bar--disabled {
  opacity: var(--opacity-50);
  border-color: var(--color-border-light);
}
```

### Asset Dependencies
- **Search Icon**: `/src/components/search/search-icon.svg`
- **Dropdown Arrow**: `/src/components/search/dropdown-arrow.svg`
- **Fallback**: Lucide React icons if SVG assets unavailable

### Performance Considerations
- **Icon Loading**: Preload critical icons
- **Bundle Size**: Lazy load dropdown functionality
- **Debouncing**: `--transition-duration-normal` (300ms) delay for search input changes
- **Transitions**: Use `--transition-duration-fast` (150ms) for hover/focus states

This specification ensures pixel-perfect implementation matching the Figma design while maintaining consistency with the existing design system tokens and accessibility standards.
