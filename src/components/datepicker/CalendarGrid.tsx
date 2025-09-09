import * as React from 'react'
import { cn } from '../../lib/cn'
import { CalendarMonth, getWeekDays } from '../../lib/dateUtils'
import { DatePickerItem } from './DatePickerItem'

export interface CalendarGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Calendar month data
   */
  month: CalendarMonth
  /**
   * Currently selected date
   */
  selectedDate?: Date
  /**
   * Selected date range
   */
  selectedRange?: { start: Date | null; end: Date | null }
  /**
   * Minimum selectable date
   */
  minDate?: Date
  /**
   * Maximum selectable date
   */
  maxDate?: Date
  /**
   * Callback when a date is selected
   */
  onDateSelect?: (date: Date) => void
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
   * Custom day renderer
   */
  renderDay?: (day: CalendarMonth['weeks'][0][0]) => React.ReactNode
}

export const CalendarGrid = React.forwardRef<HTMLDivElement, CalendarGridProps>(
  ({
    month,
    selectedDate,
    selectedRange,
    minDate,
    maxDate,
    onDateSelect,
    enableHoverAnimation = true,
    hoverVariant = 'default',
    renderDay,
    className,
    ...props
  }, ref) => {
    const weekDays = getWeekDays()

    const handleDateClick = (date: Date) => {
      onDateSelect?.(date)
    }

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="flex h-8 w-8 items-center justify-center text-xs font-medium text-text-secondary"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {month.weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => {
              if (renderDay) {
                return renderDay(day)
              }

              return (
                <DatePickerItem
                  key={`${weekIndex}-${dayIndex}`}
                  day={day}
                  enableHoverAnimation={enableHoverAnimation}
                  hoverVariant={hoverVariant}
                  onClick={() => handleDateClick(day.date)}
                />
              )
            })
          )}
        </div>
      </div>
    )
  }
)

CalendarGrid.displayName = 'CalendarGrid'
