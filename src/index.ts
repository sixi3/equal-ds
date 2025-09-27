// Public entry for the library
// Re-export components and utilities from here as they are implemented

export { cn, ChevronIcon } from './lib'
export * from './components/sidebar'
export * from './components/dropdown'
export * from './components/datepicker'
export * from './components/search'
export * from './components/button'
export * from './components/drawer'
export * from './components/table'
export * from './components/loader'
export * from './components/ui'
export { useHoverAnimation, useCopyToClipboard } from './lib'

// Export FinProSidebar component
export { FinProSidebar } from '../finpro-components/sidebar/FinProSidebar'

// Export FinProSearchBar component
export { FinProSearchBar } from '../finpro-components/search-bar/FinProSearchBar'

// Export FinProDrawer component
export { FinProDrawer } from '../finpro-components/drawer/FinProDrawer'

// Export FinProLogsDrawer component
export { FinProLogsDrawer } from '../finpro-components/logs-drawer/FinProLogsDrawer'

// Typography utilities
export * from './story-utils/designTokens'

// FinPro status tag helpers
export {
  getConsentStatusTag,
  getDataStatusTag,
  getAllConsentStatuses,
  getAllDataStatuses,
  type ConsentStatusKey,
  type DataStatusKey,
  type StatusTagResult
} from './lib'



