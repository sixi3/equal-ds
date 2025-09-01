/**
 * Simple Control Generators
 * Generate Storybook controls from token registry
 */

import { DesignToken, getColorTokens, getTypographyTokens, getSpacingTokens, getBorderTokens, getShadowTokens } from './tokenRegistry'

export interface StorybookControl {
  control: string | {
    type: string
    options?: string[]
  }
  options?: string[]
  description?: string
  table?: {
    category?: string
  }
}

export interface StorybookArgTypes {
  [key: string]: StorybookControl
}

export interface StorybookArgs {
  [key: string]: any
}

/**
 * Generate color controls with access to ALL color tokens
 */
export function generateColorControls(): StorybookArgTypes {
  const colorTokens = getColorTokens()
  const colorOptions = colorTokens.map(token => token.cssVariable)

  return {
    backgroundColor: {
      control: 'select',
      options: colorOptions,
      description: 'Background color using design system tokens',
      table: { category: 'Colors' }
    },
    textColor: {
      control: 'select',
      options: colorOptions,
      description: 'Text color using design system tokens',
      table: { category: 'Colors' }
    },
    borderColor: {
      control: 'select',
      options: colorOptions,
      description: 'Border color using design system tokens',
      table: { category: 'Colors' }
    },
    hoverBackgroundColor: {
      control: 'select',
      options: colorOptions,
      description: 'Background color on hover',
      table: { category: 'Colors' }
    },
    hoverTextColor: {
      control: 'select',
      options: colorOptions,
      description: 'Text color on hover',
      table: { category: 'Colors' }
    },
    hoverBorderColor: {
      control: 'select',
      options: colorOptions,
      description: 'Border color on hover',
      table: { category: 'Colors' }
    }
  }
}

/**
 * Generate typography controls
 */
export function generateTypographyControls(): StorybookArgTypes {
  const typographyTokens = getTypographyTokens()

  // Font size controls
  const fontSizeTokens = typographyTokens.filter(t => t.category === 'font-size')
  const fontSizeOptions = fontSizeTokens.map(token => token.cssVariable)

  // Font weight controls
  const fontWeightTokens = typographyTokens.filter(t => t.category === 'font-weight')
  const fontWeightOptions = fontWeightTokens.map(token => token.cssVariable)

  // Line height controls
  const lineHeightTokens = typographyTokens.filter(t => t.category === 'line-height')
  const lineHeightOptions = lineHeightTokens.map(token => token.cssVariable)

  return {
    fontSize: {
      control: 'select',
      options: fontSizeOptions,
      description: 'Font size using design system tokens',
      table: { category: 'Typography' }
    },
    fontWeight: {
      control: 'select',
      options: fontWeightOptions,
      description: 'Font weight using design system tokens',
      table: { category: 'Typography' }
    },
    lineHeight: {
      control: 'select',
      options: lineHeightOptions,
      description: 'Line height using design system tokens',
      table: { category: 'Typography' }
    },
    letterSpacing: {
      control: 'select',
      options: getTypographyTokens().filter(t => t.category === 'letter-spacing').map(t => t.cssVariable).length > 0
        ? getTypographyTokens().filter(t => t.category === 'letter-spacing').map(t => t.cssVariable)
        : [
            '-0.05em', // Tight
            '-0.025em', // Tight
            '0em', // Normal
            '0.025em', // Wide
            '0.05em', // Wide
            '0.1em' // Extra Wide
          ],
      description: 'Letter spacing for dropdown trigger text',
      table: { category: 'Typography' }
    }
  }
}

/**
 * Generate spacing controls
 */
export function generateSpacingControls(): StorybookArgTypes {
  const spacingTokens = getSpacingTokens()
  const spacingOptions = spacingTokens.map(token => token.cssVariable)

  return {
    padding: {
      control: 'select',
      options: spacingOptions,
      description: 'Padding using design system tokens',
      table: { category: 'Spacing' }
    },
    margin: {
      control: 'select',
      options: spacingOptions,
      description: 'Margin using design system tokens',
      table: { category: 'Spacing' }
    },
    gap: {
      control: 'select',
      options: spacingOptions,
      description: 'Gap between elements',
      table: { category: 'Spacing' }
    }
  }
}

/**
 * Generate border controls
 */
export function generateBorderControls(): StorybookArgTypes {
  const borderTokens = getBorderTokens()
  const borderRadiusOptions = borderTokens.map(token => token.cssVariable)

  return {
    borderRadius: {
      control: 'select',
      options: borderRadiusOptions,
      description: 'Border radius using design system tokens',
      table: { category: 'Borders' }
    },
    borderWidth: {
      control: 'select',
      options: ['0px', '1px', '2px', '3px', '4px', '5px'],
      description: 'Border width',
      table: { category: 'Borders' }
    },
    borderStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'none'],
      description: 'Border style',
      table: { category: 'Borders' }
    },
    borderBottomWidth: {
      control: 'select',
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border bottom width',
      table: { category: 'Borders' }
    },
    hoverBorderBottomWidth: {
      control: 'select',
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border bottom width on hover',
      table: { category: 'Hover Border Controls' }
    }
  }
}

