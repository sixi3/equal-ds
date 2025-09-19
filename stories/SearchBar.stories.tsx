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
    const [searchResults, setSearchResults] = useState<Array<{
      id: string
      type: string
      title: string
      subtitle: string
      status?: string
      amount?: string
    }>>([])
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = (value: string, domain?: string) => {
      if (!value.trim()) {
        setSearchResults([])
        return
      }

      setIsSearching(true)

      // Simulate API call delay
      setTimeout(() => {
        const mockResults = generateFinProResults(value, domain)
        setSearchResults(mockResults)
        setIsSearching(false)
      }, 500)
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* FinPro Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FP</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">FinPro Console</h1>
                <p className="text-sm text-gray-500">Financial Professional Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Welcome back, John Doe
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Search & Filter</h2>
                <p className="text-gray-600">Find clients, accounts, transactions, and more</p>
              </div>
            </div>

            {/* FinPro Search Bar */}
            <div className="max-w-2xl">
              <FinProSearchBar onSearch={handleSearch} isSearching={isSearching} />
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results
                {searchResults.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({searchResults.length} found)
                  </span>
                )}
              </h3>
            </div>

            <div className="p-6">
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Searching...</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No results found</h4>
                  <p className="text-gray-600">
                    Try adjusting your search terms or selecting a different category
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <FinProResultCard key={result.id} result={result} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <StatCard title="Active Clients" value="1,247" change="+12%" trend="up" />
            <StatCard title="Total Assets" value="$2.4M" change="+8%" trend="up" />
            <StatCard title="This Month" value="$45.2K" change="+15%" trend="up" />
            <StatCard title="Pending Tasks" value="23" change="-5%" trend="down" />
          </div>
        </div>
      </div>
    )
  },
}

// Helper Components for FinPro Story
function FinProSearchBar({ onSearch, isSearching }: {
  onSearch: (value: string, domain?: string) => void
  isSearching: boolean
}) {
  const domains = [
    { value: 'all', label: 'All Categories' },
    { value: 'clients', label: 'Clients' },
    { value: 'accounts', label: 'Accounts' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'portfolios', label: 'Portfolios' },
    { value: 'documents', label: 'Documents' }
  ]

  return (
    <ExampleSearchBar
      variant="with-dropdown"
      onSearch={onSearch}
      domains={domains}
      loading={isSearching}
    />
  )
}

function FinProResultCard({ result }: { result: any }) {
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'client': return '👤'
      case 'account': return '💳'
      case 'transaction': return '💰'
      case 'portfolio': return '📊'
      case 'document': return '📄'
      default: return '📋'
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="text-2xl">{getTypeIcon(result.type)}</div>
        <div>
          <h4 className="font-medium text-gray-900">{result.title}</h4>
          <p className="text-sm text-gray-600">{result.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {result.amount && (
          <span className="font-semibold text-gray-900">{result.amount}</span>
        )}
        {result.status && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
            {result.status}
          </span>
        )}
        <div className="text-gray-400">→</div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, trend }: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      </div>
    </div>
  )
}

// Helper function to generate mock FinPro search results
function generateFinProResults(searchTerm: string, domain?: string): Array<{
  id: string
  type: string
  title: string
  subtitle: string
  status?: string
  amount?: string
}> {
  const baseResults = [
    {
      id: '1',
      type: 'Client',
      title: 'Sarah Johnson',
      subtitle: 'High-net-worth individual • Member since 2022',
      status: 'Active',
      amount: '$2.4M'
    },
    {
      id: '2',
      type: 'Account',
      title: 'Premium Investment Account',
      subtitle: 'Account #123456789 • Managed portfolio',
      status: 'Active',
      amount: '$890K'
    },
    {
      id: '3',
      type: 'Transaction',
      title: 'Stock Purchase - AAPL',
      subtitle: 'Buy order • 500 shares • Executed today',
      status: 'Completed',
      amount: '$75,250'
    },
    {
      id: '4',
      type: 'Portfolio',
      title: 'Balanced Growth Portfolio',
      subtitle: 'Conservative allocation • 8% YTD return',
      status: 'Active',
      amount: '$1.2M'
    },
    {
      id: '5',
      type: 'Document',
      title: 'Q4 Financial Statement',
      subtitle: 'Annual review • Generated Dec 2024',
      status: 'Available'
    }
  ]

  // Filter by domain if specified
  let filteredResults = baseResults
  if (domain && domain !== 'all') {
    filteredResults = baseResults.filter(result =>
      result.type.toLowerCase().includes(domain.slice(0, -1)) || // Remove 's' from plural
      domain.slice(0, -1).includes(result.type.toLowerCase())
    )
  }

  // Filter by search term
  if (searchTerm.trim()) {
    filteredResults = filteredResults.filter(result =>
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return filteredResults.slice(0, 5) // Limit to 5 results
}
