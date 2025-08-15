import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'

export interface DropdownItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Item> {
  inset?: boolean
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className, inset, children, ...props }, ref) => (
    <DropdownMenu.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm text-foreground outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent/60',
        inset && 'pl-8',
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  ),
)

DropdownItem.displayName = 'DropdownItem'


