/**
 * Date utility functions for the date picker component
 * Provides pure functions for date manipulation with zero dependencies
 */

export interface DateRange {
  start: Date | null
  end: Date | null
}

export interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
  isInRange?: boolean
  isRangeStart?: boolean
  isRangeEnd?: boolean
}

export interface CalendarMonth {
  year: number
  month: number // 0-11
  weeks: CalendarDay[][]
}

/**
 * Get the number of days in a given month
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

/**
 * Get the day of the week for the last day of the month (0 = Sunday, 6 = Saturday)
 */
export function getLastDayOfMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDay()
}

// Cache for locale-dependent data
const localeCache = new Map<string, { weekdays: string[]; months: string[]; shortMonths: string[] }>()

/**
 * Get cached locale data or create new
 */
function getCachedLocaleData(locale: string) {
  if (localeCache.has(locale)) {
    return localeCache.get(locale)!
  }

  // Create weekday names (static - doesn't change based on date)
  const weekdays = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(2023, 0, i + 1) // Use a fixed date to avoid mutations
    weekdays.push(date.toLocaleDateString(locale, { weekday: 'short' }))
  }

  // Create month names (static - doesn't change)
  const months = []
  const shortMonths = []
  for (let i = 0; i < 12; i++) {
    const date = new Date(2023, i, 15) // Use a fixed date to avoid mutations
    months.push(date.toLocaleDateString(locale, { month: 'long' }))
    shortMonths.push(date.toLocaleDateString(locale, { month: 'short' }))
  }

  const data = { weekdays, months, shortMonths }
  localeCache.set(locale, data)
  return data
}

/**
 * Get array of weekday names (cached for performance)
 */
export function getWeekDays(locale: string = 'en-US'): string[] {
  return getCachedLocaleData(locale).weekdays
}

/**
 * Get array of month names (cached for performance)
 */
export function getMonthNames(locale: string = 'en-US'): string[] {
  return getCachedLocaleData(locale).months
}

/**
 * Get short month names (cached for performance)
 */
export function getShortMonthNames(locale: string = 'en-US'): string[] {
  return getCachedLocaleData(locale).shortMonths
}

/**
 * Check if a date is valid
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Validate a date and throw if invalid
 * @throws {Error} If date is invalid
 */
export function validateDate(date: Date, context: string = 'date'): Date {
  if (!isValidDate(date)) {
    throw new Error(`Invalid ${context}: must be a valid Date object`)
  }
  return date
}

/**
 * Validate a number parameter
 * @throws {Error} If value is not a valid number
 */
export function validateNumber(value: number, paramName: string): number {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(`Invalid ${paramName}: must be a number`)
  }
  return value
}

/**
 * Check if two dates represent the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Check if two dates represent the same month
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date): boolean {
  if (!isValidDate(date)) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)

  return checkDate < today
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date): boolean {
  if (!isValidDate(date)) return false

  const today = new Date()
  today.setHours(23, 59, 59, 999)

  return date > today
}

/**
 * Add months to a date
 * @throws {Error} If date is invalid or months is not a number
 */
export function addMonths(date: Date, months: number): Date {
  validateDate(date, 'date in addMonths')
  validateNumber(months, 'months in addMonths')

  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

/**
 * Add days to a date
 * @throws {Error} If date is invalid or days is not a number
 */
export function addDays(date: Date, days: number): Date {
  validateDate(date, 'date in addDays')
  validateNumber(days, 'days in addDays')

  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Subtract days from a date
 * @throws {Error} If date is invalid or days is not a number
 */
export function subtractDays(date: Date, days: number): Date {
  validateNumber(days, 'days in subtractDays')
  return addDays(date, -days)
}

/**
 * Get the start of a month
 * @throws {Error} If date is invalid
 */
export function startOfMonth(date: Date): Date {
  validateDate(date, 'date in startOfMonth')
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Get the end of a month
 * @throws {Error} If date is invalid
 */
export function endOfMonth(date: Date): Date {
  validateDate(date, 'date in endOfMonth')
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * Get the start of a week (Sunday)
 * @throws {Error} If date is invalid
 */
export function startOfWeek(date: Date): Date {
  validateDate(date, 'date in startOfWeek')

  const result = new Date(date)
  const day = result.getDay()
  result.setDate(result.getDate() - day)
  return result
}

/**
 * Check if a date is within a range
 */
export function isWithinRange(date: Date, range: DateRange): boolean {
  if (!isValidDate(date)) return false
  if (!range.start || !range.end) return false

  const start = new Date(range.start)
  start.setHours(0, 0, 0, 0)

  const end = new Date(range.end)
  end.setHours(23, 59, 59, 999)

  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)

  return checkDate >= start && checkDate <= end
}

/**
 * Format a date for display
 * @returns Empty string if date is invalid
 */
export function formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'medium', locale: string = 'en-US'): string {
  if (!isValidDate(date)) return ''

  const options: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: 'short', day: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }
  }

  return date.toLocaleDateString(locale, options[format])
}

