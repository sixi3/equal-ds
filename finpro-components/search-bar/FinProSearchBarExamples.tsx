import React, { useState } from 'react'
import { FinProSearchBar } from './FinProSearchBar'

export const BasicExample: React.FC = () => {
  const handleSearch = (value: string, domain?: string) => {
    console.log('Search performed:', { query: value, domain })
    // Implement your search logic here
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Basic FinPro Search Bar</h3>
        <FinProSearchBar onSearch={handleSearch} />
      </div>
    </div>
  )
}

export const WithSearchResults: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Array<{id: string, type: string, title: string}>>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (value: string, domain?: string) => {
    if (!value.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        { id: '1', type: 'Client', title: `Search result for "${value}"` },
        { id: '2', type: 'Account', title: `Another result for "${value}"` }
      ]
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold">FinPro Search Bar with Results</h3>

        <FinProSearchBar
          onSearch={handleSearch}
          loading={isSearching}
        />

        {searchResults.length > 0 && (
          <div className="bg-white rounded-lg border p-4">
            <h4 className="font-medium mb-3">Search Results:</h4>
            <div className="space-y-2">
              {searchResults.map((result) => (
                <div key={result.id} className="p-3 bg-gray-50 rounded">
                  <span className="font-medium">{result.title}</span>
                  <span className="text-sm text-gray-500 ml-2">({result.type})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const CustomPlaceholder: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Custom Placeholder</h3>
        <FinProSearchBar
          placeholder="Find clients, accounts, or transactions..."
          onSearch={(value, domain) => console.log('Search:', value, domain)}
        />
      </div>
    </div>
  )
}

export const DisabledState: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Disabled State</h3>
        <FinProSearchBar
          disabled={true}
          placeholder="Search is currently disabled"
        />
      </div>
    </div>
  )
}

// Database Integration Examples

// Example 1: REST API Integration
export const RestApiExample: React.FC = () => {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchAPI = async (query: string, domain?: string) => {
    const params = new URLSearchParams({
      q: query,
      ...(domain && domain !== 'all' && { category: domain }),
      limit: '20'
    })

    const response = await fetch(`/api/search?${params}`)
    if (!response.ok) throw new Error('Search failed')
    return response.json()
  }

  const handleSearch = async (value: string, domain?: string) => {
    if (!value.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await searchAPI(value, domain)
      setResults(data.results || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl space-y-6">
        <h3 className="text-lg font-semibold">REST API Integration</h3>

        <FinProSearchBar
          onSearch={handleSearch}
          loading={loading}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium mb-3">Results ({results.length}):</h4>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={result.id || index} className="p-3 bg-gray-50 rounded">
                <span className="font-medium">{result.title || result.name}</span>
                <span className="text-sm text-gray-500 ml-2">({result.type || result.category})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Example 2: GraphQL Integration
export const GraphQLExample: React.FC = () => {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const GRAPHQL_QUERY = `
    query SearchEntities($query: String!, $domain: String) {
      search(query: $query, domain: $domain) {
        id
        title
        type
        relevanceScore
        metadata {
          createdAt
          updatedAt
        }
      }
    }
  `

  const searchGraphQL = async (query: string, domain?: string) => {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { query, domain: domain === 'all' ? null : domain }
      })
    })

    const data = await response.json()
    if (data.errors) throw new Error(data.errors[0].message)
    return data.data.search
  }

  const handleSearch = async (value: string, domain?: string) => {
    if (!value.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const searchResults = await searchGraphQL(value, domain)
      setResults(searchResults)
    } catch (err) {
      console.error('GraphQL search failed:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl space-y-6">
        <h3 className="text-lg font-semibold">GraphQL Integration</h3>

        <FinProSearchBar
          onSearch={handleSearch}
          loading={loading}
        />

        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium mb-3">GraphQL Results ({results.length}):</h4>
          <div className="space-y-2">
            {results.map((result) => (
              <div key={result.id} className="p-3 bg-gray-50 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{result.title}</span>
                  <span className="text-sm text-blue-600">
                    Score: {result.relevanceScore?.toFixed(2)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">({result.type})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Example 3: Real-time Search with Debouncing
export const RealTimeSearchExample: React.FC = () => {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  const debouncedSearch = (query: string, domain?: string) => {
    if (searchTimeout) clearTimeout(searchTimeout)

    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        // Simulate real-time API call
        const response = await fetch(`/api/search/realtime?q=${encodeURIComponent(query)}${domain && domain !== 'all' ? `&domain=${domain}` : ''}`)
        const data = await response.json()
        setResults(data.results || [])
      } catch (err) {
        console.error('Real-time search failed:', err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300) // 300ms debounce

    setSearchTimeout(timeout)
  }

  const handleSearch = (value: string, domain?: string) => {
    debouncedSearch(value, domain)
  }

  React.useEffect(() => {
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout)
    }
  }, [searchTimeout])

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl space-y-6">
        <h3 className="text-lg font-semibold">Real-time Search (300ms debounce)</h3>

        <FinProSearchBar
          onSearch={handleSearch}
          loading={loading}
        />

        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium mb-3">Real-time Results ({results.length}):</h4>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={result.id || index} className="p-3 bg-gray-50 rounded">
                <span className="font-medium">{result.title || result.name}</span>
                <span className="text-sm text-gray-500 ml-2">({result.type || result.category})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Example 4: Advanced Search with Filters
export const AdvancedSearchExample: React.FC = () => {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    dateRange: null,
    status: 'all',
    sortBy: 'relevance'
  })

  const buildSearchQuery = (query: string, domain?: string) => {
    const searchParams = {
      q: query,
      domain: domain === 'all' ? null : domain,
      status: filters.status !== 'all' ? filters.status : null,
      sortBy: filters.sortBy,
      dateFrom: filters.dateRange?.from,
      dateTo: filters.dateRange?.to,
      limit: 50
    }

    // Remove null values
    return Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value != null)
    )
  }

  const handleSearch = async (value: string, domain?: string) => {
    if (!value.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const queryParams = buildSearchQuery(value, domain)
      const response = await fetch('/api/search/advanced?' + new URLSearchParams(queryParams as any))
      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      console.error('Advanced search failed:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl space-y-6">
        <h3 className="text-lg font-semibold">Advanced Search with Filters</h3>

        <div className="bg-white rounded-lg border p-4 space-y-4">
          <h4 className="font-medium">Filters:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="border rounded px-3 py-2"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>

            <select
              className="border rounded px-3 py-2"
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>

            <input
              type="date"
              className="border rounded px-3 py-2"
              placeholder="Date from"
            />
          </div>
        </div>

        <FinProSearchBar
          onSearch={handleSearch}
          loading={loading}
        />

        <div className="bg-white rounded-lg border p-4">
          <h4 className="font-medium mb-3">Filtered Results ({results.length}):</h4>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={result.id || index} className="p-3 bg-gray-50 rounded">
                <span className="font-medium">{result.title || result.name}</span>
                <span className="text-sm text-gray-500 ml-2">({result.type || result.category})</span>
                {result.status && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                    {result.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}