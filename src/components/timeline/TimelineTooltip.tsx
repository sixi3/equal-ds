import React from 'react'
import { Info } from 'lucide-react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '../../lib/cn'
import type { TimelineTooltipProps } from './types'

/**
 * TimelineTooltip component provides contextual information via tooltip.
 * Uses Radix UI tooltip for accessibility and proper positioning.
 */
export const TimelineTooltip: React.FC<TimelineTooltipProps> = ({
  tooltip,
  className,
}) => {
  // If no tooltip data, don't render anything
  if (!tooltip) return null

  const renderTooltipContent = () => (
    <div className="px-2 py-1">
      <p className="text-xs text-white leading-relaxed font-regular tracking-wider">
        {tooltip.content}
      </p>
    </div>
  )

  return (
    <TooltipPrimitive.Provider delayDuration={500}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button
            className={cn(
              'flex items-center justify-center w-4 h-4 rounded-sm',
              'hover:bg-background-secondary transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
              className
            )}
            aria-label="More information"
          >
            <Info className="w-4 h-4 text-text-muted" />
          </button>
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={cn(
              'z-50 rounded-lg bg-primary-600 px-1 py-0.5 relative max-w-xl',
              'transition-opacity duration-300 ease-out'
            )}
            sideOffset={4}
            align="end"
            alignOffset={-8}
          >
            {renderTooltipContent()}
            <TooltipPrimitive.Arrow className="fill-primary-600  w-3 h-2" style={{ transform: 'translateY(-1px)' }} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

TimelineTooltip.displayName = 'TimelineTooltip'
