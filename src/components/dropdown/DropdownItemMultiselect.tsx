import * as React from 'react'
import { cn } from '../../lib/cn'

// Status tag component for displaying status indicators
interface StatusTagProps {
  status: string
  className?: string
}

const StatusTag: React.FC<StatusTagProps> = ({ status, className }) => {
  const getStatusStyles = (status: string) => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case 'active':
        return 'bg-status-active-bg text-status-active-text'
      case 'pending':
        return 'bg-status-pending-bg text-status-pending-text'
      case 'rejected':
        return 'bg-status-rejected-bg text-status-rejected-text'
      case 'revoked':
        return 'bg-status-revoked-bg text-status-revoked-text'
      case 'paused':
        return 'bg-status-paused-bg text-status-paused-text'
      case 'failed':
        return 'bg-status-failed-bg text-status-failed-text'
      case 'automatic':
        return 'bg-[#4F46E5] text-white' // Default blue for automatic
      default:
        return 'bg-[#F3F4F6] text-[#374151]' // Default gray
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider',
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </span>
  )
}

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
  /**
   * Whether this item represents a status that should be displayed as a tag
   */
  isStatusTag?: boolean
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
    isStatusTag = false,
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
          'hover:bg-primary-300/10',
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
        <span className="flex-1 flex items-center">
          {isStatusTag ? (
            <StatusTag status={label} />
          ) : (
            <span
              className={cn(
                'text-text-primary font-normal tracking-wider',
                disabled && 'text-text-secondary'
              )}
            >
              {label}
            </span>
          )}
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
