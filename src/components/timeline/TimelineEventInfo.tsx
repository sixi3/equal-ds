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
import { Tag } from '../ui/Tag'
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
  iconRef,
  disabled = false
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
        <span className={cn(
          "text-xs font-normal tracking-wider",
          disabled ? "text-text-muted" : "text-text-tertiary"
        )}>
          {formatTimestamp(timestamp)}
        </span>
      </div>

      {/* Status Icon */}
      <div className="flex-shrink-0" data-status-icon ref={iconRef}>
        <StatusIcon className={cn(
          'w-4 h-4',
          disabled ? 'text-text-muted' : statusConfig.color
        )} />
      </div>

      {/* Title and Description */}
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-nowrap">
          <h4 className={cn(
            "text-base font-medium leading-normal tracking-wide",
            disabled ? "text-text-secondary" : "text-text-primary"
          )}>
            {title}
          </h4>

          {/* Status Badge - only show if status has a label */}
          {status.label && (
            <Tag
              size="sm"
              className={cn(
                statusConfig.bgColor,
                statusConfig.color,
                'font-medium tracking-wider'
              )}
            >
              {status.label}
            </Tag>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className={cn(
            "text-sm mt-0.5 leading-normal",
            disabled ? "text-text-muted" : "text-text-secondary"
          )}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

TimelineEventInfo.displayName = 'TimelineEventInfo'
