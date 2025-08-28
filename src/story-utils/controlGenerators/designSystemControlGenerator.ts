/**
 * Design System Control Generator
 * Generates comprehensive Storybook controls using pre-generated design system tokens
 * This replaces the need for runtime CSS parsing
 */

// Direct CSS parsing - no more JSON intermediary needed

export interface StorybookControl {
  name: string
  type: 'select' | 'color' | 'range' | 'boolean' | 'text' | 'number' | 'object' | 'radio' | 'file'
  value?: any
  description?: string
  category?: string
  options?: any[]
  control?: {
    type?: string
    presetColors?: string[]
    min?: number
    max?: number
    step?: number
  }
}

export interface ControlGroup {
  name: string
  description?: string
  controls: StorybookControl[]
}

export interface ComponentControls {
  groups: ControlGroup[]
  allControls: StorybookControl[]
}

export class DesignSystemControlGenerator {
  private tokens: any = null

  constructor() {
    // Initialize immediately
    this.initialize()
  }

  /**
   * Initialize the generator by parsing CSS files directly
   */
  private async initialize(): Promise<void> {
    try {
      // Parse tokens directly from the same CSS files your components use
      this.tokens = await this.parseCSSTokens()
      console.log('✅ Design system tokens loaded directly from CSS')
    } catch (error) {
      console.error('❌ Failed to load tokens from CSS:', error)
      throw error
    }
  }

  /**
   * Parse tokens directly from CSS files (same ones components use)
   */
  private async parseCSSTokens(): Promise<any> {
    try {
      // Import CSS files as text (Vite supports this)
      const tokensResponse = await fetch('/src/styles/tokens.css')
      const typographyResponse = await fetch('/src/styles/typography.css')
      
      const tokensCSS = await tokensResponse.text()
      const typographyCSS = await typographyResponse.text()
      
      return this.extractTokensFromCSS(tokensCSS + '\n' + typographyCSS)
    } catch (error) {
      console.warn('Could not fetch CSS files, using fallback tokens')
      return this.getFallbackTokens()
    }
  }

  /**
   * Extract CSS custom properties from CSS content
   */
  private extractTokensFromCSS(cssContent: string): any {
    const tokens: {
      colors: Array<{name: string, value: string, cssVariable: string, category: string}>,
      typography: Array<{name: string, value: string, cssVariable: string, category: string}>,
      spacing: Array<{name: string, value: string, cssVariable: string, category: string}>,
      borders: Array<{name: string, value: string, cssVariable: string, category: string}>,
      shadows: Array<{name: string, value: string, cssVariable: string, category: string}>
    } = {
      colors: [],
      typography: [],
      spacing: [],
      borders: [],
      shadows: []
    }

    // Parse CSS custom properties (--variable-name: value;)
    const cssVariableRegex = /--([^:]+):\s*([^;]+);/g
    let match

    while ((match = cssVariableRegex.exec(cssContent)) !== null) {
      const [, name, value] = match
      const cleanName = name.trim()
      const cleanValue = value.trim()

      // Categorize tokens based on naming patterns
      if (this.isColorToken(cleanName, cleanValue)) {
        tokens.colors.push({
          name: cleanName.replace(/-/g, ''),
          value: cleanValue,
          cssVariable: `--${cleanName}`,
          category: this.getColorCategory(cleanName)
        })
      } else if (this.isTypographyToken(cleanName)) {
        tokens.typography.push({
          name: cleanName.replace(/-/g, ''),
          value: cleanValue,
          cssVariable: `--${cleanName}`,
          category: this.getTypographyCategory(cleanName)
        })
      } else if (this.isSpacingToken(cleanName)) {
        tokens.spacing.push({
          name: cleanName.replace(/-/g, ''),
          value: cleanValue,
          cssVariable: `--${cleanName}`,
          category: 'spacing'
        })
      } else if (this.isBorderToken(cleanName)) {
        tokens.borders.push({
          name: cleanName.replace(/-/g, ''),
          value: cleanValue,
          cssVariable: `--${cleanName}`,
          category: 'borders'
        })
      } else if (this.isShadowToken(cleanName)) {
        tokens.shadows.push({
          name: cleanName.replace(/-/g, ''),
          value: cleanValue,
          cssVariable: `--${cleanName}`,
          category: 'shadows'
        })
      }
    }

    return { colors: tokens.colors, typography: tokens.typography, spacing: tokens.spacing, borders: tokens.borders, shadows: tokens.shadows }
  }

