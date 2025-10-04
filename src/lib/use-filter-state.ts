import { useState, useRef, useMemo, useCallback } from 'react'

/**
 * Custom hook for managing filter state with change tracking
 *
 * Provides a reusable way to manage filter values with automatic change detection
 * compared to default values. Supports custom comparison functions for different data types.
 *
 * ## Features
 *
 * - **Automatic change detection** - Tracks when values differ from defaults
 * - **Type-safe generic implementation** - Works with any data type
 * - **Custom comparison functions** - Override default comparison logic for complex types
 * - **Performance optimized** - Uses memoization to prevent unnecessary recalculations
 * - **Stable references** - Prevents unwanted re-renders with useCallback and useRef
 *
 * ## Usage
 *
 * ### Basic Array Filters
 * ```tsx
 * const [selectedItems, setSelectedItems, itemsChanged, resetItems] = useFilterState(['default'])
 *
 * // Set new values
 * setSelectedItems(['item1', 'item2'])
 *
 * // Check if changed from default
 * if (itemsChanged) {
 *   // Show apply/reset buttons
 * }
 *
 * // Reset to default
 * resetItems()
 * ```
 *
 * ### Object Filters with Custom Comparison
 * ```tsx
 * const compareDateRanges = (a, b) => a.start?.getTime() === b.start?.getTime()
 * const [dateRange, setDateRange, dateRangeChanged] = useFilterState(defaultRange, compareDateRanges)
 * ```
 *
 * ### Complete Example
 * ```tsx
 * const [selectedItems, setSelectedItems, hasChanges, reset] = useFilterState(['default'])
 *
 * // Show apply/reset buttons only when filters have changed
 * if (hasChanges) {
 *   // Render apply and reset buttons
 *   handleApplyFilters()
 *   reset() // Reset to default values
 * }
 * ```
 *
 * @param defaultValue - The default/initial value for the filter
 * @param compareFn - Optional custom comparison function for complex types
 * @returns [value, setValueWithChangeTracking, hasChanged, reset]
 */
export function useFilterState<T>(
  defaultValue: T,
  compareFn?: (a: T, b: T) => boolean
) {
  const [value, setValue] = useState<T>(defaultValue)
  const defaultRef = useRef(defaultValue)

  const setValueWithChangeTracking = useCallback((newValue: T | ((prev: T) => T)) => {
    const actualNewValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue
    setValue(actualNewValue)
    return actualNewValue
  }, [value])

  const hasChanged = useMemo(() => {
    if (compareFn) {
      return !compareFn(value, defaultRef.current)
    }
    // Default comparison for arrays
    if (Array.isArray(value) && Array.isArray(defaultRef.current)) {
      if (value.length !== defaultRef.current.length) return true
      const sortedValue = [...value].sort()
      const sortedDefault = [...defaultRef.current].sort()
      return sortedValue.some((item, index) => item !== sortedDefault[index])
    }
    // Default comparison for objects (like DateRangeValue)
    return JSON.stringify(value) !== JSON.stringify(defaultRef.current)
  }, [value, compareFn])

  const reset = useCallback(() => {
    setValue(defaultRef.current)
  }, [])

  return [value, setValueWithChangeTracking, hasChanged, reset] as const
}
