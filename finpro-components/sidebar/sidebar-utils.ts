/**
 * Sidebar-specific utility functions
 */

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Creates a unique ID for elements
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export const createUniqueId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Formats multiselect display text
 * @param selectedItems - Array of selected items
 * @param allItems - Array of all available items (with either id or value property)
 * @param allSelectedText - Text to show when all items are selected
 * @param noneSelectedText - Text to show when no items are selected
 * @returns Formatted display text
 */
export const formatMultiselectDisplay = (
  selectedItems: string[],
  allItems: ({ id: string; label: string } | { value: string; label: string })[],
  allSelectedText: string = 'All selected',
  noneSelectedText: string = 'None selected'
): string => {
  if (selectedItems.length === 0) return noneSelectedText
  if (selectedItems.length === allItems.length) return allSelectedText
  if (selectedItems.length === 1) {
    const item = allItems.find(item => ('id' in item ? item.id : item.value) === selectedItems[0])
    return item ? item.label : '1 selected'
  }
  return `${selectedItems.length} selected`
}

/**
 * Creates a map of items by their IDs
 * @param items - Array of items with id property
 * @returns Map of items keyed by ID
 */
export const createItemsByIdMap = <T extends { id: string }>(
  items: T[]
): Record<string, T> => {
  return items.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {} as Record<string, T>)
}

/**
 * Gets the initial order of items
 * @param items - Array of items
 * @returns Array of item IDs in initial order
 */
export const getInitialOrder = <T extends { id: string }>(items: T[]): string[] => {
  return items.map(item => item.id)
}

/**
 * Validates selected items against available items
 * @param selectedIds - Array of selected item IDs
 * @param availableItems - Array of available items
 * @returns Object with validation result and valid selections
 */
export const validateSelections = (
  selectedIds: string[],
  availableItems: { id: string }[]
): { isValid: boolean; validSelections: string[] } => {
  const availableIds = new Set(availableItems.map(item => item.id))
  const validSelections = selectedIds.filter(id => availableIds.has(id))

  return {
    isValid: validSelections.length === selectedIds.length,
    validSelections
  }
}

/**
 * Creates trigger styles for dropdown/filter components with hover effects
 * @param isHovered - Whether the trigger is currently hovered
 * @param isClicked - Whether the trigger is currently clicked
 * @returns Object containing CSS styles for the trigger
 */
export const createTriggerStyles = (
  isHovered: boolean,
  isClicked: boolean = false
) => {
  const baseStyles: any = {
    transform: isHovered ? 'translateY(-1px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
    transition: 'all 0.2s ease-in-out',
  }

  // Apply CSS variables directly (they'll be resolved by CSS)
  baseStyles.backgroundColor = isHovered
    ? 'var(--color-background-tertiary)'
    : 'var(--color-background-secondary)'
  baseStyles.color = 'var(--color-text-primary)'
  baseStyles.borderColor = isHovered
    ? 'var(--color-border-hover)'
    : 'var(--color-border-default)'
  baseStyles.fontSize = 'var(--typography-fontSize-sm)'
  baseStyles.fontWeight = 'var(--typography-fontWeight-medium)'
  baseStyles.letterSpacing = '0.05em'
  baseStyles.padding = 'var(--spacing-2)'
  baseStyles.borderRadius = 'var(--border-radius-lg)'
  baseStyles.borderWidth = '1px'
  baseStyles.borderStyle = 'solid'
  baseStyles.borderBottomWidth = '1px'
  baseStyles.boxShadow = isHovered
    ? 'var(--shadow-md)'
    : 'var(--core-shadows-sm)'

  return baseStyles
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
 * Creates expansion animation styles
 * @param isExpanded - Whether the content is expanded
 * @param animationConstants - Animation constants object
 * @returns Object containing animation styles
 */
export const createExpansionAnimationStyles = (
  isExpanded: boolean,
  animationConstants: {
    transition: string
    expandedHeight: string
    collapsedHeight: string
    expandedOpacity: number
    collapsedOpacity: number
    expandedMargin: string
    collapsedMargin: string
  }
) => {
  return {
    transition: animationConstants.transition,
    maxHeight: isExpanded ? animationConstants.expandedHeight : animationConstants.collapsedHeight,
    opacity: isExpanded ? animationConstants.expandedOpacity : animationConstants.collapsedOpacity,
    marginTop: isExpanded ? animationConstants.expandedMargin : animationConstants.collapsedMargin,
  }
}
