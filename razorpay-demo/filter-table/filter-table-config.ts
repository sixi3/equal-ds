/**
 * Configuration for FilterTable component
 */

export interface FilterOption {
  value: string
  label: string
}

// Default filter options
export const DEFAULT_TEMPLATE_OPTIONS: FilterOption[] = [
  { value: 'template-1', label: 'Template One' },
  { value: 'template-2', label: 'Template Two' },
  { value: 'template-3', label: 'Template Three' },
  { value: 'template-4', label: 'Template Four' },
  { value: 'template-5', label: 'Template Five' },
]

export const DEFAULT_PURPOSE_CODE_OPTIONS: FilterOption[] = [
  { value: 'purpose-101', label: 'Purpose 101' },
  { value: 'purpose-102', label: 'Purpose 102' },
  { value: 'purpose-103', label: 'Purpose 103' },
  { value: 'purpose-104', label: 'Purpose 104' },
  { value: 'purpose-105', label: 'Purpose 105' },
]

export const DEFAULT_STATUS_OPTIONS: FilterOption[] = [
  { value: 'pending', label: 'PENDING' },
  { value: 'active', label: 'ACTIVE' },
  { value: 'rejected', label: 'REJECTED' },
  { value: 'revoked', label: 'REVOKED' },
  { value: 'paused', label: 'PAUSED' },
  { value: 'failed', label: 'FAILED' },
]

export const DEFAULT_AGGREGATOR_OPTIONS: FilterOption[] = [
  { value: 'agg-1', label: 'Aggregator One' },
  { value: 'agg-2', label: 'Aggregator Two' },
  { value: 'agg-3', label: 'Aggregator Three' },
  { value: 'agg-4', label: 'Aggregator Four' },
  { value: 'agg-5', label: 'Aggregator Five' },
]

// Animation constants
export const FILTER_TABLE_CONSTANTS = {
  filterTransition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-out, margin-top 0.5s ease-out',
  expandedHeight: '384px',
  collapsedHeight: '0px',
  expandedOpacity: 1,
  collapsedOpacity: 0,
  expandedMargin: '16px',
  collapsedMargin: '0px',
  hoverDuration: 200,
}

// Default style values
export const FILTER_TABLE_DEFAULTS = {
  // Layout
  headerGap: 'mb-4',
  dropdownGap: 'gap-4',
  
  // Styles
  backgroundColor: '--color-background-secondary',
  textColor: '--color-text-primary',
  borderColor: '--color-border-default',
  fontSize: '--typography-fontSize-sm',
  fontWeight: '--typography-fontWeight-medium',
  letterSpacing: '0.05em',
  padding: '--spacing-2',
  borderRadius: '--border-radius-lg',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderBottomWidth: '2px',
  hoverBorderBottomWidth: '3px',
  hoverBackgroundColor: '--color-background-primary',
  hoverTextColor: '--color-text-primary',
  hoverBorderColor: '--color-border-hover',
  hoverBoxShadow: '--shadow-md',
  boxShadow: '--core-shadows-sm',
  
  // Label typography
  labelFontSize: '--typography-fontSize-xs',
  labelFontWeight: '--typography-fontWeight-medium',
  labelLetterSpacing: '0.05em',
  labelTextColor: '--color-text-secondary',
  
  // Component defaults
  title: 'Filter Table',
  showLabel: true,
  defaultExpanded: false,
}