  // Token categorization helpers
  private isColorToken(name: string, value: string): boolean {
    // Only include actual color-related tokens
    const colorKeywords = ['color', 'background', 'text', 'border', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral', 'gray', 'muted', 'accent', 'destructive', 'foreground', 'ring', 'input']
    
    // Check if name contains color keywords
    const hasColorKeyword = colorKeywords.some(keyword => name.includes(keyword))
    
    // Check if value is actually a color (hex, rgb, hsl) or a valid CSS custom property
    const isColorValue = /^#[0-9A-Fa-f]{3,6}$|^rgb\(|^hsl\(|^var\(--[^)]+\)$|^[0-9]+\s+[0-9]+\s+[0-9]+$/.test(value)
    
    // Must have both a color keyword AND a color value
    return hasColorKeyword && isColorValue
  }

  private isTypographyToken(name: string): boolean {
    // Only include actual typography-related tokens
    const typographyKeywords = ['font-size', 'font-weight', 'line-height', 'letter-spacing', 'font-family']
    return typographyKeywords.some(keyword => name.includes(keyword))
  }

  private isSpacingToken(name: string): boolean {
    // Only include actual spacing-related tokens
    const spacingKeywords = ['spacing']
    return spacingKeywords.some(keyword => name.includes(keyword))
  }

  private isBorderToken(name: string): boolean {
    // Only include actual border-related tokens
    const borderKeywords = ['border-radius', 'radius']
    return borderKeywords.some(keyword => name.includes(keyword))
  }

  private isShadowToken(name: string): boolean {
    // Only include actual shadow-related tokens
    const shadowKeywords = ['shadow']
    return shadowKeywords.some(keyword => name.includes(keyword))
  }

  private getColorCategory(name: string): string {
    if (name.includes('primary')) return 'primary'
    if (name.includes('secondary')) return 'secondary'
    if (name.includes('text')) return 'text'
    if (name.includes('background')) return 'background'
    if (name.includes('border')) return 'border'
    return 'neutral'
  }

  private getTypographyCategory(name: string): string {
    if (name.includes('font-size')) return 'font-size'
    if (name.includes('font-weight')) return 'font-weight'
    if (name.includes('line-height')) return 'line-height'
    if (name.includes('letter-spacing')) return 'letter-spacing'
    return 'typography'
  }

  /**
   * Fallback tokens if CSS parsing fails
   */
  private getFallbackTokens(): any {
    return {
      colors: [
        { name: 'primary', value: '#0f3340', cssVariable: '--primary', category: 'primary' },
        { name: 'secondary', value: '#f6f6f6', cssVariable: '--secondary', category: 'secondary' }
      ],
      typography: [
        { name: 'fontsize-base', value: '1rem', cssVariable: '--font-size-base', category: 'font-size' }
      ],
      spacing: [
        { name: 'spacing-1', value: '0.25rem', cssVariable: '--spacing-1', category: 'spacing' }
      ],
      borders: [],
      shadows: []
    }
  }

  /**
   * Generate comprehensive controls for a component
   */
  async generateComponentControls(componentName: string): Promise<ComponentControls> {
    if (!this.tokens) {
      await this.initialize()
    }

    const groups: ControlGroup[] = []

    // 1. Color Controls Group
    groups.push(this.createColorControlsGroup())

    // 2. Typography Controls Group
    groups.push(this.createTypographyControlsGroup())

    // 3. Spacing Controls Group
    groups.push(this.createSpacingControlsGroup())

    // 4. Border Controls Group
    groups.push(this.createBorderControlsGroup())

    // 5. Shadow Controls Group
    groups.push(this.createShadowControlsGroup())

    // 6. Layout Controls Group
    groups.push(this.createLayoutControlsGroup())

    // 7. Interactive Controls Group
    groups.push(this.createInteractiveControlsGroup())

    // 8. Component-Specific Controls
    const componentSpecific = this.createComponentSpecificControls(componentName)
    if (componentSpecific.controls.length > 0) {
      groups.push(componentSpecific)
    }

    // Flatten all controls
    const allControls = groups.flatMap(group => group.controls)

    return {
      groups,
      allControls
    }
  }

  /**
   * Create comprehensive color controls
   */
  private createColorControlsGroup(): ControlGroup {
    const controls: StorybookControl[] = []

    // All color tokens available for every color control
    const colorOptions = this.tokens.colors.map((color: any) => ({
      label: `${color.name} (${color.value})`,
      value: color.cssVariable
    }))

    // Background colors
    controls.push({
      name: 'backgroundColor',
      type: 'select',
      description: 'Background color using design system tokens',
      category: 'colors',
      options: colorOptions,
      control: { type: 'select' }
    })

    // Text colors
    controls.push({
      name: 'textColor',
      type: 'select',
      description: 'Text color using design system tokens',
      category: 'colors',
      options: colorOptions,
      control: { type: 'select' }
    })

    // Border colors
    controls.push({
      name: 'borderColor',
      type: 'select',
      description: 'Border color using design system tokens',
      category: 'colors',
      options: colorOptions,
      control: { type: 'select' }
    })

    // Hover colors
    controls.push({
      name: 'hoverBackgroundColor',
      type: 'select',
      description: 'Hover background color using design system tokens',
      category: 'colors',
      options: colorOptions,
      control: { type: 'select' }
    })

    controls.push({
      name: 'hoverTextColor',
      type: 'select',
      description: 'Hover text color using design system tokens',
      category: 'colors',
      options: colorOptions,
      control: { type: 'select' }
    })

    controls.push({
      name: 'hoverBorderColor',
      type: 'select',
      description: 'Hover border color using design system tokens',
      category: 'colors',
      options: colorOptions,
      control: { type: 'select' }
    })

    return {
      name: 'Colors',
      description: 'All color controls with access to complete design system color palette',
      controls
    }
  }

  /**
   * Create comprehensive typography controls
   */
  private createTypographyControlsGroup(): ControlGroup {
    const controls: StorybookControl[] = []

    // All typography tokens available for every typography control
    const typographyOptions = this.tokens.typography.map((typography: any) => ({
      label: `${typography.name} (${typography.value})`,
      value: typography.cssVariable
    }))

    // Font sizes
    controls.push({
      name: 'fontSize',
      type: 'select',
      description: 'Font size using design system tokens',
      category: 'typography',
      options: typographyOptions.filter((opt: any) => opt.label.includes('size')),
      control: { type: 'select' }
    })

    // Font weights
    controls.push({
      name: 'fontWeight',
      type: 'select',
      description: 'Font weight using design system tokens',
      category: 'typography',
      options: typographyOptions.filter((opt: any) => opt.label.includes('weight')),
      control: { type: 'select' }
    })

    // Line heights
    controls.push({
      name: 'lineHeight',
      type: 'select',
      description: 'Line height using design system tokens',
      category: 'typography',
      options: typographyOptions.filter((opt: any) => opt.label.includes('line-height')),
      control: { type: 'select' }
    })

    // Letter spacing
    controls.push({
      name: 'letterSpacing',
      type: 'select',
      description: 'Letter spacing using design system tokens',
      category: 'typography',
      options: typographyOptions.filter((opt: any) => opt.label.includes('letter-spacing')),
      control: { type: 'select' }
    })

    return {
      name: 'Typography',
      description: 'All typography controls with access to complete design system typography palette',
      controls
    }
  }

  /**
   * Create spacing controls
   */
  private createSpacingControlsGroup(): ControlGroup {
    const controls: StorybookControl[] = []

    // Spacing tokens
    const spacingOptions = this.tokens.spacing.map((spacing: any) => ({
      label: `${spacing.name} (${spacing.value})`,
      value: spacing.cssVariable
    }))

    controls.push({
      name: 'padding',
      type: 'select',
      description: 'Padding using design system spacing tokens',
      category: 'spacing',
      options: spacingOptions,
      control: { type: 'select' }
    })

    controls.push({
      name: 'margin',
      type: 'select',
      description: 'Margin using design system spacing tokens',
      category: 'spacing',
      options: spacingOptions,
      control: { type: 'select' }
    })

    controls.push({
      name: 'gap',
      type: 'select',
      description: 'Gap using design system spacing tokens',
      category: 'spacing',
      options: spacingOptions,
      control: { type: 'select' }
    })

    return {
      name: 'Spacing',
      description: 'Spacing controls using design system spacing tokens',
      controls
    }
  }

  /**
   * Create border controls
   */
  private createBorderControlsGroup(): ControlGroup {
    const controls: StorybookControl[] = []

    // Border radius tokens
    const radiusOptions = this.tokens.borders
      .filter((border: any) => border.category === 'radius')
      .map((border: any) => ({
        label: `${border.name} (${border.value})`,
        value: border.cssVariable
      }))

    controls.push({
      name: 'borderRadius',
      type: 'select',
      description: 'Border radius using design system tokens',
      category: 'borders',
      options: radiusOptions,
      control: { type: 'select' }
    })

    // Border width
    controls.push({
      name: 'borderWidth',
      type: 'range',
      description: 'Border width in pixels',
      category: 'borders',
      control: { type: 'range', min: 0, max: 10, step: 1 }
    })

    // Border style
    controls.push({
      name: 'borderStyle',
      type: 'select',
      description: 'Border style',
      category: 'borders',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
        { label: 'None', value: 'none' }
      ],
      control: { type: 'select' }
    })

    return {
      name: 'Borders',
      description: 'Border controls using design system border tokens',
      controls
    }
  }

