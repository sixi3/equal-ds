import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn, ChevronIcon } from '../../lib'
import { Calendar } from 'lucide-react'
import { formatDate, formatDateRange, formatDateTimeRange24, DateTimeRange } from '../../lib/dateUtils'
import { DateRangeValue } from './DateRangePickerContent'

export interface DatePickerTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Trigger> {
  /**
   * Currently selected date
   */
  selectedDate?: Date | null
  /**
   * Selected date range
   */
  selectedRange?: DateRangeValue
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
   * Whether to show the calendar icon
   * @default true
   */
  showCalendarIcon?: boolean
  /**
   * Whether to show the rotating chevron arrow
   * @default true
   */
  showChevron?: boolean
  /**
   * Whether the dropdown is currently open
   */
  isOpen?: boolean
  /**
   * Variant styling
   * @default 'default'
   */
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
  /**
   * Custom chevron icons
   */
  chevronIcons?: {
    open: React.ReactNode
    closed: React.ReactNode
  }
  /**
   * Custom calendar icon
   */
  calendarIcon?: React.ReactNode
  /**
   * Custom styles for advanced styling (will override variant styles)
   */
  style?: React.CSSProperties
  /**
   * Mouse enter handler for hover effects
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Mouse leave handler for hover effects
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Mouse down handler for click effects
   */
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Mouse up handler for click effects
   */
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const DatePickerTrigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({
    selectedDate,
    selectedRange,
    placeholder = 'Select date',
    dateFormat = 'medium',
    showCalendarIcon = true,
    showChevron = true,
    isOpen = false,
    variant = 'default',
    chevronIcons,
    calendarIcon,
    className,
    children,
    ...props
  }, ref) => {
    // Determine display text
    let displayText = placeholder

    if (selectedRange) {
      if (selectedRange.startDate || selectedRange.endDate) {
        const dateTimeRange: DateTimeRange = {
          startDate: selectedRange.startDate,
          startTime: selectedRange.startTime,
          endDate: selectedRange.endDate,
          endTime: selectedRange.endTime
        }
        displayText = formatDateTimeRange24(dateTimeRange, dateFormat)
      }
    } else if (selectedDate) {
      displayText = formatDate(selectedDate, dateFormat)
    }

    const baseClasses = 'inline-flex items-center gap-2 rounded-md border text-sm font-medium shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
      default: 'border-border-default bg-background-secondary text-text-primary hover:bg-primary-300/20 hover:border-border-hover hover:shadow-md active:bg-primary-300/30',
      outline: 'border-border-default bg-transparent text-text-primary hover:bg-primary-300/10 hover:border-border-hover hover:shadow-sm active:bg-primary-300/20',
      ghost: 'border-transparent bg-transparent text-text-primary hover:bg-primary-300/10 hover:border-primary-300/20 hover:shadow-sm active:bg-primary-300/20',
      primary: 'border-primary-500 bg-primary-500 text-text-inverse hover:bg-primary-600 hover:shadow-md active:bg-primary-700',
      destructive: 'border-error-100 bg-error-100 text-text-inverse hover:bg-error-200 hover:shadow-md active:bg-error-300'
    }

    // Default icons
    const defaultCalendarIcon = (
      <Calendar className="h-4 w-4 opacity-70 flex-shrink-0" />
    )

    // Default chevron icon with smooth rotation animation
    const defaultChevronIcon = <ChevronIcon isOpen={isOpen} />

    const currentCalendarIcon = calendarIcon || defaultCalendarIcon

    return (
      <DropdownMenu.Trigger asChild>
        <button
          ref={ref}
          className={cn(
            baseClasses,
            variantClasses[variant],
            'px-3 py-2 min-w-[120px] justify-between',
            className,
          )}
          {...props}
        >
          {/* Calendar icon */}
          {showCalendarIcon && (
            <span className="flex-shrink-0">
              {currentCalendarIcon}
            </span>
          )}

          {/* Display text */}
          <span className="flex-1 text-left truncate">
            {children || displayText}
          </span>

          {/* Chevron */}
          {showChevron && (
            <span className="flex-shrink-0">
              {chevronIcons
                ? (isOpen ? chevronIcons.open : chevronIcons.closed)
                : defaultChevronIcon
              }
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>
    )
  }
)

DatePickerTrigger.displayName = 'DatePickerTrigger'
