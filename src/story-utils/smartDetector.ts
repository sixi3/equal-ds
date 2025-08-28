import { COMPONENT_REGISTRY, ComponentConfig } from './componentRegistry'

export class SmartComponentDetector {
  /**
   * Detect component from Storybook context
   */
  detectFromStory(storyContext: any): ComponentConfig | null {
    const { title, name, parameters } = storyContext
    
    // Try multiple detection strategies
    const strategies = [
      () => this.detectFromStoryTitle(title),
      () => this.detectFromStoryName(name),
      () => this.detectFromStoryParameters(parameters),
      () => this.detectFromStoryPath(window.location.pathname)
    ]
    
    for (const strategy of strategies) {
      const result = strategy()
      if (result) return result
    }
    
    return null
  }
  
  /**
   * Detect from story title (e.g., "Actions/Dropdown")
   */
  private detectFromStoryTitle(title: string): ComponentConfig | null {
    if (!title) return null
    
    for (const [key, config] of Object.entries(COMPONENT_REGISTRY)) {
      if (config.storyPattern.test(title)) {
        return config
      }
    }
    
    return null
  }
  
  /**
   * Detect from story name (e.g., "Default", "Variants")
   */
  private detectFromStoryName(name: string): ComponentConfig | null {
    if (!name) return null
    
    // Story names are usually not helpful for component detection
    // But we can try to extract component info from them
    for (const [key, config] of Object.entries(COMPONENT_REGISTRY)) {
      if (config.storyPattern.test(name)) {
        return config
      }
    }
    
    return null
  }
  
  /**
   * Detect from story parameters
   */
  private detectFromStoryParameters(parameters: any): ComponentConfig | null {
    // Check if component is specified in parameters
    if (parameters?.component) {
      return COMPONENT_REGISTRY[parameters.component] || null
    }
    return null
  }
  
  /**
   * Detect from URL path
   */
  private detectFromStoryPath(path: string): ComponentConfig | null {
    // Extract component from URL like /story/actions-dropdown--default
    const pathMatch = path.match(/\/story\/([^--]+)/)
    if (pathMatch) {
      const componentPath = pathMatch[1]
      for (const [key, config] of Object.entries(COMPONENT_REGISTRY)) {
        if (config.storyPattern.test(componentPath)) {
          return config
        }
      }
    }
    return null
  }
}