  /**
   * Create shadow controls
   */
  private createShadowControlsGroup(): ControlGroup {
    const controls: StorybookControl[] = []

    // Shadow tokens
    const shadowOptions = this.tokens.shadows.map((shadow: any) => ({
      label: `${shadow.name} (${shadow.value})`,
      value: shadow.cssVariable
    }))

    controls.push({
      name: 'boxShadow',
      type: 'select',
      description: 'Box shadow using design system tokens',
      category: 'shadows',
      options: shadowOptions,
      control: { type: 'select' }
    })

    // Shadow displacement controls
    controls.push({
      name: 'shadowDisplacementX',
      type: 'range',
      description: 'Shadow horizontal displacement (-20px to 20px)',
      category: 'shadows',
      control: { type: 'range', min: -20, max: 20, step: 1 }
    })

    controls.push({
      name: 'shadowDisplacementY',
      type: 'range',
      description: 'Shadow vertical displacement (-20px to 20px)',
      category: 'shadows',
      control: { type: 'range', min: -20, max: 20, step: 1 }
    })

    // Shadow opacity
    controls.push({
      name: 'shadowOpacity',
      type: 'range',
      description: 'Shadow opacity (0 to 1)',
      category: 'shadows',
      control: { type: 'range', min: 0, max: 1, step: 0.1 }
    })

    return {
      name: 'Shadows',
      description: 'Shadow controls with displacement and opacity options',
      controls
    }
  }

