import React from 'react'
import { cn } from '../../lib/cn'
import { useSidebarOpenContext } from './SidebarProvider'

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  srLabel?: string
}

function SidebarTriggerImpl({ className, srLabel = 'Toggle sidebar', children, ...props }: SidebarTriggerProps): JSX.Element {
  const { toggle, open } = useSidebarOpenContext()
  return (
    <button
      type="button"
      aria-label={srLabel}
      onClick={toggle}
      className={cn(
        'grid place-items-center h-8 w-8 rounded-md border border-transparent text-foreground leading-none',
        ' hover:bg-primary-300/20 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors',
        className,
      )}
      {...props}
    >
      <span className={cn(
        'transition-transform duration-200 ease-out',
        open ? 'rotate-0' : 'rotate-180'
      )}>
        {children}
      </span>
    </button>
  )
}

export const SidebarTrigger = React.memo(SidebarTriggerImpl)


