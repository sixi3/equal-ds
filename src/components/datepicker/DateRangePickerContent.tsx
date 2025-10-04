import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn, ChevronIcon } from '../../lib'
import { useHoverAnimation } from '../../lib/useHoverAnimation'
import { HoverIndicator } from '../ui/HoverIndicator'
import { formatDate, isSameDay, subtractDays } from '../../lib/dateUtils'
import { formatTime12, compareTimes, getNextAvailableTime, getCurrentTime, roundToLowestHalfHour } from '../../lib/timeUtils'
import { CalendarContent } from './CalendarContent'
import { TimePickerContent, TimeOption } from './TimePickerContent'

// Sub-components for better maintainability
interface TimePickerRowProps {
  selectedTime: { hours: number; minutes: number; period: 'AM' | 'PM' } | null
  isOpen: boolean
  onClick: () => void
  onTimeSelect: (time: { hours: number; minutes: number; period: 'AM' | 'PM' }) => void
  enableHoverAnimation: boolean
  hoverVariant: 'default' | 'subtle' | 'primary' | 'accent'
  position?: 'left' | 'right'
  isTimeDisabled?: (time: TimeOption) => boolean
}

interface DatePickerRowProps {
  selectedDate: Date | null
  isOpen: boolean
  onClick: () => void
  onDateSelect: (date: Date) => void
  enableHoverAnimation: boolean
  hoverVariant: 'default' | 'subtle' | 'primary' | 'accent'
  position?: 'left' | 'right'
  minDate?: Date
  maxDate?: Date
  initialMonth?: Date
}
// TimePickerRow Sub-component
const TimePickerRow: React.FC<TimePickerRowProps> = ({
  selectedTime,
  isOpen,
  onClick,
  onTimeSelect,
  enableHoverAnimation,
  hoverVariant,
  position = 'left',
  isTimeDisabled
}) => {
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }, [onClick])

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md border border-b-2 border-border-default bg-background-secondary text-text-primary px-2 py-1 hover:bg-background-tertiary hover:border-border-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={`Select time${selectedTime ? `: ${selectedTime.hours.toString().padStart(2, '0')}:${selectedTime.minutes.toString().padStart(2, '0')}` : ': no time selected'}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
      {/* Time Display */}
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-text-primary w-10 text-left">
          {selectedTime
            ? `${selectedTime.hours.toString().padStart(2, '0')}:${selectedTime.minutes.toString().padStart(2, '0')}`
            : '00:00'
          }
        </span>
        {/* Chevron Icon */}
        <ChevronIcon
          isOpen={isOpen}
          duration={200}
          className="text-text-primary"
        />
      </div>
    </button>

    {/* Time Picker */}
    {isOpen && (
      <div
        className={`absolute top-full ${position === 'left' ? 'left-0' : 'right-0'} mt-2 z-50 animate-fade-in-scale`}
      >
        <TimePickerContent
          selectedTime={selectedTime}
          onTimeSelect={onTimeSelect}
          enableHoverAnimation={enableHoverAnimation}
          hoverVariant={hoverVariant}
          format="24h"
          interval={30}
          maxHeight="200px"
          isTimeDisabled={isTimeDisabled}
          isOpen={true}
          side="bottom"
        />
      </div>
    )}
    </div>
  )
}

// DatePickerRow Sub-component
const DatePickerRow: React.FC<DatePickerRowProps> = ({
  selectedDate,
  isOpen,
  onClick,
  onDateSelect,
  enableHoverAnimation,
  hoverVariant,
  position = 'right',
  minDate,
  maxDate,
  initialMonth
}) => {
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }, [onClick])

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md border border-b-2 border-border-default bg-background-secondary text-text-primary px-2 py-1 hover:bg-background-tertiary hover:border-border-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={`Select date${selectedDate ? `: ${selectedDate.toLocaleDateString()}` : ': no date selected'}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
      {/* Calendar Icon */}
      <svg
        className="w-4 h-4 text-text-primary flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>

      {/* Date Display and Chevron Container */}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-sm font-medium text-text-primary tracking-wider w-14 text-left">
          {selectedDate
            ? formatDate(selectedDate, 'short').replace('/', '/')
            : '20/06/2025'
          }
        </span>
        {/* Chevron Icon */}
        <ChevronIcon
          isOpen={isOpen}
          duration={200}
          className="text-text-primary"
        />
      </div>
    </button>

    {/* Date Calendar */}
    {isOpen && (
      <div
        className={`absolute top-full ${position === 'left' ? 'left-0' : 'right-0'} mt-2 z-50 animate-fade-in-scale`}
      >
        <CalendarContent
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          initialMonth={initialMonth}
          minDate={minDate}
          maxDate={maxDate}
          enableHoverAnimation={enableHoverAnimation}
          hoverVariant={hoverVariant}
          className="w-80 min-w-80"
          isOpen={true}
          side="bottom"
        />
      </div>
    )}
    </div>
  )
}

