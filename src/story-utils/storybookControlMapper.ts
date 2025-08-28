/**
 * Storybook Control Mapper
 * Converts our control definitions into actual Storybook controls
 */

import { StorybookControl, ControlGroup, ComponentControls } from './controlGenerators/designSystemControlGenerator'

export interface MappedStorybookControl {
  [key: string]: {
    control: {
      type: string
      options?: any[]
      min?: number
      max?: number
      step?: number
      presetColors?: string[]
    }
    description?: string
    table?: {
      category: string
      subcategory?: string
    }
    options?: any[] // Add options property for Storybook compatibility
  }
}

export interface MappedStorybookControls {
  argTypes: MappedStorybookControl
  args: Record<string, any>
}

export class StorybookControlMapper {
  /**
   * Convert our control definitions to Storybook format
   */
  static mapToStorybookControls(componentControls: ComponentControls): MappedStorybookControls {
    const argTypes: MappedStorybookControl = {}
    const args: Record<string, any> = {}

    // Process each control group
    componentControls.groups.forEach(group => {
      group.controls.forEach(control => {
        const controlName = control.name
        
        // Map control type to Storybook control type
        const storybookControlType = this.mapControlType(control.type)
        
        // Create the control definition
        argTypes[controlName] = {
          control: {
            type: storybookControlType,
            ...this.getControlOptions(control)
          },
          description: control.description,
          table: {
            category: group.name,
            subcategory: control.category
          }
        }

        // For select controls, ensure options are in the correct Storybook format
        if (control.type === 'select' && control.options && control.options.length > 0) {
          // Storybook select control expects options in control.options
          // Use the values directly for the select control
          argTypes[controlName].control.options = control.options.map(opt => opt.value)
          
          // Also add at top level for some Storybook versions
          argTypes[controlName].options = control.options.map(opt => opt.value)
        }

        // Set default value
        args[controlName] = this.getDefaultValue(control)
      })
    })

    return { argTypes, args }
  }

  /**
   * Map our control types to Storybook control types
   */
  private static mapControlType(type: string): string {
    switch (type) {
      case 'select':
        return 'select'
      case 'color':
        return 'color'
      case 'range':
        return 'range'
      case 'boolean':
        return 'boolean'
      case 'text':
        return 'text'
      case 'number':
        return 'number'
      case 'object':
        return 'object'
      case 'radio':
        return 'radio'
      case 'file':
        return 'file'
      default:
        return 'text'
    }
  }

  /**
   * Get control-specific options
   */
  private static getControlOptions(control: StorybookControl): any {
    const options: any = {}

    // Add range control options
    if (control.control?.min !== undefined) options.min = control.control.min
    if (control.control?.max !== undefined) options.max = control.control.max
    if (control.control?.step !== undefined) options.step = control.control.step

    // Add select control options
    if (control.options && control.options.length > 0) {
      options.options = control.options
    }

    // Add color control options
    if (control.control?.presetColors) {
      options.presetColors = control.control.presetColors
    }

    return options
  }

  /**
   * Get default value for a control
   */
  private static getDefaultValue(control: StorybookControl): any {
    // For select controls with options, use the first option
    if (control.type === 'select' && control.options && control.options.length > 0) {
      return control.options[0].value
    }

    // For boolean controls, default to false
    if (control.type === 'boolean') {
      return false
    }

    // For range controls, use middle value
    if (control.type === 'range' && control.control?.min !== undefined && control.control?.max !== undefined) {
      const min = control.control.min
      const max = control.control.max
      return Math.round((min + max) / 2)
    }

    // For text controls, provide sensible defaults
    if (control.name === 'width') return '100%'
    if (control.name === 'height') return 'auto'
    if (control.name === 'padding') return 'var(--spacing-2)'
    if (control.name === 'margin') return '0'
    if (control.name === 'gap') return 'var(--spacing-2)'
    if (control.name === 'borderRadius') return 'var(--radius)'
    if (control.name === 'borderWidth') return '1px'
    if (control.name === 'borderStyle') return 'solid'
    if (control.name === 'boxShadow') return 'var(--shadow-sm)'
    if (control.name === 'shadowDisplacementX') return 0
    if (control.name === 'shadowDisplacementY') return 2
    if (control.name === 'shadowOpacity') return 0.1

    // For color controls, use design system defaults
    if (control.name.includes('Color')) {
      if (control.name.includes('Background')) return 'var(--gray-50)'
      if (control.name.includes('Text')) return 'var(--text-primary)'
      if (control.name.includes('Border')) return 'var(--border-light)'
      if (control.name.includes('Hover')) return 'var(--primary-50)'
    }

    // For typography controls, use design system defaults
    if (control.name === 'fontSize') return 'var(--font-size-base)'
    if (control.name === 'fontWeight') return 'var(--font-weight-normal)'
    if (control.name === 'lineHeight') return 'var(--line-height-normal)'
    if (control.name === 'letterSpacing') return 'var(--letter-spacing-normal)'

    // Default fallback
    return ''
  }

  /**
   * Create a simplified control set for specific use cases
   */
  static createSimplifiedControls(componentControls: ComponentControls, categories: string[]): MappedStorybookControls {
    const filteredGroups = componentControls.groups.filter(group => 
      categories.includes(group.name.toLowerCase())
    )

    const simplifiedControls: ComponentControls = {
      groups: filteredGroups,
      allControls: filteredGroups.flatMap(group => group.controls)
    }

    return this.mapToStorybookControls(simplifiedControls)
  }

  /**
   * Create controls for a specific component type
   */
  static createComponentControls(componentName: string, includeCategories: string[] = []): MappedStorybookControls {
    // This would be used with the DesignSystemControlGenerator
    // For now, return empty controls - will be implemented when we integrate
    return {
      argTypes: {},
      args: {}
    }
  }

  /**
   * Get control summary for debugging
   */
  static getControlSummary(componentControls: ComponentControls): string {
    const summary = {
      totalGroups: componentControls.groups.length,
      totalControls: componentControls.allControls.length,
      groups: componentControls.groups.map(group => ({
        name: group.name,
        controlCount: group.controls.length,
        categories: [...new Set(group.controls.map(c => c.category))]
      }))
    }

    return JSON.stringify(summary, null, 2)
  }
}
