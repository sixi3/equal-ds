import { resolveControlCssVar, resolveControlValue } from './designTokens'

export function generateDropdownSnippet(a: any): string {
  const varBorderColor = resolveControlCssVar(a.borderColor) || 'rgb(var(--border-default))'
  const varBackgroundColor = resolveControlCssVar(a.backgroundColor) || 'rgb(var(--gray-50))'
  const varTextColor = resolveControlCssVar(a.textColor) || 'rgb(var(--text-primary))'
  const varHoverBackgroundColor = resolveControlCssVar(a.hoverBackgroundColor) || 'rgb(var(--gray-100))'
  const varHoverBorderColor = resolveControlCssVar(a.hoverBorderColor) || 'rgb(var(--border-hover))'
  const varHoverTextColor = resolveControlCssVar(a.hoverTextColor) || 'rgb(var(--text-primary))'

  const borderTopWidth = a.borderTopWidth || '1px'
  const borderRightWidth = a.borderRightWidth || '1px'
  const borderBottomWidth = a.borderBottomWidth || '1px'
  const borderLeftWidth = a.borderLeftWidth || '1px'
  const sideOffset = a.sideOffset ?? 6
  const contentAlignment = a.contentAlignment || 'start'
  const triggerVariant = a.triggerVariant || 'default'

  return `import React, { useState } from 'react'
// Make sure your app imports the DS theme and typography once (e.g. in your root):
// import 'equal-ds-ui/shadcn-theme.css'
// import 'equal-ds-ui/typography.css'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from 'equal-ds-ui'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'

export function ExampleDropdown({ label = 'User Menu', showLabel = true }: { label?: string; showLabel?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className="space-y-2 w-full">
      {showLabel ? (<label className="${a.labelTypography || 'text-ui-label'} text-foreground">{label}</label>) : null}
      <Dropdown>
        <DropdownTrigger
          variant="${triggerVariant}"
          className="transition-all duration-200 w-full"
          style={{
            borderColor: isHovered ? '${varHoverBorderColor}' : '${varBorderColor}',
            backgroundColor: isHovered ? '${varHoverBackgroundColor}' : '${varBackgroundColor}',
            color: '${varTextColor}',
            padding: 'var(--spacing-2)',
            borderRadius: 'var(--radius)',
            borderTopWidth: '${borderTopWidth}',
            borderRightWidth: '${borderRightWidth}',
            borderBottomWidth: isHovered ? '${a.hoverBorderBottomWidth || '2px'}' : '${borderBottomWidth}',
            borderLeftWidth: '${borderLeftWidth}',
            borderStyle: 'solid',
            transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
        >
          <span className="flex-1 text-left">{label}</span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent align="${contentAlignment}" sideOffset={${sideOffset}} style={{
          borderColor: '${varBorderColor}',
          backgroundColor: '${varBackgroundColor}',
          borderRadius: 'var(--radius)',
          borderTopWidth: '${borderTopWidth}',
          borderRightWidth: '${borderRightWidth}',
          borderBottomWidth: '${borderBottomWidth}',
          borderLeftWidth: '${borderLeftWidth}',
          borderStyle: 'solid',
        }}>
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
}`
}

export function generateFinProSnippet(a: any): string {
  const dropdownGap = a.dropdownGap || '16px'
  const example = generateDropdownSnippet(a)
  return `${example}

export function FinProFilterSection() {
  return (
    <div className=\"min-h-screen bg-background p-6\">
      <div className=\"bg-background-secondary border border-border-light rounded-xl p-3 shadow-sm\" style={{ minHeight: '140px', boxSizing: 'border-box' }}>
        <div className=\"flex justify-between items-center mb-6\">
          <h2 className=\"${a.headerTypography || 'text-h2'} text-foreground\">Filter By</h2>
          <div className=\"w-4 h-4 bg-secondary rounded\" />
        </div>
        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-full\" style={{ gap: '${dropdownGap}', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <ExampleDropdown label=\"Consent Template\" />
          <ExampleDropdown label=\"Purpose Code\" />
          <ExampleDropdown label=\"Consent Status\" />
          <ExampleDropdown label=\"Account Aggregator\" />
        </div>
      </div>
    </div>
  )
}`
}
