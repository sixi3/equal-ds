import React from 'react'
import { cn } from '../../lib/cn'
import { TimelineItem } from './TimelineItem'
import type { TimelineProps } from './types'

/**
 * Timeline component displays a series of events in chronological order.
 * Takes full width and height of parent container with dynamic spacing between items.
 */
export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({
    items,
    variant = 'default',
    showConnectors = true,
    connectorGap = 4,
    className,
    ...props
  }, ref) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const connectorRefs = React.useRef<Array<HTMLSpanElement | null>>([])
    const rafIdRef = React.useRef<number | null>(null)

    const updateConnectors = React.useCallback(() => {
      if (!showConnectors || items.length <= 1) {
        // Hide all connectors when not needed
        connectorRefs.current.forEach(connector => {
          if (connector) connector.style.display = 'none'
        })
        return
      }

      const container = containerRef.current
      if (!container) return

      try {
        const containerRect = container.getBoundingClientRect()

        // Validate container dimensions
        if (containerRect.width === 0 || containerRect.height === 0) return

        const gap = connectorGap

        // Find all timeline items
        const timelineItems = container.querySelectorAll('[data-timeline-item]')
        if (timelineItems.length !== items.length) return

        for (let index = 0; index < items.length - 1; index += 1) {
          const connector = connectorRefs.current[index]
          if (!connector) continue

          // Defensive type checking for DOM elements
          const currentItem = timelineItems[index]
          const nextItem = timelineItems[index + 1]

          if (!(currentItem instanceof HTMLElement) || !(nextItem instanceof HTMLElement)) {
            connector.style.display = 'none'
            continue
          }

          // Find status icons within items
          const currentIcon = currentItem.querySelector('[data-status-icon]') as HTMLElement | null
          const nextIcon = nextItem.querySelector('[data-status-icon]') as HTMLElement | null

          if (!currentIcon || !nextIcon) {
            connector.style.display = 'none'
            continue
          }

          try {
            const currentRect = currentIcon.getBoundingClientRect()
            const nextRect = nextIcon.getBoundingClientRect()

            // Validate icon dimensions
            if (currentRect.width === 0 || currentRect.height === 0 ||
                nextRect.width === 0 || nextRect.height === 0) {
              connector.style.display = 'none'
              continue
            }

            // Calculate connector position and dimensions
            // Connector starts 4px below current icon bottom, ends 4px above next icon top
            const startY = currentRect.bottom - containerRect.top + 12
            const endY = nextRect.top - containerRect.top - 12
            const height = Math.max(0, endY - startY)

            const currentCenterX = currentRect.left + currentRect.width / 2
            const nextCenterX = nextRect.left + nextRect.width / 2
            const left = (currentCenterX + nextCenterX) / 2 - containerRect.left

            // Apply styles directly to DOM
            connector.style.top = `${startY}px`
            connector.style.left = `${left}px`
            connector.style.height = `${height}px`
            connector.style.display = height > 0 ? 'block' : 'none'

          } catch (rectError) {
            connector.style.display = 'none'
          }
        }
      } catch (error) {
        // Hide all connectors on error
        connectorRefs.current.forEach(connector => {
          if (connector) connector.style.display = 'none'
        })
      }
    }, [items.length, showConnectors, connectorGap])

    const registerConnector = React.useCallback((index: number, node: HTMLSpanElement | null) => {
      connectorRefs.current[index] = node
    }, [])

    // Throttled resize handler using requestAnimationFrame
    const throttledUpdate = React.useCallback(() => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null
        updateConnectors()
      })
    }, [updateConnectors])

    React.useLayoutEffect(() => {
      updateConnectors()
    }, [items.length, showConnectors, updateConnectors])

    React.useEffect(() => {
      const container = containerRef.current
      if (!container) return

      const resizeObserver = new ResizeObserver(throttledUpdate)
      resizeObserver.observe(container)

      return () => {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
        }
        resizeObserver.disconnect()
      }
    }, [throttledUpdate])

    const setContainerRef = React.useCallback((node: HTMLDivElement | null) => {
      containerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      updateConnectors()
    }, [ref, updateConnectors])

    // Ensure connector refs array matches required length
    React.useEffect(() => {
      connectorRefs.current.length = Math.max(0, items.length - 1)
    }, [items.length])

    return (
      <div
        ref={setContainerRef}
        className={cn(
          'w-full h-full flex flex-col justify-between relative',
          className
        )}
        {...props}
      >
        {showConnectors && Array.from({ length: Math.max(0, items.length - 1) }, (_, index) => {
          const nextItem = items[index + 1]
          const isDashed = nextItem?.disabled || false

          return (
            <span
              key={`timeline-connector-${index}`}
              ref={(node) => registerConnector(index, node)}
              className={cn(
                "absolute w-px pointer-events-none",
                isDashed ? "border-l border-dashed border-border-default" : "bg-border-default"
              )}
              style={{ display: 'none' }}
              aria-hidden
            />
          )
        })}

        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
            showConnector={showConnectors}
          />
        ))}
      </div>
    )
  }
)

Timeline.displayName = 'Timeline'
