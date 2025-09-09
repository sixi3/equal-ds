import { TRIGGER_STYLE_VARS, STATUS_STYLES } from './finpro-sidebar-config'

/**
 * Creates trigger styles for dropdown components with hover effects
 * @param isHovered - Whether the trigger is currently hovered
 * @param isClicked - Whether the trigger is currently clicked
 * @returns Object containing CSS styles for the trigger
 */
export const createTriggerStyles = (isHovered: boolean, isClicked: boolean = false) => {
  const baseStyles: any = {
    transform: isHovered ? 'translateY(-1px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
    transition: 'all 0.2s ease-in-out',
  }

  // Apply base styles or hover styles based on hover state
  const bgColor = isHovered ? TRIGGER_STYLE_VARS.hoveredBg : TRIGGER_STYLE_VARS.defaultBg
  const txtColor = TRIGGER_STYLE_VARS.textColor
  const brdColor = isHovered ? TRIGGER_STYLE_VARS.hoveredBorder : TRIGGER_STYLE_VARS.defaultBorder
  const shadow = isHovered ? TRIGGER_STYLE_VARS.hoveredShadow : TRIGGER_STYLE_VARS.defaultShadow
  const borderBottomWidthValue = isHovered ? '3px' : '3px'

  // Apply CSS variables directly (they'll be resolved by CSS)
  if (bgColor) baseStyles.backgroundColor = `var(${bgColor})`
  if (txtColor) baseStyles.color = `var(${txtColor})`
  if (brdColor) baseStyles.borderColor = `var(${brdColor})`
  baseStyles.fontSize = `var(${TRIGGER_STYLE_VARS.fontSize})`
  baseStyles.fontWeight = `var(${TRIGGER_STYLE_VARS.fontWeight})`
  baseStyles.letterSpacing = TRIGGER_STYLE_VARS.letterSpacing
  baseStyles.padding = `var(${TRIGGER_STYLE_VARS.padding})`
  baseStyles.borderRadius = `var(${TRIGGER_STYLE_VARS.borderRadius})`
  baseStyles.borderWidth = '1px'
  baseStyles.borderStyle = 'solid'
  if (borderBottomWidthValue) baseStyles.borderBottomWidth = borderBottomWidthValue
  if (shadow) baseStyles.boxShadow = `var(${shadow})`

  return baseStyles
}

/**
 * Gets the appropriate status badge style based on status value
 * @param status - The status value (e.g., 'active', 'pending', etc.)
 * @returns CSS class string for the status badge
 */
export const getStatusBadgeStyle = (status: string): string => {
  const statusKey = status.toLowerCase()
  return STATUS_STYLES[statusKey as keyof typeof STATUS_STYLES] || STATUS_STYLES.default
}

/**
 * Formats multiselect display text based on selected values
 * @param selectedValues - Array of selected values
 * @param allOptions - Array of all available options
 * @param allLabel - Label to show when all options are selected
 * @param noneLabel - Label to show when no options are selected
 * @param singularLabel - Label for single selection (optional)
 * @returns Formatted display text
 */
export const formatMultiselectDisplay = (
  selectedValues: string[],
  allOptions: Array<{ value: string; label: string }>,
  allLabel: string,
  noneLabel: string,
  singularLabel?: string
): string => {
  if (selectedValues.length === allOptions.length) {
    return allLabel
  }
  if (selectedValues.length === 0) {
    return noneLabel
  }
  if (selectedValues.length === 1 && singularLabel) {
    const option = allOptions.find(opt => opt.value === selectedValues[0])
    return option ? singularLabel.replace('{value}', option.label) : `${selectedValues.length} selected`
  }
  return `${selectedValues.length} selected`
}

/**
 * Creates animation styles for the filter section expansion/collapse
 * @param isExpanded - Whether the filter section is expanded
 * @returns Object containing animation styles
 */
export const createFilterAnimationStyles = (isExpanded: boolean) => {
  return {
    transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-out, margin-top 0.5s ease-out',
    maxHeight: isExpanded ? '384px' : '0px',
    opacity: isExpanded ? 1 : 0,
    marginTop: isExpanded ? '16px' : '0px'
  }
}

/**
 * Gets common dropdown content styles
 * @returns Object containing common styles for dropdown content
 */
export const getDropdownContentStyles = () => {
  return {
    borderColor: 'var(--color-border-default)',
    backgroundColor: 'var(--color-background-secondary)',
    borderRadius: 'var(--border-radius-lg)',
  }
}

/**
 * Gets common label styles for filter labels
 * @returns Object containing common styles for filter labels
 */
export const getFilterLabelStyles = () => {
  return {
    fontSize: 'var(--typography-fontSize-xs)',
    fontWeight: 'var(--typography-fontWeight-medium)',
    letterSpacing: '0.05em',
    color: 'var(--color-text-secondary)',
  }
}

/**
 * Creates a mapping of sidebar items by ID for efficient lookups
 * @param items - Array of sidebar items with id, label, and icon
 * @returns Object mapping item IDs to item objects
 */
export const createItemsByIdMap = <T extends { id: string }>(items: T[]) => {
  return Object.fromEntries(items.map((item) => [item.id, item]))
}

/**
 * Gets initial order array from items
 * @param items - Array of items with id property
 * @returns Array of item IDs in order
 */
export const getInitialOrder = <T extends { id: string }>(items: T[]): string[] => {
  return items.map((item) => item.id)
}

/**
 * Validates filter selections against available options
 * @param selections - Array of selected values
 * @param options - Array of available options
 * @returns Array of valid selections
 */
export const validateSelections = (
  selections: string[],
  options: Array<{ value: string }>
): string[] => {
  const validValues = new Set(options.map(option => option.value))
  return selections.filter(selection => validValues.has(selection))
}

/**
 * Debounce function for search inputs
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Creates a unique ID for DOM elements
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
export const createUniqueId = (prefix: string = 'finpro-sidebar'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}
