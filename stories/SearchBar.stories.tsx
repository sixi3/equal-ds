import './tailwind.css'
import React, { useState } from 'react'
import type { StoryObj } from '@storybook/react'
import { SearchBar } from '../src'
import { generateAllControls } from '../src/story-utils/simpleControls'

// Generate controls for search bar
const { argTypes, args } = generateAllControls('general')

// Storybook meta configuration
const meta = {
  title: 'Actions/Search Bar',
  argTypes: {
    ...argTypes,
    // Add custom controls specific to search bar
    variant: {
      control: 'select',
      options: ['simple', 'with-dropdown'],
      description: 'Search bar variant',
      table: { category: 'Search Bar' }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
      table: { category: 'Search Bar' }
    },
    domains: {
      control: 'object',
      description: 'Array of domain options for dropdown variant',
      table: { category: 'Search Bar' }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the search bar is disabled',
      table: { category: 'Search Bar' }
    },
    loading: {
      control: 'boolean',
      description: 'Whether the search bar is in loading state',
      table: { category: 'Search Bar' }
    }
  },
  args: {
    variant: 'simple',
    placeholder: 'Search Mobile Numbers',
    disabled: false,
    loading: false,
    domains: [
      { value: 'mobile', label: 'Mobile Number' },
      { value: 'email', label: 'Email Address' },
      { value: 'name', label: 'Full Name' },
      { value: 'account', label: 'Account ID' },
      { value: 'transaction', label: 'Transaction ID' }
    ]
  },
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst'
    },
    docs: {
      description: {
        component: 'A flexible search bar component with two variants: simple search and search with domain selector dropdown.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Example search bar component with state management
function ExampleSearchBar({
  variant = 'simple',
  placeholder = 'Search...',
  domains = [],
  disabled = false,
  loading = false,
  value,
  onChange,
  onSearch,
  selectedDomain,
  onDomainChange,
  size,
  className,
  ...props
}: {
  variant?: 'simple' | 'with-dropdown'
  placeholder?: string
  domains?: Array<{ value: string; label: string }>
  disabled?: boolean
  loading?: boolean
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string, domain?: string) => void
  selectedDomain?: string
  onDomainChange?: (domain: string) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const [searchValue, setSearchValue] = useState('')
  const [internalSelectedDomain, setInternalSelectedDomain] = useState(domains[0]?.value || '')

  const handleSearch = (value: string, domain?: string) => {
    console.log('Search triggered:', {
      query: value,
      domain: domain || internalSelectedDomain,
      timestamp: new Date().toISOString()
    })
  }

  const handleDomainChange = (domain: string) => {
    setInternalSelectedDomain(domain)
    console.log('Domain changed to:', domain)
  }

  return (
    <div className="w-full max-w-md">
      <SearchBar
        variant={variant}
        placeholder={placeholder}
        value={value !== undefined ? value : searchValue}
        onChange={onChange || setSearchValue}
        onSearch={onSearch || handleSearch}
        domains={domains}
        selectedDomain={selectedDomain !== undefined ? selectedDomain : internalSelectedDomain}
        onDomainChange={onDomainChange || handleDomainChange}
        disabled={disabled}
        loading={loading}
        size={size}
        className={className}
        {...props}
      />
    </div>
  )
}

// Default story showcasing simple search bar
export const Simple: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple Search Bar</h3>
          <p className="text-sm text-gray-600">Basic search input with search icon and placeholder text.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Default State</h4>
          <ExampleSearchBar
            variant="simple"
            placeholder="Search Mobile Numbers"
            {...args}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">With Custom Placeholder</h4>
          <ExampleSearchBar
            variant="simple"
            placeholder="Search for anything..."
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Disabled State</h4>
          <ExampleSearchBar
            variant="simple"
            placeholder="Search Mobile Numbers"
            disabled={true}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Loading State</h4>
          <ExampleSearchBar
            variant="simple"
            placeholder="Search Mobile Numbers"
            loading={true}
          />
        </div>
      </div>
    </div>
  ),
}

// Story showcasing search bar with dropdown
export const WithDropdown: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Bar with Domain Selector</h3>
          <p className="text-sm text-gray-600">Search input with attached dropdown for selecting search domain.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Default State</h4>
          <ExampleSearchBar
            variant="with-dropdown"
            placeholder="Search Mobile Numbers"
            domains={[
              { value: 'mobile', label: 'Mobile Number' },
              { value: 'email', label: 'Email Address' },
              { value: 'name', label: 'Full Name' },
              { value: 'account', label: 'Account ID' },
              { value: 'transaction', label: 'Transaction ID' }
            ]}
            {...args}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Different Domains</h4>
          <ExampleSearchBar
            variant="with-dropdown"
            placeholder="Search products..."
            domains={[
              { value: 'products', label: 'Products' },
              { value: 'categories', label: 'Categories' },
              { value: 'brands', label: 'Brands' },
              { value: 'suppliers', label: 'Suppliers' }
            ]}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Disabled State</h4>
          <ExampleSearchBar
            variant="with-dropdown"
            placeholder="Search Mobile Numbers"
            domains={[
              { value: 'mobile', label: 'Mobile Number' },
              { value: 'email', label: 'Email Address' },
              { value: 'name', label: 'Full Name' }
            ]}
            disabled={true}
          />
        </div>
      </div>
    </div>
  ),
}

