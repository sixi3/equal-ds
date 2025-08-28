import { 
  DesignSystemTokens, 
  ColorToken, 
  TypographyToken, 
  SpacingToken, 
  BorderToken,
  ShadowToken,
  TransitionToken,
  TransformToken
} from './designSystemParser'

export interface CategorizedTokens {
  colors: ColorGroups
  typography: TypographyGroups
  spacing: SpacingGroups
  borders: BorderGroups
  shadows: ShadowToken[]
  transitions: TransitionToken[]
  transforms: TransformToken[]
}

export interface ColorGroups {
  primary: ColorToken[]
  secondary: ColorToken[]
  semantic: ColorToken[]
  neutral: ColorToken[]
  background: ColorToken[]
  text: ColorToken[]
  border: ColorToken[]
  interactive: InteractiveColorGroup
}

export interface InteractiveColorGroup {
  hover: ColorToken[]
  focus: ColorToken[]
  active: ColorToken[]
  disabled: ColorToken[]
}

export interface TypographyGroups {
  fontSizes: TypographyToken[]
  fontWeights: TypographyToken[]
  fontFamilies: TypographyToken[]
  lineHeights: TypographyToken[]
  letterSpacing: TypographyToken[]
  textStyles: TypographyToken[]
}

export interface SpacingGroups {
  padding: SpacingToken[]
  margin: SpacingToken[]
  gap: SpacingToken[]
  general: SpacingToken[]
  responsive: ResponsiveSpacingGroup
}

export interface ResponsiveSpacingGroup {
  xs: SpacingToken[]
  sm: SpacingToken[]
  md: SpacingToken[]
  lg: SpacingToken[]
  xl: SpacingToken[]
}

export interface BorderGroups {
  radius: BorderToken[]
  width: BorderToken[]
  style: BorderToken[]
  color: BorderToken[]
  interactive: InteractiveBorderGroup
}

export interface InteractiveBorderGroup {
  hover: BorderToken[]
  focus: BorderToken[]
  active: BorderToken[]
}

export class TokenCategorizer {
  /**
   * Categorize all tokens into logical groups
   */
  categorizeTokens(tokens: DesignSystemTokens): CategorizedTokens {
    console.log('🏷️  Starting token categorization...')
    
    const categorized: CategorizedTokens = {
      colors: this.categorizeColorTokens(tokens.colors),
      typography: this.categorizeTypographyTokens(tokens.typography),
      spacing: this.categorizeSpacingTokens(tokens.spacing),
      borders: this.categorizeBorderTokens(tokens.borders),
      shadows: tokens.shadows,
      transitions: tokens.transitions,
      transforms: tokens.transforms
    }

    console.log('✅ Token categorization complete!')
    this.logCategorizationSummary(categorized)
    
    return categorized
  }

  /**
   * Categorize color tokens into logical groups
   */
  private categorizeColorTokens(colors: ColorToken[]): ColorGroups {
    const groups: ColorGroups = {
      primary: [],
      secondary: [],
      semantic: [],
      neutral: [],
      background: [],
      text: [],
      border: [],
      interactive: {
        hover: [],
        focus: [],
        active: [],
        disabled: []
      }
    }

    colors.forEach(color => {
      // Add to main category
      if (groups[color.category]) {
        groups[color.category].push(color)
      }

      // Add to interactive categories if applicable
      if (color.name.includes('hover')) {
        groups.interactive.hover.push(color)
      } else if (color.name.includes('focus')) {
        groups.interactive.focus.push(color)
      } else if (color.name.includes('active')) {
        groups.interactive.active.push(color)
      } else if (color.name.includes('disabled')) {
        groups.interactive.disabled.push(color)
      }
    })

    return groups
  }

  /**
   * Categorize typography tokens into logical groups
   */
  private categorizeTypographyTokens(typography: TypographyToken[]): TypographyGroups {
    const groups: TypographyGroups = {
      fontSizes: [],
      fontWeights: [],
      fontFamilies: [],
      lineHeights: [],
      letterSpacing: [],
      textStyles: []
    }

    typography.forEach(token => {
      switch (token.category) {
        case 'font-size':
          groups.fontSizes.push(token)
          break
        case 'font-weight':
          groups.fontWeights.push(token)
          break
        case 'font-family':
          groups.fontFamilies.push(token)
          break
        case 'line-height':
          groups.lineHeights.push(token)
          break
        case 'letter-spacing':
          groups.letterSpacing.push(token)
          break
        default:
          groups.textStyles.push(token)
      }
    })

    return groups
  }

  /**
   * Categorize spacing tokens into logical groups
   */
  private categorizeSpacingTokens(spacing: SpacingToken[]): SpacingGroups {
    const groups: SpacingGroups = {
      padding: [],
      margin: [],
      gap: [],
      general: [],
      responsive: {
        xs: [],
        sm: [],
        md: [],
        lg: [],
        xl: []
      }
    }

    spacing.forEach(token => {
      // Add to main category
      if (groups[token.category]) {
        groups[token.category].push(token)
      }

      // Categorize by size for responsive design
      const numericValue = this.extractNumericValue(token.value)
      if (numericValue !== null) {
        if (numericValue <= 0.5) {
          groups.responsive.xs.push(token)
        } else if (numericValue <= 1) {
          groups.responsive.sm.push(token)
        } else if (numericValue <= 2) {
          groups.responsive.md.push(token)
        } else if (numericValue <= 4) {
          groups.responsive.lg.push(token)
        } else {
          groups.responsive.xl.push(token)
        }
      }
    })

    return groups
  }

