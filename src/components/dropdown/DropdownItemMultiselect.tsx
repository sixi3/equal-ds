import * as React from 'react'
import { cn } from '../../lib/cn'

export interface DropdownItemMultiselectProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean
  /**
   * Whether the checkbox is in indeterminate state (for "Select All")
   */
  indeterminate?: boolean
  /**
   * Callback when the item is toggled
   */
  onToggle: () => void
  /**
   * The label text for the item
   */
  label: string
  /**
   * Whether the item is disabled
   */
  disabled?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Whether to show a separator after this item
   */
  showSeparator?: boolean
}

export const DropdownItemMultiselect = React.forwardRef<HTMLDivElement, DropdownItemMultiselectProps>(
  ({ 
    checked, 
    indeterminate = false, 
    onToggle, 
    label, 
    disabled = false, 
    className,
    showSeparator = false,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        onToggle()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled) {
          onToggle()
        }
      }
    }

    return (
      <div
        ref={ref}
        data-multiselect-item
        className={cn(
          'relative flex items-center gap-3 px-3 py-4 text-sm cursor-pointer select-none',
          'hover:bg-primary-300/10 focus:bg-primary-300/10 focus:outline-none',
          'transition-colors duration-150',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-disabled={disabled}
        {...props}
      >
        {/* Checkbox */}
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            checked={checked}
            ref={(input) => {
              if (input) {
                input.indeterminate = indeterminate
              }
            }}
            onChange={() => {}} // Controlled by parent
            className="sr-only"
            disabled={disabled}
            tabIndex={-1}
          />
          <div
            className={cn(
              'w-5 h-5 border-2 rounded border-border-default flex items-center justify-center relative',
              'transition-all duration-200 ease-in-out',
              checked && 'bg-primary-500 border-primary-500',
              indeterminate && 'bg-primary-500 border-primary-500',
              !checked && !indeterminate && 'bg-background-secondary',
              disabled && 'opacity-50',
              // Subtle scale effect when checked
              (checked || indeterminate) && 'scale-105'
            )}
          >
            {/* Checkmark */}
            <div
              className={cn(
                'transition-all duration-200 ease-in-out',
                checked && !indeterminate 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-75'
              )}
            >
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            
            {/* Indeterminate mark */}
            <div
              className={cn(
                'absolute transition-all duration-200 ease-in-out',
                indeterminate 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-75'
              )}
            >
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Label */}
        <span
          className={cn(
            'flex-1 text-text-primary font-medium',
            disabled && 'text-text-secondary'
          )}
        >
          {label}
        </span>

        {/* Separator */}
        {showSeparator && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border-default" />
        )}
      </div>
    )
  }
)

DropdownItemMultiselect.displayName = 'DropdownItemMultiselect'
