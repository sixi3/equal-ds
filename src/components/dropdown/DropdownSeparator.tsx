import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'

export interface DropdownSeparatorProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Separator> {}

export const DropdownSeparator = React.forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  ({ className, ...props }, ref) => (
    <DropdownMenu.Separator ref={ref} className={cn('my-1 h-px bg-border', className)} {...props} />
  ),
)

DropdownSeparator.displayName = 'DropdownSeparator'


