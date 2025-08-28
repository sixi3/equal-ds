import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

// Types for our design system tokens
export interface DesignSystemTokens {
  colors: ColorToken[]
  typography: TypographyToken[]
  spacing: SpacingToken[]
  borders: BorderToken[]
  shadows: ShadowToken[]
  transitions: TransitionToken[]
  transforms: TransformToken[]
  metadata: TokenMetadata
}

export interface ColorToken {
  name: string
  value: string
  purpose: string
  category: 'primary' | 'secondary' | 'semantic' | 'neutral' | 'background' | 'text' | 'border'
  cssVariable: string
}

export interface TypographyToken {
  name: string
  value: string
  purpose: string
  category: 'font-size' | 'font-weight' | 'font-family' | 'line-height' | 'letter-spacing'
  cssVariable: string
}

export interface SpacingToken {
  name: string
  value: string
  purpose: string
  category: 'padding' | 'margin' | 'gap' | 'general'
  cssVariable: string
}

export interface BorderToken {
  name: string
  value: string
  purpose: string
  category: 'radius' | 'width' | 'style' | 'color'
  cssVariable: string
}

export interface ShadowToken {
  name: string
  value: string
  purpose: string
  cssVariable: string
}

export interface TransitionToken {
  name: string
  value: string
  purpose: string
  cssVariable: string
}

export interface TransformToken {
  name: string
  value: string
  purpose: string
  cssVariable: string
}

export interface TokenMetadata {
  totalTokens: number
  parsedAt: string
  cssFiles: string[]
  version: string
}

export class DesignSystemParser {
  private cssFiles = [
    'src/styles/tokens.css',
    'src/styles/typography.css'
  ]
  
  private projectRoot: string

  constructor(projectRoot?: string) {
    this.projectRoot = projectRoot || (typeof process !== 'undefined' ? process.cwd() : '.')
  }

  /**
   * Parse all CSS files and extract design system tokens
   */
  parseAllTokens(): DesignSystemTokens {
    console.log('🎨 Starting design system parsing...')
    
    const allTokens: DesignSystemTokens = {
      colors: [],
      typography: [],
      spacing: [],
      borders: [],
      shadows: [],
      transitions: [],
      transforms: [],
      metadata: {
        totalTokens: 0,
        parsedAt: new Date().toISOString(),
        cssFiles: [],
        version: '1.0.0'
      }
    }

    // Parse each CSS file
    for (const cssFile of this.cssFiles) {
      const fullPath = join(this.projectRoot, cssFile)
      
      if (!existsSync(fullPath)) {
        console.warn(`⚠️  CSS file not found: ${fullPath}`)
        continue
      }

      try {
        console.log(`📖 Parsing: ${cssFile}`)
        const cssContent = readFileSync(fullPath, 'utf8')
        const fileTokens = this.parseCSSTokens(cssContent, cssFile)
        
        // Merge tokens from this file
        allTokens.colors.push(...(fileTokens.colors || []))
        allTokens.typography.push(...(fileTokens.typography || []))
        allTokens.spacing.push(...(fileTokens.spacing || []))
        allTokens.borders.push(...(fileTokens.borders || []))
        allTokens.shadows.push(...(fileTokens.shadows || []))
        allTokens.transitions.push(...(fileTokens.transitions || []))
        allTokens.transforms.push(...(fileTokens.transforms || []))
        
        allTokens.metadata.cssFiles.push(cssFile)
        
        console.log(`✅ Parsed ${cssFile}: ${(fileTokens.colors?.length || 0) + (fileTokens.typography?.length || 0) + (fileTokens.spacing?.length || 0) + (fileTokens.borders?.length || 0)} tokens`)
      } catch (error) {
        console.error(`❌ Error parsing ${cssFile}:`, error)
      }
    }

    // Calculate total tokens
    allTokens.metadata.totalTokens = 
      allTokens.colors.length + 
      allTokens.typography.length + 
      allTokens.spacing.length + 
      allTokens.borders.length + 
      allTokens.shadows.length + 
      allTokens.transitions.length + 
      allTokens.transforms.length

    console.log(`🎉 Parsing complete! Total tokens: ${allTokens.metadata.totalTokens}`)
    console.log(`   Colors: ${allTokens.colors.length}`)
    console.log(`   Typography: ${allTokens.typography.length}`)
    console.log(`   Spacing: ${allTokens.spacing.length}`)
    console.log(`   Borders: ${allTokens.borders.length}`)
    console.log(`   Shadows: ${allTokens.shadows.length}`)
    console.log(`   Transitions: ${allTokens.transitions.length}`)
    console.log(`   Transforms: ${allTokens.transforms.length}`)

    return allTokens
  }