// Custom trigger component that doesn't interfere with dropdown positioning

/**
 * Get smart default values for date range picker
 * - Start date: Current date
 * - Start time: Current time (rounded to nearest lowest half hour)
 * - End date: Current date (same day)
 * - End time: Next available time slot (minimum 30 minutes from start time)
 */
export function getSmartDefaults(): DateRangeValue {
  const today = new Date()
  const currentTime = getCurrentTime()
  const roundedTime = roundToLowestHalfHour(currentTime)
  const nextTime = getNextAvailableTime(30) // Next available slot, rounded to 30 minutes

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

/**
 * Get quick date range presets
 */
export function getQuickDatePresets(): Array<{ label: string; value: DateRangeValue }> {
  const today = new Date()
  const currentTime = getCurrentTime()
  const roundedCurrentTime = roundToLowestHalfHour(currentTime)

  // Helper to create date range
  const createRange = (startDate: Date, endDate: Date = today): DateRangeValue => {
    const isEndToday = endDate.toDateString() === today.toDateString()

    return {
      startDate,
      startTime: { hours: 0, minutes: 0, period: 'AM' }, // Start of day
      endDate,
      endTime: isEndToday
        ? { hours: roundedCurrentTime.hours, minutes: roundedCurrentTime.minutes, period: roundedCurrentTime.period || 'AM' }
        : { hours: 23, minutes: 59, period: 'PM' } // End of day for past dates
    }
  }

  return [
    {
      label: 'Last Week',
      value: createRange(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000))
    },
    {
      label: 'Last Month',
      value: createRange(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000))
    },
    {
      label: 'Last 3 Months',
      value: createRange(new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000))
    },
    {
      label: 'Last 6 Months',
      value: createRange(new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000))
    }
  ]
}

/**
 * Check if a date range matches any of the quick presets
 */
function findMatchingPreset(currentRange: DateRangeValue | null): string | null {
  if (!currentRange) return null

  const presets = getQuickDatePresets()

  for (const preset of presets) {
    const presetValue = preset.value

    // Check if dates match (allowing for small time differences)
    const datesMatch =
      currentRange.startDate &&
      currentRange.endDate &&
      presetValue.startDate &&
      presetValue.endDate &&
      Math.abs(currentRange.startDate.getTime() - presetValue.startDate.getTime()) < 24 * 60 * 60 * 1000 && // Within 1 day
      Math.abs(currentRange.endDate.getTime() - presetValue.endDate.getTime()) < 24 * 60 * 60 * 1000 // Within 1 day

    if (datesMatch) {
      return preset.label
    }
  }

  return null
}

export interface DateRangeValue {
  startDate: Date | null
  startTime: { hours: number; minutes: number; period: 'AM' | 'PM' } | null
  endDate: Date | null
  endTime: { hours: number; minutes: number; period: 'AM' | 'PM' } | null
}

