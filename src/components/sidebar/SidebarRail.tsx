import React from 'react'
import { cn } from '../../lib/cn'

export interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarRail({ className, ...props }: SidebarRailProps): JSX.Element {
  return <div className={cn('w-14', className)} {...props} />
}