  /**
   * Categorize border tokens into logical groups
   */
  private categorizeBorderTokens(borders: BorderToken[]): BorderGroups {
    const groups: BorderGroups = {
      radius: [],
      width: [],
      style: [],
      color: [],
      interactive: {
        hover: [],
        focus: [],
        active: []
      }
    }

    borders.forEach(token => {
      // Add to main category
      if (groups[token.category]) {
        groups[token.category].push(token)
      }

      // Add to interactive categories if applicable
      if (token.name.includes('hover')) {
        groups.interactive.hover.push(token)
      } else if (token.name.includes('focus')) {
        groups.interactive.focus.push(token)
      } else if (token.name.includes('active')) {
        groups.interactive.active.push(token)
      }
    })

    return groups
  }

  /**
   * Extract numeric value from a CSS value string
   */
  private extractNumericValue(value: string): number | null {
    // Handle different CSS value formats
    const numericMatch = value.match(/(\d+(?:\.\d+)?)/)
    if (numericMatch) {
      return parseFloat(numericMatch[1])
    }
    return null
  }

  /**
   * Get tokens by category for easy access
   */
  getTokensByCategory(categorized: CategorizedTokens, category: keyof CategorizedTokens): any[] {
    return categorized[category] || []
  }

  /**
   * Get color tokens by specific color group
   */
  getColorTokensByGroup(categorized: CategorizedTokens, group: keyof ColorGroups): ColorToken[] {
    return categorized.colors[group] || []
  }

  /**
   * Get typography tokens by specific typography group
   */
  getTypographyTokensByGroup(categorized: CategorizedTokens, group: keyof TypographyGroups): TypographyToken[] {
    return categorized.typography[group] || []
  }

  /**
   * Get spacing tokens by specific spacing group
   */
  getSpacingTokensByGroup(categorized: CategorizedTokens, group: keyof SpacingGroups): SpacingToken[] {
    return categorized.spacing[group] || []
  }

  /**
   * Get border tokens by specific border group
   */
  getBorderTokensByGroup(categorized: CategorizedTokens, group: keyof BorderGroups): BorderToken[] {
    return categorized.borders[group] || []
  }

  /**
   * Get all interactive tokens (hover, focus, active states)
   */
  getInteractiveTokens(categorized: CategorizedTokens): {
    colors: InteractiveColorGroup
    borders: InteractiveBorderGroup
  } {
    return {
      colors: categorized.colors.interactive,
      borders: categorized.borders.interactive
    }
  }

  /**
   * Get responsive spacing tokens for different breakpoints
   */
  getResponsiveSpacingTokens(categorized: CategorizedTokens): ResponsiveSpacingGroup {
    return categorized.spacing.responsive
  }

  /**
   * Log a summary of the categorization results
   */
  private logCategorizationSummary(categorized: CategorizedTokens): void {
    console.log(`
🏷️  Token Categorization Summary:
   
   🌈 Colors:
      Primary: ${categorized.colors.primary.length}
      Secondary: ${categorized.colors.secondary.length}
      Semantic: ${categorized.colors.semantic.length}
      Neutral: ${categorized.colors.neutral.length}
      Background: ${categorized.colors.background.length}
      Text: ${categorized.colors.text.length}
      Border: ${categorized.colors.border.length}
      Interactive: ${Object.values(categorized.colors.interactive).reduce((sum, group) => sum + group.length, 0)}
   
   📝 Typography:
      Font Sizes: ${categorized.typography.fontSizes.length}
      Font Weights: ${categorized.typography.fontWeights.length}
      Font Families: ${categorized.typography.fontFamilies.length}
      Line Heights: ${categorized.typography.lineHeights.length}
      Letter Spacing: ${categorized.typography.letterSpacing.length}
      Text Styles: ${categorized.typography.textStyles.length}
   
   📏 Spacing:
      Padding: ${categorized.spacing.padding.length}
      Margin: ${categorized.spacing.margin.length}
      Gap: ${categorized.spacing.gap.length}
      General: ${categorized.spacing.general.length}
      Responsive: ${Object.values(categorized.spacing.responsive).reduce((sum, group) => sum + group.length, 0)}
   
   🔲 Borders:
      Radius: ${categorized.borders.radius.length}
      Width: ${categorized.borders.width.length}
      Style: ${categorized.borders.style.length}
      Color: ${categorized.borders.color.length}
      Interactive: ${Object.values(categorized.borders.interactive).reduce((sum, group) => sum + group.length, 0)}
   
   🌫️  Shadows: ${categorized.shadows.length}
   ⚡ Transitions: ${categorized.transitions.length}
   🔄 Transforms: ${categorized.transforms.length}
    `.trim())
  }

