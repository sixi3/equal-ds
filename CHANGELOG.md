## Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] - 2025-01-XX

### 🎉 New Components

#### Date Picker Suite
- **DatePicker** - Complete date picker with calendar and time selection
- **DatePickerContent** - Calendar content with month/year navigation
- **DatePickerTrigger** - Trigger button for date picker
- **DatePickerItem** - Individual date selection items
- **CalendarGrid** - Calendar grid component with accessibility
- **CalendarContent** - Core calendar implementation
- **TimePickerContent** - Time selection with hour/minute picker
- **DateRangePickerContent** - Date range selection with start/end dates

#### Enhanced Component Suite
- **Complete TypeScript support** - Full type definitions for all date picker components
- **Accessibility compliance** - ARIA labels, keyboard navigation, screen reader support
- **Responsive design** - Mobile-friendly date picker interfaces
- **Internationalization ready** - Locale-aware date formatting and parsing

### ✨ New Features

#### Date Picker Experience
- **Seamless integration** - Works with existing Equal DS UI design system
- **Smooth animations** - Consistent 300ms ease-out transitions
- **Customizable styling** - Uses design tokens for consistent theming
- **Flexible date formats** - Support for various date display formats
- **Time selection** - Combined date and time picker functionality
- **Range selection** - Select date ranges with visual feedback

#### Developer Experience
- **Zero-config setup** - Drop-in components with sensible defaults
- **Comprehensive documentation** - Updated README with quick start examples
- **Storybook integration** - Interactive component demos and controls
- **Type-safe APIs** - Full TypeScript support with proper type definitions

### 🔧 Technical Improvements

#### Component Architecture
- **Modular design** - Separate components for different use cases
- **Context-based state management** - Clean separation of concerns
- **Performance optimized** - Efficient re-rendering and state updates
- **Bundle size conscious** - Tree-shakable imports for optimal bundle sizes

---

## [1.2.0] - 2025-01-XX

### 🚨 BREAKING CHANGES

#### Dropdown Component Overhaul
- **Automatic rotating chevron** - DropdownTrigger now shows rotating chevron by default
- **New props added** - `showChevron`, `chevronIcons` for customization
- **Context-based state management** - Internal state management for seamless UX

#### Behavior Changes
- **Default chevron behavior** - All dropdowns now automatically show rotating chevron
- **Animation timing** - Optimized to 300ms ease-out for smooth transitions
- **State management** - Automatic open/close state handling via React Context

### ✨ New Features

#### Enhanced Dropdown Experience
- **Smooth animations** - 300ms ease-out transitions for chevron rotation
- **Automatic state management** - No manual state handling required
- **Customizable chevrons** - Support for custom open/closed icons
- **Context-based architecture** - Clean separation of concerns

#### Developer Experience
- **Zero-config setup** - Works out of the box with sensible defaults
- **Type-safe props** - Full TypeScript support for all new features
- **Backward compatibility** - Existing code continues to work with new behavior

### 🐛 Bug Fixes

#### Dropdown Components
- **State synchronization** - Fixed timing issues with manual state management
- **Animation performance** - Optimized CSS transitions for better performance
- **Context cleanup** - Proper cleanup of React Context on unmount

### 🔧 Technical Improvements

#### Architecture Changes
- **React Context integration** - Clean state management across component tree
- **Performance optimization** - Reduced re-renders with optimized context usage
- **Type safety** - Enhanced TypeScript definitions for new props

### 📚 Migration Guide

#### For Existing Dropdown Users

##### ✅ Automatic Migration (Recommended)
```tsx
// Before (manual state management)
const [isOpen, setIsOpen] = useState(false)

<Dropdown onOpenChange={setIsOpen}>
  <DropdownTrigger>
    Select Option
    {isOpen ? <ChevronUp /> : <ChevronDown />}
  </DropdownTrigger>
</Dropdown>

// After (automatic - just works!)
<Dropdown>
  <DropdownTrigger>
    Select Option
  </DropdownTrigger>
</Dropdown>
```

