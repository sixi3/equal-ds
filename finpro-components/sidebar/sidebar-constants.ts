/**
 * Sidebar-specific constants and configurations
 */

// Animation and styling constants
export const ANIMATION_CONSTANTS = {
  transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-out, margin-top 0.5s ease-out',
  expandedHeight: '384px',
  collapsedHeight: '0px',
  expandedOpacity: 1,
  collapsedOpacity: 0,
  expandedMargin: '16px',
  collapsedMargin: '0px',
  hoverDuration: 200,
  fadeDuration: 300,
}

// Status badge style getter
export const getStatusBadgeStyle = (status: string) => {
  const statusStyles: Record<string, any> = {
    active: {
      backgroundColor: 'var(--color-status-success)',
      color: 'var(--color-text-on-success)',
    },
    inactive: {
      backgroundColor: 'var(--color-status-inactive)',
      color: 'var(--color-text-secondary)',
    },
    pending: {
      backgroundColor: 'var(--color-status-warning)',
      color: 'var(--color-text-on-warning)',
    },
    error: {
      backgroundColor: 'var(--color-status-error)',
      color: 'var(--color-text-on-error)',
    },
  }

  return statusStyles[status] || statusStyles.inactive
}
