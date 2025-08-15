import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'

export interface DropdownTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Trigger> {
  srLabel?: string
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
}

export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, srLabel, variant = 'default', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center gap-2 rounded-md border text-sm font-medium shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = {
      default: 'border-border bg-background text-foreground hover:bg-accent/50 hover:border-accent hover:shadow-md active:bg-accent/70',
      outline: 'border-border bg-transparent text-foreground hover:bg-accent/10 hover:border-accent hover:shadow-sm active:bg-accent/20',
      ghost: 'border-transparent bg-transparent text-foreground hover:bg-accent/10 hover:border-accent/20 hover:shadow-sm active:bg-accent/20',
      primary: 'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md active:bg-primary/80',
      destructive: 'border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md active:bg-destructive/80'
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