  /**
   * Export categorized tokens for external use
   */
  exportCategorizedTokens(categorized: CategorizedTokens): string {
    return JSON.stringify(categorized, null, 2)
  }

  /**
   * Validate that all tokens were properly categorized
   */
  validateCategorization(original: DesignSystemTokens, categorized: CategorizedTokens): boolean {
    const originalCount = original.colors.length + original.typography.length + original.spacing.length + original.borders.length + original.shadows.length + original.transitions.length + original.transforms.length
    
    // Count categorized tokens, handling duplicates properly
    let categorizedCount = 0
    
    // Count colors (including interactive states)
    Object.values(categorized.colors).forEach(group => {
      if (Array.isArray(group)) {
        categorizedCount += group.length
      } else {
        // Handle interactive groups
        Object.values(group as InteractiveColorGroup).forEach(subGroup => {
          categorizedCount += subGroup.length
        })
      }
    })
    
    // Count typography
    categorizedCount += categorized.typography.fontSizes.length
    categorizedCount += categorized.typography.fontWeights.length
    categorizedCount += categorized.typography.fontFamilies.length
    categorizedCount += categorized.typography.lineHeights.length
    categorizedCount += categorized.typography.letterSpacing.length
    categorizedCount += categorized.typography.textStyles.length
    
    // Count spacing (including responsive)
    Object.values(categorized.spacing).forEach(group => {
      if (Array.isArray(group)) {
        categorizedCount += group.length
      } else {
        // Handle responsive groups
        Object.values(group as ResponsiveSpacingGroup).forEach(subGroup => {
          categorizedCount += subGroup.length
        })
      }
    })
    
    // Count borders (including interactive)
    Object.values(categorized.borders).forEach(group => {
      if (Array.isArray(group)) {
        categorizedCount += group.length
      } else {
        // Handle interactive groups
        Object.values(group as InteractiveBorderGroup).forEach(subGroup => {
          categorizedCount += subGroup.length
        })
      }
    })
    
    // Count other token types
    categorizedCount += categorized.shadows.length
    categorizedCount += categorized.transitions.length
    categorizedCount += categorized.transforms.length

    const isValid = originalCount === categorizedCount
    
    if (!isValid) {
      console.warn(`⚠️  Categorization validation failed: Original: ${originalCount}, Categorized: ${categorizedCount}`)
      console.warn(`   This might be due to duplicate token names with different values (e.g., light/dark themes)`)
      console.warn(`   Original tokens: ${originalCount}`)
      console.warn(`   Categorized tokens: ${categorizedCount}`)
      console.warn(`   Difference: ${categorizedCount - originalCount}`)
      
      // Show some examples of potential duplicates
      this.logPotentialDuplicates(categorized)
    } else {
      console.log(`✅ Categorization validation passed: ${originalCount} tokens properly categorized`)
    }
    
    return isValid
  }

  /**
   * Log potential duplicate tokens for debugging
   */
  private logPotentialDuplicates(categorized: CategorizedTokens): void {
    console.log('\n🔍 Potential Duplicate Analysis:')
    
    // Check for duplicate names in colors
    const colorNames = new Map<string, number>()
    Object.values(categorized.colors).forEach(group => {
      if (Array.isArray(group)) {
        group.forEach(token => {
          const count = colorNames.get(token.name) || 0
          colorNames.set(token.name, count + 1)
        })
      } else {
        // Handle interactive groups
        Object.values(group as InteractiveColorGroup).forEach(subGroup => {
          subGroup.forEach(token => {
            const count = colorNames.get(token.name) || 0
            colorNames.set(token.name, count + 1)
          })
        })
      }
    })
    
    // Show duplicates
    const duplicates = Array.from(colorNames.entries())
      .filter(([name, count]) => count > 1)
      .sort(([, a], [, b]) => b - a)
    
    if (duplicates.length > 0) {
      console.log('   🌈 Duplicate color names:')
      duplicates.forEach(([name, count]) => {
        console.log(`      ${name}: ${count} occurrences`)
      })
    }
    
    // Check for duplicate names in borders
    const borderNames = new Map<string, number>()
    Object.values(categorized.borders).forEach(group => {
      if (Array.isArray(group)) {
        group.forEach(token => {
          const count = borderNames.get(token.name) || 0
          borderNames.set(token.name, count + 1)
        })
      } else {
        // Handle interactive groups
        Object.values(group as InteractiveBorderGroup).forEach(subGroup => {
          subGroup.forEach(token => {
            const count = borderNames.get(token.name) || 0
            borderNames.set(token.name, count + 1)
          })
        })
      }
    })
    
    const borderDuplicates = Array.from(borderNames.entries())
      .filter(([name, count]) => count > 1)
      .sort(([, a], [, b]) => b - a)
    
    if (borderDuplicates.length > 0) {
      console.log('   🔲 Duplicate border names:')
      borderDuplicates.forEach(([name, count]) => {
        console.log(`      ${name}: ${count} occurrences`)
      })
    }
  }
}
