import React from 'react'
import { cn } from '../../lib/cn'
import { useSidebarContext } from './SidebarProvider'

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps): JSX.Element {
  const { open } = useSidebarContext()
  
  return (
    <div className={cn(
      'px-3 py-2',
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


