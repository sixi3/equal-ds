 export interface TimelineAction {
  type: 'copy' | 'link' | 'button'
  label: string
  value?: string // For copy functionality
  onClick?: () => void
}

export interface TimelineStatus {
  type: 'success' | 'warning' | 'error' | 'info' | 'pending' | 'neutral'
  label?: string // For status badges like "PENDING"
}

export interface TimelineItem {
  id: string
  timestamp: string | Date
  status: TimelineStatus
  title: string
  description?: string
  action?: TimelineAction // Transaction ID with copy functionality
  tooltip?: {
    title: string
    content: string
    details?: Record<string, any>
  }
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of timeline items to display
   */
  items: TimelineItem[]

  /**
   * Visual variant of the timeline
   * @default 'default'
   */
  variant?: 'default' | 'compact'

  /**
   * Whether to show connector lines between items
   * @default true
   */
  showConnectors?: boolean

  /**
   * Gap in pixels before and after connector lines relative to status icons
   * @default 4
   */
  connectorGap?: number
}

export interface TimelineItemProps {
  item: TimelineItem
  isLast: boolean
  showConnector: boolean
  registerIcon?: (node: HTMLDivElement | null) => void
}

export interface TimelineActionProps {
  action: TimelineAction
  className?: string
}

export interface TimelineEventInfoProps {
  timestamp: string | Date
  status: TimelineStatus
  title: string
  description?: string
  className?: string
  iconRef?: (node: HTMLDivElement | null) => void
}

export interface TimelineConnectorProps {
  showConnector: boolean
  className?: string
}

export interface TimelineTooltipProps {
  tooltip?: {
    title: string
    content: string
    details?: Record<string, any>
  }
  className?: string
}
