import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'
import { DropdownItemMultiselect } from './DropdownItemMultiselect'
import { useHoverAnimation } from '../../lib/useHoverAnimation'
import { HoverIndicator } from '../ui/HoverIndicator'

export interface DropdownContentMultiselectProps extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenu.Content>, 'children'> {
  /**
   * Array of options to display
   */
  options: Array<{ value: string; label: string; disabled?: boolean }>
  /**
   * Currently selected values
   */
  selectedValues: string[]
  /**
   * Callback when selection changes
   */
  onSelectionChange: (values: string[]) => void
  /**
   * Maximum height of the dropdown content
   * @default '200px'
   */
  maxHeight?: string
  /**
   * Whether to show "Select All" option
   * @default true
   */
  enableSelectAll?: boolean
  /**
   * Label for the "Select All" option
   * @default 'All Templates'
   */
  selectAllLabel?: string
  /**
   * Placeholder text when no options are available
   */
  placeholder?: string
  /**
   * Whether to show search functionality
   * @default false
   */
  enableSearch?: boolean
  /**
   * Search placeholder text
   * @default 'Search...'
   */
  searchPlaceholder?: string
  /**
   * Whether the dropdown is open (for clearing search on close)
   */
  open?: boolean
  /**
   * Enable hover animation for dropdown items
   * @default true
   */
  enableHoverAnimation?: boolean
  /**
   * Hover animation variant
   * @default 'default'
   */
  hoverVariant?: 'default' | 'subtle' | 'primary' | 'accent'
  /**
   * Custom CSS classes
   */
  className?: string
}

export const DropdownContentMultiselect = React.forwardRef<HTMLDivElement, DropdownContentMultiselectProps>(
  ({ 
    className,
    sideOffset = 6,
    collisionPadding = 8,
    options = [],
    selectedValues = [],
    onSelectionChange,
    maxHeight = '200px',
    enableSelectAll = true,
    selectAllLabel = 'All Templates',
    placeholder = 'No options available',
    enableSearch = false,
    searchPlaceholder = 'Search...',
    open,
    enableHoverAnimation = true,
    hoverVariant = 'default',
    ...props 
  }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState('')
    const searchRef = React.useRef<HTMLInputElement>(null)
    
    // Hover animation hook
    const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
      itemSelector: '[data-multiselect-item]',
      enabled: enableHoverAnimation
    })


    // Filter options based on search term
    const filteredOptions = React.useMemo(() => {
      if (!enableSearch || !searchTerm.trim()) {
        return options
      }
      return options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [options, searchTerm, enableSearch])

    // Calculate select all state
    const allSelected = filteredOptions.length > 0 && filteredOptions.every(option => 
      selectedValues.includes(option.value)
    )
    const someSelected = filteredOptions.some(option => 
      selectedValues.includes(option.value)
    )
    const isIndeterminate = someSelected && !allSelected

    // Handle select all toggle
    const handleSelectAll = () => {
      if (allSelected) {
        // Deselect all filtered options
        const filteredValues = filteredOptions.map(option => option.value)
        const newSelection = selectedValues.filter(value => !filteredValues.includes(value))
        onSelectionChange(newSelection)
      } else {
        // Select all filtered options
        const filteredValues = filteredOptions.map(option => option.value)
        const newSelection = [...new Set([...selectedValues, ...filteredValues])]
        onSelectionChange(newSelection)
      }
    }

    // Handle individual option toggle
    const handleOptionToggle = (value: string) => {
      if (selectedValues.includes(value)) {
        onSelectionChange(selectedValues.filter(v => v !== value))
      } else {
        onSelectionChange([...selectedValues, value])
      }
    }

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }

    // Clear search when dropdown closes
    React.useEffect(() => {
      if (open === false) {
        setSearchTerm('')
      }
    }, [open])

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (open && enableSearch && searchRef.current) {
        setTimeout(() => searchRef.current?.focus(), 0)
      }
    }, [open, enableSearch])

    return (
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          ref={ref}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          className={cn(
            'dropdown-content z-50 w-[var(--radix-popper-anchor-width)] max-w-[var(--radix-popper-available-width)] rounded-lg border border-border-default bg-background-secondary p-1 shadow-lg will-change-[opacity,transform] focus:outline-none relative',
            'data-[side=top]:origin-bottom data-[side=bottom]:origin-top',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            className,
          )}
          {...props}
        >
          {/* Search Input */}
          {enableSearch && (
            <div className="px-3 py-2 border-b border-border-default mb-1">
              <input
                ref={searchRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-2 py-1 text-sm bg-background-secondary border border-border-default rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Content Container */}
          <div 
            ref={setContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-y-auto scrollbar-hide [&::-webkit-scrollbar]:hidden"
            style={{ 
              maxHeight,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {enableHoverAnimation && (
              <HoverIndicator 
                indicator={indicator} 
                variant={hoverVariant}
                zIndex={0}
              />
            )}
              {/* Select All Option */}
              {enableSelectAll && filteredOptions.length > 0 && (
                <DropdownItemMultiselect
                  checked={allSelected}
                  indeterminate={isIndeterminate}
                  onToggle={handleSelectAll}
                  label={selectAllLabel}
                />
              )}

              {/* Options List */}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <DropdownItemMultiselect
                    key={option.value}
                    checked={selectedValues.includes(option.value)}
                    onToggle={() => handleOptionToggle(option.value)}
                    label={option.label}
                    disabled={option.disabled}
                  />
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-text-secondary text-center">
                  {searchTerm ? 'No matching options found' : placeholder}
                </div>
              )}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    )
  },
)

DropdownContentMultiselect.displayName = 'DropdownContentMultiselect'
