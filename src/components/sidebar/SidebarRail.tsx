import React from 'react'
import { cn } from '../../lib/cn'

export interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarRailImpl = ({ className, ...props }: SidebarRailProps): JSX.Element => (
  <div className={cn('w-14', className)} {...props} />
)

export const SidebarRail = React.memo(SidebarRailImpl)


