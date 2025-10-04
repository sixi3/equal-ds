import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '../dropdown'
import type { ButtonDropdownOption, ButtonProps } from './types'

/**
 * Button component with Primary, Secondary, and Disabled variants.
 * Supports optional attached dropdown functionality similar to SearchBar.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    withDropdown = false,
    dropdownOptions = [],
    selectedDropdownOption,
    onDropdownChange,
    dropdownClassName,
    showDropdownHeader = false,
    dropdownHeaderText = 'Select Option',
    dropdownHeaderClassName,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    // Determine effective disabled state
    const isDisabled = disabled || variant === 'disabled'

    // Base button styles
    const baseClasses = 'inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

    // Size-based styles
    const sizeClasses = {
      sm: 'h-8 px-1.5 py-1.5 text-xs rounded-md gap-1',
      md: 'h-12 px-4 py-2.5 text-base rounded-lg gap-1',
      lg: 'h-16 px-6 py-3 text-base rounded-lg gap-1',
    }

    // Variant-based styles using design tokens
    const variantClasses = {
      primary: cn(
        'bg-primary-500 text-text-inverse hover:bg-primary-600 font-medium tracking-wider border border-t-0 border-l-0 border-r-0 border-b-2 border-primary-600 transition-all duration-200',
      ),
      secondary: cn(
        'bg-background-secondary tracking-wide font-medium  text-brand-primary border border-b-2 border-border-hover transition-all duration-200',
        'hover:bg-background-tertiary'
      ),
      disabled: cn(
        'bg-background-secondary text-text-muted border border-border-default',
        'cursor-not-allowed opacity-50'
      ),
    }

    // Dropdown trigger styles - complementary to main button variants
    const dropdownTriggerClasses = {
      primary: cn(
        'bg-primary-500 text-text-inverse hover:bg-primary-600 tracking-wider border tracking-wider border-b-2 border-t-0 border-primary-600 hover:border-primary-600 hover:shadow-none transition-all duration-200',
      ),
      secondary: cn(
        'bg-background-secondary font-regular tracking-wide text-text-primary border border-b-2 border-border-hover hover:border-border-hover hover:shadow-none',
        'hover:bg-background-tertiary'
      ),
      disabled: cn(
        'bg-background-secondary text-text-muted border-l border-border-default',
        'cursor-not-allowed opacity-50'
      ),
    }

    // Get selected dropdown option data
    const selectedOptionData = dropdownOptions.find(option => option.value === selectedDropdownOption)
    const dropdownDisplayLabel = selectedOptionData?.label || dropdownOptions[0]?.label || ''

    const handleDropdownSelect = (optionValue: string) => {
      onDropdownChange?.(optionValue)
    }

    if (withDropdown && dropdownOptions.length > 0) {
      // Button with attached dropdown
      return (
        <div className="inline-flex">
          <button
            ref={ref}
            disabled={isDisabled}
            className={cn(
              baseClasses,
              sizeClasses[size],
              variantClasses[variant],
              'rounded-r-none border-r-0',
              className
            )}
            {...props}
          >
            {children}
          </button>

          <Dropdown>
            <DropdownTrigger
              disabled={isDisabled}
              showChevron={false}
              variant="ghost"
              className={cn(
                'group h-auto border-l-0 px-2',
                sizeClasses[size],
                dropdownTriggerClasses[variant],
                'focus:ring-0 rounded-l-none shadow-none'
              )}
            >
              <span className="truncate text-xs">{dropdownDisplayLabel}</span>
              <ChevronDown
                size={14}
                className="flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </DropdownTrigger>

            <DropdownContent
              align="end"
              sideOffset={4}
              className={cn(
                'min-w-[160px] px-1 py-0 z-50 border-border-default',
                dropdownClassName
              )}
            >
              {/* Header - similar to SearchBarDropdown */}
              {showDropdownHeader && (
                <div className={cn(
                  "-mx-1  mb-1 bg-gradient-to-b from-primary-50 to-primary-100 border-b border-primary-100 rounded-t-lg",
                  dropdownHeaderClassName
                )}>
                  <h3 className="px-2 py-2 text-xs font-medium text-text-primary tracking-wider">
                    {dropdownHeaderText}
                  </h3>
                </div>
              )}

              {dropdownOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  disabled={option.disabled || isDisabled}
                  onSelect={() => handleDropdownSelect(option.value)}
                  className={cn(
                    'cursor-pointer text-sm text-text-secondary hover:text-text-primary my-1',
                    {
                      'bg-background-tertiary border-border-default text-text-primary': option.value === selectedDropdownOption,
                    }
                  )}
                  data-active={option.value === selectedDropdownOption ? 'true' : undefined}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>
      )
    }

    // Regular button without dropdown
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