  /**
   * Create layout controls
   */
  private createLayoutControlsGroup(): ControlGroup {
    const controls: StorybookControl[] = []

    controls.push({
      name: 'width',
      type: 'text',
      description: 'Component width (e.g., "100%", "200px", "auto")',
      category: 'layout',
      control: { type: 'text' }
    })

    controls.push({
      name: 'height',
      type: 'text',
      description: 'Component height (e.g., "100%", "200px", "auto")',
      category: 'layout',
      control: { type: 'text' }
    })

    controls.push({
      name: 'display',
      type: 'select',
      description: 'Display property',
      category: 'layout',
      options: [
        { label: 'Block', value: 'block' },
        { label: 'Inline', value: 'inline' },
        { label: 'Inline Block', value: 'inline-block' },
        { label: 'Flex', value: 'flex' },
        { label: 'Grid', value: 'grid' },
        { label: 'None', value: 'none' }
      ],
      control: { type: 'select' }
    })

    controls.push({
      name: 'position',
      type: 'select',
      description: 'Position property',
      category: 'layout',
      options: [
        { label: 'Static', value: 'static' },
        { label: 'Relative', value: 'relative' },
        { label: 'Absolute', value: 'absolute' },
        { label: 'Fixed', value: 'fixed' },
        { label: 'Sticky', value: 'sticky' }
      ],
      control: { type: 'select' }
    })

    return {
      name: 'Layout',
      description: 'Layout and positioning controls',
      controls
    }
  }

