import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'
import { CalendarDay } from '../../lib/dateUtils'

export interface DatePickerItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Item> {
  /**
   * Calendar day data
   */
  day: CalendarDay
  /**
   * Whether to show hover animation
   * @default true
   */
  enableHoverAnimation?: boolean
  /**
   * Hover animation variant
   * @default 'default'
   */
  hoverVariant?: 'default' | 'subtle' | 'primary' | 'accent'
  /**
   * Custom styling for selected state
   */
  selectedClassName?: string
  /**
   * Custom styling for today state
   */
  todayClassName?: string
  /**
   * Custom styling for disabled state
   */
  disabledClassName?: string
  /**
   * Custom styling for range states
   */
  rangeClassName?: string
  /**
   * Custom styling for range start
   */
  rangeStartClassName?: string
  /**
   * Custom styling for range end
   */
  rangeEndClassName?: string
}

export const DatePickerItem = React.forwardRef<HTMLDivElement, DatePickerItemProps>(
  ({
    day,
    className,
    enableHoverAnimation = true,
    hoverVariant = 'default',
    selectedClassName,
    todayClassName,
    disabledClassName,
    rangeClassName,
    rangeStartClassName,
    rangeEndClassName,
    onClick,
    ...props
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (day.isDisabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    return (
      <DropdownMenu.Item
        ref={ref}
        asChild
        disabled={day.isDisabled}
        className={cn(
          'relative flex h-8 w-8 select-none items-center justify-center rounded-lg text-sm font-medium outline-none',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          // Base styles
          'hover:bg-background-tertiary transition-colors duration-200',
          // Current month vs other months
          !day.isCurrentMonth && 'text-text-tertiary',
          day.isCurrentMonth && 'text-text-primary',
          // Today styling
          day.isToday && cn(
            'font-semibold',
            todayClassName || 'bg-primary-100 text-primary-600'
          ),
          // Selected styling
          day.isSelected && cn(
            'bg-background-primary border border-border-hover text-text-primary hover:bg-primary-600',
            selectedClassName
          ),
          // Disabled styling
          day.isDisabled && cn(
            'cursor-not-allowed opacity-50 hover:bg-transparent',
            disabledClassName
          ),
          // Range styling
          day.isInRange && !day.isSelected && cn(
            'bg-primary-100 text-primary-600',
            rangeClassName
          ),
          day.isRangeStart && cn(
            'bg-primary-500 text-primary-50 rounded-l-lg',
            rangeStartClassName
          ),
          day.isRangeEnd && cn(
            'bg-primary-500 text-primary-50 rounded-r-lg',
            rangeEndClassName
          ),
          // Hover animation
          enableHoverAnimation && !day.isDisabled && 'data-[highlighted]:bg-primary-500 data-[highlighted]:text-primary-50',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="flex h-full w-full items-center justify-center">
          {day.day}
        </div>
      </DropdownMenu.Item>
    )
  }
)

DatePickerItem.displayName = 'DatePickerItem'
