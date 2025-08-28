/**
 * Auto Controls Helper
 * Automatically applies design system controls to Storybook stories
 */

import { DesignSystemControlGenerator } from './controlGenerators/designSystemControlGenerator'
import { StorybookControlMapper, MappedStorybookControls } from './storybookControlMapper'

export interface AutoControlsOptions {
  componentName?: string
  includeCategories?: string[]
  excludeCategories?: string[]
  customControls?: MappedStorybookControls
  mergeWithExisting?: boolean
}

export class AutoControls {
  private static generator: DesignSystemControlGenerator | null = null

  /**
   * Initialize the auto controls system
   */
  static async initialize(): Promise<void> {
    if (!this.generator) {
      this.generator = new DesignSystemControlGenerator()
      await this.generator.initialize()
    }
  }

  /**
   * Generate automatic controls for a component
   */
  static async generateControls(
    componentName: string,
    options: AutoControlsOptions = {}
  ): Promise<MappedStorybookControls> {
    await this.initialize()

    if (!this.generator) {
      throw new Error('Auto controls not initialized')
    }

    // Generate comprehensive controls
    const componentControls = await this.generator.generateComponentControls(componentName)

    // Apply filtering based on options
    let filteredControls = componentControls

    if (options.includeCategories && options.includeCategories.length > 0) {
      filteredControls = {
        groups: componentControls.groups.filter(group =>
          options.includeCategories!.some(cat => 
            group.name.toLowerCase().includes(cat.toLowerCase())
          )
        ),
        allControls: []
      }
      filteredControls.allControls = filteredControls.groups.flatMap(group => group.controls)
    }

    if (options.excludeCategories && options.excludeCategories.length > 0) {
      filteredControls = {
        groups: filteredControls.groups.filter(group =>
          !options.excludeCategories!.some(cat => 
            group.name.toLowerCase().includes(cat.toLowerCase())
          )
        ),
        allControls: []
      }
      filteredControls.allControls = filteredControls.groups.flatMap(group => group.controls)
    }

    // Convert to Storybook format
    const storybookControls = StorybookControlMapper.mapToStorybookControls(filteredControls)

    // Merge with custom controls if provided
    if (options.customControls && options.mergeWithExisting !== false) {
      return this.mergeControls(storybookControls, options.customControls)
    }

    return storybookControls
  }

  /**
   * Create a story configuration with auto controls
   */
  static async createStoryConfig(
    componentName: string,
    options: AutoControlsOptions = {}
  ): Promise<{
    argTypes: any
    args: any
    parameters?: any
  }> {
    const controls = await this.generateControls(componentName, options)

    return {
      argTypes: controls.argTypes,
      args: controls.args,
      parameters: {
        controls: {
          expanded: true,
          sort: 'requiredFirst'
        }
      }
    }
  }

  /**
   * Apply auto controls to an existing story
   */
  static async applyToStory(
    story: any,
    componentName: string,
    options: AutoControlsOptions = {}
  ): Promise<any> {
    const autoControls = await this.generateControls(componentName, options)

    // Merge with existing story controls
    const mergedControls = this.mergeControls(
      { argTypes: story.argTypes || {}, args: story.args || {} },
      autoControls
    )

    return {
      ...story,
      argTypes: mergedControls.argTypes,
      args: mergedControls.args
    }
  }

  /**
   * Get controls for specific categories only
   */
  static async getCategoryControls(
    componentName: string,
    categories: string[]
  ): Promise<MappedStorybookControls> {
    return this.generateControls(componentName, {
      includeCategories: categories
    })
  }

  /**
   * Get a summary of available controls
   */
  static async getControlSummary(componentName: string): Promise<string> {
    await this.initialize()

    if (!this.generator) {
      throw new Error('Auto controls not initialized')
    }

    const componentControls = await this.generator.generateComponentControls(componentName)
    return StorybookControlMapper.getControlSummary(componentControls)
  }

  /**
   * Merge two sets of controls
   */
  private static mergeControls(
    base: MappedStorybookControls,
    additional: MappedStorybookControls
  ): MappedStorybookControls {
    return {
      argTypes: { ...base.argTypes, ...additional.argTypes },
      args: { ...base.args, ...additional.args }
    }
  }

  /**
   * Get available control categories for a component
   */
  static async getAvailableCategories(componentName: string): Promise<string[]> {
    await this.initialize()

    if (!this.generator) {
      throw new Error('Auto controls not initialized')
    }

    const componentControls = await this.generator.generateComponentControls(componentName)
    return componentControls.groups.map(group => group.name)
  }

  /**
   * Check if a component has controls for specific categories
   */
  static async hasCategoryControls(
    componentName: string,
    categories: string[]
  ): Promise<boolean> {
    const availableCategories = await this.getAvailableCategories(componentName)
    return categories.every(cat => 
      availableCategories.some(available => 
        available.toLowerCase().includes(cat.toLowerCase())
      )
    )
  }
}

/**
 * Convenience function for quick control generation
 */
export async function createAutoControls(
  componentName: string,
  options: AutoControlsOptions = {}
): Promise<MappedStorybookControls> {
  return AutoControls.generateControls(componentName, options)
}

/**
 * Convenience function for story configuration
 */
export async function createAutoStoryConfig(
  componentName: string,
  options: AutoControlsOptions = {}
): Promise<{
  argTypes: any
  args: any
  parameters?: any
}> {
  return AutoControls.createStoryConfig(componentName, options)
}

/**
 * Quick category controls
 */
export async function getCategoryControls(
  componentName: string,
  categories: string[]
): Promise<MappedStorybookControls> {
  return AutoControls.getCategoryControls(componentName, categories)
}
