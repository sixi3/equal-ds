import React from 'react'
import { cn } from '../../lib/cn'

/**
 * DrawerContent provides consistent styling for drawer content areas.
 * Includes padding, scrolling, and custom scrollbar styling.
 * Optional convenience component - you can use regular divs with custom styling instead.
 */
export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function DrawerContentImpl({ className, ...props }: DrawerContentProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex-1 overflow-y-auto p-4',
        'scrollbar-thin scrollbar-thumb-border-default scrollbar-track-transparent',
        className,
      )}
      {...props}
    />
  )
}

export const DrawerContent = React.memo(DrawerContentImpl)
