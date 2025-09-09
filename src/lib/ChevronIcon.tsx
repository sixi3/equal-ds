import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from './cn'

export interface ChevronIconProps {
  /**
   * Whether the chevron should be in the rotated (open) state
   * @default false
   */
  isOpen?: boolean
  /**
   * Size of the chevron icon
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg'
  /**
   * Opacity of the chevron icon
   * @default 70
   */
  opacity?: number
  /**
   * Custom className for additional styling
   */
  className?: string
  /**
   * Animation duration in milliseconds
   * @default 300
   */
  duration?: number
  /**
   * Animation easing function
   * @default 'ease-out'
   */
  easing?: 'ease-out' | 'ease-in' | 'ease-in-out' | 'linear'
}

export const ChevronIcon = React.forwardRef<SVGSVGElement, ChevronIconProps>(
  ({
    isOpen = false,
    size = 'default',
    opacity = 70,
    className,
    duration = 300,
    easing = 'ease-out',
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: 'h-3 w-3',
      default: 'h-4 w-4',
      lg: 'h-5 w-5'
    }

    const opacityClass = `opacity-${opacity}`

    return (
      <ChevronDown
        ref={ref}
        className={cn(
          sizeClasses[size],
          opacityClass,
          'flex-shrink-0 transition-transform',
          `duration-${duration}`,
          `ease-${easing}`,
          isOpen ? 'rotate-180' : 'rotate-0',
          className
        )}
        {...props}
      />
    )
  }
)

ChevronIcon.displayName = 'ChevronIcon'