// Interactive demo showing search functionality
export const InteractiveDemo: Story = {
  render: () => {
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [searchHistory, setSearchHistory] = useState<Array<{query: string, domain: string, timestamp: string}>>([])

    const handleSearch = (value: string, domain?: string) => {
      // Simulate search results
      const mockResults = [
        `${value} - Result 1 (${domain || 'all'})`,
        `${value} - Result 2 (${domain || 'all'})`,
        `${value} - Result 3 (${domain || 'all'})`
      ]
      setSearchResults(mockResults)

      // Add to search history
      setSearchHistory(prev => [{
        query: value,
        domain: domain || 'all',
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 4)]) // Keep only last 5 searches
    }

    return (
      <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Search Demo</h3>
            <p className="text-sm text-gray-600">Try searching with different domains and see live results.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Search Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Search Interface</h4>
              <ExampleSearchBar
                variant="with-dropdown"
                placeholder="Type to search..."
                domains={[
                  { value: 'users', label: 'Users' },
                  { value: 'products', label: 'Products' },
                  { value: 'orders', label: 'Orders' },
                  { value: 'transactions', label: 'Transactions' }
                ]}
                onSearch={handleSearch}
              />
            </div>

            {/* Search History */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Search History</h4>
              <div className="bg-white rounded-lg border p-4 space-y-2 max-h-48 overflow-y-auto">
                {searchHistory.length === 0 ? (
                  <p className="text-sm text-gray-500">No searches yet</p>
                ) : (
                  searchHistory.map((search, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{search.query}</span>
                      <div className="flex items-center gap-2 text-gray-500">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {search.domain}
                        </span>
                        <span>{search.timestamp}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Search Results</h4>
            <div className="bg-white rounded-lg border p-4 min-h-64">
              {searchResults.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-sm">Search results will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{result}</p>
                        <p className="text-xs text-gray-500">Search result</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// Showcase different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Bar Sizes</h3>
          <p className="text-sm text-gray-600">Different size variants of the search bar component.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 max-w-md">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Small (h-10)</h4>
          <ExampleSearchBar
            variant="simple"
            placeholder="Small search bar"
            size="sm"
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Medium (h-12) - Default</h4>
          <ExampleSearchBar
            variant="simple"
            placeholder="Medium search bar"
            size="md"
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Large (h-14)</h4>
          <ExampleSearchBar
            variant="simple"
            placeholder="Large search bar"
            size="lg"
          />
        </div>
      </div>
    </div>
  ),
}

// Showcase accessibility features
export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility Features</h3>
          <p className="text-sm text-gray-600">Search bar with full accessibility support including ARIA labels and keyboard navigation.</p>
        </div>
      </div>

      <div className="space-y-6 max-w-md">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Screen Reader Support</h4>
          <ExampleSearchBar
            variant="with-dropdown"
            placeholder="Search with screen reader support"
            domains={[
              { value: 'users', label: 'Users' },
              { value: 'products', label: 'Products' }
            ]}
          />
          <p className="text-xs text-gray-500">
            Use Tab to navigate, Enter to search, Arrow keys for dropdown navigation
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Focus Management</h4>
          <ExampleSearchBar
            variant="simple"
            placeholder="Focus management example"
          />
          <p className="text-xs text-gray-500">
            Focus indicators and proper tab order are implemented
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Error States</h4>
          <ExampleSearchBar
            variant="with-dropdown"
            placeholder="Search with error handling"
            domains={[
              { value: 'users', label: 'Users' },
              { value: 'products', label: 'Products' }
            ]}
          />
          <p className="text-xs text-gray-500">
            Disabled states and error handling are properly communicated to assistive technologies
          </p>
        </div>
      </div>
    </div>
  ),
}

// FinPro Console specific implementation
export const FinPro: Story = {
  render: () => {
    const domains = [
      { value: 'all', label: 'All Categories' },
      { value: 'clients', label: 'Clients' },
      { value: 'accounts', label: 'Accounts' },
      { value: 'transactions', label: 'Transactions' },
      { value: 'portfolios', label: 'Portfolios' },
      { value: 'documents', label: 'Documents' }
    ]

    const handleSearch = (value: string, domain?: string) => {
      console.log('FinPro Search:', { query: value, domain: domain || 'all' })
    }

    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-2xl">
          <ExampleSearchBar
            variant="with-dropdown"
            placeholder="Search clients, accounts, transactions..."
            domains={domains}
            onSearch={handleSearch}
          />
        </div>
      </div>
    )
  },
}