/**
 * Format a date range for display
 */
export function formatDateRange(range: DateRange, format: 'short' | 'medium' | 'long' = 'medium', locale: string = 'en-US'): string {
  if (!range.start && !range.end) return 'Select dates'
  if (range.start && !range.end) return formatDate(range.start, format, locale)
  if (!range.start && range.end) return formatDate(range.end, format, locale)

  const start = formatDate(range.start!, format, locale)
  const end = formatDate(range.end!, format, locale)

  if (start === end) return start
  return `${start} - ${end}`
}

/**
 * Time object for date-time formatting
 */
export interface TimeObject {
  hours: number
  minutes: number
  period: 'AM' | 'PM'
}

/**
 * Date range with time information
 * Supports both TimeObject interface and inline time objects for flexibility
 */
export interface DateTimeRange {
  startDate: Date | null
  startTime: TimeObject | { hours: number; minutes: number; period: 'AM' | 'PM' } | null
  endDate: Date | null
  endTime: TimeObject | { hours: number; minutes: number; period: 'AM' | 'PM' } | null
}

/**
 * Format time for display (12-hour format)
 * Accepts both TimeObject interface and inline time objects
 */
export function formatTime(time: TimeObject | { hours: number; minutes: number; period: 'AM' | 'PM' } | null | undefined): string {
  if (!time || typeof time !== 'object') return ''

  const hours12 = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours
  return `${hours12}:${time.minutes.toString().padStart(2, '0')} ${time.period}`
}

/**
 * Format time for display (24-hour format)
 * Accepts both TimeObject interface and inline time objects
 */