export interface DateRangePickerContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Content> {
  /**
   * Currently selected date range
   */
  selectedRange?: DateRangeValue
  /**
   * Callback when the date range changes
   */
  onRangeChange?: (range: DateRangeValue) => void
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
   * Whether to use smart defaults when no range is selected
   * @default true
   */
  useSmartDefaults?: boolean
}

export const DateRangePickerContent = React.forwardRef<HTMLDivElement, DateRangePickerContentProps>(
  ({
    selectedRange,
    onRangeChange,
    enableHoverAnimation = true,
    hoverVariant = 'default',
    useSmartDefaults = true,
    className,
    ...props
  }, ref) => {
    // Hover animation setup
    const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
      itemSelector: '[data-daterange-item]',
      enabled: enableHoverAnimation
    })

    // Smart defaults and user modification tracking
    const [hasUserModified, setHasUserModified] = React.useState(false)
    const [effectiveRange, setEffectiveRange] = React.useState<DateRangeValue>(() => {
      if (selectedRange) {
        setHasUserModified(true)
        return selectedRange
      }
      if (useSmartDefaults) {
        return getSmartDefaults()
      }
      return {
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null
      }
    })

    // Update effective range when selectedRange prop changes
    React.useEffect(() => {
      if (selectedRange) {
        setHasUserModified(true)
        setEffectiveRange(selectedRange)
      } else if (useSmartDefaults && !hasUserModified) {
        setEffectiveRange(getSmartDefaults())
      }
    }, [selectedRange, useSmartDefaults, hasUserModified])

    // Consolidated picker state management
    const [pickerState, setPickerState] = React.useState({
      isStartCalendarOpen: false,
      isEndCalendarOpen: false,
      isStartTimePickerOpen: false,
      isEndTimePickerOpen: false
    })

    // Error state management
    const [errors, setErrors] = React.useState<{
      startDate?: string
      endDate?: string
      startTime?: string
      endTime?: string
      general?: string
    }>({})

    // Helper functions for state management
    const closeAllPickers = React.useCallback(() => {
      setPickerState({
        isStartCalendarOpen: false,
        isEndCalendarOpen: false,
        isStartTimePickerOpen: false,
        isEndTimePickerOpen: false
      })
    }, [])

    const openStartCalendar = React.useCallback(() => {
      setPickerState({
        isStartCalendarOpen: true,
        isEndCalendarOpen: false,
        isStartTimePickerOpen: false,
        isEndTimePickerOpen: false
      })
    }, [])

    const openEndCalendar = React.useCallback(() => {
      setPickerState({
        isStartCalendarOpen: false,
        isEndCalendarOpen: true,
        isStartTimePickerOpen: false,
        isEndTimePickerOpen: false
      })
    }, [])

    const openStartTimePicker = React.useCallback(() => {
      setPickerState({
        isStartCalendarOpen: false,
        isEndCalendarOpen: false,
        isStartTimePickerOpen: true,
        isEndTimePickerOpen: false
      })
    }, [])

    const openEndTimePicker = React.useCallback(() => {
      setPickerState({
        isStartCalendarOpen: false,
        isEndCalendarOpen: false,
        isStartTimePickerOpen: false,
        isEndTimePickerOpen: true
      })
    }, [])

    const closeStartCalendar = React.useCallback(() => {
      setPickerState(prev => ({ ...prev, isStartCalendarOpen: false }))
    }, [])

    const closeEndCalendar = React.useCallback(() => {
      setPickerState(prev => ({ ...prev, isEndCalendarOpen: false }))
    }, [])

    const closeStartTimePicker = React.useCallback(() => {
      setPickerState(prev => ({ ...prev, isStartTimePickerOpen: false }))
    }, [])

    const closeEndTimePicker = React.useCallback(() => {
      setPickerState(prev => ({ ...prev, isEndTimePickerOpen: false }))
    }, [])

    // Validation functions
    const validateDateRange = React.useCallback((range: DateRangeValue) => {
      const newErrors: typeof errors = {}

      // Check if end date is before start date
      if (range.startDate && range.endDate && range.endDate < range.startDate) {
        newErrors.endDate = 'End date cannot be before start date'
      }

      // Check if end time is before start time on same day
      if (range.startDate && range.endDate && range.startTime && range.endTime &&
          isSameDay(range.startDate, range.endDate)) {
        const timeComparison = compareTimes(range.startTime, range.endTime)
        if (timeComparison >= 0) {
          newErrors.endTime = 'End time must be after start time on the same day'
        }
      }

      // Check for missing required dates
      if (!range.startDate) {
        newErrors.startDate = 'Start date is required'
      }

      if (!range.endDate) {
        newErrors.endDate = 'End date is required'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }, [])

    const clearErrors = React.useCallback(() => {
      setErrors({})
    }, [])

    // Handle date/time selection
    const handleStartDateSelect = React.useCallback((date: Date) => {
      // Mark that user has modified the range
      setHasUserModified(true)

      // If start date is after end date, adjust end date and time
      let updatedRange: DateRangeValue = {
        ...effectiveRange,
        startDate: date
      } as DateRangeValue

      if (effectiveRange?.endDate && date > effectiveRange.endDate) {
        // Set end date to same as start date
        updatedRange.endDate = date

        // Find next available time slot (30 minutes after start time, or 00:30 if no start time)
        const baseTime = effectiveRange.startTime || { hours: 0, minutes: 0, period: 'AM' as const }
        let endTime = { ...baseTime }

        // Add 30 minutes to start time for end time
        endTime.minutes += 30
        if (endTime.minutes >= 60) {
          endTime.minutes = 0
          endTime.hours += 1
          if (endTime.hours === 12) {
            endTime.period = endTime.period === 'AM' ? 'PM' : 'AM'
          } else if (endTime.hours > 12) {
            endTime.hours = 1
            endTime.period = 'PM'
          } else if (endTime.hours === 0) {
            endTime.hours = 12
            endTime.period = 'AM'
          }
        }

        updatedRange.endTime = endTime
      }

      // Validate the updated range
      validateDateRange(updatedRange)

      onRangeChange?.(updatedRange)
      closeStartCalendar() // Close calendar after selection
    }, [selectedRange, onRangeChange, closeStartCalendar, validateDateRange])

    const handleEndDateSelect = React.useCallback((date: Date) => {
      // Mark that user has modified the range
      setHasUserModified(true)

      const updatedRange = {
        ...effectiveRange,
        endDate: date
      } as DateRangeValue

      // Update effective range
      setEffectiveRange(updatedRange)

      // Validate the updated range
      validateDateRange(updatedRange)

      onRangeChange?.(updatedRange)
      closeEndCalendar() // Close calendar after selection
    }, [effectiveRange, onRangeChange, closeEndCalendar, validateDateRange])

    // Handle calendar opening/closing
    const handleStartDateClick = React.useCallback(() => {
      if (pickerState.isStartCalendarOpen) {
        closeStartCalendar()
      } else {
        openStartCalendar()
      }
    }, [pickerState.isStartCalendarOpen, closeStartCalendar, openStartCalendar])

    const handleEndDateClick = React.useCallback(() => {
      if (pickerState.isEndCalendarOpen) {
        closeEndCalendar()
      } else {
        openEndCalendar()
      }
    }, [pickerState.isEndCalendarOpen, closeEndCalendar, openEndCalendar])

    // Handle time picker opening/closing
    const handleStartTimeClick = React.useCallback(() => {
      if (pickerState.isStartTimePickerOpen) {
        closeStartTimePicker()
      } else {
        openStartTimePicker()
      }
    }, [pickerState.isStartTimePickerOpen, closeStartTimePicker, openStartTimePicker])

    const handleEndTimeClick = React.useCallback(() => {
      if (pickerState.isEndTimePickerOpen) {
        closeEndTimePicker()
      } else {
        openEndTimePicker()
      }
    }, [pickerState.isEndTimePickerOpen, closeEndTimePicker, openEndTimePicker])

    const handleStartTimeSelect = React.useCallback((time: { hours: number; minutes: number; period: 'AM' | 'PM' }) => {
      // Mark that user has modified the range
      setHasUserModified(true)

      const updatedRange = {
        ...effectiveRange,
        startTime: time
      } as DateRangeValue

      // Update effective range
      setEffectiveRange(updatedRange)

      // Validate the updated range
      validateDateRange(updatedRange)

      onRangeChange?.(updatedRange)
      closeStartTimePicker() // Close time picker after selection
    }, [effectiveRange, onRangeChange, closeStartTimePicker, validateDateRange])

    const handleEndTimeSelect = React.useCallback((time: { hours: number; minutes: number; period: 'AM' | 'PM' }) => {
      // Mark that user has modified the range
      setHasUserModified(true)

      const updatedRange = {
        ...effectiveRange,
        endTime: time
      } as DateRangeValue

      // Update effective range
      setEffectiveRange(updatedRange)

      // Validate the updated range
      validateDateRange(updatedRange)

      onRangeChange?.(updatedRange)
      closeEndTimePicker() // Close time picker after selection
    }, [effectiveRange, onRangeChange, closeEndTimePicker, validateDateRange])

    // Validate on mount and when effectiveRange changes
    React.useEffect(() => {
      if (effectiveRange) {
        validateDateRange(effectiveRange)
      }
    }, [effectiveRange, validateDateRange])

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
      <DropdownMenu.Content
        ref={combinedRef}
        sideOffset={6}
        collisionPadding={8}
        align="end"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="dialog"
        aria-label="Date range picker"
        aria-describedby="date-range-description"
        className={cn(
          'dropdown-content z-50 max-w-[var(--radix-popper-available-width)] rounded-lg border border-border-default bg-background-secondary p-4 shadow-lg will-change-[opacity,transform]',
          'data-[side=top]:origin-bottom data-[side=bottom]:origin-top',
          'data-[state=open]:animate-bezier-in data-[state=closed]:animate-bezier-out',
          className,
        )}
        {...props}
      >
        {/* Title */}
        <div className="mb-4">
          <h3 id="date-range-description" className="text-xs font-medium text-text-primary tracking-widest uppercase">
            CHOOSE DURATION
          </h3>
          <p className="sr-only">
            Select start and end dates with optional time selections to define a date range
          </p>
        </div>

        {/* Horizontal Layout: From | Separator | To */}
        <div className="flex items-center gap-3">
          {/* From Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {/* Start Time Picker */}
              <TimePickerRow
                selectedTime={effectiveRange?.startTime || null}
                isOpen={pickerState.isStartTimePickerOpen}
                onClick={handleStartTimeClick}
                onTimeSelect={handleStartTimeSelect}
                enableHoverAnimation={enableHoverAnimation}
                hoverVariant={hoverVariant}
                position="left"
              />

              {/* Start Date Picker */}
              <DatePickerRow
                selectedDate={effectiveRange?.startDate || null}
                isOpen={pickerState.isStartCalendarOpen}
                onClick={handleStartDateClick}
                onDateSelect={handleStartDateSelect}
                enableHoverAnimation={enableHoverAnimation}
                hoverVariant={hoverVariant}
                position="right"
                initialMonth={effectiveRange?.startDate || undefined}
              />
            </div>

            {/* Error messages for start section */}
            {(errors.startDate || errors.startTime) && (
              <div className="text-red-500 text-xs ml-2">
                {errors.startDate && <div>{errors.startDate}</div>}
                {errors.startTime && <div>{errors.startTime}</div>}
              </div>
            )}
          </div>

          {/* Horizontal Separator with "To" text */}
          <div className="flex items-center gap-0.5">
            <div className="flex-1 h-0.5 w-2 bg-border-default"></div>
            <span className="text-xs font-medium text-text-secondary tracking-widest uppercase px-1">
              TO
            </span>
            <div className="flex-1 h-0.5 w-2 bg-border-default"></div>
          </div>

          {/* To Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {/* End Time Picker */}
              <TimePickerRow
                selectedTime={effectiveRange?.endTime || null}
                isOpen={pickerState.isEndTimePickerOpen}
                onClick={handleEndTimeClick}
                onTimeSelect={handleEndTimeSelect}
                enableHoverAnimation={enableHoverAnimation}
                hoverVariant={hoverVariant}
                position="left"
                isTimeDisabled={(time) => {
                  // Disable times that are before start time when dates are the same
                  if (effectiveRange?.startDate && effectiveRange?.endDate &&
                      isSameDay(effectiveRange.startDate, effectiveRange.endDate) &&
                      effectiveRange.startTime) {
                    const timeComparison = compareTimes(effectiveRange.startTime, {
                      hours: time.hours,
                      minutes: time.minutes,
                      period: time.period
                    })
                    return timeComparison >= 0 // Disable if time is before or equal to start time
                  }
                  // If end date is before start date, disable all times (shouldn't happen with new logic)
                  if (effectiveRange?.startDate && effectiveRange?.endDate &&
                      effectiveRange.endDate < effectiveRange.startDate) {
                    return true
                  }
                  return false
                }}
              />

              {/* End Date Picker */}
              <DatePickerRow
                selectedDate={effectiveRange?.endDate || null}
                isOpen={pickerState.isEndCalendarOpen}
                onClick={handleEndDateClick}
                onDateSelect={handleEndDateSelect}
                enableHoverAnimation={enableHoverAnimation}
                hoverVariant={hoverVariant}
                position="right"
                initialMonth={effectiveRange?.endDate || undefined}
                minDate={effectiveRange?.startDate ? subtractDays(effectiveRange.startDate, 1) : undefined} // Can't select end date before start date, but allow same day
              />
            </div>

            {/* Error messages for end section */}
            {(errors.endDate || errors.endTime) && (
              <div className="text-red-500 text-xs ml-2">
                {errors.endDate && <div>{errors.endDate}</div>}
                {errors.endTime && <div>{errors.endTime}</div>}
              </div>
            )}
          </div>
        </div>

        {/* Quick Date Range Presets */}
        <div className="mt-4">
          <h3 id="date-range-description" className="text-xs font-medium text-text-secondary tracking-wide mb-1">Presets:</h3>
          <div className="flex flex-wrap gap-2">
            {getQuickDatePresets().map((preset) => {
              const isSelected = findMatchingPreset(effectiveRange) === preset.label
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    // Mark that user has modified the range
                    setHasUserModified(true)

                    // Update effective range
                    setEffectiveRange(preset.value)

                    // Clear any existing errors
                    clearErrors()

                    // Close all pickers
                    closeAllPickers()

                    // Notify parent component
                    onRangeChange?.(preset.value)
                  }}
                  className={cn(
                    " px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 focus:outline-none tracking-wide",
                    isSelected
                      ? "text-text-primary bg-background-primary border border-border-hover"
                      : "text-text-primary bg-background-secondary hover:bg-background-primary hover:text-text-primary border border-border-default"
                  )}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* General error messages */}
        {errors.general && (
          <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-md">
            <div className="text-red-600 text-sm">{errors.general}</div>
          </div>
        )}

        {/* Hover Indicator */}
        {enableHoverAnimation && (
          <HoverIndicator
            indicator={indicator}
            variant={hoverVariant}
            zIndex={0}
          />
        )}
      </DropdownMenu.Content>
    )
  }
)

DateRangePickerContent.displayName = 'DateRangePickerContent'