  /**
   * Parse CSS content and extract tokens
   */
  private parseCSSTokens(cssContent: string, fileName: string): Partial<DesignSystemTokens> {
    const tokens: Partial<DesignSystemTokens> = {
      colors: [],
      typography: [],
      spacing: [],
      borders: [],
      shadows: [],
      transitions: [],
      transforms: []
    }

    // Clean up CSS content - remove comments and normalize whitespace
    const cleanCSS = this.cleanCSSContent(cssContent)
    
    // Extract CSS custom properties using improved regex
    const cssVarRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g
    let match

    while ((match = cssVarRegex.exec(cleanCSS)) !== null) {
      const [, name, value] = match
      const cleanValue = this.cleanTokenValue(value.trim())
      const cleanName = name.trim()

      // Validate that this is a proper token
      if (this.isValidToken(cleanName, cleanValue)) {
        // Categorize the token based on its name and value
        const token = this.categorizeToken(cleanName, cleanValue, fileName)
        
        if (token) {
          this.addTokenToCategory(tokens, token)
        }
      }
    }

    return tokens
  }

  /**
   * Clean CSS content by removing comments and normalizing whitespace
   */
  private cleanCSSContent(cssContent: string): string {
    return cssContent
      // Remove CSS comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove single-line comments
      .replace(/\/\/.*$/gm, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      // Remove empty lines
      .replace(/^\s*[\r\n]/gm, '')
      // Clean up rule boundaries
      .replace(/\s*{\s*/g, ' { ')
      .replace(/\s*}\s*/g, ' } ')
      .trim()
  }

  /**
   * Clean token value by removing extra whitespace and newlines
   */
  private cleanTokenValue(value: string): string {
    return value
      .replace(/\s+/g, ' ')
      .replace(/[\r\n]/g, '')
      .trim()
  }

  /**
   * Validate that a token is properly formatted
   */
  private isValidToken(name: string, value: string): boolean {
    // Token name should be a valid CSS custom property name
    if (!/^[a-zA-Z0-9-]+$/.test(name)) {
      return false
    }

    // Token value should not contain broken CSS rules
    if (value.includes('{') || value.includes('}') || value.includes(';')) {
      return false
    }

    // Token value should not be empty
    if (!value || value.trim().length === 0) {
      return false
    }

    // Token value should not contain newlines or excessive whitespace
    if (value.includes('\n') || value.includes('\r')) {
      return false
    }

    // Token value should not contain broken CSS selectors
    if (value.includes('.') && value.includes('{')) {
      return false
    }

    return true
  }

  /**
   * Categorize a token based on its name and value
   */
  private categorizeToken(name: string, value: string, fileName: string): any {
    const cssVariable = `--${name}`

    // Shadow tokens (check BEFORE color tokens since they contain rgb values)
    if (this.isShadowToken(name, value)) {
      return {
        name,
        value,
        purpose: this.extractTokenPurpose(name),
        category: 'shadow',
        cssVariable
      } as ShadowToken
    }

    // Color tokens
    if (this.isColorToken(name, value)) {
      return {
        name,
        value,
        purpose: this.extractTokenPurpose(name),
        category: this.categorizeColor(name),
        cssVariable
      } as ColorToken
    }

    // Typography tokens
    if (this.isTypographyToken(name, value)) {
      return {
        name,
        value,
        purpose: this.extractTokenPurpose(name),
        category: this.categorizeTypography(name),
        cssVariable
      } as TypographyToken
    }

    // Spacing tokens
    if (this.isSpacingToken(name, value)) {
      return {
        name,
        value,
        purpose: this.extractTokenPurpose(name),
        category: this.categorizeSpacing(name),
        cssVariable
      } as SpacingToken
    }

    // Border tokens
    if (this.isBorderToken(name, value)) {
      return {
        name,
        value,
        purpose: this.extractTokenPurpose(name),
        category: this.categorizeBorder(name),
        cssVariable
      } as BorderToken
    }

    // Transition tokens
    if (this.isTransitionToken(name, value)) {
      return {
        name,
        value,
        purpose: this.extractTokenPurpose(name),
        cssVariable
      } as TransitionToken
    }

    // Transform tokens
    if (this.isTransformToken(name, value)) {
      return {
        name,
        value,
        purpose: this.extractTokenPurpose(name),
        cssVariable
      } as TransformToken
    }

    return null
  }

  /**
   * Check if a token represents a color
   */
  private isColorToken(name: string, value: string): boolean {
    const colorKeywords = ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'neutral']
    const colorIndicators = ['color', 'background', 'border', 'text', 'ring', 'muted', 'foreground']
    
    return (
      colorKeywords.some(keyword => name.includes(keyword)) ||
      colorIndicators.some(indicator => name.includes(indicator)) ||
      value.includes('rgb') ||
      value.includes('hsl') ||
      value.includes('#') ||
      /^\d+\s+\d+\s+\d+$/.test(value) // RGB format like "15 51 64"
    )
  }

