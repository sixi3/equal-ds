import * as React from 'react'

export interface HoverIndicator {
  top: number
  left: number
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

/**
 * Reusable hook for creating smooth hover animations that follow the cursor
 * across different items in a container.
 * 
 * @example
 * ```tsx
 * const { indicator, containerRef, handleMouseMove, handleMouseLeave } = useHoverAnimation({
 *   itemSelector: '[data-dropdown-item]',
 *   duration: 200
 * })
 * 
 * return (
 *   <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
 *     <HoverIndicator {...indicator} />
 *     {items.map(item => <div data-dropdown-item key={item.id}>{item.content}</div>)}
 *   </div>
 * )
 * ```
 */
export function useHoverAnimation(options: HoverAnimationOptions = {}): HoverAnimationReturn {
  const {
    itemSelector = '[data-hoverable]',
    duration = 200,
    enabled = true
  } = options

  const containerRef = React.useRef<HTMLElement | null>(null)
  const [indicator, setIndicator] = React.useState<HoverIndicator>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    visible: false
  })

  // Performance optimization: batch updates using requestAnimationFrame
  const rafPendingRef = React.useRef<boolean>(false)
  const pendingDataRef = React.useRef<{
    tRect: DOMRect
    cRect: DOMRect
  } | null>(null)

  const setContainerRef = React.useCallback((node: HTMLElement | null) => {
    containerRef.current = node
  }, [])

  const flushPointerFrame = React.useCallback(() => {
    rafPendingRef.current = false
    const data = pendingDataRef.current
    if (!data || !enabled) return

    const { tRect, cRect } = data
    const container = containerRef.current
    if (!container) return

    // Calculate relative position within the container
    setIndicator({
      top: tRect.top - cRect.top + (container.scrollTop ?? 0),
      left: tRect.left - cRect.left + (container.scrollLeft ?? 0),
      width: tRect.width,
      height: tRect.height,
      visible: true
    })
  }, [enabled])

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!enabled) return

    const container = containerRef.current
    if (!container) return

    // Find the closest hoverable item
    const targetItem = (e.target as HTMLElement).closest(itemSelector) as HTMLElement | null
    if (!targetItem) return

    const cRect = container.getBoundingClientRect()
    const tRect = targetItem.getBoundingClientRect()

    // Store pending data for the next animation frame
    pendingDataRef.current = { tRect, cRect }

    // Schedule update if not already pending
    if (!rafPendingRef.current) {
      rafPendingRef.current = true
      requestAnimationFrame(flushPointerFrame)
    }
  }, [enabled, itemSelector, flushPointerFrame])

  const handleMouseLeave = React.useCallback(() => {
    if (!enabled) return
    setIndicator(prev => ({ ...prev, visible: false }))
  }, [enabled])


  return {
    indicator,
    handleMouseMove,
    handleMouseLeave,
    setContainerRef
  }
}
