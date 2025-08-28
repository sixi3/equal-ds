## Changelog

All notable changes to this project will be documented in this file.

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


