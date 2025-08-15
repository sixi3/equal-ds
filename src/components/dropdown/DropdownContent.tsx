import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'

export interface DropdownContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Content> {}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, sideOffset = 6, ...props }, ref) => (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'dropdown-content z-50 min-w-[12rem] rounded-lg border border-border bg-background p-1 shadow-lg will-change-[opacity,transform] focus:outline-none',
          'data-[side=top]:origin-bottom data-[side=bottom]:origin-top',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          className,
        )}
        {...props}
      />
    </DropdownMenu.Portal>
  ),
)

DropdownContent.displayName = 'DropdownContent'


