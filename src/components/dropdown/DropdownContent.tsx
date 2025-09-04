import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'
import { useHoverAnimation } from '../../lib/useHoverAnimation'
import { HoverIndicator } from '../ui/HoverIndicator'

export interface DropdownContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Content> {
  /**
   * Enable hover animation for dropdown items
   * @default true
   */
  enableHoverAnimation?: boolean
  /**
   * Hover animation variant
   * @default 'default'
   */
  hoverVariant?: 'default' | 'subtle' | 'primary' | 'accent'
}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, sideOffset = 6, collisionPadding = 8, enableHoverAnimation = true, hoverVariant = 'default', ...props }, ref) => {
    const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
      itemSelector: '[data-dropdown-item]',
      enabled: enableHoverAnimation
    })

    // Combine refs
    const combinedRef = React.useCallback((node: HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
      setContainerRef(node)
    }, [ref, setContainerRef])

    return (
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          ref={combinedRef}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'dropdown-content z-50 w-[var(--radix-popper-anchor-width)] max-w-[var(--radix-popper-available-width)] rounded-lg border border-border-default bg-background-secondary p-1 shadow-lg will-change-[opacity,transform] focus:outline-none relative',
            'data-[side=top]:origin-bottom data-[side=bottom]:origin-top',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            className,
          )}
          {...props}
        >
          {enableHoverAnimation && (
            <HoverIndicator 
              indicator={indicator} 
              variant={hoverVariant}
              zIndex={0}
            />
          )}
          {props.children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    )
  },
)

DropdownContent.displayName = 'DropdownContent'


