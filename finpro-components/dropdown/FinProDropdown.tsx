import React from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '../../src/components/dropdown'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'
import { cn } from '../../src/lib/cn'
import {
  finProDropdownConfig,
  useDropdownHoverInteractions,
  getLabelStyles,
  getDropdownContentStyles,
  type FinProDropdownProps
} from './finpro-config'

export function FinProDropdown({
  label,
  showLabel = true,
  variant = 'default',
  disabled = false,
  config = finProDropdownConfig
}: FinProDropdownProps) {
  const hoverInteractions = useDropdownHoverInteractions(config)

  return (
    <div className="w-full">
      {showLabel && (
        <label
          className="mb-1 block"
          style={getLabelStyles(config)}
        >
          {label}
        </label>
      )}
      <Dropdown>
        <DropdownTrigger
          variant={variant}
          disabled={disabled}
          className="w-full"
          style={hoverInteractions.getTriggerStyles()}
          onMouseEnter={hoverInteractions.handleMouseEnter}
          onMouseLeave={hoverInteractions.handleMouseLeave}
          onMouseDown={hoverInteractions.handleMouseDown}
          onMouseUp={hoverInteractions.handleMouseUp}
        >
          <span className="flex-1 text-left">
            {label}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent style={getDropdownContentStyles(config)}>
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}
