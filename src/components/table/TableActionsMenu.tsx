import React from 'react'
import { Ellipsis, ChevronRight, ArrowRight } from 'lucide-react'
import { Dropdown, DropdownContext } from '../dropdown/Dropdown'
import { DropdownTrigger } from '../dropdown/DropdownTrigger'
import { DropdownContent } from '../dropdown/DropdownContent'
import { DropdownItem } from '../dropdown/DropdownItem'

export interface TableAction {
  /**
   * Unique key for the action
   */
  key: string
  /**
   * Display label for the action
   */
  label: string
  /**
   * Click handler for the action
   */
  onClick?: () => void
  /**
   * Whether this action is disabled
   */
  disabled?: boolean
  /**
   * Icon component for the action (optional)
   */
  icon?: React.ComponentType<{ className?: string }>
  /**
   * Whether this action should be destructive (red text)
   */
  destructive?: boolean
  /**
   * Custom CSS classes for the action
   */
  className?: string
  /**
   * Sub-actions for this menu item (creates a submenu)
   */
  subActions?: TableAction[]
}

export interface TableActionsMenuProps {
  /**
   * Array of actions to display in the dropdown
   */
  actions: TableAction[]
  /**
   * Screen reader label for the dropdown trigger
   */
  srLabel?: string
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean
}

// Custom trigger component that can access dropdown context
const CustomTrigger: React.FC<{ children: React.ReactNode; disabled?: boolean; srLabel: string }> = ({
  children,
  disabled,
  srLabel
}) => {
  const { isOpen } = React.useContext(DropdownContext)

  return (
    <DropdownTrigger className='shadow-none border-0 bg-transparent hover:bg-transparent hover:shadow-none' asChild showChevron={false}>
      <button
        className={`flex items-center justify-center h-8 w-8 rounded-full hover:bg-background-primary hover:border hover:border-border-default transition-colors focus:outline-none focus:ring-0 ${
          isOpen ? 'bg-background-tertiary' : ''
        }`}
        aria-label={srLabel}
        disabled={disabled}
      >
        {children}
      </button>
    </DropdownTrigger>
  )
}

export const TableActionsMenu: React.FC<TableActionsMenuProps> = ({
  actions,
  srLabel = 'Open actions menu',
  disabled = false,
}) => {
  if (actions.length === 0) return null

  return (
    <Dropdown disabled={disabled}>
      <CustomTrigger disabled={disabled} srLabel={srLabel}>
        <Ellipsis className="h-6 w-6 text-text-secondary" />
      </CustomTrigger>
      <DropdownContent 
        align="end"
        sideOffset={2}
        className="w-full bg-background-secondary border border-border-default">
        {actions.map((action, index) => {
          const Icon = action.icon

          if (action.subActions && action.subActions.length > 0) {
            // Render item with submenu
            return (
              <React.Fragment key={action.key}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-text-primary">
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{action.label}</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 pb-1">
                    {action.subActions.map((subAction, subIndex) => (
                      <React.Fragment key={subAction.key}>
                        <button
                          onClick={subAction.onClick}
                          disabled={subAction.disabled}
                          data-dropdown-item
                          className="flex items-center gap-1 text-xs font-medium text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed px-1.5 py-1"
                        >
                          <span>{subAction.label}</span>
                          <ArrowRight className="h-3 w-3 rotate-[-45deg] transition-transform duration-200" />
                        </button>
                        {subIndex < action.subActions!.length - 1 && (
                          <div className="w-px h-4 bg-border-default" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                {index < actions.length - 1 && (
                  <div className="border-b border-border-default mx-2 my-1" />
                )}
              </React.Fragment>
            )
          }

          // Render regular action item
          return (
            <React.Fragment key={action.key}>
              <DropdownItem
                onClick={action.onClick}
                disabled={action.disabled}
                className={`flex items-center gap-2 ${action.destructive ? 'text-error-600 hover:text-error-700' : ''} ${action.className || ''}`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{action.label}</span>
              </DropdownItem>
              {index < actions.length - 1 && (
                <div className="border-b border-[#E7EDF0] mx-2 my-1" />
              )}
            </React.Fragment>
          )
        })}
      </DropdownContent>
    </Dropdown>
  )
}
