// Component-specific configuration for FinProLogsDrawer
export const FINPRO_LOGS_DRAWER_CONFIG = {
  // Fixed width for logs drawer (extra wide for log viewing)
  fixedWidth: 1200,

  // Animation settings (inherited from base drawer)
  animationDuration: 300,
  animationEasing: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',

  // Z-index layers (when used with external provider)
  zIndex: {
    drawer: 50,
    overlay: 40,
  },
}

// Component-specific default values
export const FINPRO_LOGS_DRAWER_DEFAULTS = {
  title: 'View Logs',
  subtitle: 'Monitor system activity, errors, and performance metrics in real-time',
  variant: 'overlay' as const,
  side: 'right' as const,
  defaultOpen: false,
}

// Component-specific constants
export const FINPRO_LOGS_DRAWER_CONSTANTS = {
  // Icon sizes
  iconSize: 'w-5 h-5',

  // Spacing
  contentPadding: 'p-4',
  headerPadding: 'p-4',

  // Colors and styling
  backgroundColor: 'bg-gray-100',
  borderClass: 'border-border-default',

  // Fixed dimensions
  width: '1200px',
}
