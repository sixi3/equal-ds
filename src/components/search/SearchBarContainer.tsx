import * as React from 'react'
import { cn } from '../../lib/cn'
import type { SearchBarContainerProps } from './types'

export const SearchBarContainer = React.forwardRef<HTMLDivElement, SearchBarContainerProps>(
  ({ variant = 'simple', disabled = false, loading = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="search"
        className={cn(
          // Base container styles
          'flex h-12 w-fit items-center overflow-hidden rounded-lg border border-b-2 border-border-default bg-transparent',
          // State-based styles
          {
            'opacity-50 cursor-not-allowed': disabled,
            'pointer-events-none': disabled || loading,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SearchBarContainer.displayName = 'SearchBarContainer'
