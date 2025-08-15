# Design Controls in Storybook

This document explains how to use the interactive design controls in Storybook to customize component properties using your design system tokens.

## Overview

The design controls allow you to:
- **Interactively customize** component colors, spacing, and other properties
- **Use your design tokens** directly in the Storybook interface
- **See both token names and values** (e.g., `--color-primary-500` = `#0F3340`)
- **Test different combinations** of design values without code changes
- **Ensure consistency** with your design system

## 🎯 **Key Features**

### **Token Name + Value Display**
Each control now shows:
- **Token Name**: The CSS variable (e.g., `--color-border-default`)
- **Human Label**: Friendly description (e.g., `Default`)
- **Actual Value**: The hex/rem value (e.g., `#E7EDF0`)

### **Organized Categories**
Controls are grouped into logical categories:
- **Design Tokens**: Colors, spacing, border radius
- **Component**: Variants, alignment, positioning

### **Visual Token Reference**
The **DesignTokens** story provides a complete visual reference of all available tokens with their names and values.

## 🔄 **Auto-Syncing Controls with Design Tokens**

### **The Problem**
By default, Storybook controls are hardcoded and won't automatically update when you update your design tokens with `npm run tokens:sync`.

### **The Solution**
We've created **multiple automation levels** to keep your Storybook controls in sync with your design tokens!

#### **Level 1: Reference Generation (Semi-Automatic)**
```bash
# 1. Update design tokens from Figma
npm run tokens:sync

# 2. Auto-generate Storybook controls (for reference)
npm run generate:controls

# 3. Manually copy new values to your stories
# (You still need to copy-paste)
```

#### **Level 2: Story Auto-Update (Mostly Automatic)**
```bash
# 1. Update design tokens from Figma
npm run tokens:sync

# 2. Auto-generate Storybook controls
npm run generate:controls

# 3. Auto-update your stories with latest controls
npm run auto:update

# 4. Start Storybook to see updated controls
npm run storybook
```

#### **Level 3: FULLY AUTOMATIC (No Manual Work)**
```bash
# ONE COMMAND DOES EVERYTHING:
npm run full:update

# This automatically:
# ✅ Syncs tokens from Figma
# ✅ Generates Storybook controls  
# ✅ Updates your stories
# ✅ NO MANUAL WORK REQUIRED!
```

## 🚀 **Fully Automatic Workflow (Recommended)**

### **What Happens Automatically**
1. **Token Sync**: Downloads latest tokens from Figma/design files
2. **Control Generation**: Creates reference controls from tokens
3. **Story Update**: Automatically updates your `stories/Dropdown.stories.tsx`
4. **Zero Manual Work**: Everything is handled by scripts

### **How to Use**
```bash
# After any design system changes, just run:
npm run full:update

# Then start Storybook:
npm run storybook
```

### **What Gets Auto-Updated**
- **Color Controls**: All new colors automatically added
- **Spacing Controls**: New spacing values automatically added
- **Border Radius Controls**: New radius values automatically added
- **Token Mappings**: Friendly names automatically updated
- **Story Controls**: All dropdown options automatically updated

## 🔧 **Manual vs Automatic Comparison**

### **Manual Process (Old Way)**
```bash
npm run tokens:sync          # ✅ Automatic
npm run generate:controls    # ✅ Automatic
# ❌ MANUAL: Copy new values to stories
# ❌ MANUAL: Update TOKEN_MAPPINGS
# ❌ MANUAL: Test controls work
```

### **Automatic Process (New Way)**
```bash
npm run full:update          # ✅ FULLY AUTOMATIC
npm run storybook            # ✅ Ready to use
# ✅ NO MANUAL WORK REQUIRED!
```

## 📋 **Available Commands**

### **`npm run full:update` (Recommended)**
- **What it does**: Everything automatically
- **When to use**: After any design system changes
- **Manual work**: None required

### **`npm run auto:update`**
- **What it does**: Updates stories with latest controls
- **When to use**: After running `npm run generate:controls`
- **Manual work**: Minimal (just run the command)

### **`npm run generate:controls`**
- **What it does**: Generates reference controls
- **When to use**: To see what tokens are available
- **Manual work**: You still need to copy values

### **`npm run tokens:sync`**
- **What it does**: Syncs tokens from Figma
- **When to use**: To get latest design tokens
- **Manual work**: You still need to update controls

## 🎯 **When to Use Each Command**

