import React from 'react'
import { cn } from '../../lib/cn'
import { TimelineEventInfo } from './TimelineEventInfo'
import { TimelineAction } from './TimelineAction'
import { TimelineConnector } from './TimelineConnector'
import { TimelineTooltip } from './TimelineTooltip'
import type { TimelineItemProps } from './types'

/**
 * TimelineItem component represents a single event in the timeline.
 * Combines event info, optional action, connector lines, and tooltip.
 */
export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  isLast,
  showConnector,
  registerIcon
}) => {
  const isDisabled = item.disabled || false

  return (
    <div className={cn(
      "w-full flex items-center gap-4 relative",
      isDisabled && "opacity-60"
    )} data-timeline-item>

      {/* Event Information - Timestamp, Icon, Title, Description */}
      <TimelineEventInfo
        timestamp={item.timestamp}
        status={item.status}
        title={item.title}
        description={item.description}
        className=""
        iconRef={registerIcon}
        disabled={isDisabled}
      />

      {/* Optional Action - Transaction ID with copy functionality */}
      {item.action && (
        <TimelineAction
          action={item.action}
          disabled={isDisabled}
        />
      )}

      {/* Connector Line - Horizontal line with optional vertical extension */}
      <TimelineConnector showConnector={showConnector} />

      {/* Info Tooltip - Rightmost element */}
      <TimelineTooltip tooltip={item.tooltip} />
    </div>
  )
}

TimelineItem.displayName = 'TimelineItem'
