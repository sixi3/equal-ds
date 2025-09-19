import * as React from 'react'

export interface SearchDomain {
  value: string
  label: string
  disabled?: boolean
}

export interface SearchBarProps {
  /**
   * Search bar variant
   * @default 'simple'
   */
  variant?: 'simple' | 'with-dropdown'

  /**
   * Search input placeholder text
   * @default 'Search...'
   */
  placeholder?: string

  /**
   * Current search value
   */
  value?: string

  /**
   * Callback when search value changes
   */
  onChange?: (value: string) => void

  /**
   * Callback when search is submitted
   */
  onSearch?: (value: string, domain?: string) => void

  /**
   * Available search domains for dropdown variant
   */
  domains?: SearchDomain[]

  /**
   * Currently selected domain
   */
  selectedDomain?: string

  /**
   * Callback when domain selection changes
   */
  onDomainChange?: (domain: string) => void

  /**
   * Whether the search is in loading state
   * @default false
   */
  loading?: boolean

  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Additional CSS class
   */
  className?: string

  /**
   * Search input props (for advanced customization)
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>

  /**
   * Dropdown props (for advanced customization)
   */
  dropdownProps?: {
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
    offset?: number
  }
}

export interface SearchBarInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  disabled?: boolean
  loading?: boolean
  className?: string
}

export interface SearchBarDropdownProps {
  domains: SearchDomain[]
  selectedDomain?: string
  onDomainChange?: (domain: string) => void
  disabled?: boolean
  className?: string
}

export interface SearchBarContainerProps {
  variant?: 'simple' | 'with-dropdown'
  disabled?: boolean
  loading?: boolean
  className?: string
  children: React.ReactNode
}
