import * as React from 'react'
import { cn } from '../../lib/cn'
import type { HorizontalTabsProps, TabItem } from './types'

export const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  disabled = false,
  className,
  renderTab,
}) => {
  const [indicatorStyle, setIndicatorStyle] = React.useState<{ width: string; transform: string; left: string }>({ width: '0px', transform: 'translateX(0px)', left: '0px' })
  const [indicatorReady, setIndicatorReady] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const rafId = React.useRef<number | null>(null)

  // Compute active index directly instead of storing as state
  const activeIndex = React.useMemo(
    () => tabs.findIndex(tab => tab.id === activeTab),
    [tabs, activeTab]
  )

  // Optimized indicator calculation using RAF for smooth updates
  const updateIndicator = React.useCallback(() => {
    if (!containerRef.current) return

    if (rafId.current) cancelAnimationFrame(rafId.current)

    rafId.current = requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container) return

      // Find the currently active tab element
      const activeTabElement = container.querySelector(
        `button[role="tab"][aria-selected="true"]`
      ) as HTMLElement | null

      if (!activeTabElement) return

      // Use offset values for reliable positioning relative to the container
      const tabOffsetLeft = activeTabElement.offsetLeft
      const tabWidth = activeTabElement.offsetWidth

      setIndicatorStyle({
        width: `${tabWidth}px`,
        transform: `translateX(${tabOffsetLeft}px)`,
        left: '0px',
      })
      setIndicatorReady(true)
    })
  }, [])

  // Combined effect for indicator updates and ResizeObserver
  React.useEffect(() => {
    updateIndicator()

    // ResizeObserver is not available in test environments (jsdom)
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateIndicator)
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current)
      }

      return () => {
        resizeObserver.disconnect()
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }
      }
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [activeTab, tabs, updateIndicator])

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

        // Find the next enabled tab to the left (wrapping around)
        let prevIndex = activeIndex - 1
        if (prevIndex < 0) prevIndex = tabs.length - 1

        // Keep looking for an enabled tab (prevent infinite loop with counter)
        let iterations = 0
        while (iterations < tabs.length && prevIndex !== activeIndex) {
          if (!tabs[prevIndex].disabled) {
            onTabChange(tabs[prevIndex].id)
            return
          }
          prevIndex = prevIndex - 1
          if (prevIndex < 0) prevIndex = tabs.length - 1
          iterations++
        }
        break
      }
      case 'ArrowRight': {
        event.preventDefault()

        // Find the next enabled tab to the right (wrapping around)
        let nextIndex = activeIndex + 1
        if (nextIndex >= tabs.length) nextIndex = 0

        // Keep looking for an enabled tab (prevent infinite loop with counter)
        let iterations = 0
        while (iterations < tabs.length && nextIndex !== activeIndex) {
          if (!tabs[nextIndex].disabled) {
            onTabChange(tabs[nextIndex].id)
            return
          }
          nextIndex = nextIndex + 1
          if (nextIndex >= tabs.length) nextIndex = 0
          iterations++
        }
        break
      }
    }
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-orientation="horizontal"
      aria-label="Navigation tabs"
      className={cn(
        // Container styles - matches Figma design
        'relative flex items-center rounded-lg bg-gray-100 p-1 w-full',
        'border border-border-default overflow-hidden',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {/* Sliding active indicator */}
      <div
        className={cn(
          "absolute top-1 bottom-1 bg-background-secondary rounded-md border border-primary-400 border-b-2 border-b-primary-400 shadow-sm transition-all duration-300 ease-out z-10",
          !indicatorReady && "opacity-0"
        )}
        style={indicatorStyle}
        aria-hidden="true"
      />
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab
        const isDisabled = tab.disabled || disabled

        if (renderTab) {
          const renderedTab = renderTab(tab, isActive, () => handleTabClick(tab))
          if (React.isValidElement(renderedTab)) {
            return React.cloneElement(renderedTab, { key: tab.id })
          }
          return null
        }

        return (
          <React.Fragment key={tab.id}>
            <button
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(tab)}
              onKeyDown={(e) => handleKeyDown(e, tab)}
            className={cn(
              // Base styles
              'relative flex-1 px-3 py-2 text-sm font-medium tracking-wide transition-all duration-200 z-10',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
              'rounded-md',
              // Text color based on active state - sliding indicator provides background
              isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary',
              // Disabled state
              isDisabled && [
                'cursor-not-allowed opacity-50',
                !isActive && 'hover:text-text-secondary',
              ]
            )}
            >
              {tab.label}
            </button>

            {/* Vertical divider between tabs (except for last tab) */}
            {index < tabs.length - 1 && (
              <div
                className="h-4 w-px bg-border-default mx-1 flex-shrink-0"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
