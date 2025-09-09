# 🎯 Storybook Story Export Template

## 📋 Export Checklist
Use this checklist when exporting any Storybook story as a reusable component:

### Pre-Export Analysis
- [ ] **Identify the target story** from `stories/[Component].stories.tsx`
- [ ] **Review story dependencies** - note all imports and external libraries
- [ ] **Check component complexity** - identify reusable parts vs story-specific code
- [ ] **Verify design system usage** - ensure all components come from the design system
- [ ] **Check for shared dependencies** - identify utilities/configs/styles that already exist in `shared/`
- [ ] **Avoid redundancy** - only create component-specific files, import shared dependencies

### Export Structure
Create these files in `finpro-components/[component-name]/`:
- [ ] `finpro-components/[component-name]/[ComponentName].tsx` (main component)
- [ ] `finpro-components/[component-name]/[component-name]-config.ts` (component-specific configuration only)
- [ ] `finpro-components/[component-name]/[component-name]-styles.css` (component-specific styles only)
- [ ] `finpro-components/[component-name]/[ComponentName]Examples.tsx` (examples)
- [ ] `finpro-components/[component-name]/README.md` (documentation)

**Shared Dependencies (import from existing):**
- [ ] Import utilities from `../shared/utils/` (trigger-styles, hover-animations, formatters)
- [ ] Import configs from `../shared/config/` (common-styles, common-constants, status-configs)
- [ ] Import styles from `../shared/styles/` (common-animations, common-hover-effects, common-transitions)

---

## 🚀 EXPORT PROCESS

### Step 1: Story Analysis
**INPUT:** `stories/[OriginalStory].stories.tsx`

**TASK:** Analyze the story structure and extract:
- Component logic from render functions
- Props interface and default values
- State management patterns
- Event handlers and callbacks
- External dependencies (icons, utilities)

### Step 2: Component Creation
**OUTPUT:** `finpro-components/[component-name]/[ComponentName].tsx`

**REQUIREMENTS:**
```typescript
// ✅ CORRECT: Package-level imports only
import { Component, TypeName } from '../../../src'
import { ExternalIcon } from 'lucide-react'

// ❌ WRONG: Source path imports (won't work in published package)
import { Component } from '../../../src/components'
```

**TEMPLATE:**
```typescript
import React from 'react'
// IMPORT ALL DEPENDENCIES USING PACKAGE-LEVEL IMPORTS
import { /* components */ } from '../../../src'
import { /* external deps */ } from 'external-package'

// IMPORT SHARED DEPENDENCIES
import { createTriggerStyles } from '../shared/utils/trigger-styles'
import { COMMON_STYLE_VARS } from '../shared/config/common-styles'
import '../shared/styles/common-animations.css'

export interface [ComponentName]Props {
  // Define all props with proper TypeScript types
  className?: string
  // ... other props
}

export const [ComponentName]: React.FC<[ComponentName]Props> = ({
  className = '',
  // ... other props with defaults
}) => {
  // Component implementation using shared utilities
  return (
    // JSX structure from story
  )
}
```

### Step 3: Configuration Extraction
**OUTPUT:** `finpro-components/[component-name]/[component-name]-config.ts`

**SHARED CONFIGS TO IMPORT:**
- `../shared/config/common-styles.ts` - Common style variables
- `../shared/config/common-constants.ts` - Common constants
- `../shared/config/status-configs.ts` - Status configurations

**ONLY CREATE COMPONENT-SPECIFIC CONFIG:**
- Component-specific data arrays
- Component-specific default values
- Component-specific constants
- Component-specific configuration objects

**TEMPLATE:**
```typescript
// IMPORT SHARED CONFIGURATIONS
import { COMMON_STYLE_VARS } from '../shared/config/common-styles'
import { STATUS_CONFIGS } from '../shared/config/status-configs'

// Component-specific configuration data
export const [COMPONENT_NAME]_CONFIG = {
  // Extract component-specific static data from story
}

// Component-specific default values
export const [COMPONENT_NAME]_DEFAULTS = {
  // Default prop values specific to this component
}

// Component-specific constants
export const [COMPONENT_NAME]_CONSTANTS = {
  // Magic numbers, strings, etc. specific to this component
}
```

