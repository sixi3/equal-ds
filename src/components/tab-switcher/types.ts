export type TabVariant = 'horizontal' | 'cards'

export type TabStatus = 'active' | 'inactive'

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string

  /**
   * Display label for the tab
   */
  label: string

  /**
   * Optional content to render when tab is active
   */
  content?: React.ReactNode

  /**
   * Optional status for card variant (affects badge color)
   */
  status?: 'active' | 'failed' | 'data-ready' | 'partial-data'

  /**
   * Optional metadata for card variant (displayed as secondary text)
   */
  metadata?: string

  /**
   * Whether this tab is disabled
   */
  disabled?: boolean
}

export interface TabSwitcherProps {
  /**
   * Array of tab items
   */
  tabs: TabItem[]

  /**
   * Currently active tab ID
   */
  activeTab: string

  /**
   * Callback when active tab changes
   */
  onTabChange: (tabId: string) => void

  /**
   * Tab switcher variant
   * @default 'horizontal'
   */
  variant?: TabVariant

  /**
   * Custom className for the container
   */
  className?: string

  /**
   * Whether the tab switcher is disabled
   */
  disabled?: boolean

  /**
   * Custom tab item renderer (for advanced customization)
   */
  renderTab?: (tab: TabItem, isActive: boolean, onClick: () => void) => React.ReactElement
}

export interface HorizontalTabsProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
  disabled?: boolean
  className?: string
  renderTab?: (tab: TabItem, isActive: boolean, onClick: () => void) => React.ReactElement
}

export interface CardTabsProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
  disabled?: boolean
  className?: string
  renderTab?: (tab: TabItem, isActive: boolean, onClick: () => void) => React.ReactElement
}
