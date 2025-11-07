/**
 * Utility functions for filter table component
 */

export interface TriggerStyleProps {
  isHovered: boolean
  isClicked?: boolean
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
  padding?: string
  borderRadius?: string
  borderWidth?: string
  borderStyle?: string
  borderBottomWidth?: string
  hoverBorderBottomWidth?: string
  boxShadow?: string
  hoverBoxShadow?: string
}

/**
 * Creates trigger styles for dropdown components with hover effects
 * @param props - Style configuration props
 * @returns Object containing CSS styles for the trigger
 */
export const createTriggerStyles = (props: TriggerStyleProps) => {
  const {
    isHovered,
    isClicked = false,
    backgroundColor,
    textColor,
    borderColor,
    hoverBackgroundColor,
    hoverTextColor,
    hoverBorderColor,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    padding,
    borderRadius,
    borderWidth,
    borderStyle,
    borderBottomWidth,
    hoverBorderBottomWidth,
    boxShadow,
    hoverBoxShadow,
  } = props

  const baseStyles: any = {
    transform: isHovered ? 'translateY(-1px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
    transition: 'all 0.2s ease-in-out',
  }

  // Apply base styles or hover styles based on hover state
  const bgColor = isHovered && hoverBackgroundColor ? hoverBackgroundColor : backgroundColor
  const txtColor = isHovered && hoverTextColor ? hoverTextColor : textColor
  const brdColor = isHovered && hoverBorderColor ? hoverBorderColor : borderColor
  const shadow = isHovered && hoverBoxShadow ? hoverBoxShadow : boxShadow
  const borderBottomWidthValue = isHovered && hoverBorderBottomWidth ? hoverBorderBottomWidth : borderBottomWidth || '3px'

  // Apply CSS variables directly (they'll be resolved by CSS)
  if (bgColor) baseStyles.backgroundColor = `var(${bgColor})`
  if (txtColor) baseStyles.color = `var(${txtColor})`
  if (brdColor) baseStyles.borderColor = `var(${brdColor})`
  if (fontSize) baseStyles.fontSize = `var(${fontSize})`
  if (fontWeight) baseStyles.fontWeight = `var(${fontWeight})`
  if (lineHeight) baseStyles.lineHeight = `var(${lineHeight})`
  if (letterSpacing) {
    baseStyles.letterSpacing = letterSpacing.startsWith('--') ? `var(${letterSpacing})` : letterSpacing
  }
  if (padding) baseStyles.padding = `var(${padding})`
  if (borderRadius) baseStyles.borderRadius = `var(${borderRadius})`
  if (borderWidth) baseStyles.borderWidth = borderWidth
  if (borderStyle) baseStyles.borderStyle = borderStyle
  if (borderBottomWidthValue) baseStyles.borderBottomWidth = borderBottomWidthValue
  if (shadow) baseStyles.boxShadow = `var(${shadow})`

  return baseStyles
}

/**
 * Formats label style properties
 * @param labelFontSize - Font size CSS variable or value
 * @param labelFontWeight - Font weight CSS variable or value
 * @param labelLetterSpacing - Letter spacing CSS variable or value
 * @param labelTextColor - Text color CSS variable
 * @returns Object containing label styles
 */
export const createLabelStyles = (
  labelFontSize?: string,
  labelFontWeight?: string,
  labelLetterSpacing?: string,
  labelTextColor?: string
) => {
  const styles: any = {}
  
  if (labelFontSize) styles.fontSize = `var(${labelFontSize})`
  if (labelFontWeight) styles.fontWeight = `var(${labelFontWeight})`
  if (labelLetterSpacing) {
    styles.letterSpacing = labelLetterSpacing.startsWith('--') 
      ? `var(${labelLetterSpacing})` 
      : labelLetterSpacing
  }
  if (labelTextColor) styles.color = `var(${labelTextColor})`
  
  return styles
}

