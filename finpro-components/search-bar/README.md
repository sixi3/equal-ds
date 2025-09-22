# FinPro Search Bar

A specialized search bar component optimized for financial professional workflows, built on top of the Equal DS search components.

## Features

- **Financial Domain Categories**: Pre-configured search domains for clients, accounts, transactions, portfolios, and documents
- **Dropdown Integration**: Built-in domain selector for targeted searches
- **Professional Styling**: Clean, professional appearance suitable for financial applications
- **TypeScript Support**: Full TypeScript definitions included
- **Accessibility**: Screen reader support and keyboard navigation

## Installation

This component is part of the equal-ds-ui package. Install the main package:

```bash
npm install equal-ds-ui
```

## Usage

### Basic Usage

```tsx
import React from 'react'
import { FinProSearchBar } from 'equal-ds-ui'

function App() {
  const handleSearch = (value: string, domain?: string) => {
    console.log('Searching for:', value, 'in domain:', domain)
    // Implement your search logic here
  }

  return (
    <FinProSearchBar onSearch={handleSearch} />
  )
}
```

### With Search Results

```tsx
import React, { useState } from 'react'
import { FinProSearchBar } from 'equal-ds-ui'

function SearchWithResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (value: string, domain?: string) => {
    setLoading(true)
    try {
      // Perform search API call
      const searchResults = await searchAPI(value, domain)
      setResults(searchResults)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <FinProSearchBar
        onSearch={handleSearch}
        loading={loading}
      />
      {/* Display results */}
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `"Search clients, accounts, transactions..."` | Placeholder text for the search input |
| `onSearch` | `(value: string, domain?: string) => void` | - | Callback function called when search is performed |
| `disabled` | `boolean` | `false` | Whether the search bar is disabled |
| `loading` | `boolean` | `false` | Whether the search bar is in loading state |
| `className` | `string` | `""` | Additional CSS class name |

## Search Domains

The component includes these pre-configured search domains:

- **All Categories** - Search across all domains
- **Clients** - Search for client records
- **Accounts** - Search for account information
- **Transactions** - Search for transaction records
- **Portfolios** - Search for portfolio data
- **Documents** - Search for document files

## Examples

See `FinProSearchBarExamples.tsx` for additional usage examples including:

- Basic usage
- Search with results display
- Custom placeholder text
- Disabled state
- Loading state handling

## Dependencies

This component depends on:
- `equal-ds-ui` core components
- React 18+
- Tailwind CSS 3.4+

## Styling

The component uses Tailwind CSS classes and can be customized using the `className` prop. The component-specific styles are located in `finpro-search-bar-styles.css`.

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- ARIA labels included
- Focus management handled automatically

## TypeScript Support

Full TypeScript definitions are included. The component is designed to work in both TypeScript and JavaScript projects.
