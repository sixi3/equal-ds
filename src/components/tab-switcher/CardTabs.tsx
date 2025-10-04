import * as React from 'react'
import { cn } from '../../lib/cn'
import type { CardTabsProps, TabItem } from './types'

const getStatusStyles = (status?: string) => {
  switch (status) {
    case 'active':
      return 'bg-success-50 text-success-100'
    case 'failed':
      return 'bg-error-50 text-error-100'
    case 'data-ready':
      return 'bg-warning-50 text-warning-100'
    case 'partial-data':
      return 'bg-info-50 text-info-100'
    default:
      return 'bg-gray-200 text-text-tertiary'
  }
}

export const CardTabs: React.FC<CardTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  disabled = false,
  className,
  renderTab,
}) => {
  const handleTabClick = (tab: TabItem) => {
    if (tab.disabled || disabled) return
    onTabChange(tab.id)
  }

  const handleKeyDown = (event: React.KeyboardEvent, tab: TabItem) => {
    if (tab.disabled || disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        onTabChange(tab.id)
        break
      case 'ArrowLeft': {
        event.preventDefault()
        const currentIndex = tabs.findIndex(t => t.id === activeTab)
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
        const prevTab = tabs[prevIndex]
        if (!prevTab.disabled) {
          onTabChange(prevTab.id)
        }
        break
      }
      case 'ArrowRight': {
        event.preventDefault()
        const currentIndex = tabs.findIndex(t => t.id === activeTab)
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
        const nextTab = tabs[nextIndex]
        if (!nextTab.disabled) {
          onTabChange(nextTab.id)
        }
        break
      }
    }
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        // Container styles - matches Figma card layout
        'flex items-center gap-3',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        const isDisabled = tab.disabled || disabled

        if (renderTab) {
          return React.cloneElement(
            renderTab(tab, isActive, () => handleTabClick(tab)),
            { key: tab.id }
          )
        }

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => handleTabClick(tab)}
            onKeyDown={(e) => handleKeyDown(e, tab)}
            className={cn(
              // Base card styles - matches Figma design
              'flex flex-col gap-2 p-3 rounded-lg border transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
              'flex-1 min-w-[185px]', // Take equal width while maintaining minimum width
              // Active state - matches Figma design
              isActive && [
                'bg-background-secondary border-primary-400',
                'border-b-2 border-b-primary-400', // Accent border
                'shadow-sm',
              ],
              // Inactive state
              !isActive && [
                'bg-transparent border-primary-300',
                'hover:bg-background-primary hover:border-primary-400',
              ],
              // Disabled state
              isDisabled && [
                'cursor-not-allowed opacity-50',
                'hover:bg-transparent hover:border-primary-300',
              ]
            )}
          >
            {/* Header section with label and status badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-text-tertiary tracking-wider">
                SESSION
              </span>
              {tab.status && (
                <div
                  className={cn(
                    'px-2 py-0.5 rounded text-xs font-medium tracking-wider',
                    getStatusStyles(tab.status)
                  )}
                >
                  {tab.status === 'active' && 'Active'}
                  {tab.status === 'failed' && 'Failed'}
                  {tab.status === 'data-ready' && 'Data Ready'}
                  {tab.status === 'partial-data' && 'Partial Data'}
                </div>
              )}
            </div>

            {/* Main label */}
            <div className="text-left">
              <div className="text-sm font-medium text-text-primary">
                {tab.label}
              </div>
              {tab.metadata && (
                <div className="text-sm font-medium text-text-primary mt-1">
                  {tab.metadata}
                </div>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
