import React from 'react'
import { cn } from '../../lib/cn'
import { useSidebarOpenContext } from './SidebarProvider'

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function SidebarHeaderImpl({ className, ...props }: SidebarHeaderProps): JSX.Element {
  const { open } = useSidebarOpenContext()
  
  return (
    <div className={cn(
              'px-3 py-2 border-b border-border-default',
      open
        ? 'text-left'
        : cn(
            'text-center',
            // Hide the first child (logo/brand) and center the trigger while collapsed
            '[&>*:first-child]:hidden [&>*:last-child]:mx-auto',
          ),
      className
    )} {...props} />
  )
}

export const SidebarHeader = React.memo(SidebarHeaderImpl)


