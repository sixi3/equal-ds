import React from 'react'
import { cn } from '../../lib/cn'
import { useSidebarOpenContext } from './SidebarProvider'

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'floating' | 'inset'
}

function SidebarImpl({ className, variant = 'inset', ...props }: SidebarProps): JSX.Element {
  const { open, side } = useSidebarOpenContext()
  return (
    <nav
      aria-label={props['aria-label'] ?? 'Primary'}
      data-state={open ? 'open' : 'closed'}
      data-side={side}
      data-variant={variant}
      className={cn(
        'bg-white text-foreground border-border-light',
        side === 'left' ? 'border-r' : 'border-l',
        'transition-[width] duration-200 ease-out',
        'w-[255px] data-[state=closed]:w-[70px] overflow-x-hidden overflow-y-hidden',
        'flex flex-col h-full min-h-0',
        className,
      )}
      {...props}
    />
  )
}

export const Sidebar = React.memo(SidebarImpl)


