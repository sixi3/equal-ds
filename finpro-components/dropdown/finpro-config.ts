import { useState } from 'react'

// FinPro dropdown styling configuration
export const finProDropdownConfig = {
  // Layout controls
  headerGap: "mb-3", // Gap between header and dropdowns
  dropdownGap: "gap-4", // Gap between dropdown components

  // Core styling
  backgroundColor: '--color-background-secondary',
  textColor: '--color-text-primary',
  borderColor: "--color-border-hover",
  fontSize: "--typography-fontSize-sm",
  fontWeight: "--typography-fontWeight-medium",
  letterSpacing: "0.025em",
  padding: '--spacing-2',
  borderRadius: "--border-radius-lg",
  borderWidth: '1px',
  borderStyle: 'solid',
  borderBottomWidth: "3px",
  hoverBorderBottomWidth: '3px',

  // Hover states
  hoverBackgroundColor: "--color-background-tertiary",
  hoverTextColor: "--color-text-primary",
  hoverBorderColor: "--color-border-hover",
  hoverBoxShadow: "--shadow-md",

  // Label styling
  showLabel: true,
  labelFontSize: "--typography-fontSize-xs",
  labelFontWeight: "--typography-fontWeight-normal",
  labelLetterSpacing: "0.1em",
  labelTextColor: "--color-text-secondary",

  // Additional styling
  boxShadow: "--component-card-shadow"
} as const

// Type definition for the configuration
export type FinProDropdownConfig = typeof finProDropdownConfig

// Hover interaction hook
export function useDropdownHoverInteractions(config: Partial<FinProDropdownConfig>) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Generate styles based on hover state
  const getTriggerStyles = () => {
    const baseStyles: Record<string, any> = {
      transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
      transition: 'all 0.2s ease-in-out',
    }

    // Apply base styles or hover styles based on hover state
    const bgColor = isHovered && config.hoverBackgroundColor ? config.hoverBackgroundColor : config.backgroundColor
    const txtColor = isHovered && config.hoverTextColor ? config.hoverTextColor : config.textColor
    const brdColor = isHovered && config.hoverBorderColor ? config.hoverBorderColor : config.borderColor
    const shadow = isHovered && config.hoverBoxShadow ? config.hoverBoxShadow : config.boxShadow
    const borderBottomWidthValue = isHovered && config.hoverBorderBottomWidth ? config.hoverBorderBottomWidth : config.borderBottomWidth || '1px'

    // Apply CSS variables directly (they'll be resolved by CSS)
    if (bgColor) baseStyles.backgroundColor = `var(${bgColor})`
    if (txtColor) baseStyles.color = `var(${txtColor})`
    if (brdColor) baseStyles.borderColor = `var(${brdColor})`
    if (config.fontSize) baseStyles.fontSize = `var(${config.fontSize})`
    if (config.fontWeight) baseStyles.fontWeight = `var(${config.fontWeight})`
    if (config.lineHeight) baseStyles.lineHeight = `var(${config.lineHeight})`
    if (config.letterSpacing) {
      baseStyles.letterSpacing = config.letterSpacing.startsWith('--') ? `var(${config.letterSpacing})` : config.letterSpacing
    }
    if (config.padding) baseStyles.padding = `var(${config.padding})`
    if (config.borderRadius) baseStyles.borderRadius = `var(${config.borderRadius})`
    if (config.borderWidth) baseStyles.borderWidth = config.borderWidth
    if (config.borderStyle) baseStyles.borderStyle = config.borderStyle
    if (borderBottomWidthValue) baseStyles.borderBottomWidth = borderBottomWidthValue
    if (shadow) baseStyles.boxShadow = `var(${shadow})`

    return baseStyles
  }

  // Event handlers
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  const handleMouseDown = () => setIsClicked(true)
  const handleMouseUp = () => setIsClicked(false)

  return {
    isHovered,
    isClicked,
    getTriggerStyles,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp
  }
}

// Generate label styles
export function getLabelStyles(config: Partial<FinProDropdownConfig>) {
  return {
    fontSize: config.labelFontSize ? `var(${config.labelFontSize})` : undefined,
    fontWeight: config.labelFontWeight ? `var(${config.labelFontWeight})` : undefined,
    letterSpacing: config.labelLetterSpacing
      ? (config.labelLetterSpacing.startsWith('--') ? `var(${config.labelLetterSpacing})` : config.labelLetterSpacing)
      : undefined,
    color: config.labelTextColor ? `var(${config.labelTextColor})` : undefined,
  }
}

// Generate dropdown content styles
export function getDropdownContentStyles(config: Partial<FinProDropdownConfig>) {
  return {
    borderColor: config.borderColor ? `var(${config.borderColor})` : undefined,
    backgroundColor: config.backgroundColor ? `var(${config.backgroundColor})` : undefined,
    borderRadius: config.borderRadius ? `var(${config.borderRadius})` : undefined,
  }
}

// Complete FinPro dropdown props interface
export interface FinProDropdownProps {
  label: string
  showLabel?: boolean
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
  disabled?: boolean
  config?: Partial<FinProDropdownConfig>
}
