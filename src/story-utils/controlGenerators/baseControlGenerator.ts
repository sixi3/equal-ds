import { 
  ColorToken, 
  TypographyToken, 
  SpacingToken, 
  BorderToken,
  ShadowToken,
  TransitionToken,
  TransformToken
} from '../designSystemParser'

// Storybook control types
export interface StorybookControl {
  control: {
    type: 'select' | 'text' | 'boolean' | 'number' | 'range' | 'radio' | 'object' | 'color'
    min?: number
    max?: number
    step?: number
    accept?: string
  }
  options?: string[]
  mapping?: Record<string, string>
  description?: string
  table?: {
    category?: string
    subcategory?: string
    type?: { summary: string; detail?: string }
    defaultValue?: { summary: string; detail?: string }
  }
  defaultValue?: any
}

// Component control types
export interface ComponentControls {
  [key: string]: StorybookControl
}

// Base control generator interface
export abstract class BaseControlGenerator {
  /**
   * Generate a control for a specific token
   */
  abstract generateControl(token: any): StorybookControl

  /**
   * Create a select control with options
   */
  protected createSelectControl(
    options: string[], 
    description?: string, 
    category: string = 'Design System',
    defaultValue?: string
  ): StorybookControl {
    return {
      control: { type: 'select' },
      options: options,
      description: description,
      defaultValue: defaultValue || options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a color control with proper mapping
   */
  protected createColorControl(
    colors: ColorToken[], 
    description?: string, 
    category: string = 'Colors'
  ): StorybookControl {
    const options = colors.map(color => color.cssVariable)
    const mapping = colors.reduce((acc, color) => {
      acc[`${color.purpose} (${color.value})`] = color.cssVariable
      return acc
    }, {} as Record<string, string>)

    return {
      control: { type: 'select' },
      options: options,
      mapping: mapping,
      description: description || 'Select color from design system',
      defaultValue: options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a range control for numeric values
   */
  protected createRangeControl(
    min: number, 
    max: number, 
    step: number = 1, 
    description?: string, 
    category: string = 'Design System'
  ): StorybookControl {
    return {
      control: { 
        type: 'range', 
        min, 
        max, 
        step 
      },
      description: description || `Value between ${min} and ${max}`,
      defaultValue: min,
      table: { 
        category,
        type: { summary: 'number' }
      }
    }
  }

  /**
   * Create a boolean control
   */
  protected createBooleanControl(
    description?: string, 
    category: string = 'Design System',
    defaultValue: boolean = true
  ): StorybookControl {
    return {
      control: { type: 'boolean' },
      description: description || 'Enable or disable this feature',
      defaultValue,
      table: { 
        category,
        type: { summary: 'boolean' }
      }
    }
  }

  /**
   * Create a text control
   */
  protected createTextControl(
    description?: string, 
    category: string = 'Design System',
    defaultValue?: string
  ): StorybookControl {
    return {
      control: { type: 'text' },
      description: description || 'Enter custom text',
      defaultValue,
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a number control
   */
  protected createNumberControl(
    description?: string, 
    category: string = 'Design System',
    defaultValue?: number
  ): StorybookControl {
    return {
      control: { type: 'number' },
      description: description || 'Enter a numeric value',
      defaultValue,
      table: { 
        category,
        type: { summary: 'number' }
      }
    }
  }

  /**
   * Create an object control for complex values
   */
  protected createObjectControl(
    description?: string, 
    category: string = 'Design System',
    defaultValue?: any
  ): StorybookControl {
    return {
      control: { type: 'object' },
      description: description || 'Configure complex object values',
      defaultValue,
      table: { 
        category,
        type: { summary: 'object' }
      }
    }
  }

  /**
   * Create a radio control for small option sets
   */
  protected createRadioControl(
    options: string[], 
    description?: string, 
    category: string = 'Design System',
    defaultValue?: string
  ): StorybookControl {
    return {
      control: { type: 'radio' },
      options: options,
      description: description || 'Select one option',
      defaultValue: defaultValue || options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a color picker control
   */
  protected createColorPickerControl(
    description?: string, 
    category: string = 'Colors',
    defaultValue?: string
  ): StorybookControl {
    return {
      control: { type: 'color' },
      description: description || 'Pick a custom color',
      defaultValue,
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a file input control
   */
  protected createFileControl(
    accept: string = '*/*',
    description?: string, 
    category: string = 'Design System'
  ): StorybookControl {
    return {
      control: { 
        type: 'object',
        accept 
      },
      description: description || 'Select a file',
      table: { 
        category,
        type: { summary: 'File' }
      }
    }
  }

  /**
   * Create a control with custom table configuration
   */
  protected createControlWithTable(
    control: Partial<StorybookControl>,
    table: StorybookControl['table']
  ): StorybookControl {
    return {
      ...control,
      table: {
        ...control.table,
        ...table
      }
    } as StorybookControl
  }

  /**
   * Create a control group for related properties
   */
  protected createControlGroup(
    controls: Record<string, StorybookControl>,
    groupName: string,
    groupDescription?: string
  ): Record<string, StorybookControl> {
    const groupedControls: Record<string, StorybookControl> = {}
    
    Object.entries(controls).forEach(([key, control]) => {
      groupedControls[key] = {
        ...control,
        table: {
          ...control.table,
          category: groupName,
          subcategory: control.table?.category || 'Properties'
        }
      }
    })

    return groupedControls
  }

  /**
   * Create a responsive control that adapts to different breakpoints
   */
  protected createResponsiveControl(
    baseControl: StorybookControl,
    breakpoints: string[] = ['xs', 'sm', 'md', 'lg', 'xl']
  ): Record<string, StorybookControl> {
    const responsiveControls: Record<string, StorybookControl> = {}
    
    breakpoints.forEach(breakpoint => {
      responsiveControls[`${breakpoint}${baseControl.control.type === 'select' ? 'Options' : 'Value'}`] = {
        ...baseControl,
        description: `${baseControl.description} for ${breakpoint.toUpperCase()} breakpoint`,
        table: {
          ...baseControl.table,
          category: `${baseControl.table?.category || 'Design System'} (${breakpoint.toUpperCase()})`
        }
      }
    })

    return responsiveControls
  }

  /**
   * Create an interactive state control (hover, focus, active)
   */
  protected createInteractiveStateControl(
    state: 'hover' | 'focus' | 'active' | 'disabled',
    baseControl: StorybookControl
  ): StorybookControl {
    return {
      ...baseControl,
      description: `${baseControl.description} for ${state} state`,
      table: {
        ...baseControl.table,
        category: `${baseControl.table?.category || 'Design System'} (${state.charAt(0).toUpperCase() + state.slice(1)})`
      }
    }
  }

  /**
   * Create a variant control for different component styles
   */
  protected createVariantControl(
    variants: string[],
    description?: string,
    category: string = 'Variants'
  ): StorybookControl {
    return this.createSelectControl(
      variants,
      description || 'Select component variant',
      category,
      variants[0]
    )
  }

  /**
   * Create a size control for component dimensions
   */
  protected createSizeControl(
    sizes: string[],
    description?: string,
    category: string = 'Sizing'
  ): StorybookControl {
    return this.createSelectControl(
      sizes,
      description || 'Select component size',
      category,
      sizes[0]
    )
  }

  /**
   * Create a spacing control using design system values
   */
  protected createSpacingControl(
    spacingTokens: SpacingToken[],
    description?: string,
    category: string = 'Spacing'
  ): StorybookControl {
    const options = spacingTokens.map(token => token.value)
    const mapping = spacingTokens.reduce((acc, token) => {
      acc[`${token.purpose} (${token.value})`] = token.value
      return acc
    }, {} as Record<string, string>)

    return {
      control: { type: 'select' },
      options: options,
      mapping: mapping,
      description: description || 'Select spacing from design system',
      defaultValue: options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a typography control using design system values
   */
  protected createTypographyControl(
    typographyTokens: TypographyToken[],
    description?: string,
    category: string = 'Typography'
  ): StorybookControl {
    const options = typographyTokens.map(token => token.value)
    const mapping = typographyTokens.reduce((acc, token) => {
      acc[`${token.purpose} (${token.value})`] = token.value
      return acc
    }, {} as Record<string, string>)

    return {
      control: { type: 'select' },
      options: options,
      mapping: mapping,
      description: description || 'Select typography from design system',
      defaultValue: options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a border control using design system values
   */
  protected createBorderControl(
    borderTokens: BorderToken[],
    description?: string,
    category: string = 'Borders'
  ): StorybookControl {
    const options = borderTokens.map(token => token.value)
    const mapping = borderTokens.reduce((acc, token) => {
      acc[`${token.purpose} (${token.value})`] = token.value
      return acc
    }, {} as Record<string, string>)

    return {
      control: { type: 'select' },
      options: options,
      mapping: mapping,
      description: description || 'Select border style from design system',
      defaultValue: options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a shadow control using design system values
   */
  protected createShadowControl(
    shadowTokens: ShadowToken[],
    description?: string,
    category: string = 'Shadows'
  ): StorybookControl {
    const options = shadowTokens.map(token => token.value)
    const mapping = shadowTokens.reduce((acc, token) => {
      acc[`${token.purpose} (${token.value})`] = token.value
      return acc
    }, {} as Record<string, string>)

    return {
      control: { type: 'select' },
      options: options,
      mapping: mapping,
      description: description || 'Select shadow from design system',
      defaultValue: options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create shadow displacement controls for X, Y, Z axes
   */
  protected createShadowDisplacementControls(description?: string, category?: string): StorybookControl[] {
    return [
      {
        name: 'shadowX',
        type: 'range',
        control: {
          type: 'range',
          min: -50,
          max: 50,
          step: 1,
          unit: 'px'
        },
        description: description || 'Horizontal shadow offset (X-axis)',
        category: category || 'shadow'
      },
      {
        name: 'shadowY',
        type: 'range',
        control: {
          type: 'range',
          min: -50,
          max: 50,
          step: 1,
          unit: 'px'
        },
        description: description || 'Vertical shadow offset (Y-axis)',
        category: category || 'shadow'
      },
      {
        name: 'shadowZ',
        type: 'range',
        control: {
          type: 'range',
          min: -20,
          max: 20,
          step: 1,
          unit: 'px'
        },
        description: description || 'Shadow blur radius (Z-axis)',
        category: category || 'shadow'
      }
    ]
  }

  /**
   * Create shadow color control
   */
  protected createShadowColorControl(description?: string, category?: string): StorybookControl {
    return {
      name: 'shadowColor',
      type: 'color',
      control: {
        type: 'color'
      },
      description: description || 'Shadow color',
      category: category || 'shadow'
    }
  }

  /**
   * Create shadow opacity control
   */
  protected createShadowOpacityControl(description?: string, category?: string): StorybookControl {
    return {
      name: 'shadowOpacity',
      type: 'range',
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.05
      },
      description: description || 'Shadow opacity (0-1)',
      category: category || 'shadow'
    }
  }

  /**
   * Create preset shadow control
   */
  protected createPresetShadowControl(shadows: any[], description?: string, category?: string): StorybookControl {
    const options = shadows.map(shadow => ({
      label: shadow.name.replace('shadow-', '').toUpperCase(),
      value: shadow.cssVariable
    }))

    return {
      name: 'shadowPreset',
      type: 'select',
      control: {
        type: 'select',
        options: options.map(opt => opt.value)
      },
      description: description || 'Choose from preset shadow styles',
      category: category || 'shadow'
    }
  }

  /**
   * Create a transition control using design system values
   */
  protected createTransitionControl(
    transitionTokens: TransitionToken[],
    description?: string,
    category: string = 'Transitions'
  ): StorybookControl {
    const options = transitionTokens.map(token => token.value)
    const mapping = transitionTokens.reduce((acc, token) => {
      acc[`${token.purpose} (${token.value})`] = token.value
      return acc
    }, {} as Record<string, string>)

    return {
      control: { type: 'select' },
      options: options,
      mapping: mapping,
      description: description || 'Select transition from design system',
      defaultValue: options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }

  /**
   * Create a transform control using design system values
   */
  protected createTransformControl(
    transformTokens: TransformToken[],
    description?: string,
    category: string = 'Transforms'
  ): StorybookControl {
    const options = transformTokens.map(token => token.value)
    const mapping = transformTokens.reduce((acc, token) => {
      acc[`${token.purpose} (${token.value})`] = token.value
      return acc
    }, {} as Record<string, string>)

    return {
      control: { type: 'select' },
      options: options,
      mapping: mapping,
      description: description || 'Select transform from design system',
      defaultValue: options[0],
      table: { 
        category,
        type: { summary: 'string' }
      }
    }
  }
}
