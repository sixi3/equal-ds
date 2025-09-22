import React from 'react'
import { cn } from '../../lib/cn'
import { useDrawerContext } from './DrawerProvider'

export interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}



function DrawerOverlayImpl({ className, onClick, ...props }: DrawerOverlayProps): JSX.Element | null {
  const { open, toggle } = useDrawerContext()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event)
    toggle?.()
  }

  if (!open) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm',
        'animate-fade-in',
        className,
      )}
      onClick={handleClick}
      {...props}
    />
  )
}

export const DrawerOverlay = React.memo(DrawerOverlayImpl)
