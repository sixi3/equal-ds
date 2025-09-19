import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu' 
import { cn } from '../../lib/cn'
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '../dropdown'
import type { SearchBarDropdownProps } from './types'

export const SearchBarDropdown = React.forwardRef<HTMLButtonElement, SearchBarDropdownProps>(
  ({ domains, selectedDomain, onDomainChange, disabled = false, className, ...props }, ref) => {
    const selectedDomainData = domains.find(domain => domain.value === selectedDomain)
    const displayLabel = selectedDomainData?.label || domains[0]?.label || 'Select'

    const handleDomainSelect = (domainValue: string) => {
      onDomainChange?.(domainValue)
    }

    return (
    <div className={cn(
      // Dropdown container styles - matches design spec
      'flex h-full items-center justify-center gap-0.5 bg-background-primary hover:bg-primary-200 duration-300',
      // State-based styles
      {
        'bg-background-secondary': disabled,
      },
      className
    )}>
        <Dropdown>
          <DropdownTrigger
            ref={ref}
            disabled={disabled}
            showChevron={false}
            variant="ghost"
            className={cn(
              // Trigger button styles - matches design spec typography
              'group h-full w-full min-w-0 flex-1 justify-center gap-1 px-2 py-2 rounded-r-lg border-transparent rounded-none',
              'text-xs font-medium text-text-primary tracking-wide',
              'border-0 bg-transparent',
              'focus:outline-none active:outline-none',
              {
                'text-text-muted cursor-not-allowed': disabled,
              }
            )}
            {...props}
          >
            <span className="truncate">{displayLabel}</span>

            {/* Dropdown chevron icon */}
            <ChevronDown
              size={12}
              className={cn(
                'flex-shrink-0 text-text-primary transition-transform duration-300',
                'group-data-[state=open]:rotate-180'
              )}
            />
          </DropdownTrigger>

          <DropdownContent
            align="end"
            sideOffset={4}
            className="min-w-[160px] p-1 z-50"
          >
            {/* Header - flush with edges */}
            <div className="-mx-1 -mt-1 mb-1 bg-gradient-to-b from-primary-50 to-primary-100 border-b border-primary-100 rounded-t-lg">
              <h3 className="px-2 py-2 text-xs font-medium text-text-primary tracking-widest">
                Search Using:
              </h3>
            </div>

            {domains.map((domain) => (
              <DropdownItem
                key={domain.value}
                disabled={domain.disabled}
                onSelect={() => handleDomainSelect(domain.value)}
                className={cn(
                  'cursor-pointer text-xs font-medium',
                  {
                    'bg-primary-300/20 text-primary-500': domain.value === selectedDomain,
                  }
                )}
                data-active={domain.value === selectedDomain ? 'true' : undefined}
              >
                {domain.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>
    )
  }
)

SearchBarDropdown.displayName = 'SearchBarDropdown'
