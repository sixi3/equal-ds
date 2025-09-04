import { useState, useCallback } from 'react'
import { cn } from '../../src/lib/cn'

// Utility function to generate FinPro dropdown classes
export function getFinProDropdownClasses(options?: {
  customClasses?: string
  isHovered?: boolean
  isFocused?: boolean
  isDisabled?: boolean
}) {
  const baseClasses = 'finpro-dropdown-trigger'

  return cn(
    baseClasses,
    options?.customClasses,
    {
      'finpro-dropdown-trigger--hovered': options?.isHovered,
      'finpro-dropdown-trigger--focused': options?.isFocused,
      'finpro-dropdown-trigger--disabled': options?.isDisabled,
    }
  )
}

// Utility function to generate label classes
export function getFinProLabelClasses(customClasses?: string) {
  return cn('finpro-dropdown-label', customClasses)
}

// Utility function to generate container classes
export function getFinProContainerClasses(customClasses?: string) {
  return cn('finpro-dropdown-container', customClasses)
}

// Utility function to generate content classes
export function getFinProContentClasses(customClasses?: string) {
  return cn('finpro-dropdown-content', customClasses)
}

// Hook for managing dropdown interaction states with class generation
export function useFinProDropdownState() {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const triggerClasses = getFinProDropdownClasses({
    isHovered,
    isFocused,
    isDisabled: false
  })

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])
  const handleFocus = useCallback(() => setIsFocused(true), [])
  const handleBlur = useCallback(() => setIsFocused(false), [])
  const handleToggle = useCallback(() => setIsOpen(prev => !prev), [])

  return {
    isHovered,
    isFocused,
    isOpen,
    triggerClasses,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleToggle,
  }
}

// Generate inline styles for dynamic theming
export function generateFinProInlineStyles(config: {
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
  fontSize?: string
  fontWeight?: string
  letterSpacing?: string
  padding?: string
  borderRadius?: string
  borderWidth?: string
  borderBottomWidth?: string
  hoverBorderBottomWidth?: string
  boxShadow?: string
  hoverBoxShadow?: string
}, isHovered = false) {
  const baseStyles: Record<string, string> = {}

  // Apply base or hover styles
  const bgColor = isHovered && config.hoverBackgroundColor ? config.hoverBackgroundColor : config.backgroundColor
  const txtColor = isHovered && config.hoverTextColor ? config.hoverTextColor : config.textColor
  const brdColor = isHovered && config.hoverBorderColor ? config.hoverBorderColor : config.borderColor
  const shadow = isHovered && config.hoverBoxShadow ? config.hoverBoxShadow : config.boxShadow
  const borderBottomWidth = isHovered && config.hoverBorderBottomWidth ? config.hoverBorderBottomWidth : config.borderBottomWidth

  if (bgColor) baseStyles.backgroundColor = `var(${bgColor})`
  if (txtColor) baseStyles.color = `var(${txtColor})`
  if (brdColor) baseStyles.borderColor = `var(${brdColor})`
  if (config.fontSize) baseStyles.fontSize = `var(${config.fontSize})`
  if (config.fontWeight) baseStyles.fontWeight = `var(${config.fontWeight})`
  if (config.letterSpacing) {
    baseStyles.letterSpacing = config.letterSpacing.startsWith('--') ? `var(${config.letterSpacing})` : config.letterSpacing
  }
  if (config.padding) baseStyles.padding = `var(${config.padding})`
  if (config.borderRadius) baseStyles.borderRadius = `var(${config.borderRadius})`
  if (config.borderWidth) baseStyles.borderWidth = config.borderWidth
  if (borderBottomWidth) baseStyles.borderBottomWidth = borderBottomWidth
  if (shadow) baseStyles.boxShadow = `var(${shadow})`

  // Add hover transform if hovered
  if (isHovered) {
    baseStyles.transform = 'translateY(-2px)'
  }

  return baseStyles
}

// Generate CSS custom properties for theming
export function generateFinProCSSVariables(prefix = '--finpro') {
  return {
    [`${prefix}-background`]: 'var(--color-background-secondary)',
    [`${prefix}-background-hover`]: 'var(--color-background-tertiary)',
    [`${prefix}-text`]: 'var(--color-text-primary)',
    [`${prefix}-border`]: 'var(--color-border-hover)',
    [`${prefix}-font-size`]: 'var(--typography-fontSize-sm)',
    [`${prefix}-font-weight`]: 'var(--typography-fontWeight-medium)',
    [`${prefix}-letter-spacing`]: '0.025em',
    [`${prefix}-padding`]: 'var(--spacing-2)',
    [`${prefix}-border-radius`]: 'var(--border-radius-lg)',
    [`${prefix}-border-width`]: '1px',
    [`${prefix}-border-bottom-width`]: '3px',
    [`${prefix}-box-shadow`]: 'var(--component-card-shadow)',
    [`${prefix}-box-shadow-hover`]: 'var(--shadow-md)',
    [`${prefix}-transform-hover`]: 'translateY(-2px)',
    [`${prefix}-transition`]: 'all 0.2s ease-in-out',

    /* Label styles */
    [`${prefix}-label-font-size`]: 'var(--typography-fontSize-xs)',
    [`${prefix}-label-font-weight`]: 'var(--typography-fontWeight-normal)',
    [`${prefix}-label-letter-spacing`]: '0.1em',
    [`${prefix}-label-color`]: 'var(--color-text-secondary)',
  }
}

// Utility to create a complete FinPro theme object
export function createFinProTheme(overrides?: Partial<ReturnType<typeof generateFinProCSSVariables>>) {
  const baseTheme = generateFinProCSSVariables()
  return { ...baseTheme, ...overrides }
}

// Export default FinPro theme
export const finProTheme = generateFinProCSSVariables()

// Type for FinPro theme
export type FinProTheme = typeof finProTheme
