// Component-specific configuration data
export const FINPRO_SEARCH_DOMAINS = [
  { value: 'all', label: 'All Categories' },
  { value: 'clients', label: 'Clients' },
  { value: 'accounts', label: 'Accounts' },
  { value: 'transactions', label: 'Transactions' },
  { value: 'portfolios', label: 'Portfolios' },
  { value: 'documents', label: 'Documents' }
]

// Component-specific default values
export const FINPRO_SEARCH_DEFAULTS = {
  placeholder: 'Search clients, accounts, transactions...',
  disabled: false,
  loading: false
} as const

// Component-specific constants
export const FINPRO_SEARCH_CONSTANTS = {
  MAX_RESULTS: 50,
  DEBOUNCE_DELAY: 300
} as const
