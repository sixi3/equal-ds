import { describe, it, expect } from 'vitest'
import { formatDateTimeRange, DateTimeRange, isSameDay } from '../src/lib/dateUtils'
import { compareTimes } from '../src/lib/timeUtils'

describe('Date Picker Date Time Range Formatting', () => {
  it('should format complete date-time range with both start and end times', () => {
    const range: DateTimeRange = {
      startDate: new Date('2025-01-15'),
      startTime: { hours: 9, minutes: 30, period: 'AM' },
      endDate: new Date('2025-01-16'),
      endTime: { hours: 5, minutes: 30, period: 'PM' }
    }

    const result = formatDateTimeRange(range)
    expect(result).toBe('Jan 15, 2025 9:30 AM - Jan 16, 2025 5:30 PM')
  })

  it('should format date range with only start time', () => {
    const range: DateTimeRange = {
      startDate: new Date('2025-01-15'),
      startTime: { hours: 9, minutes: 30, period: 'AM' },
      endDate: new Date('2025-01-16'),
      endTime: null
    }

    const result = formatDateTimeRange(range)
    expect(result).toBe('Jan 15, 2025 9:30 AM - Jan 16, 2025')
  })

  it('should format date range with only end time', () => {
    const range: DateTimeRange = {
      startDate: new Date('2025-01-15'),
      startTime: null,
      endDate: new Date('2025-01-16'),
      endTime: { hours: 5, minutes: 30, period: 'PM' }
    }

    const result = formatDateTimeRange(range)
    expect(result).toBe('Jan 15, 2025 - Jan 16, 2025 5:30 PM')
  })

  it('should format date range without times', () => {
    const range: DateTimeRange = {
      startDate: new Date('2025-01-15'),
      startTime: null,
      endDate: new Date('2025-01-16'),
      endTime: null
    }

    const result = formatDateTimeRange(range)
    expect(result).toBe('Jan 15, 2025 - Jan 16, 2025')
  })

  it('should return placeholder for empty range', () => {
    const range: DateTimeRange = {
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null
    }

    const result = formatDateTimeRange(range)
    expect(result).toBe('Select date range')
  })

  it('should format single date with time', () => {
    const range: DateTimeRange = {
      startDate: new Date('2025-01-15'),
      startTime: { hours: 9, minutes: 30, period: 'AM' },
      endDate: null,
      endTime: null
    }

    const result = formatDateTimeRange(range)
    expect(result).toBe('Jan 15, 2025 9:30 AM')
  })

  it('should format single date without time', () => {
    const range: DateTimeRange = {
      startDate: new Date('2025-01-15'),
      startTime: null,
      endDate: null,
      endTime: null
    }

    const result = formatDateTimeRange(range)
    expect(result).toBe('Jan 15, 2025')
  })
})

describe('Date Range Time Validation', () => {
  it('should validate same day time selection correctly', () => {
    const sameDate = new Date('2025-01-15')
    const startTime = { hours: 9, minutes: 30, period: 'AM' as const }
    const endTime = { hours: 11, minutes: 0, period: 'AM' as const }
    const invalidEndTime = { hours: 8, minutes: 0, period: 'AM' as const }

    // Test that same day comparison works
    expect(isSameDay(sameDate, sameDate)).toBe(true)

    // Test that valid time comparison works (end time after start time)
    expect(compareTimes(startTime, endTime)).toBeLessThan(0)

    // Test that invalid time comparison works (end time before start time)
    expect(compareTimes(startTime, invalidEndTime)).toBeGreaterThan(0)
  })

  it('should allow same day selection for dates', () => {
    const date1 = new Date('2025-01-15')
    const date2 = new Date('2025-01-15')

    expect(isSameDay(date1, date2)).toBe(true)
  })

  it('should validate time order within same day', () => {
    const startTime = { hours: 9, minutes: 30, period: 'AM' as const }
    const validEndTime = { hours: 11, minutes: 0, period: 'AM' as const }
    const invalidEndTime = { hours: 8, minutes: 0, period: 'AM' as const }

    // Valid: end time is after start time
    expect(compareTimes(startTime, validEndTime) < 0).toBe(true)

    // Invalid: end time is before start time
    expect(compareTimes(startTime, invalidEndTime) >= 0).toBe(true)
  })

  it('should allow same day selection in calendar', () => {
    const startDate = new Date('2025-01-15')
    const sameEndDate = new Date('2025-01-15')

    // Same day should be allowed for end date when start date is same
    expect(isSameDay(startDate, sameEndDate)).toBe(true)

    // The minDate logic should allow the start date to be selected as end date
    // by setting minDate to the day before start date
    const minDate = new Date('2025-01-14') // One day before start
    expect(sameEndDate >= minDate).toBe(true)
    expect(sameEndDate >= startDate).toBe(true)
  })
})

