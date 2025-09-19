import * as React from 'react'
import { Search } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { SearchBarInputProps } from './types'

export const SearchBarInput = React.forwardRef<HTMLInputElement, SearchBarInputProps>(
  ({
    placeholder = 'Search...',
    value,
    onChange,
    onSearch,
    disabled = false,
    loading = false,
    className,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState('')
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !disabled && !loading) {
        onSearch?.(currentValue)
      }
    }

    const handleSubmit = () => {
      if (!disabled && !loading) {
        onSearch?.(currentValue)
      }
    }

    return (
      <div className={cn(
        // Search input container styles - matches design spec
        'flex w-80 flex-1 items-center gap-2 bg-background-secondary px-3 py-0',
        // State-based styles
        {
          'bg-gray-50': disabled,
        },
        className
      )}>
        {/* Search Icon */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || loading}
          className={cn(
            'flex h-4 w-4 flex-shrink-0 items-center justify-center text-text-secondary transition-colors',
            'hover:text-primary-500 focus:outline-none focus:text-primary-500',
            {
              'text-text-muted cursor-not-allowed': disabled,
              'cursor-pointer': !disabled && !loading,
            }
          )}
          aria-label="Search"
        >
          <Search size={16} strokeWidth={2} />
        </button>

        {/* Input Field */}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          className={cn(
            // Input field styles - matches design spec typography
            'flex-1 bg-transparent text-xs text-text-primary placeholder:text-text-tertiary pt-1',
            'font-normal leading-tight tracking-wider placeholder:font-normal placeholder:leading-tight placeholder:tracking-wider',
            'border-0 outline-none focus:ring-0',
            // State-based styles
            {
              'text-text-muted placeholder:text-text-muted cursor-not-allowed': disabled,
              'cursor-text': !disabled && !loading,
            }
          )}
          {...props}
        />
      </div>
    )
  }
)

SearchBarInput.displayName = 'SearchBarInput'