### Step 4: Shared Dependencies Check
**TASK:** Check for existing shared utilities before creating new ones

**SHARED UTILITIES TO CHECK:**
- `../shared/utils/trigger-styles.ts` - Hover effects and trigger styling
- `../shared/utils/hover-animations.ts` - Animation utilities
- `../shared/utils/formatters.ts` - Text formatting functions
- `../shared/config/common-styles.ts` - Common style variables
- `../shared/config/status-configs.ts` - Status badge configurations
- `../shared/styles/common-animations.css` - Shared animations
- `../shared/styles/common-hover-effects.css` - Shared hover styles

**ONLY CREATE COMPONENT-SPECIFIC UTILITIES:**
- Component-specific helper functions
- Component-specific calculations
- Component-specific formatters not covered by shared

### Step 5: Styling
**OUTPUT:** `finpro-components/[component-name]/[component-name]-styles.css`

**SHARED STYLES TO IMPORT:**
- `../shared/styles/common-animations.css` - Shared animations
- `../shared/styles/common-hover-effects.css` - Shared hover effects
- `../shared/styles/common-transitions.css` - Shared transitions

**ONLY CREATE COMPONENT-SPECIFIC STYLES:**
- Component-specific CSS custom properties
- Component-specific layout styles
- Component-specific responsive breakpoints
- Component-specific visual treatments not covered by shared

### Step 6: Examples
**OUTPUT:** `finpro-components/[component-name]/[ComponentName]Examples.tsx`

**CONTENT:**
- Basic usage example
- Advanced configuration example
- Multiple variation examples

### Step 7: Documentation
**OUTPUT:** `finpro-components/[component-name]/README.md`

**CONTENT:**
- Component description
- Installation instructions
- Props documentation
- Usage examples
- Customization guide

### Step 8: Package Integration
**UPDATE:** `src/index.ts`

**ADD:**
```typescript
// Export the new component
export { [ComponentName] } from '../finpro-components/[component-name]/[ComponentName]'
```

---

## 🔍 CRITICAL VALIDATION STEPS

### Import Verification
- [ ] **NO source path imports** (`../../../src/components`)
- [ ] **ALL imports use package-level paths**
- [ ] **External dependencies properly imported**

### Type Safety
- [ ] **TypeScript interfaces defined**
- [ ] **All props properly typed**
- [ ] **Works in JavaScript (.jsx) files**

### Build Validation
- [ ] **Build passes**: `npm run build` ✅
- [ ] **No TypeScript errors**
- [ ] **No missing dependencies**

### Context Testing
- [ ] **Test in TypeScript project**
- [ ] **Test in JavaScript project**
- [ ] **Verify package.json exports**

---

## 🎯 EXECUTION COMMAND

**"Export the '[StoryName]' story from `stories/[Component].stories.tsx` as a reusable component following the export checklist above. Create only component-specific files in `finpro-components/[component-name]/`, import shared dependencies from `../shared/`, and ensure full JavaScript compatibility with package-level imports only."**

---

## 🚨 COMMON PITFALLS TO AVOID

### ❌ Context Confusion
- **Problem**: Using development imports in consumption context
- **Solution**: Always use package-level imports (`../../../src`)

### ❌ Type Boundary Issues
- **Problem**: TypeScript types in JavaScript files
- **Solution**: Export types properly or avoid type-only imports

### ❌ Source Dependencies
- **Problem**: Importing unpublished source files
- **Solution**: Only import from published package exports

### ❌ Mixed Implementation
- **Problem**: Story-specific code mixed with reusable logic
- **Solution**: Extract story wrappers, keep core logic pure

### ❌ Redundant File Creation
- **Problem**: Creating duplicate utilities/configs/styles across components
- **Solution**: Check shared dependencies first, only create component-specific files

---

## 📝 USAGE INSTRUCTIONS

1. **Attach this file** to your AI assistant context
2. **Attach the target story file** (`stories/[Component].stories.tsx`)
3. **Use the execution command** above
4. **Follow the export checklist** step by step
5. **Validate** using the critical validation steps

This ensures consistent, production-ready component exports every time! 🎉
