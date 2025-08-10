import React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { cn } from '../../lib/cn'
import { ChevronDown } from 'lucide-react'
import { useSidebarContext } from './SidebarProvider'

export interface SidebarGroupProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Root> {}

export function SidebarGroup({ className, children, ...props }: SidebarGroupProps): JSX.Element {
  return (
    <Collapsible.Root className={cn('group', className)} {...props}>
      {children}
    </Collapsible.Root>
  )
}

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps): JSX.Element {
  return <div className={cn(' text-xs uppercase text-muted-foreground', className)} {...props} />
}

export interface SidebarGroupContentProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Content> {}

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps): JSX.Element {
  return <Collapsible.Content className={cn('space-y-2 sidebar-collapsible', className)} {...props} />
}

export interface SidebarGroupTriggerProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Trigger> {}

export function SidebarGroupTrigger({ className, children, ...props }: SidebarGroupTriggerProps): JSX.Element {
  const { open } = useSidebarContext()
  
  return (
    <Collapsible.Trigger
      className={cn(
        'group/trigger w-full flex flex-col rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'px-1 py-2',
        className,
      )}
      {...props}
    >
      <div className={cn(
        'flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground',
        open ? 'justify-start' : 'justify-center'
      )}>
        {open && <div className="min-w-0 truncate">{children}</div>}
        <div className={cn(
          'h-px bg-border',
          open ? 'flex-1' : 'w-3'
        )} />
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full transition-colors group-hover/trigger:bg-gray-300/40">
          <ChevronDown
            aria-hidden
            className={cn(
              'h-3 w-3 shrink-0 transition-transform duration-200 ease-out text-muted-foreground',
              'group-data-[state=open]:rotate-180',
            )}
          />
        </span>
      </div>
    </Collapsible.Trigger>
  )
}


