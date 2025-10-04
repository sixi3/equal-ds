import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'
import { useHoverAnimation } from '../../lib/useHoverAnimation'
import { HoverIndicator } from '../ui/HoverIndicator'
import { Search } from 'lucide-react'

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
  /**
   * Whether to show search functionality
   * @default false
   */
  enableSearch?: boolean
  /**
   * Search placeholder text
   * @default 'Search...'
   */
  searchPlaceholder?: string
  /**
   * Callback when search term changes
   */
  onSearchChange?: (searchTerm: string) => void
}

export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({
    className,
    sideOffset = 6,
    collisionPadding = 8,
    enableHoverAnimation = true,
    hoverVariant = 'default',
    enableSearch = false,
    searchPlaceholder = 'Search...',
    onSearchChange,
    ...props
  }, ref) => {
    const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
      itemSelector: '[data-dropdown-item]',
      excludeSelector: '[data-active="true"]',
      enabled: enableHoverAnimation
    })

    // Search state with debouncing for better API performance
    const [searchTerm, setSearchTerm] = React.useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState('')
    const searchRef = React.useRef<HTMLInputElement>(null)

    // Debounce search term updates (300ms delay)
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm)
        onSearchChange?.(searchTerm)
      }, 300)

      return () => clearTimeout(timer)
    }, [searchTerm, onSearchChange])

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }

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
            'dropdown-content z-50 w-[var(--radix-popper-anchor-width)] max-w-[var(--radix-popper-available-width)] rounded-lg border border-border-default bg-background-secondary p-1 shadow-lg will-change-[opacity,transform] relative',
            'data-[side=top]:origin-bottom data-[side=bottom]:origin-top',
            'data-[state=open]:animate-bezier-in data-[state=closed]:animate-bezier-out',
            className,
          )}
          {...props}
        >
          {/* Search Input */}
          {enableSearch && (
            <div className="flex items-center gap-1 px-2 py-2 border-b border-border-default group mb-1 focus:outline-none focus:ring-0">
              {/* Search Icon */}
              <Search size={16} strokeWidth={2} className="text-text-tertiary group-hover:text-primary-500 transition-colors duration-200" />
              <input
                ref={searchRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1 pt-0.5 pl-0.5 text-sm text-text-primary bg-transparent border-0 placeholder:text-text-tertiary placeholder:text-sm placeholder:font-normal placeholder:tracking-wider focus:outline-none focus:ring-0"
              />
            </div>
          )}

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


