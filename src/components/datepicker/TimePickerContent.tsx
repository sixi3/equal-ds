import * as React from 'react'
import { cn } from '../../lib/cn'
import { useHoverAnimation } from '../../lib/useHoverAnimation'
import { HoverIndicator } from '../ui/HoverIndicator'

export interface TimeOption {
  value: string
  label: string
  hours: number
  minutes: number
  period: 'AM' | 'PM'
}

export interface TimePickerContentProps {
  /**
   * Currently selected time
   */
  selectedTime?: { hours: number; minutes: number; period: 'AM' | 'PM' } | null
  /**
   * Callback when a time is selected
   */
  onTimeSelect?: (time: { hours: number; minutes: number; period: 'AM' | 'PM' }) => void
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
   * Time format (12h or 24h)
   * @default '24h' (railway timing)
   */
  format?: '12h' | '24h'
  /**
   * Time interval in minutes
   * @default 30
   */
  interval?: number
  /**
   * Start hour (0-23)
   * @default 0
   */
  startHour?: number
  /**
   * End hour (0-23)
   * @default 23
   */
  endHour?: number
  /**
   * Custom className
   */
  className?: string
  /**
   * Maximum height of the dropdown
   * @default '200px'
   */
  maxHeight?: string
  /**
   * Function to determine if a time option should be disabled
   */
  isTimeDisabled?: (time: TimeOption) => boolean
  /**
   * Whether the time picker is open (for animation state)
   * @default true
   */
  isOpen?: boolean
  /**
   * Animation side for transform origin
   * @default 'bottom'
   */
  side?: 'top' | 'bottom'
}

export const TimePickerContent = React.forwardRef<HTMLDivElement, TimePickerContentProps>(
  ({
    selectedTime,
    onTimeSelect,
    enableHoverAnimation = true,
    hoverVariant = 'default',
    format = '24h',
    interval = 30,
    startHour = 0,
    endHour = 23,
    className,
    maxHeight = '200px',
    isTimeDisabled,
    isOpen = true,
    side = 'bottom',
  }, ref) => {
    // Hover animation setup
    const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
      itemSelector: '[data-timepicker-item]',
      enabled: enableHoverAnimation
    })

    // Scroll fade detection
    const scrollRef = React.useRef<HTMLDivElement | null>(null)
    const [showTopFade, setShowTopFade] = React.useState(false)
    const [showBottomFade, setShowBottomFade] = React.useState(false)

    // Scroll detection effect
    React.useEffect(() => {
      const el = scrollRef.current
      if (!el) return

      const update = () => {
        const { scrollTop, clientHeight, scrollHeight } = el
        setShowTopFade(scrollTop > 0)
        setShowBottomFade(scrollTop + clientHeight < scrollHeight - 1)
      }

      update()
      el.addEventListener('scroll', update, { passive: true })

      let resizeObserver: ResizeObserver | null = null
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(update)
        resizeObserver.observe(el)
      } else {
        window.addEventListener('resize', update)
      }

      return () => {
        el.removeEventListener('scroll', update)
        if (resizeObserver) resizeObserver.disconnect()
        else window.removeEventListener('resize', update)
      }
    }, [])

    // Generate time options
    const timeOptions = React.useMemo(() => {
      const options: TimeOption[] = []
      const totalMinutesInDay = 24 * 60

      for (let minutes = startHour * 60; minutes <= endHour * 60; minutes += interval) {
        if (minutes >= totalMinutesInDay) break

        const hours24 = Math.floor(minutes / 60)
        const mins = minutes % 60

        // Format for 12-hour display
        const period: 'AM' | 'PM' = hours24 >= 12 ? 'PM' : 'AM'
        const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24

        const label12h = `${hours12}:${mins.toString().padStart(2, '0')} ${period}`
        const label24h = `${hours24.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`

        options.push({
          value: `${hours24.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`,
          label: format === '12h' ? label12h : label24h,
          hours: hours24,
          minutes: mins,
          period
        })
      }

      return options
    }, [format, interval, startHour, endHour])

    // Handle time selection
    const handleTimeSelect = (time: TimeOption) => {
      onTimeSelect?.({
        hours: time.hours,
        minutes: time.minutes,
        period: time.period
      })
    }

    // Check if time is selected
    const isTimeSelected = (time: TimeOption) => {
      if (!selectedTime) return false
      return (
        selectedTime.hours === time.hours &&
        selectedTime.minutes === time.minutes &&
        selectedTime.period === time.period
      )
    }

    // Auto-scroll to selected time when component opens
    React.useEffect(() => {
      if (isOpen && selectedTime && scrollRef.current) {
        // Find the selected time button
        const selectedButton = scrollRef.current.querySelector('[data-selected="true"]') as HTMLElement
        if (selectedButton) {
          // Use setTimeout to ensure DOM is fully rendered
          setTimeout(() => {
            selectedButton.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            })
          }, 100)
        }
      }
    }, [isOpen, selectedTime])

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
          'relative w-[140px] rounded-lg border border-[var(--color-border-hover)] bg-[var(--color-background-secondary)] p-2 shadow-lg overflow-hidden',
          className,
        )}
        style={{ maxHeight }}
      >
        <div
          ref={scrollRef}
          className="overflow-y-auto"
          style={{
            maxHeight: `calc(${maxHeight} - 16px)`,
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          {/* Hide scrollbars for webkit browsers */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .time-picker-scroll::-webkit-scrollbar {
                display: none;
              }
            `
          }} />
          <div className="time-picker-scroll space-y-1">
            {timeOptions.map((time) => {
              const isDisabled = isTimeDisabled ? isTimeDisabled(time) : false
              return (
                <button
                  key={time.value}
                  {...(!isTimeSelected(time) && !isDisabled ? { 'data-timepicker-item': true } : {})}
                  {...(isTimeSelected(time) ? { 'data-selected': 'true' } : {})}
                  onClick={() => !isDisabled && handleTimeSelect(time)}
                  disabled={isDisabled}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm rounded-md transition-colors duration-200',
                    isDisabled
                      ? 'opacity-50 cursor-not-allowed text-[var(--color-text-secondary)] bg-transparent'
                      : isTimeSelected(time)
                      ? 'bg-primary-200 text-text-primary font-[var(--typography-fontWeight-medium)]'
                      : 'text-[var(--color-text-primary)] font-[var(--typography-fontWeight-normal)] hover:bg-[var(--color-background-tertiary)]'
                  )}
                >
                  {time.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Top fade indicator */}
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-6 z-20 bg-gradient-to-b from-background-inverse/10 to-transparent transition-opacity duration-200',
            showTopFade ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Bottom fade indicator */}
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 h-6 z-20 bg-gradient-to-t from-background-inverse/10 to-transparent transition-opacity duration-200',
            showBottomFade ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Hover Indicator */}
        {enableHoverAnimation && (
          <HoverIndicator
            indicator={indicator}
            variant={hoverVariant}
            zIndex={30}
          />
        )}
      </div>
    )
  }
)

TimePickerContent.displayName = 'TimePickerContent'
