import React from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useCopyToClipboard } from '../../lib/useCopyToClipboard'
import type { TimelineActionProps } from './types'

/**
 * TimelineAction component for displaying actionable items like transaction IDs with copy functionality.
 * Uses the existing useCopyToClipboard hook for consistent behavior.
 */
export const TimelineAction: React.FC<TimelineActionProps> = ({
  action,
  className,
  disabled = false
}) => {
  const { copy, copied, error } = useCopyToClipboard({ timeout: 2000 })

  const handleCopy = async () => {
    if (action.value) {
      await copy(action.value)
    }
  }

  const handleActionClick = () => {
    if (action.type === 'copy' && action.value) {
      handleCopy()
    } else if (action.onClick) {
      action.onClick()
    }
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-1 py-0.5 bg-background-secondary border border-border-hover rounded text-xs',
        disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-background-primary transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        className
      )}
      onClick={disabled ? undefined : handleActionClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (disabled) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleActionClick()
        }
      }}
      aria-label={action.type === 'copy' ? `Copy ${action.label}` : action.label}
    >
      <span className="text-text-tertiary font-regular truncate max-w-[120px]">
        {action.label}
      </span>
      {action.type === 'copy' && (
        copied ? (
          <Check className="w-3 h-3 text-success-100 flex-shrink-0" />
        ) : (
          <Copy className="w-3 h-3 text-text-primary flex-shrink-0" />
        )
      )}
    </div>
  )
}

TimelineAction.displayName = 'TimelineAction'
