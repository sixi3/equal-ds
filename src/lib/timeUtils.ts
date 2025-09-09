/**
 * Time utility functions for the time picker component
 * Provides pure functions for time manipulation with zero dependencies
 */

export interface TimeValue {
  hours: number
  minutes: number
  period?: 'AM' | 'PM'
}

export interface TimeParseError {
  type: 'invalid_format' | 'invalid_time' | 'out_of_range'
  message: string
  input: string
}

export interface TimeParseResult {
  success: boolean
  time?: TimeValue
  error?: TimeParseError
}

export interface TimeSlot {
  value: string
  label: string
  hours: number
  minutes: number
}

/**
 * Format time for display (24-hour format)
 */
export function formatTime24(hours: number, minutes: number): string {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

/**
 * Format time for display (12-hour format)
 */
export function formatTime12(hours: number, minutes: number): string {
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Parse time string to TimeValue with detailed error information
 */
export function parseTimeString(timeString: string): TimeParseResult {
  // Input validation
  if (typeof timeString !== 'string') {
    return {
      success: false,
      error: {
        type: 'invalid_format',
        message: 'Input must be a string',
        input: String(timeString)
      }
    }
  }

  const trimmed = timeString.trim()
  if (!trimmed) {
    return {
      success: false,
      error: {
        type: 'invalid_format',
        message: 'Input string is empty',
        input: timeString
      }
    }
  }

  // Match HH:MM or HH:MM AM/PM formats
  const time24Regex = /^(\d{1,2}):(\d{2})$/
  const time12Regex = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i

  let match = trimmed.match(time12Regex)
  if (match) {
    const [, hoursStr, minutesStr, period] = match
    const hoursNum = parseInt(hoursStr, 10)
    const minutesNum = parseInt(minutesStr, 10)

    // Validate parsed numbers
    if (isNaN(hoursNum) || isNaN(minutesNum)) {
      return {
        success: false,
        error: {
          type: 'invalid_format',
          message: 'Invalid numeric values in time string',
          input: timeString
        }
      }
    }

    let hours = hoursNum

    if (period.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0
    }

    if (!isValidTime(hours, minutesNum)) {
      return {
        success: false,
        error: {
          type: 'out_of_range',
          message: `Time ${hours}:${minutesNum.toString().padStart(2, '0')} is out of valid range (00:00-23:59)`,
          input: timeString
        }
      }
    }

    return {
      success: true,
      time: { hours, minutes: minutesNum, period: period.toUpperCase() as 'AM' | 'PM' }
    }
  }

  match = trimmed.match(time24Regex)
  if (match) {
    const [, hoursStr, minutesStr] = match
    const hours = parseInt(hoursStr, 10)
    const minutes = parseInt(minutesStr, 10)

    // Validate parsed numbers
    if (isNaN(hours) || isNaN(minutes)) {
      return {
        success: false,
        error: {
          type: 'invalid_format',
          message: 'Invalid numeric values in time string',
          input: timeString
        }
      }
    }

    if (!isValidTime(hours, minutes)) {
      return {
        success: false,
        error: {
          type: 'out_of_range',
          message: `Time ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} is out of valid range (00:00-23:59)`,
          input: timeString
        }
      }
    }

    const period = hours >= 12 ? 'PM' : 'AM'
    return {
      success: true,
      time: { hours, minutes, period }
    }
  }

  return {
    success: false,
    error: {
      type: 'invalid_format',
      message: 'Time string must be in format "HH:MM" or "HH:MM AM/PM"',
      input: timeString
    }
  }
}

/**
 * Legacy function for backward compatibility - returns TimeValue or null
 * @deprecated Use parseTimeString for better error handling
 */
export function parseTimeStringLegacy(timeString: string): TimeValue | null {
  const result = parseTimeString(timeString)
  return result.success ? result.time! : null
}

/**
 * Check if time values are valid
 */
export function isValidTime(hours: number, minutes: number): boolean {
  return (
    typeof hours === 'number' &&
    typeof minutes === 'number' &&
    hours >= 0 && hours <= 23 &&
    minutes >= 0 && minutes <= 59
  )
}

/**
 * Convert TimeValue to total minutes
 */
export function timeToMinutes(time: TimeValue): number {
  // Input validation
  if (!time || typeof time.hours !== 'number' || typeof time.minutes !== 'number') {
    throw new Error('Invalid TimeValue: hours and minutes must be numbers')
  }

  if (!isValidTime(time.hours, time.minutes)) {
    throw new Error(`Invalid time: ${time.hours}:${time.minutes} is out of range (00:00-23:59)`)
  }

  return time.hours * 60 + time.minutes
}

/**
 * Convert total minutes to TimeValue
 */
export function minutesToTime(totalMinutes: number): TimeValue {
  // Input validation
  if (typeof totalMinutes !== 'number' || isNaN(totalMinutes)) {
    throw new Error('Invalid totalMinutes value: must be a number')
  }

  // Handle negative values by wrapping around
  const normalizedMinutes = totalMinutes < 0
    ? (totalMinutes % (24 * 60) + 24 * 60) % (24 * 60)
    : totalMinutes % (24 * 60)

  const hours = Math.floor(normalizedMinutes / 60)
  const minutes = normalizedMinutes % 60
  const period: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM'

  return { hours, minutes, period }
}

/**
 * Add minutes to a time with optional cross-date boundary handling
 */
export function addMinutes(time: TimeValue, minutes: number): TimeValue {
  // Input validation
  if (typeof minutes !== 'number' || isNaN(minutes)) {
    throw new Error('Invalid minutes value: must be a number')
  }

  const totalMinutes = timeToMinutes(time) + minutes

  // Handle negative values by wrapping around the clock
  const normalizedMinutes = totalMinutes < 0
    ? (totalMinutes % (24 * 60) + 24 * 60) % (24 * 60)
    : totalMinutes % (24 * 60)

  return minutesToTime(normalizedMinutes)
}

/**
 * Add minutes to a time and return both the new time and days crossed
 */
export function addMinutesWithDays(time: TimeValue, minutes: number): { time: TimeValue; daysCrossed: number } {
  // Input validation
  if (typeof minutes !== 'number' || isNaN(minutes)) {
    throw new Error('Invalid minutes value: must be a number')
  }

  const totalMinutes = timeToMinutes(time) + minutes

  // Calculate days crossed (can be negative for past dates)
  const daysCrossed = Math.floor(totalMinutes / (24 * 60))

  // Normalize minutes to be within a single day
  const normalizedMinutes = totalMinutes < 0
    ? (totalMinutes % (24 * 60) + 24 * 60) % (24 * 60)
    : totalMinutes % (24 * 60)

  return {
    time: minutesToTime(normalizedMinutes),
    daysCrossed
  }
}

/**
 * Subtract minutes from a time
 */
export function subtractMinutes(time: TimeValue, minutes: number): TimeValue {
  // Input validation
  if (typeof minutes !== 'number' || isNaN(minutes)) {
    throw new Error('Invalid minutes value: must be a number')
  }

  return addMinutes(time, -minutes)
}

/**
 * Compare two times
 */
export function compareTimes(time1: TimeValue, time2: TimeValue): number {
  // Input validation is handled by timeToMinutes
  const minutes1 = timeToMinutes(time1)
  const minutes2 = timeToMinutes(time2)
  return minutes1 - minutes2
}

/**
 * Check if a time is between two times
 */
export function isTimeBetween(time: TimeValue, start: TimeValue, end: TimeValue): boolean {
  const timeMinutes = timeToMinutes(time)
  const startMinutes = timeToMinutes(start)
  const endMinutes = timeToMinutes(end)
  return timeMinutes >= startMinutes && timeMinutes <= endMinutes
}

/**
 * Generate time slots with specified interval
 */
export function generateTimeSlots(interval: number = 30, format: '12h' | '24h' = '12h'): TimeSlot[] {
  // Input validation
  if (typeof interval !== 'number' || interval <= 0 || interval >= 24 * 60) {
    throw new Error('Invalid interval: must be a positive number less than 24 hours (1440 minutes)')
  }

  if (!['12h', '24h'].includes(format)) {
    throw new Error('Invalid format: must be "12h" or "24h"')
  }

  const slots: TimeSlot[] = []
  const totalMinutes = 24 * 60 // 24 hours in minutes

  for (let minutes = 0; minutes < totalMinutes; minutes += interval) {
    const time = minutesToTime(minutes)
    const value = formatTime24(time.hours, time.minutes)
    const label = format === '12h' ? formatTime12(time.hours, time.minutes) : value

    slots.push({
      value,
      label,
      hours: time.hours,
      minutes: time.minutes
    })
  }

  return slots
}

/**
 * Get common time presets
 */
export function getTimePresets(): TimeSlot[] {
  return [
    { value: '09:00', label: '9:00 AM', hours: 9, minutes: 0 },
    { value: '12:00', label: '12:00 PM', hours: 12, minutes: 0 },
    { value: '17:00', label: '5:00 PM', hours: 17, minutes: 0 },
    { value: '18:00', label: '6:00 PM', hours: 18, minutes: 0 }
  ]
}

/**
 * Get "now" time
 */
export function getCurrentTime(): TimeValue {
  const now = new Date()
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    period: now.getHours() >= 12 ? 'PM' : 'AM'
  }
}

/**
 * Get the next available time slot (rounded to nearest 15 minutes, minimum 30 minutes from now)
 */
export function getNextAvailableTime(interval: number = 15): TimeValue {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  // Add 30 minutes minimum from current time
  const targetMinutes = currentMinutes + 30

  // Round to nearest interval
  const roundedMinutes = Math.ceil(targetMinutes / interval) * interval

  // Convert back to hours and minutes
  const hours = Math.floor(roundedMinutes / 60) % 24
  const minutes = roundedMinutes % 60

  return {
    hours,
    minutes,
    period: hours >= 12 ? 'PM' : 'AM'
  }
}

/**
 * Round time to nearest interval
 */
export function roundToInterval(time: TimeValue, interval: number = 15): TimeValue {
  const totalMinutes = timeToMinutes(time)
  const roundedMinutes = Math.round(totalMinutes / interval) * interval
  return minutesToTime(roundedMinutes)
}

/**
 * Round time to nearest lowest half hour
 * e.g., 2:15 PM -> 2:00 PM, 2:35 PM -> 2:30 PM, 2:45 PM -> 2:30 PM
 */
export function roundToLowestHalfHour(time: TimeValue): TimeValue {
  const totalMinutes = timeToMinutes(time)
  // Floor to nearest 30-minute interval (lowest half hour)
  const roundedMinutes = Math.floor(totalMinutes / 30) * 30
  return minutesToTime(roundedMinutes)
}

/**
 * Get time difference in minutes
 */
export function getTimeDifference(time1: TimeValue, time2: TimeValue): number {
  return Math.abs(timeToMinutes(time1) - timeToMinutes(time2))
}

/**
 * Format time difference for display
 */
export function formatTimeDifference(minutes: number): string {
  if (minutes === 0) return '0 minutes'

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'}`
  }

  if (remainingMinutes === 0) {
    return `${hours} hour${hours === 1 ? '' : 's'}`
  }

  return `${hours} hour${hours === 1 ? '' : 's'} ${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'}`
}

/**
 * Check if a time string matches a pattern
 */
export function isValidTimeString(timeString: string): boolean {
  return parseTimeString(timeString) !== null
}

/**
 * Convert TimeValue to Date object (using current date)
 */
export function timeToDate(time: TimeValue, baseDate?: Date): Date {
  const date = baseDate || new Date()
  date.setHours(time.hours, time.minutes, 0, 0)
  return date
}

/**
 * Extract time from Date object
 */
export function dateToTime(date: Date): TimeValue {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    period: date.getHours() >= 12 ? 'PM' : 'AM'
  }
}
