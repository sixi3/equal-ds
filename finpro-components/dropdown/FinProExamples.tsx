import React from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from './'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'
import { cn } from '../../lib/cn'
import {
  getFinProDropdownClasses,
  getFinProLabelClasses,
  getFinProContainerClasses,
  getFinProContentClasses,
  useFinProDropdownState,
  generateFinProInlineStyles,
  generateFinProCSSVariables,
  finProTheme
} from './finpro-utils'

// Example 1: Using CSS classes
export function FinProDropdownCSS() {
  return (
    <div className={getFinProContainerClasses()}>
      <label className={getFinProLabelClasses()}>
        Consent Template
      </label>
      <Dropdown>
        <DropdownTrigger className={getFinProDropdownClasses()}>
          <span>Consent Template</span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent className={getFinProContentClasses()}>
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

// Example 2: Using the state hook
export function FinProDropdownWithHook() {
  const dropdownState = useFinProDropdownState()

  return (
    <div className={getFinProContainerClasses()}>
      <label className={getFinProLabelClasses()}>
        Purpose Code
      </label>
      <Dropdown open={dropdownState.isOpen} onOpenChange={dropdownState.handleToggle}>
        <DropdownTrigger
          className={dropdownState.triggerClasses}
          onMouseEnter={dropdownState.handleMouseEnter}
          onMouseLeave={dropdownState.handleMouseLeave}
          onFocus={dropdownState.handleFocus}
          onBlur={dropdownState.handleBlur}
        >
          <span>Purpose Code</span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent className={getFinProContentClasses()}>
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

// Example 3: Using inline styles with dynamic theming
export function FinProDropdownInline({ isHovered = false }: { isHovered?: boolean }) {
  const inlineStyles = generateFinProInlineStyles({
    backgroundColor: '--color-background-secondary',
    textColor: '--color-text-primary',
    borderColor: '--color-border-hover',
    fontSize: '--typography-fontSize-sm',
    fontWeight: '--typography-fontWeight-medium',
    letterSpacing: '0.025em',
    padding: '--spacing-2',
    borderRadius: '--border-radius-lg',
    borderWidth: '1px',
    borderBottomWidth: '3px',
    boxShadow: '--component-card-shadow',
    hoverBackgroundColor: '--color-background-tertiary',
    hoverTextColor: '--color-text-primary',
    hoverBorderColor: '--color-border-hover',
    hoverBoxShadow: '--shadow-md',
    hoverBorderBottomWidth: '3px',
  }, isHovered)

  return (
    <div className="w-full">
      <label
        className="mb-1 block"
        style={{
          fontSize: 'var(--typography-fontSize-xs)',
          fontWeight: 'var(--typography-fontWeight-normal)',
          letterSpacing: '0.1em',
          color: 'var(--color-text-secondary)',
        }}
      >
        Account Aggregator
      </label>
      <Dropdown>
        <DropdownTrigger
          className="w-full flex items-center justify-between"
          style={inlineStyles}
        >
          <span>Account Aggregator</span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent
          style={{
            backgroundColor: 'var(--color-background-secondary)',
            borderColor: 'var(--color-border-hover)',
            borderRadius: 'var(--border-radius-lg)',
          }}
        >
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

// Example 4: Using CSS custom properties for theming
export function FinProDropdownThemed() {
  const themeVariables = generateFinProCSSVariables()

  return (
    <div
      className="w-full"
      style={themeVariables as Record<string, string>}
    >
      <label
        className="mb-1 block"
        style={{
          fontSize: 'var(--finpro-label-font-size)',
          fontWeight: 'var(--finpro-label-font-weight)',
          letterSpacing: 'var(--finpro-label-letter-spacing)',
          color: 'var(--finpro-label-color)',
        }}
      >
        Consent Created On
      </label>
      <Dropdown>
        <DropdownTrigger
          className="w-full flex items-center justify-between finpro-themed-trigger"
          style={{
            backgroundColor: 'var(--finpro-background)',
            color: 'var(--finpro-text)',
            borderColor: 'var(--finpro-border)',
            fontSize: 'var(--finpro-font-size)',
            fontWeight: 'var(--finpro-font-weight)',
            letterSpacing: 'var(--finpro-letter-spacing)',
            padding: 'var(--finpro-padding)',
            borderRadius: 'var(--finpro-border-radius)',
            borderWidth: 'var(--finpro-border-width)',
            borderBottomWidth: 'var(--finpro-border-bottom-width)',
            boxShadow: 'var(--finpro-box-shadow)',
            transition: 'var(--finpro-transition)',
          }}
        >
          <span>Consent Created On</span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent
          style={{
            backgroundColor: 'var(--finpro-background)',
            borderColor: 'var(--finpro-border)',
            borderRadius: 'var(--finpro-border-radius)',
          }}
        >
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

// Example 5: Complete filter section using CSS classes
export function FinProFilterSection() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">FinPro Filter Section (CSS Classes)</h3>
      </div>
      <div className="finpro-filter-section">
        <div className="finpro-filter-header">
          <h2 className="finpro-filter-title">
            Filter By
          </h2>
          <ChevronDown className="w-4 h-4 text-text-primary" />
        </div>
        <div className="finpro-filter-grid">
          <FinProDropdownCSS />
          <FinProDropdownWithHook />
          <FinProDropdownInline />
          <FinProDropdownThemed />
          <FinProDropdownCSS />
        </div>
      </div>
    </div>
  )
}
