
import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'

export interface DropdownTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Trigger> {
  srLabel?: string
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
}

export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, srLabel, variant = 'default', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center gap-2 rounded-md border text-sm font-medium shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
      default: 'border-border-default bg-background-secondary text-text-primary hover:bg-primary-300/20 hover:border-border-hover hover:shadow-md active:bg-primary-300/30',
      outline: 'border-border-default bg-transparent text-text-primary hover:bg-primary-300/10 hover:border-border-hover hover:shadow-sm active:bg-primary-300/20',
      ghost: 'border-transparent bg-transparent text-text-primary hover:bg-primary-300/10 hover:border-primary-300/20 hover:shadow-sm active:bg-primary-300/20',
      primary: 'border-primary-500 bg-primary-500 text-text-inverse hover:bg-primary-600 hover:shadow-md active:bg-primary-700',
      destructive: 'border-error-100 bg-error-100 text-text-inverse hover:bg-error-200 hover:shadow-md active:bg-error-300'
    }

    return (
      <DropdownMenu.Trigger asChild>
        <button
          ref={ref}
          className={cn(
            baseClasses,
            variantClasses[variant],
            'px-3 py-2',
            className,
          )}
          aria-label={srLabel}
          {...props}
        >
          {children}
        </button>
      </DropdownMenu.Trigger>
    )
  },
)

DropdownTrigger.displayName = 'DropdownTrigger'


