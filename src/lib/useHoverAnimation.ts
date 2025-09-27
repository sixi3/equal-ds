import * as React from 'react'

export interface HoverIndicator {
  top: number
  left: number
  bottom: number
  right: number
  width: number
  height: number
  visible: boolean
}

export interface HoverAnimationOptions {
  /**
   * CSS selector to find hoverable items within the container
   * @default '[data-hoverable]'
   */
  itemSelector?: string
  /**
   * CSS selector to exclude items from hover animation (e.g., active/selected items)
   * @default null
   */
  excludeSelector?: string | null
  /**
   * Animation duration in milliseconds
   * @default 200
   */
  duration?: number
  /**
   * Whether to enable the hover animation
   * @default true
   */
  enabled?: boolean
}

export interface HoverAnimationReturn {
  indicator: HoverIndicator
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void
  handleMouseLeave: () => void
  setContainerRef: (node: HTMLElement | null) => void
}

const HIDDEN_INDICATOR: HoverIndicator = Object.freeze({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
  visible: false
})

/**
 * Reusable hook for creating smooth hover animations that follow the cursor
 * across different items in a container.
 * 
 * @example
 * ```tsx
 * const { indicator, containerRef, handleMouseMove, handleMouseLeave } = useHoverAnimation({
 *   itemSelector: '[data-dropdown-item]',
 *   excludeSelector: '[data-active]', // Exclude active/selected items
 *   duration: 200
 * })
 *
 * return (
 *   <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
 *     <HoverIndicator {...indicator} />
 *     {items.map(item => (
 *       <div
 *         data-dropdown-item
 *         data-active={item.isActive} // Mark active items
 *         key={item.id}
 *       >
 *         {item.content}
 *       </div>
 *     ))}
 *   </div>
 * )
 * ```
 */
export function useHoverAnimation(options: HoverAnimationOptions = {}): HoverAnimationReturn {
  const {
    itemSelector = '[data-hoverable]',
    excludeSelector = null,
    duration = 200,
    enabled = true
  } = options

  const containerRef = React.useRef<HTMLElement | null>(null)
  const [indicator, setIndicatorState] = React.useState<HoverIndicator>(() => HIDDEN_INDICATOR)

  const indicatorRef = React.useRef<HoverIndicator>(indicator)

  // Performance optimisation: batch updates using requestAnimationFrame
  const rafPendingRef = React.useRef<boolean>(false)
  const rafIdRef = React.useRef<number | null>(null)
  const lastTargetRef = React.useRef<HTMLElement | null>(null)
  const pendingDataRef = React.useRef<{
    target: HTMLElement
  } | null>(null)

  const commitIndicator = React.useCallback((updater: HoverIndicator | ((prev: HoverIndicator) => HoverIndicator)) => {
    setIndicatorState(prevState => {
      const nextState = typeof updater === 'function' ? (updater as (prev: HoverIndicator) => HoverIndicator)(prevState) : updater

      const current = indicatorRef.current
      if (
        current.top === nextState.top &&
        current.left === nextState.left &&
        current.bottom === nextState.bottom &&
        current.right === nextState.right &&
        current.width === nextState.width &&
        current.height === nextState.height &&
        current.visible === nextState.visible
      ) {
        return prevState
      }

      indicatorRef.current = nextState
      return nextState
    })
  }, [])

  const hideIndicator = React.useCallback(() => {
    commitIndicator(prev => (prev.visible ? HIDDEN_INDICATOR : prev))
    lastTargetRef.current = null
    pendingDataRef.current = null
  }, [commitIndicator])

  const setContainerRef = React.useCallback((node: HTMLElement | null) => {
    containerRef.current = node
  }, [])

  const isTouchDevice = React.useMemo(() => {
    if (typeof window === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  const effectiveEnabled = enabled && !isTouchDevice

  const flushPointerFrame = React.useCallback(() => {
    rafPendingRef.current = false
    rafIdRef.current = null
    const data = pendingDataRef.current
    if (!data || !effectiveEnabled) return

    const container = containerRef.current
    const target = data.target
    if (!container || !target?.isConnected) return

    const cRect = container.getBoundingClientRect()
    const tRect = target.getBoundingClientRect()

    const scrollTop = 'scrollTop' in container ? container.scrollTop : 0
    const scrollLeft = 'scrollLeft' in container ? container.scrollLeft : 0
    const borderTop = 'clientTop' in container ? container.clientTop : 0
    const borderLeft = 'clientLeft' in container ? container.clientLeft : 0

    commitIndicator({
      top: tRect.top - cRect.top + scrollTop - borderTop,
      left: tRect.left - cRect.left + scrollLeft - borderLeft,
      bottom: tRect.bottom - cRect.bottom + scrollTop - borderTop,
      right: tRect.right - cRect.right + scrollLeft - borderLeft,
      width: tRect.width,
      height: tRect.height,
      visible: true
    })
  }, [commitIndicator, effectiveEnabled])

  const scheduleFrame = React.useCallback(() => {
    if (!rafPendingRef.current) {
      rafPendingRef.current = true
      rafIdRef.current = requestAnimationFrame(flushPointerFrame)
    }
  }, [flushPointerFrame])

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!effectiveEnabled) return

    const container = containerRef.current
    if (!container) return

    // Find the closest hoverable item
    const targetItem = (e.target as HTMLElement).closest(itemSelector) as HTMLElement | null
    if (!targetItem) return

    // Check if this item should be excluded from hover animation
    if (excludeSelector && targetItem.matches(excludeSelector)) {
      // Hide the indicator if hovering over an excluded item
      hideIndicator()
      return
    }

    if (targetItem === lastTargetRef.current && indicatorRef.current.visible) {
      return
    }

    // Store pending data for the next animation frame
    pendingDataRef.current = { target: targetItem }
    lastTargetRef.current = targetItem

    // Schedule update if not already pending
    scheduleFrame()
  }, [effectiveEnabled, itemSelector, excludeSelector, hideIndicator, scheduleFrame])

  const handleMouseLeave = React.useCallback(() => {
    if (!effectiveEnabled) return
    hideIndicator()
  }, [effectiveEnabled, hideIndicator])

  React.useEffect(() => {
    if (!effectiveEnabled) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      rafPendingRef.current = false
      hideIndicator()
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      rafPendingRef.current = false
      pendingDataRef.current = null
      lastTargetRef.current = null
    }
  }, [effectiveEnabled, hideIndicator])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container || !effectiveEnabled || !indicator.visible) return

    const handleScroll = () => {
      if (lastTargetRef.current?.isConnected) {
        pendingDataRef.current = { target: lastTargetRef.current }
        scheduleFrame()
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [effectiveEnabled, indicator.visible, scheduleFrame])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container || !effectiveEnabled) return

    const observer = new ResizeObserver(() => {
      if (lastTargetRef.current?.isConnected) {
        pendingDataRef.current = { target: lastTargetRef.current }
        scheduleFrame()
      } else {
        hideIndicator()
      }
    })

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [effectiveEnabled, hideIndicator, scheduleFrame])


  return {
    indicator,
    handleMouseMove,
    handleMouseLeave,
    setContainerRef
  }
}
