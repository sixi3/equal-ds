import React from 'react'
import { cn } from '../../lib/cn'
import { useDrawerContext } from './DrawerProvider'

/**
 * Drawer component with configurable width, side positioning, and animation variants.
 * Supports both overlay and floating display modes.
 */
/**
 * Width values for drawer - numbers are converted to px, strings used as-is
 */
export type DrawerWidth = number | string

export interface DrawerProps extends React.HTMLAttributes<HTMLElement> {
  /** Display variant: 'overlay' shows with backdrop, 'floating' appears elevated */
  variant?: 'floating' | 'overlay'
  /**
   * Drawer width - simple and flexible:
   * - Numbers: converted to px (e.g., 500 → 500px width)
   * - Strings: used directly (e.g., "400px", "w-96", "50vw")
   * - Defaults to 320px for optimal mobile experience
   */
  width?: DrawerWidth
}

function DrawerImpl({ className, variant = 'overlay', width, ...props }: DrawerProps): JSX.Element {
  const { open, side } = useDrawerContext()

  return (
    <aside
      aria-label={props['aria-label'] ?? 'Drawer'}
      data-state={open ? 'open' : 'closed'}
      data-side={side}
      data-variant={variant}
      className={cn(
        // Base styles
        'bg-background-secondary text-text-primary border-border-default',
        'flex flex-col h-full min-h-0',
        // Directional shadows based on side
        side === 'left'
          ? 'shadow-[-6px_0_16px_4px_rgba(0,0,0,0.7)]'
          : 'shadow-[6px_0_16px_4px_rgba(0,0,0,0.7)]',
        'fixed top-0 z-50',
        // Positioning based on side
        side === 'left'
          ? 'left-0 border-r'
          : 'right-0 border-l',
        // Width - simple and direct
        width ? (typeof width === 'number' ? `w-[${width}px]` : width) : 'w-[320px]',
        'transition-transform duration-300 cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        side === 'left'
          ? 'data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full'
          : 'data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full',
        // Variant-specific styles
        variant === 'floating' && [
          'rounded-lg m-4',
        ],
        variant === 'overlay' && [
          // Overlay variant uses the overlay component for backdrop
        ],
        className,
      )}
      {...props}
    />
  )
}

export const Drawer = React.memo(DrawerImpl)
