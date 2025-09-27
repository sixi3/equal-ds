import * as React from 'react'
import { cn } from '../../lib/cn'

export interface HoverIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position and dimensions of the indicator
   */
  indicator: {
    top: number
    left: number
    width: number
    height: number
    visible: boolean
  }
  /**
   * Animation duration in milliseconds
   * @default 200
   */
  duration?: number
  /**
   * Custom styling variant
   * @default 'default'
   */
  variant?: 'default' | 'subtle' | 'primary' | 'accent'
  /**
   * Z-index for the indicator
   * @default 0
   */
  zIndex?: number
}

const variantStyles = {
  default: 'bg-primary-300/10 border border-border-default',
  subtle: 'bg-gray-300/10 border border-gray-200/50',
  primary: 'bg-primary-400/30 border border-primary-300/50',
  accent: 'bg-accent-300/20 border border-accent-200/50'
}

/**
 * A reusable hover indicator component that smoothly animates position and size changes.
 * Designed to work with the useHoverAnimation hook.
 * 
 * @example
 * ```tsx
 * const { indicator, containerRef, handleMouseMove, handleMouseLeave } = useHoverAnimation()
 * 
 * return (
 *   <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
 *     <HoverIndicator indicator={indicator} variant="primary" />
 *     {items.map(item => <div data-hoverable key={item.id}>{item.content}</div>)}
 *   </div>
 * )
 * ```
 */
export const HoverIndicator = React.forwardRef<HTMLDivElement, HoverIndicatorProps>(
  ({ 
    indicator, 
    duration = 200, 
    variant = 'default', 
    zIndex = 0,
    className,
    ...props 
  }, ref) => {
    const style = React.useMemo(() => ({
      top: indicator.top,
      left: indicator.left,
      width: indicator.width,
      height: indicator.height,
      zIndex,
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }), [indicator.top, indicator.left, indicator.width, indicator.height, zIndex, duration])

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          'pointer-events-none absolute rounded-lg transition-all duration-200 ease-out',
          variantStyles[variant],
          indicator.visible ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)

HoverIndicator.displayName = 'HoverIndicator'
