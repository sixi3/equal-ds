import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'

export interface DropdownContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Content> {}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, sideOffset = 6, collisionPadding = 8, ...props }, ref) => (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          'dropdown-content z-50 w-[var(--radix-popper-anchor-width)] max-w-[var(--radix-popper-available-width)] rounded-lg border border-border-default bg-background-secondary p-1 shadow-lg will-change-[opacity,transform] focus:outline-none',
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


