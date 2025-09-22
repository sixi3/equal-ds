import React from 'react'
import { cn } from '../../lib/cn'
import { useDrawerContext } from './DrawerProvider'

/**
 * DrawerTrigger automatically connects to drawer context for opening/closing.
 * Provides consistent focus states and accessibility features.
 * Optional convenience component - you can use any button element with custom onClick handlers instead.
 */
export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function DrawerTriggerImpl({ className, children, onClick, ...props }: DrawerTriggerProps): JSX.Element {
  const { open, toggle } = useDrawerContext()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    toggle?.()
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      data-state={open ? 'open' : 'closed'}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export const DrawerTrigger = React.memo(DrawerTriggerImpl)