/**
 * Generate shadow controls
 */
export function generateShadowControls(): StorybookArgTypes {
  const shadowTokens = getShadowTokens()
  const shadowOptions = shadowTokens.map(token => token.cssVariable)

  return {
    boxShadow: {
      control: 'select',
      options: shadowOptions,
      description: 'Box shadow using design system tokens',
      table: { category: 'Shadows' }
    },
    hoverBoxShadow: {
      control: 'select',
      options: shadowOptions,
      description: 'Box shadow on hover',
      table: { category: 'Shadows' }
    }
  }
}

/**
 * Generate component-specific controls for Dropdown
 */
export function generateDropdownControls(): StorybookArgTypes {
  return {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost', 'primary', 'destructive'],
      description: 'Dropdown trigger variant',
      table: { category: 'Component' }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dropdown size',
      table: { category: 'Component' }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
      table: { category: 'Component' }
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label',
      table: { category: 'Component' }
    },

    // Label Typography Controls
    labelFontSize: {
      control: 'select',
      options: getTypographyTokens().filter(t => t.category === 'font-size').map(t => t.cssVariable),
      description: 'Font size for the label text',
      table: { category: 'Label Typography' }
    },
    labelFontWeight: {
      control: 'select',
      options: getTypographyTokens().filter(t => t.category === 'font-weight').map(t => t.cssVariable),
      description: 'Font weight for the label text',
      table: { category: 'Label Typography' }
    },
    labelLetterSpacing: {
      control: 'select',
      options: getTypographyTokens().filter(t => t.category === 'letter-spacing').map(t => t.cssVariable).length > 0
        ? getTypographyTokens().filter(t => t.category === 'letter-spacing').map(t => t.cssVariable)
        : [
            '-0.05em', // Tight
            '-0.025em', // Tight
            '0em', // Normal
            '0.025em', // Wide
            '0.05em', // Wide
            '0.1em' // Extra Wide
          ],
      description: 'Letter spacing for the label text',
      table: { category: 'Label Typography' }
    },
    labelTextColor: {
      control: 'select',
      options: getColorTokens().map(t => t.cssVariable),
      description: 'Text color for the label',
      table: { category: 'Label Typography' }
    }
  }
}

/**
 * Generate all controls for a component
 */
export function generateAllControls(componentType: 'dropdown' | 'button' | 'input' | 'general' = 'general'): {
  argTypes: StorybookArgTypes
  args: StorybookArgs
} {
  let argTypes: StorybookArgTypes = {}

  // Always include color controls (users need access to ALL color tokens)
  argTypes = { ...argTypes, ...generateColorControls() }

  // Include typography controls
  argTypes = { ...argTypes, ...generateTypographyControls() }

  // Include spacing controls
  argTypes = { ...argTypes, ...generateSpacingControls() }

  // Include border controls
  argTypes = { ...argTypes, ...generateBorderControls() }

  // Include shadow controls
  argTypes = { ...argTypes, ...generateShadowControls() }

  // Include component-specific controls
  if (componentType === 'dropdown') {
    argTypes = { ...argTypes, ...generateDropdownControls() }
  }

  // Default args (can be overridden by story-specific args)
  const args: StorybookArgs = {
    backgroundColor: '--color-background-secondary',
    textColor: '--color-text-primary',
    borderColor: '--color-border-default',
    fontSize: '--typography-fontSize-base',
    fontWeight: '--typography-fontWeight-normal',
    lineHeight: '--typography-lineHeight-normal',
    letterSpacing: '0em',
    padding: '--spacing-2',
    borderRadius: '--border-radius-base',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomWidth: '1px',
    hoverBorderBottomWidth: '1px',
    boxShadow: '--shadow-sm'
  }

  // Component-specific defaults
  if (componentType === 'dropdown') {
    args.variant = 'default'
    args.size = 'md'
    args.disabled = false
    args.showLabel = true
    // Label typography defaults
    args.labelFontSize = '--typography-fontSize-sm'
    args.labelFontWeight = '--typography-fontWeight-medium'
    args.labelLetterSpacing = '0em' // Use fallback value
    args.labelTextColor = '--color-text-secondary'
  }

  return { argTypes, args }
}

/**
 * Helper to create Storybook meta configuration
 */
export function createStorybookMeta(title: string, componentType: 'dropdown' | 'button' | 'input' | 'general' = 'general') {
  const { argTypes, args } = generateAllControls(componentType)

  return {
    title,
    argTypes,
    args,
    parameters: {
      controls: {
        expanded: true,
        sort: 'requiredFirst'
      }
    }
  }
}
