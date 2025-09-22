import React from 'react'
// IMPORT ALL DEPENDENCIES USING PACKAGE-LEVEL IMPORTS
import { SearchBar } from '../../src'

// IMPORT SHARED DEPENDENCIES
import { FINPRO_SEARCH_DOMAINS } from './finpro-search-bar-config'
import './finpro-search-bar-styles.css'

export interface FinProSearchBarProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string
  /**
   * Callback function called when search is performed
   */
  onSearch?: (value: string, domain?: string) => void
  /**
   * Whether the search bar is disabled
   */
  disabled?: boolean
  /**
   * Whether the search bar is in loading state
   */
  loading?: boolean
  /**
   * Additional CSS class name
   */
  className?: string
}

export const FinProSearchBar: React.FC<FinProSearchBarProps> = ({
  placeholder = 'Search clients, accounts, transactions...',
  onSearch,
  disabled = false,
  loading = false,
  className = '',
}) => {
  const handleSearch = (value: string, domain?: string) => {
    if (onSearch) {
      onSearch(value, domain)
    } else {
      // Default behavior - log to console
      console.log('FinPro Search:', { query: value, domain: domain || 'all' })
    }
  }

  return (
    <div className={`finpro-search-bar ${className}`}>
      <SearchBar
        variant="with-dropdown"
        placeholder={placeholder}
        domains={FINPRO_SEARCH_DOMAINS}
        onSearch={handleSearch}
        disabled={disabled}
        loading={loading}
      />
    </div>
  )
}
