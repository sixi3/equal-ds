
import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn, ChevronIcon } from '../../lib'
import { DropdownContext } from './Dropdown'

export interface DropdownTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Trigger> {
  srLabel?: string
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
  /**
   * Whether to show the rotating chevron arrow (default: true)
   */
  showChevron?: boolean
  /**
   * Custom chevron icons to use instead of default
   */
  chevronIcons?: {
    open: React.ReactNode
    closed: React.ReactNode
  }
}

export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, srLabel, variant = 'default', showChevron = true, chevronIcons, children, ...props }, ref) => {
    const { isOpen } = React.useContext(DropdownContext)

    const baseClasses = 'inline-flex items-center gap-2 rounded-md border text-sm font-medium shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
      default: 'border-border-default bg-background-secondary text-text-primary hover:bg-primary-300/20 hover:border-border-hover hover:shadow-md active:bg-primary-300/30',
      outline: 'border-border-default bg-transparent text-text-primary hover:bg-primary-300/10 hover:border-border-hover hover:shadow-sm active:bg-primary-300/20',
      ghost: 'border-transparent bg-transparent text-text-primary hover:bg-primary-300/10 hover:border-primary-300/20 hover:shadow-sm active:bg-primary-300/20',
      primary: 'border-primary-500 bg-primary-500 text-text-inverse hover:bg-primary-600 hover:shadow-md active:bg-primary-700',
      destructive: 'border-error-100 bg-error-100 text-text-inverse hover:bg-error-200 hover:shadow-md active:bg-error-300'
    }

    // Default chevron icon with smooth rotation animation
    const defaultChevronIcon = <ChevronIcon isOpen={isOpen} />

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
          {showChevron && (
            <span className="ml-auto flex-shrink-0">
              {chevronIcons
                ? (isOpen ? chevronIcons.open : chevronIcons.closed)
                : defaultChevronIcon
              }
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>
    )
  },
)

DropdownTrigger.displayName = 'DropdownTrigger'


