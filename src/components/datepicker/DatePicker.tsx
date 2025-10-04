import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'
import { DateRange, formatDateTimeRange, DateTimeRange } from '../../lib/dateUtils'
import { getCurrentTime, getNextAvailableTime, roundToLowestHalfHour } from '../../lib/timeUtils'
import { DatePickerTrigger } from './DatePickerTrigger'
import { DatePickerContent } from './DatePickerContent'
import { DateRangePickerContent, DateRangeValue } from './DateRangePickerContent'

/**
 * Generate smart default values for date range picker
 */
function getSmartDefaults(): DateRangeValue {
  const today = new Date()
  const currentTime = getCurrentTime()
  const roundedTime = roundToLowestHalfHour(currentTime)
  const nextTime = getNextAvailableTime(30)

  // Ensure period is defined (both functions always return a period)
  const startTime: { hours: number; minutes: number; period: 'AM' | 'PM' } = {
    hours: roundedTime.hours,
    minutes: roundedTime.minutes,
    period: roundedTime.period || 'AM'
  }

  const endTime: { hours: number; minutes: number; period: 'AM' | 'PM' } = {
    hours: nextTime.hours,
    minutes: nextTime.minutes,
    period: nextTime.period || 'AM'
  }

  return {
    startDate: today,
    startTime,
    endDate: today,
    endTime
  }
}

export interface DatePickerProps {
  /**
   * Currently selected date (for single date mode)
   */
  selectedDate?: Date | null
  /**
   * Selected date range (for range selection)
   */
  selectedRange?: DateRangeValue
  /**
   * Whether to use date range mode
   * @default false
   */
  rangeMode?: boolean
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
   * Placeholder text when no date is selected
   * @default 'Select date'
   */
  placeholder?: string
  /**
   * Date format for display
   * @default 'medium'
   */
  dateFormat?: 'short' | 'medium' | 'long'
  /**
   * Whether the date picker is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether to show the calendar icon
   * @default true
   */
  showCalendarIcon?: boolean
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
   * Trigger variant styling
   * @default 'default'
   */
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
  /**
   * Callback when a date is selected (single mode)
   */
  onDateSelect?: (date: Date) => void
  /**
   * Callback when the selected date changes (single mode)
   */
  onChange?: (date: Date | null) => void
  /**
   * Callback when the selected date range changes (range mode)
   */
  onRangeChange?: (range: DateRangeValue) => void
  /**
   * Callback when month changes
   */
  onMonthChange?: (month: Date) => void
  /**
   * Custom trigger content
   */
  triggerContent?: React.ReactNode
  /**
   * Custom className for the trigger
   */
  triggerClassName?: string
  /**
   * Custom className for the content
   */
  contentClassName?: string
  /**
   * Whether the dropdown should close after selection
   * @default true
   */
  closeOnSelect?: boolean
  /**
   * Custom styles for the trigger button
   */
  triggerStyle?: React.CSSProperties
  /**
   * Mouse enter handler for trigger hover effects
   */
  onTriggerMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Mouse leave handler for trigger hover effects
   */
  onTriggerMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Mouse down handler for trigger click effects
   */
  onTriggerMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Mouse up handler for trigger click effects
   */
  onTriggerMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface DatePickerRef {
  trigger: HTMLButtonElement | null
  content: HTMLDivElement | null
}

export const DatePicker = React.forwardRef<DatePickerRef, DatePickerProps>(
  ({
    selectedDate,
    selectedRange,
    rangeMode = false,
    initialMonth,
    minDate,
    maxDate,
    placeholder = 'Select date',
    dateFormat = 'medium',
    disabled = false,
    showCalendarIcon = true,
    showNavigation = true,
    enableHoverAnimation = true,
    hoverVariant = 'default',
    variant = 'default',
    onDateSelect,
    onChange,
    onRangeChange,
    onMonthChange,
    triggerContent,
    triggerClassName,
    contentClassName,
    closeOnSelect = true,
    triggerStyle,
    onTriggerMouseEnter,
    onTriggerMouseLeave,
    onTriggerMouseDown,
    onTriggerMouseUp,
    ...props
  }, ref) => {
    // Internal state for selected date (single mode)
    const [internalSelectedDate, setInternalSelectedDate] = React.useState<Date | null>(
      selectedDate || null
    )

    // Internal state for selected range (range mode)
    const [internalSelectedRange, setInternalSelectedRange] = React.useState<DateRangeValue>(() => {
      if (selectedRange) {
        return selectedRange
      }
      if (rangeMode) {
        return getSmartDefaults()
      }
      return {
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null
      }
    })

    // Dropdown open state
    const [isOpen, setIsOpen] = React.useState(false)

    // Refs for external access
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)

    // Expose refs to parent
    React.useImperativeHandle(ref, () => ({
      trigger: triggerRef.current,
      content: contentRef.current
    }), [])

    // Sync with external selectedDate prop (single mode)
    React.useEffect(() => {
      if (!rangeMode) {
        setInternalSelectedDate(selectedDate || null)
      }
    }, [selectedDate, rangeMode])

    // Sync with external selectedRange prop (range mode)
    React.useEffect(() => {
      if (rangeMode) {
        if (selectedRange) {
          setInternalSelectedRange(selectedRange)
        } else {
          // If selectedRange becomes undefined, use smart defaults
          setInternalSelectedRange(getSmartDefaults())
        }
      }
    }, [selectedRange, rangeMode])

    // Handle date selection (single mode)
    const handleDateSelect = (date: Date) => {
      if (!rangeMode) {
        setInternalSelectedDate(date)
        onDateSelect?.(date)
        onChange?.(date)
      }
    }

    // Handle range selection (range mode)
    const handleRangeChange = (range: DateRangeValue) => {
      setInternalSelectedRange(range)
      onRangeChange?.(range)
    }


    return (
      <DropdownMenu.Root onOpenChange={setIsOpen}>
        <DatePickerTrigger
          ref={triggerRef}
          selectedDate={rangeMode ? null : (selectedDate !== undefined ? selectedDate : internalSelectedDate)}
          selectedRange={rangeMode ? internalSelectedRange : undefined}
          placeholder={placeholder}
          dateFormat={dateFormat}
          showCalendarIcon={showCalendarIcon}
          isOpen={isOpen}
          variant={variant}
          disabled={disabled}
          className={triggerClassName}
          style={triggerStyle}
          onMouseEnter={onTriggerMouseEnter}
          onMouseLeave={onTriggerMouseLeave}
          onMouseDown={onTriggerMouseDown}
          onMouseUp={onTriggerMouseUp}
          {...props}
        >
          {triggerContent}
        </DatePickerTrigger>

        {rangeMode ? (
          <DateRangePickerContent
            ref={contentRef}
            selectedRange={internalSelectedRange}
            onRangeChange={handleRangeChange}
            enableHoverAnimation={enableHoverAnimation}
            hoverVariant={hoverVariant}
            className={contentClassName}
          />
        ) : (
          <DatePickerContent
            ref={contentRef}
            selectedDate={selectedDate !== undefined ? selectedDate : internalSelectedDate}
            selectedRange={undefined}
            initialMonth={initialMonth}
            minDate={minDate}
            maxDate={maxDate}
            onDateSelect={handleDateSelect}
            onMonthChange={onMonthChange}
            showNavigation={showNavigation}
            enableHoverAnimation={enableHoverAnimation}
            hoverVariant={hoverVariant}
            className={contentClassName}
          />
        )}
      </DropdownMenu.Root>
    )
  }
)

DatePicker.displayName = 'DatePicker'