### **Use `npm run full:update` when:**
- 🎨 **Design tokens change** in Figma
- 🌈 **New colors are added** to your design system
- 📏 **Spacing scales are updated**
- 🔲 **Border radius values change**
- 📝 **Typography tokens are modified**
- 🔄 **Any design system updates** happen

### **Use `npm run auto:update` when:**
- You've already run `npm run tokens:sync`
- You've already run `npm run generate:controls`
- You just want to update your stories

### **Use `npm run generate:controls` when:**
- You want to see what tokens are available
- You're debugging token issues
- You want to manually copy specific values

## 🔄 **Workflow Examples**

### **Example 1: Designer Updates Colors**
```bash
# Designer says: "I added new primary colors"
npm run full:update
npm run storybook
# ✅ New colors automatically appear in your controls!
```

### **Example 2: New Spacing Scale**
```bash
# Design system now includes 24px spacing
npm run full:update
npm run storybook
# ✅ New spacing automatically appears in your controls!
```

### **Example 3: Weekly Updates**
```bash
# Every Monday, sync all changes
npm run full:update
npm run storybook
# ✅ All changes automatically synced!
```

## 💡 **Pro Tips**

### **1. Set Up Git Hooks**
```bash
# Add to your pre-commit hook
npm run full:update
git add stories/Dropdown.stories.tsx
```

### **2. CI/CD Integration**
```bash
# Add to your build pipeline
npm run full:update
npm run build-storybook
```

### **3. Regular Sync Schedule**
```bash
# Run daily/weekly to stay in sync
npm run full:update
```

## 🚨 **Important Notes**

### **What Gets Preserved**
- ✅ **Your story logic** (render functions, args, etc.)
- ✅ **Your component structure** (ExampleDropdown, etc.)
- ✅ **Your story variants** (Default, MultipleDropdowns, etc.)
- ✅ **Your token mappings** (friendly names, descriptions)

### **What Gets Updated**
- 🔄 **Control options** (new colors, spacing, etc.)
- 🔄 **Default values** (if tokens change)
- 🔄 **Token references** (latest from your design system)

### **Backup Strategy**
```bash
# Before running auto-update, backup your stories
cp stories/Dropdown.stories.tsx stories/Dropdown.stories.tsx.backup

# If something goes wrong, restore
cp stories/Dropdown.stories.tsx.backup stories/Dropdown.stories.tsx
```

---

## Available Controls

### 🎨 Color Controls

#### Border Color
- **`#E7EDF0`** → `--color-border-default (Default)`
- **`#C1E4FB`** → `--color-border-hover (Hover)`
- **`#0F3340`** → `--color-border-focus (Focus)`
- **`#909BAA`** → `--color-gray-600`
- **`#757575`** → `--color-gray-700`

#### Background Color
- **`#FFFFFF`** → `--color-gray-50 (White)`
- **`#F8FEFF`** → `--color-primary-50`
- **`#F6FCFF`** → `--color-gray-100`
- **`#F3F8FC`** → `--color-gray-200`
- **`#F0F6FA`** → `--color-gray-300`

#### Text Color
- **`#0F3340`** → `--color-text-primary (Primary)`
- **`#757575`** → `--color-text-secondary (Secondary)`
- **`#909BAA`** → `--color-text-tertiary (Tertiary)`
- **`#708497`** → `--color-text-muted (Muted)`
- **`#000000`** → `--color-gray-900 (Black)`

### 📏 Spacing Controls

#### Padding
- **`0.25rem`** → `--spacing-1 (XS - 4px)`
- **`0.5rem`** → `--spacing-2 (S - 8px)`
- **`0.75rem`** → `--spacing-3 (M - 12px)`
- **`1rem`** → `--spacing-4 (L - 16px)`
- **`1.5rem`** → `--spacing-6 (XL - 24px)`
- **`2rem`** → `--spacing-8 (2XL - 32px)`

### 🔲 Border Radius Controls

#### Border Radius
- **`0`** → `--border-radius-none (None)`
- **`0.125rem`** → `--border-radius-sm (Small)`
- **`0.25rem`** → `--border-radius-base (Base)`
- **`0.375rem`** → `--border-radius-md (Medium)`
- **`0.5rem`** → `--border-radius-lg (Large)`
- **`0.75rem`** → `--border-radius-xl (XL)`
- **`1rem`** → `--border-radius-2xl (2XL)`

### ⚙️ Component-Specific Controls

#### Trigger Variant
- **default**: Standard button appearance
- **outline**: Transparent background with border
- **ghost**: Minimal styling with hover effects
- **destructive**: Error/danger styling

