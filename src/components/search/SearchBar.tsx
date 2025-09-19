import * as React from 'react'
import { cn } from '../../lib/cn'
import { SearchBarContainer } from './SearchBarContainer'
import { SearchBarInput } from './SearchBarInput'
import { SearchBarDropdown } from './SearchBarDropdown'
import type { SearchBarProps } from './types'

export const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({
    variant = 'simple',
    placeholder = 'Search...',
    value,
    onChange,
    onSearch,
    domains = [],
    selectedDomain,
    onDomainChange,
    loading = false,
    disabled = false,
    size = 'md',
    className,
    ...props
  }, ref) => {
    // State management
    const [internalValue, setInternalValue] = React.useState('')
    const [internalDomain, setInternalDomain] = React.useState(selectedDomain || domains[0]?.value || '')

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    const currentDomain = selectedDomain !== undefined ? selectedDomain : internalDomain

    // Handlers
    const handleInputChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const handleSearch = (searchValue: string) => {
      const domainToUse = variant === 'with-dropdown' ? currentDomain : undefined
      onSearch?.(searchValue, domainToUse)
    }

    const handleDomainChange = (domain: string) => {
      if (selectedDomain === undefined) {
        setInternalDomain(domain)
      }
      onDomainChange?.(domain)
    }

    // Dynamic placeholder based on selected domain
    const getDynamicPlaceholder = () => {
      if (variant === 'simple') {
        return placeholder
      }

      const selectedDomainData = domains.find(domain => domain.value === currentDomain)
      const domainLabel = selectedDomainData?.label || 'All Categories'

      return `Search in ${domainLabel}`
    }

    // Size-based classes
    const sizeClasses = {
      sm: 'h-10 text-xs',
      md: 'h-12 text-sm',
      lg: 'h-14 text-base'
    }

    return (
      <SearchBarContainer
        ref={ref}
        variant={variant}
        disabled={disabled}
        loading={loading}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {/* Search Input Section */}
        <SearchBarInput
          placeholder={getDynamicPlaceholder()}
          value={currentValue}
          onChange={handleInputChange}
          onSearch={handleSearch}
          disabled={disabled}
          loading={loading}
          className={cn(
            // Adjust input container width based on variant
            variant === 'simple' && ''
          )}
        />

        {/* Dropdown Section - only for 'with-dropdown' variant */}
        {variant === 'with-dropdown' && (
          <SearchBarDropdown
            domains={domains}
            selectedDomain={currentDomain}
            onDomainChange={handleDomainChange}
            disabled={disabled}
          />
        )}
      </SearchBarContainer>
    )
  }
)

SearchBar.displayName = 'SearchBar'
