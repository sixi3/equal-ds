import * as React from 'react'
import { cn } from '../../lib/cn'
import { useHoverAnimation } from '../../lib/useHoverAnimation'
import { HoverIndicator } from '../ui/HoverIndicator'
import {
  generateCalendarMonth,
  addMonths,
  getMonthNames,
  getShortMonthNames,
  DateRange
} from '../../lib/dateUtils'
import { CalendarGrid } from './CalendarGrid'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dropdown } from '../dropdown/Dropdown'
import { DropdownTrigger } from '../dropdown/DropdownTrigger'
import { DropdownContent } from '../dropdown/DropdownContent'
import { DropdownItem } from '../dropdown/DropdownItem'

export interface CalendarContentProps {
  /**
   * Currently selected date
   */
  selectedDate?: Date | null
  /**
   * Selected date range
   */
  selectedRange?: DateRange
  /**
   * Initial month to display
   */
  initialMonth?: Date
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
   * Callback when month changes
   */
  onMonthChange?: (month: Date) => void
  /**
   * Whether to show month/year navigation
   * @default true
   */
  showNavigation?: boolean
  /**
   * Whether to enable hover animation for items
   * @default true
   */
  enableHoverAnimation?: boolean
  /**
   * Hover animation variant
   * @default 'default'
   */
  hoverVariant?: 'default' | 'subtle' | 'primary' | 'accent'
  /**
   * Custom month names
   */
  monthNames?: string[]
  /**
   * Whether to use short month names
   * @default false
   */
  useShortMonthNames?: boolean
  /**
   * Custom className
   */
  className?: string
  /**
   * Whether the calendar is open (for animation state)
   * @default true
   */
  isOpen?: boolean
  /**
   * Animation side for transform origin
   * @default 'bottom'
   */
  side?: 'top' | 'bottom'
}

export const CalendarContent = React.forwardRef<HTMLDivElement, CalendarContentProps>(
  ({
    selectedDate,
    selectedRange,
    initialMonth,
    minDate,
    maxDate,
    onDateSelect,
    onMonthChange,
    showNavigation = true,
    enableHoverAnimation = true,
    hoverVariant = 'default',
    monthNames,
    useShortMonthNames = false,
    className,
    isOpen = true,
    side = 'bottom',
  }, ref) => {
    // Current month state
    const [currentMonth, setCurrentMonth] = React.useState(() => {
      return initialMonth || selectedDate || new Date()
    })

    // Update current month when initialMonth changes
    React.useEffect(() => {
      if (initialMonth) {
        setCurrentMonth(initialMonth)
      }
    }, [initialMonth])

    // Generate calendar data
    const calendarMonth = React.useMemo(() => {
      return generateCalendarMonth(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        selectedDate || undefined,
        selectedRange,
        minDate,
        maxDate
      )
    }, [currentMonth, selectedDate, selectedRange, minDate, maxDate])

    // Hover animation setup
    const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
      itemSelector: '[data-datepicker-item]',
      enabled: enableHoverAnimation
    })

    // Month navigation
    const goToPreviousMonth = () => {
      const newMonth = addMonths(currentMonth, -1)
      setCurrentMonth(newMonth)
      onMonthChange?.(newMonth)
    }

    const goToNextMonth = () => {
      const newMonth = addMonths(currentMonth, 1)
      setCurrentMonth(newMonth)
      onMonthChange?.(newMonth)
    }

    // Get month names
    const displayMonthNames = monthNames || (useShortMonthNames ? getShortMonthNames() : getMonthNames())

    // Year dropdown state and logic
    const [isYearDropdownOpen, setIsYearDropdownOpen] = React.useState(false)

    // Generate year options (current year ± 20 years)
    const currentYear = new Date().getFullYear()
    const yearOptions = React.useMemo(() => {
      const years = []
      for (let year = currentYear - 20; year <= currentYear + 5; year++) {
        years.push(year)
      }
      return years
    }, [currentYear])

    // Handle year selection
    const handleYearSelect = (year: number) => {
      const newMonth = new Date(currentMonth)
      newMonth.setFullYear(year)
      setCurrentMonth(newMonth)
      onMonthChange?.(newMonth)
      setIsYearDropdownOpen(false)
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
      <div
        ref={combinedRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'w-[var(--radix-popper-anchor-width)] max-w-[var(--radix-popper-available-width)] rounded-lg border border-border-default bg-background-secondary p-4 shadow-lg',
          className,
        )}
      >
        {/* Month/Year Navigation */}
        {showNavigation && (
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-background-tertiary transition-colors duration-200 "
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-text-primary" />
            </button>

            <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <span>{displayMonthNames[currentMonth.getMonth()]}</span>
              <Dropdown open={isYearDropdownOpen} onOpenChange={setIsYearDropdownOpen}>
                <DropdownTrigger className="gap-1 justify-center px-1 py-1 text-sm shadow-none order border-border-hover">
                  <span className="font-medium">
                    {currentMonth.getFullYear()}
                  </span>
                </DropdownTrigger>
                <DropdownContent className="w-[100px] max-h-[200px] overflow-y-auto">
                  {yearOptions.map((year) => (
                    <DropdownItem
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      className={cn(
                        'justify-center cursor-pointer text-sm',
                        year === currentMonth.getFullYear() && 'bg-primary-100 text-primary-600 font-semibold'
                      )}
                    >
                      {year}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>

            <button
              type="button"
              onClick={goToNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-background-tertiary transition-colors duration-200 "
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-text-primary" />
            </button>
          </div>
        )}

        {/* Calendar Grid */}
        <CalendarGrid
          month={calendarMonth}
          selectedDate={selectedDate || undefined}
          selectedRange={selectedRange}
          minDate={minDate}
          maxDate={maxDate}
          onDateSelect={onDateSelect}
          enableHoverAnimation={enableHoverAnimation}
          hoverVariant={hoverVariant}
          renderDay={(day) => (
            <div
              key={`${day.date.getTime()}`}
              {...(!day.isSelected && !day.isDisabled ? { 'data-datepicker-item': true } : {})}
              className={cn(
                'relative flex h-8 w-8 select-none items-center justify-center rounded-lg text-sm font-medium outline-none cursor-pointer',
                'hover:bg-background-tertiary transition-colors duration-200',
                // Current month vs other months
                !day.isCurrentMonth && 'text-text-tertiary',
                day.isCurrentMonth && 'text-text-primary',
                // Today styling
                day.isToday && 'font-semibold bg-primary-100 text-primary-600',
                // Selected styling
                day.isSelected && 'bg-background-primary border-2 border-border-hover text-text-primary hover:border-border-focus',
                // Disabled styling
                day.isDisabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
                // Range styling
                day.isInRange && !day.isSelected && 'bg-primary-100 text-primary-600',
                day.isRangeStart && 'bg-primary-500 text-primary-50 rounded-l-lg',
                day.isRangeEnd && 'bg-primary-500 text-primary-50 rounded-r-lg'
              )}
              onClick={() => !day.isDisabled && onDateSelect?.(day.date)}
            >
              {day.day}
            </div>
          )}
        />

        {/* Hover Indicator */}
        {enableHoverAnimation && (
          <HoverIndicator
            indicator={indicator}
            variant={hoverVariant}
            zIndex={0}
          />
        )}
      </div>
    )
  }
)

CalendarContent.displayName = 'CalendarContent'