  /**
   * Create interactive controls
   */
  private createInteractiveControlsGroup(): ControlGroup {
    const controls: StorybookControl[] = []

    controls.push({
      name: 'isHovered',
      type: 'boolean',
      description: 'Show hover state',
      category: 'interactive',
      control: { type: 'boolean' }
    })

    controls.push({
      name: 'isClicked',
      type: 'boolean',
      description: 'Show clicked state',
      category: 'interactive',
      control: { type: 'boolean' }
    })

    controls.push({
      name: 'isFocused',
      type: 'boolean',
      description: 'Show focused state',
      category: 'interactive',
      control: { type: 'boolean' }
    })

    controls.push({
      name: 'isDisabled',
      type: 'boolean',
      description: 'Show disabled state',
      category: 'interactive',
      control: { type: 'boolean' }
    })

    return {
      name: 'Interactive States',
      description: 'Interactive state controls for testing component behavior',
      controls
    }
  }

  /**
   * Create component-specific controls
   */
  private createComponentSpecificControls(componentName: string): ControlGroup {
    const controls: StorybookControl[] = []

    // Dropdown-specific controls
    if (componentName.toLowerCase().includes('dropdown')) {
      controls.push({
        name: 'align',
        type: 'select',
        description: 'Dropdown alignment',
        category: 'component',
        options: [
          { label: 'Start', value: 'start' },
          { label: 'Center', value: 'center' },
          { label: 'End', value: 'end' }
        ],
        control: { type: 'select' }
      })

      controls.push({
        name: 'sideOffset',
        type: 'range',
        description: 'Distance from trigger',
        category: 'component',
        control: { type: 'range', min: 0, max: 20, step: 1 }
      })
    }

    // Sidebar-specific controls
    if (componentName.toLowerCase().includes('sidebar')) {
      controls.push({
        name: 'collapsed',
        type: 'boolean',
        description: 'Sidebar collapsed state',
        category: 'component',
        control: { type: 'boolean' }
      })

      controls.push({
        name: 'width',
        type: 'range',
        description: 'Sidebar width when expanded',
        category: 'component',
        control: { type: 'range', min: 200, max: 400, step: 20 }
      })
    }

    return {
      name: 'Component Specific',
      description: 'Controls specific to this component type',
      controls
    }
  }

  /**
   * Get all available color tokens
   */
  getColorTokens() {
    return this.tokens?.colors || []
  }

  /**
   * Get all available typography tokens
   */
  getTypographyTokens() {
    return this.tokens?.typography || []
  }

  /**
   * Get all available spacing tokens
   */
  getSpacingTokens() {
    return this.tokens?.spacing || []
  }

  /**
   * Get all available shadow tokens
   */
  getShadowTokens() {
    return this.tokens?.shadows || []
  }
}