  /**
   * Check if a token represents typography
   */
  private isTypographyToken(name: string, value: string): boolean {
    const typographyKeywords = ['font', 'text', 'line-height', 'letter-spacing', 'weight', 'size', 'family']
    return typographyKeywords.some(keyword => name.includes(keyword))
  }

  /**
   * Check if a token represents spacing
   */
  private isSpacingToken(name: string, value: string): boolean {
    return name.includes('spacing') || name.includes('gap') || name.includes('padding') || name.includes('margin')
  }

  /**
   * Check if a token represents border properties
   */
  private isBorderToken(name: string, value: string): boolean {
    return name.includes('border') || name.includes('radius')
  }

  /**
   * Check if a token represents shadow properties
   */
  private isShadowToken(name: string, value: string): boolean {
    return name.includes('shadow') || value.includes('shadow')
  }

  /**
   * Check if a token represents transition properties
   */
  private isTransitionToken(name: string, value: string): boolean {
    return name.includes('transition') || value.includes('ease') || value.includes('duration')
  }

  /**
   * Check if a token represents transform properties
   */
  private isTransformToken(name: string, value: string): boolean {
    return name.includes('transform') || value.includes('translate') || value.includes('scale') || value.includes('rotate')
  }

  /**
   * Extract the purpose of a token from its name
   */
  private extractTokenPurpose(name: string): string {
    // Convert kebab-case to readable text
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  /**
   * Categorize color tokens
   */
  private categorizeColor(name: string): ColorToken['category'] {
    if (name.includes('primary')) return 'primary'
    if (name.includes('secondary')) return 'secondary'
    if (name.includes('success') || name.includes('warning') || name.includes('error') || name.includes('info')) return 'semantic'
    if (name.includes('gray') || name.includes('neutral')) return 'neutral'
    if (name.includes('background')) return 'background'
    if (name.includes('text')) return 'text'
    if (name.includes('border')) return 'border'
    return 'secondary'
  }

  /**
   * Categorize typography tokens
   */
  private categorizeTypography(name: string): TypographyToken['category'] {
    if (name.includes('size')) return 'font-size'
    if (name.includes('weight')) return 'font-weight'
    if (name.includes('family')) return 'font-family'
    if (name.includes('line-height') || name.includes('leading')) return 'line-height'
    if (name.includes('letter-spacing') || name.includes('tracking')) return 'letter-spacing'
    return 'font-size'
  }

  /**
   * Categorize spacing tokens
   */
  private categorizeSpacing(name: string): SpacingToken['category'] {
    if (name.includes('padding')) return 'padding'
    if (name.includes('margin')) return 'margin'
    if (name.includes('gap')) return 'gap'
    return 'general'
  }

  /**
   * Categorize border tokens
   */
  private categorizeBorder(name: string): BorderToken['category'] {
    if (name.includes('radius')) return 'radius'
    if (name.includes('width')) return 'width'
    if (name.includes('style')) return 'style'
    if (name.includes('color')) return 'color'
    return 'radius'
  }

  /**
   * Add a token to the appropriate category
   */
  private addTokenToCategory(tokens: Partial<DesignSystemTokens>, token: any): void {
    if (token.category === 'primary' || token.category === 'secondary' || token.category === 'semantic' || token.category === 'neutral' || token.category === 'background' || token.category === 'text' || token.category === 'border') {
      tokens.colors!.push(token)
    } else if (token.category === 'font-size' || token.category === 'font-weight' || token.category === 'font-family' || token.category === 'line-height' || token.category === 'letter-spacing') {
      tokens.typography!.push(token)
    } else if (token.category === 'padding' || token.category === 'margin' || token.category === 'gap' || token.category === 'general') {
      tokens.spacing!.push(token)
    } else if (token.category === 'radius' || token.category === 'width' || token.category === 'style' || token.category === 'color') {
      tokens.borders!.push(token)
    } else if (token.category === 'shadow') {
      tokens.shadows!.push(token)
    } else if (token.category === 'transition') {
      tokens.transitions!.push(token)
    } else if (token.category === 'transform') {
      tokens.transforms!.push(token)
    }
  }

  /**
   * Get a summary of parsed tokens
   */
  getTokenSummary(tokens: DesignSystemTokens): string {
    return `
🎨 Design System Token Summary:
   📊 Total Tokens: ${tokens.metadata.totalTokens}
   🌈 Colors: ${tokens.colors.length}
   📝 Typography: ${tokens.typography.length}
   📏 Spacing: ${tokens.spacing.length}
   🔲 Borders: ${tokens.borders.length}
   🌫️  Shadows: ${tokens.shadows.length}
   ⚡ Transitions: ${tokens.transitions.length}
   🔄 Transforms: ${tokens.transforms.length}
   
📁 Parsed Files: ${tokens.metadata.cssFiles.join(', ')}
⏰ Parsed At: ${tokens.metadata.parsedAt}
    `.trim()
  }
}
