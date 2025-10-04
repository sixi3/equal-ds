import React from 'react'
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Clock,
  Circle
} from 'lucide-react'
import { cn } from '../../lib/cn'
import type { TimelineEventInfoProps } from './types'

/**
 * TimelineEventInfo component displays the core information for a timeline event:
 * timestamp, status icon, title, description, and optional status badge.
 */
export const TimelineEventInfo: React.FC<TimelineEventInfoProps> = ({
  timestamp,
  status,
  title,
  description,
  className,
  iconRef
}) => {
  // Format timestamp to match design: "HH:MM:SS AM, MM/DD/YY"
  const formatTimestamp = (timestamp: string | Date): string => {
    const date = new Date(timestamp)
    const timeString = date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    })
    const dateString = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit'
    })
    return `${timeString}, ${dateString}`
  }

  // Map status types to icons and colors
  const getStatusConfig = (statusType: string) => {
    switch (statusType) {
      case 'success':
        return {
          icon: CheckCircle2,
          color: 'text-success-100', // #2D8659 from design
          bgColor: 'bg-success-50'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-warning-100', // #AC732B
          bgColor: 'bg-warning-50'
        }
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-error-300', // #A22F2F
          bgColor: 'bg-error-50'
        }
      case 'info':
        return {
          icon: Info,
          color: 'text-info-100', // #7C3A60
          bgColor: 'bg-info-50'
        }
      case 'pending':
        return {
          icon: Clock,
          color: 'text-primary-700', // #0074A5
          bgColor: 'bg-primary-100' // #E0F5FF from design
        }
      case 'neutral':
      default:
        return {
          icon: Circle,
          color: 'text-text-muted', // #708497
          bgColor: 'bg-background-tertiary'
        }
    }
  }

  const statusConfig = getStatusConfig(status.type)
  const StatusIcon = statusConfig.icon

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Timestamp - Right aligned */}
      <div className="text-right flex-shrink-0 w-24">
        <span className="text-xs text-text-tertiary font-normal tracking-wider">
          {formatTimestamp(timestamp)}
        </span>
      </div>

      {/* Status Icon */}
      <div className="flex-shrink-0" data-status-icon ref={iconRef}>
        <StatusIcon className={cn('w-4 h-4', statusConfig.color)} />
      </div>

      {/* Title and Description */}
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-nowrap">
          <h4 className="text-base font-medium text-text-primary leading-normal">
            {title}
          </h4>

          {/* Status Badge - only show if status has a label */}
          {status.label && (
            <span className={cn(
              'inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium tracking-wider flex-shrink-0',
              statusConfig.bgColor,
              statusConfig.color
            )}>
              {status.label}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-text-secondary mt-0.5 leading-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

TimelineEventInfo.displayName = 'TimelineEventInfo'