export function formatTime24(time: TimeObject | { hours: number; minutes: number; period?: 'AM' | 'PM' } | null | undefined): string {
  if (!time || typeof time !== 'object') return ''

  return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`
}

/**
 * Format a date-time range for display
 */
export function formatDateTimeRange(range: DateTimeRange, dateFormat: 'short' | 'medium' | 'long' = 'medium', locale: string = 'en-US'): string {
  if (!range.startDate && !range.endDate) return 'Select date range'

  // If we have start date but no end date, show start date/time
  if (range.startDate && !range.endDate) {
    const startDateStr = formatDate(range.startDate, dateFormat, locale)
    if (range.startTime) {
      return `${startDateStr} ${formatTime(range.startTime)}`
    }
    return startDateStr
  }

  // If we have end date but no start date, show end date/time
  if (!range.startDate && range.endDate) {
    const endDateStr = formatDate(range.endDate, dateFormat, locale)
    if (range.endTime) {
      return `${endDateStr} ${formatTime(range.endTime)}`
    }
    return endDateStr
  }

  // Both dates are available
  if (range.startDate && range.endDate) {
    const startDateStr = formatDate(range.startDate, dateFormat, locale)
    const endDateStr = formatDate(range.endDate, dateFormat, locale)

    // If times are available, include them
    if (range.startTime && range.endTime) {
      return `${startDateStr} ${formatTime(range.startTime)} - ${endDateStr} ${formatTime(range.endTime)}`
    } else if (range.startTime) {
      return `${startDateStr} ${formatTime(range.startTime)} - ${endDateStr}`
    } else if (range.endTime) {
      return `${startDateStr} - ${endDateStr} ${formatTime(range.endTime)}`
    } else {
      return `${startDateStr} - ${endDateStr}`
    }
  }

  return 'Select date range'
}

/**
 * Format a date-time range for display (24-hour format)
 */
export function formatDateTimeRange24(range: DateTimeRange, dateFormat: 'short' | 'medium' | 'long' = 'medium', locale: string = 'en-US'): string {
  if (!range.startDate && !range.endDate) return 'Select date range'

  // If we have start date but no end date, show start date/time
  if (range.startDate && !range.endDate) {
    const startDateStr = formatDate(range.startDate, dateFormat, locale)
    if (range.startTime) {
      return `${startDateStr} ${formatTime24(range.startTime)}`
    }
    return startDateStr
  }

  // If we have end date but no start date, show end date/time
  if (!range.startDate && range.endDate) {
    const endDateStr = formatDate(range.endDate, dateFormat, locale)
    if (range.endTime) {
      return `${endDateStr} ${formatTime24(range.endTime)}`
    }
    return endDateStr
  }

  // Both dates are available
  if (range.startDate && range.endDate) {
    const startDateStr = formatDate(range.startDate, dateFormat, locale)
    const endDateStr = formatDate(range.endDate, dateFormat, locale)

    // If times are available, include them
    if (range.startTime && range.endTime) {
      return `${startDateStr} ${formatTime24(range.startTime)} - ${endDateStr} ${formatTime24(range.endTime)}`
    } else if (range.startTime) {
      return `${startDateStr} ${formatTime24(range.startTime)} - ${endDateStr}`
    } else if (range.endTime) {
      return `${startDateStr} - ${endDateStr} ${formatTime24(range.endTime)}`
    } else {
      return `${startDateStr} - ${endDateStr}`
    }
  }

  return 'Select date range'
}

/**
 * Generate calendar data for a given month
 * @throws {Error} If year or month parameters are invalid
 */
export function generateCalendarMonth(year: number, month: number, selectedDate?: Date, range?: DateRange, minDate?: Date, maxDate?: Date): CalendarMonth {
  // Input validation
  validateNumber(year, 'year in generateCalendarMonth')
  if (month < 0 || month > 11) {
    throw new Error('Invalid month: must be between 0-11')
  }

  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const weeks: CalendarDay[][] = []
  let currentWeek: CalendarDay[] = []

  // Add days from previous month to fill the first week
  const prevMonth = month === 0 ? 11 : month - 1
  const prevMonthYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const date = new Date(prevMonthYear, prevMonth, daysInPrevMonth - i)
    currentWeek.push({
      date,
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled: (minDate && date < minDate) || (maxDate && date > maxDate) || false,
      isInRange: range ? isWithinRange(date, range) : false
    })
  }

  // Add days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }

    currentWeek.push({
      date,
      day,
      isCurrentMonth: true,
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled: (minDate && date < minDate) || (maxDate && date > maxDate) || false,
      isInRange: range ? isWithinRange(date, range) : false,
      isRangeStart: range?.start ? isSameDay(date, range.start) : false,
      isRangeEnd: range?.end ? isSameDay(date, range.end) : false
    })
  }

  // Add days from next month to fill the last week
  const remainingDays = 7 - currentWeek.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    currentWeek.push({
      date,
      day,
      isCurrentMonth: false,
      isToday: isToday(date),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
      isDisabled: (minDate && date < minDate) || (maxDate && date > maxDate) || false,
      isInRange: range ? isWithinRange(date, range) : false
    })
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return {
    year,
    month,
    weeks
  }
}

/**
 * Get relative date descriptions
 * @returns 'Invalid date' if date is invalid
 */
export function getRelativeDateDescription(date: Date, locale: string = 'en-US'): string {
  if (!isValidDate(date)) return 'Invalid date'

  const today = new Date()
  const diffTime = date.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`
  if (diffDays > 7 && diffDays <= 30) return 'Next week'
  if (diffDays < -7 && diffDays >= -30) return 'Last week'

  return formatDate(date, 'medium', locale)
}

// Timezone-aware functions for applications needing explicit timezone control

/**
 * Convert a date to a specific timezone
 * @param date The date to convert
 * @param timeZone The target timezone (e.g., 'America/New_York', 'Europe/London')
 * @returns Date object representing the same moment in the target timezone
 */
export function convertToTimeZone(date: Date, timeZone: string): Date {
  validateDate(date, 'date in convertToTimeZone')

  try {
    // Use Intl.DateTimeFormat to get timezone-aware date
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })

    // Parse the formatted string back to a Date
    const formatted = formatter.format(date)
    return new Date(formatted + ' UTC')
  } catch (error) {
    throw new Error(`Invalid timezone: ${timeZone}`)
  }
}

/**
 * Format a date in a specific timezone
 * @param date The date to format
 * @param timeZone The timezone to use for formatting
 * @param options Formatting options
 * @returns Formatted date string in the specified timezone
 */
export function formatDateInTimeZone(
  date: Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  validateDate(date, 'date in formatDateInTimeZone')

  try {
    return date.toLocaleDateString('en-US', {
      timeZone,
      ...options
    })
  } catch (error) {
    throw new Error(`Invalid timezone: ${timeZone}`)
  }
}

/**
 * Get the current date/time in a specific timezone
 * @param timeZone The timezone to get current time for
 * @returns Date object representing current time in the specified timezone
 */
export function getCurrentTimeInTimeZone(timeZone: string): Date {
  try {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })

    const formatted = formatter.format(now)
    return new Date(formatted + ' UTC')
  } catch (error) {
    throw new Error(`Invalid timezone: ${timeZone}`)
  }
}