#### Content Alignment
- **start**: Left-aligned content
- **center**: Center-aligned content
- **end**: Right-aligned content

#### Side Offset
- **Range**: 0-20px
- **Default**: 6px
- **Purpose**: Controls distance between trigger and dropdown content

## How to Use

### 1. Open Storybook
```bash
npm run storybook
```

### 2. Navigate to Dropdown Stories
- Go to **Actions/Dropdown** section
- Select any story variant

### 3. Use the Controls Panel
- **Right sidebar** contains all interactive controls
- **Real-time updates** as you change values
- **Reset to defaults** with the reset button
- **Token information** displayed for each control

### 4. View Token Reference
- Select the **DesignTokens** story
- See all available tokens with names, values, and visual examples
- Use this as a reference when building components

### 5. Experiment with Combinations
- Try different color schemes
- Test various spacing combinations
- Adjust border radius for different aesthetics
- Switch between component variants

## 🆕 **Enhanced Control Features**

### **Token Information Display**
Each control now shows:
```
Border Color: #E7EDF0
--color-border-default (Default) - Use this value in your CSS: #E7EDF0
```

### **Organized Control Groups**
- **Design Tokens**: All color, spacing, and radius controls
- **Component**: Variant, alignment, and positioning controls

### **Visual Token Reference**
The **DesignTokens** story provides:
- Color swatches for all available colors
- Spacing indicators with visual dots
- Border radius examples with actual shapes
- Complete token mapping reference

## Example Use Cases

### 🎯 Design System Validation
- Test if your color tokens work well together
- Verify spacing scales provide good visual hierarchy
- Ensure border radius values create consistent aesthetics
- **NEW**: See exactly which tokens you're using

### 🔍 Component Testing
- Test component behavior with different color schemes
- Verify accessibility with various color combinations
- Validate responsive behavior with different spacing
- **NEW**: Understand the relationship between tokens and values

### 🚀 Rapid Prototyping
- Quickly create design variations
- Test new color combinations
- Experiment with spacing adjustments
- **NEW**: Copy token names directly for use in your code

## Adding Controls to New Components

### 1. Define argTypes with Token Information
```typescript
argTypes: {
  borderColor: {
    control: { type: 'select' },
    options: ['#E7EDF0', '#C1E4FB', '#0F3340'],
    description: 'Border color from design tokens',
    defaultValue: '#E7EDF0',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '#E7EDF0 (--color-border-default)' },
      category: 'Design Tokens',
    },
  },
}
```

### 2. Use in Component
```typescript
function ExampleComponent({ borderColor, ...props }) {
  return (
    <div style={{ borderColor }}>
      {/* component content */}
    </div>
  )
}
```

### 3. Pass to Story
```typescript
export const Default: Story = {
  render: (args) => <ExampleComponent {...args} />,
  args: {
    borderColor: '#E7EDF0',
  },
}
```

## Best Practices

### ✅ Do's
- **Use design tokens** for all control values
- **Provide meaningful descriptions** for each control
- **Set sensible defaults** that match your design system
- **Group related controls** logically
- **Test edge cases** with extreme values
- **NEW**: Include token names in descriptions

### ❌ Don'ts
- **Don't hardcode values** that aren't in your design system
- **Don't create too many controls** - focus on key properties
- **Don't forget accessibility** - test color combinations
- **Don't ignore performance** - avoid expensive computations in controls
- **Don't forget token context** - always show which token is being used

## Troubleshooting

### Controls Not Showing?
- Check if `@storybook/addon-controls` is installed
- Verify `addons` array in `.storybook/main.ts`
- Ensure component props are properly typed

### Values Not Updating?
- Check if component uses the prop values
- Verify `args` are passed correctly
- Ensure no CSS overrides are blocking changes

### Token Names Not Displaying?
- Verify `table` property is set in `argTypes`
- Check that `category` is properly set
- Ensure `defaultValue.summary` includes token information

### Performance Issues?
- Limit the number of controls per story
- Use `useMemo` for expensive computations
- Avoid complex state management in controls

## Next Steps

1. **Add controls to other components** following the same pattern
2. **Create custom control types** for complex properties
3. **Build design system validation** using these controls
4. **Document design patterns** discovered through experimentation
5. **NEW**: Extend token mapping to other component libraries

---

For more information, see the [Storybook Controls documentation](https://storybook.js.org/docs/essentials/controls).
