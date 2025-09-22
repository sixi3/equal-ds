// Component-specific configuration for FinProDrawer
export const FINPRO_DRAWER_CONFIG = {
  // Default dimensions
  defaultWidth: 1000,
  minWidth: 320,
  maxWidth: 1200,

  // Animation settings
  animationDuration: 300,
  animationEasing: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',

  // Z-index layers (when used with external provider)
  zIndex: {
    drawer: 50,
    overlay: 40,
  },
}

// Component-specific default values
export const FINPRO_DRAWER_DEFAULTS = {
  title: 'Edit Columns',
  subtitle: 'Use the controls below to view/hide/reorganise the columns in the table.',
  variant: 'overlay' as const,
  side: 'right' as const,
  width: 1000,
  defaultOpen: false,
}

// Component-specific constants
export const FINPRO_DRAWER_CONSTANTS = {
  // Icon sizes
  iconSize: 'w-5 h-5',

  // Spacing
  contentPadding: 'p-4',
  headerPadding: 'p-4',

  // Colors
  backgroundColor: 'bg-gray-100',
  triggerBackground: 'bg-white',
  triggerShadow: 'shadow-md hover:shadow-lg',
}
