import React from 'react'
import { cn } from '../../lib/cn'
import type { TimelineConnectorProps } from './types'

/**
 * TimelineConnector component provides horizontal connection lines within timeline rows.
 */
export const TimelineConnector: React.FC<TimelineConnectorProps> = ({
  showConnector,
  className
}) => {
  return (
    <div className={cn('flex items-center flex-1', className)}>
      {/* Horizontal connector line - spans the available width */}
      <div className="flex-1 max-w-full h-px bg-border-default" />
    </div>
  )
}

TimelineConnector.displayName = 'TimelineConnector'
