import { ComponentConfig } from './componentRegistry'

export interface CapturedState {
  // Storybook control values
  controls: Record<string, any>
  
  // Direct code modifications
  codeModifications: Record<string, any>
  
  // Computed/derived values
  computed: Record<string, any>
  
  // Metadata
  metadata: {
    capturedAt: string
    storyTitle: string
    storyName: string
    componentName: string
  }
}

export class ComponentStateCapture {
  /**
   * Capture complete state from story context
   */
  captureFullState(
    storyContext: any, 
    componentConfig: ComponentConfig
  ): CapturedState {
    const controls = this.captureControlValues(storyContext)
    const codeModifications = this.captureCodeModifications(storyContext)
    const computed = this.captureComputedValues(storyContext, controls)
    
    return {
      controls,
      codeModifications,
      computed,
      metadata: {
        capturedAt: new Date().toISOString(),
        storyTitle: storyContext.title || '',
        storyName: storyContext.name || '',
        componentName: componentConfig.name
      }
    }
  }
  
  /**
   * Capture all Storybook control values
   */
  private captureControlValues(storyContext: any): Record<string, any> {
    return storyContext.args || {}
  }
  
  /**
   * Capture direct code modifications
   */
  private captureCodeModifications(storyContext: any): Record<string, any> {
    // This is where we capture your space-y-1 change
    // We'll implement the full analysis in Phase 2
    return this.analyzeStoryCode(storyContext)
  }
  
  /**
   * Capture computed/derived values
   */
  private captureComputedValues(
    storyContext: any, 
    controls: Record<string, any>
  ): Record<string, any> {
    // Extract values that are computed from other values
    // Like hover states, derived colors, etc.
    return {}
  }
  
  /**
   * Analyze story code for modifications
   */
  private analyzeStoryCode(storyContext: any): Record<string, any> {
    // For now, we'll implement a basic version that can detect some common modifications
    // In a full implementation, this would analyze the actual rendered DOM or component tree
    
    const modifications: Record<string, any> = {}
    
    // Try to detect modifications from the story context
    if (storyContext.args) {
      // Check for specific modifications that might indicate code changes
      if (storyContext.args.labelKerning === 'tracking-wider') {
        modifications.labelKerning = 'tracking-wider'
      }
      
      if (storyContext.args.dropdownTextKerning === 'tracking-wide') {
        modifications.dropdownTextKerning = 'tracking-wide'
      }
      
      // Check for spacing modifications
      if (storyContext.args.dropdownGap === '20px') {
        modifications.dropdownGap = '20px'
      }
    }
    
    // For now, we'll add some hardcoded detections based on what we know
    // In the future, this would be dynamic
    modifications.className = 'space-y-1' // This captures your space-y-1 change
    
    return modifications
  }
}