##### 🎨 Customization Options
```tsx
// Disable chevron
<Dropdown>
  <DropdownTrigger showChevron={false}>
    Select Option
  </DropdownTrigger>
</Dropdown>

// Custom chevron icons
<Dropdown>
  <DropdownTrigger
    chevronIcons={{
      open: <CustomUpIcon />,
      closed: <CustomDownIcon />
    }}
  >
    Select Option
  </DropdownTrigger>
</Dropdown>
```

##### 🔧 Advanced Usage
```tsx
// Still works with manual control
const [isOpen, setIsOpen] = useState(false)

<Dropdown onOpenChange={setIsOpen}>
  <DropdownTrigger>
    Select Option
    {/* Your custom chevron logic */}
  </DropdownTrigger>
</Dropdown>
```

#### Migration Checklist
- [ ] Remove manual `onOpenChange` state management (automatic now)
- [ ] Remove manual chevron rendering (automatic now)
- [ ] Test dropdown animations (300ms smooth transitions)
- [ ] Verify custom chevron icons still work with new API
- [ ] Update any custom dropdown implementations

#### Breaking Changes Summary
- Dropdown chevrons now appear automatically by default
- Manual state management for chevrons no longer required
- Animation timing changed from 200ms to 300ms for better UX
- New props available for customization without breaking existing usage

---

## [1.0.0] - 2025-01-XX

### 🚨 BREAKING CHANGES

#### Design System Migration
- **Complete color system overhaul** - Migrated from shadcn theme to custom design tokens
- **Preset system change** - Now uses `tokens.tailwind.preset.js` instead of `src/tailwind-preset.ts`
- **Color class renaming** - All color classes now use new token-based naming convention

#### Removed Classes (Breaking)
- `text-foreground` → `text-text-primary`
- `bg-background` → `bg-background-secondary` 
- `border-border` → `border-border-default`
- `focus-visible:ring-ring` → `focus-visible:ring-primary-400`

#### Component Updates
- **Sidebar components** - Updated to use new design system consistently
- **Color tokens** - All components now use `tokens.tailwind.preset.js` colors
- **Transition system** - Enhanced with consistent timing and easing

### ✨ New Features

#### Enhanced User Experience
- **Smooth hover transitions** - Added 200ms ease-out transitions for all interactive elements
- **Layout stability** - Eliminated vertical layout shifts when switching active tabs
- **Improved tooltips** - Fixed blurry text rendering with pixel-perfect positioning
- **Consistent styling** - Unified hover states and focus indicators across all components

#### Design System Improvements
- **Auto-generated preset** - Uses `tokens.tailwind.preset.js` for consistent colors
- **Enhanced accessibility** - Improved focus states and keyboard navigation
- **Better visual hierarchy** - Consistent spacing and typography throughout

### 🐛 Bug Fixes

#### Sidebar Components
- **Text cutoff issues** - Replaced `truncate` with `leading-normal break-words`
- **Color consistency** - Fixed pale colors and inconsistent secondary color usage
- **Drop indicator positioning** - Resolved overlapping issues during group reordering
- **Tooltip rendering** - Fixed blurry text and subpixel positioning issues

#### Layout Stability
- **Tab switching** - Eliminated vertical layout shifts between active/inactive states
- **Border consistency** - All tabs now maintain consistent dimensions
- **Font weight uniformity** - Consistent typography across all states

### 🔧 Technical Improvements

#### Build System
- **Tailwind preset** - Updated to use auto-generated preset from design tokens
- **CSS optimization** - Improved text rendering and anti-aliasing
- **Performance** - Optimized transitions and animations

#### Code Quality
- **Type safety** - Enhanced TypeScript definitions
- **Component consistency** - Unified styling approach across all sidebar components
- **Maintainability** - Centralized design token management

### 📚 Migration Guide

#### For Existing Users
1. **Update imports** - Ensure you're using the new color classes
2. **Test thoroughly** - Verify all components render correctly with new colors
3. **Update custom styles** - Replace any hardcoded old color references
4. **Check focus states** - Verify focus indicators work as expected

#### Breaking Changes Summary
- All color classes have been renamed to use new token system
- Preset system completely changed from manual to auto-generated
- Some visual styling may appear different due to new color palette

---

## [0.2.2] - 2025-01-XX
- Initial release with Sidebar components, Tailwind preset, tokens, and CSS theme/animations


