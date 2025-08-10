import React from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/cn'
import { useSidebarOpenContext, useSidebarActiveItemContext } from './SidebarProvider'

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}
// Singleton tooltip root to avoid scattering portals under <body>
let tooltipRootEl: HTMLElement | null = null
function getTooltipRoot(): HTMLElement | null {
  if (typeof document === 'undefined') return null
  if (tooltipRootEl && document.body.contains(tooltipRootEl)) return tooltipRootEl
  const existing = document.getElementById('eds-tooltip-root') as HTMLElement | null
  if (existing) {
    tooltipRootEl = existing
    return tooltipRootEl
  }
  const el = document.createElement('div')
  el.id = 'eds-tooltip-root'
  el.setAttribute('data-equal-ds', 'tooltip-root')
  document.body.appendChild(el)
  tooltipRootEl = el
  return tooltipRootEl
}

function SidebarMenuImpl({ className, children, ...props }: SidebarMenuProps): JSX.Element {
  const { open } = useSidebarOpenContext()
  const containerRef = React.useRef<HTMLUListElement | null>(null)
  const [indicator, setIndicator] = React.useState<{ top: number; left: number; width: number; height: number; visible: boolean }>({ top: 0, left: 0, width: 0, height: 0, visible: false })

  const [tooltip, setTooltip] = React.useState<{ top: number; left: number; visible: boolean }>({ top: 0, left: 0, visible: false })
  const [tooltipLabel, setTooltipLabel] = React.useState<string>('')
  const tooltipLabelRef = React.useRef<string>('')
  const [textVisible, setTextVisible] = React.useState<boolean>(false)
  const [tooltipWidth, setTooltipWidth] = React.useState<number | null>(null)
  const textFadeTimeout = React.useRef<number | null>(null)
  const rafPendingRef = React.useRef<boolean>(false)
  const pendingDataRef = React.useRef<{ clientY: number; label: string; tRect: DOMRect; cRect: DOMRect } | null>(null)

  const measureRef = React.useRef<HTMLSpanElement | null>(null)

  // Stable portal container per menu instance
  const tooltipContainerRef = React.useRef<HTMLElement | null>(null)
  const [portalMounted, setPortalMounted] = React.useState(false)
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    const root = getTooltipRoot()
    if (!root) return
    const el = document.createElement('div')
    tooltipContainerRef.current = el
    root.appendChild(el)
    setPortalMounted(true)
    return () => {
      if (root.contains(el)) root.removeChild(el)
      tooltipContainerRef.current = null
      setPortalMounted(false)
    }
  }, [])

  const flushPointerFrame = React.useCallback(() => {
    rafPendingRef.current = false
    const data = pendingDataRef.current
    if (!data) return

    const { clientY, label, tRect, cRect } = data

    // Update hover indicator
    setIndicator({
      top: tRect.top - cRect.top + (containerRef.current?.scrollTop ?? 0),
      left: tRect.left - cRect.left + (containerRef.current?.scrollLeft ?? 0),
      width: tRect.width,
      height: tRect.height,
      visible: true,
    })

    // Tooltip position (fixed next to sidebar)
    const sidebarRight = cRect.right
    setTooltip({ top: clientY, left: sidebarRight + 20, visible: true })

    if (label !== tooltipLabelRef.current) {
      setTextVisible(false)
      // Measure next label width via hidden measurer
      requestAnimationFrame(() => {
        tooltipLabelRef.current = label
        // Update measurer text
        if (measureRef.current) {
          measureRef.current.textContent = label
          const w = measureRef.current.getBoundingClientRect().width
          // container has px-2 (8px each side) -> add 16
          setTooltipWidth(Math.ceil(w + 16))
        }
        setTooltipLabel(label)
        if (textFadeTimeout.current) window.clearTimeout(textFadeTimeout.current)
        textFadeTimeout.current = window.setTimeout(() => setTextVisible(true), 16)
      })
    } else {
      setTextVisible(true)
    }
  }, [])

  const handlePointerMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const container = containerRef.current
    if (!container) return

    const targetButton = (e.target as HTMLElement).closest('[data-sidebar-menu-button]') as HTMLElement | null
    if (!targetButton) return

    const cRect = container.getBoundingClientRect()
    const tRect = targetButton.getBoundingClientRect()

    pendingDataRef.current = {
      clientY: e.clientY,
      label: targetButton.getAttribute('aria-label') || targetButton.textContent?.trim() || '',
      tRect,
      cRect,
    }

    if (!rafPendingRef.current) {
      rafPendingRef.current = true
      requestAnimationFrame(flushPointerFrame)
    }
  }, [flushPointerFrame])

  const handleLeave = React.useCallback(() => {
    setIndicator((prev) => ({ ...prev, visible: false }))
    setTooltip((prev) => ({ ...prev, visible: false }))
    setTextVisible(false)
  }, [])

  React.useEffect(() => () => { if (textFadeTimeout.current) window.clearTimeout(textFadeTimeout.current) }, [])

  const tooltipElement = portalMounted && tooltipContainerRef.current
    ? createPortal(
        <div
          aria-hidden
          className={cn(
            'pointer-events-none fixed z-[9999] rounded-md border border-border bg-background px-2 py-1 text-sm shadow tooltip-follow transition-[width,opacity,transform] duration-150 ease-out',
            textVisible && !open && tooltip.visible ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            top: tooltip.top,
            left: tooltip.left,
            transform: 'translateY(-50%)',
            width: tooltipWidth ?? 'auto',
            // Keep mounted, only toggle visibility
            visibility: !open && tooltip.visible ? 'visible' : 'hidden',
          }}
        >
          {/* Arrow: border (outer) */}
          <span
            className="pointer-events-none absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent border-transparent"
            style={{ borderRightColor: 'rgb(var(--border))' }}
            aria-hidden
          />
          {/* Arrow: fill (inner) */}
          <span
            className="pointer-events-none absolute left-[-7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-r-[7px] border-t-transparent border-b-transparent border-transparent"
            style={{ borderRightColor: 'rgb(var(--background))' }}
            aria-hidden
          />
          <span className={cn('block transition-opacity duration-150 whitespace-nowrap', textVisible ? 'opacity-100' : 'opacity-0')}>
            {tooltipLabel}
          </span>
          {/* Hidden measurer for smooth width animation */}
          <span ref={measureRef} className="absolute left-[-9999px] top-[-9999px] text-sm whitespace-nowrap" aria-hidden />
        </div>,
        tooltipContainerRef.current,
      )
    : null

  return (
    <>
      {tooltipElement}
      <ul
        ref={containerRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handleLeave}
        className={cn('relative px-1 py-2 space-y-1', className)}
        {...props}
      >
        <div
          aria-hidden
          className={cn('pointer-events-none absolute z-0 rounded-lg bg-primary-300/20 border border-border transition-all duration-200 ease-out', indicator.visible ? 'opacity-100' : 'opacity-0')}
          style={{ top: indicator.top, left: indicator.left, width: indicator.width, height: indicator.height }}
        />
        {children}
      </ul>
    </>
  )
}

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean
  disabled?: boolean
}

const SidebarMenuItemImpl = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(function SidebarMenuItem(
  { className, active, disabled, ...props },
  ref,
) {
  return (
    <li
      ref={ref}
      data-active={active ? '' : undefined}
      aria-disabled={disabled || undefined}
      className={cn('list-none relative z-10', className)}
      {...props}
    />
  )
})

export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  icon?: React.ReactNode
  endAdornment?: React.ReactNode
  label?: string
  href?: string
  active?: boolean
  disabled?: boolean
  itemId?: string
}

function SidebarMenuButtonImpl({ className, icon, endAdornment, label, href, active, disabled, itemId, children, ...props }: SidebarMenuButtonProps): JSX.Element {
  const { open } = useSidebarOpenContext()
  const { activeItem, setActiveItem } = useSidebarActiveItemContext()
  const inferredLabel = label ?? (typeof children === 'string' ? children : undefined)
  const computedActive = active ?? (itemId ? activeItem === itemId : false)
  const wasActiveRef = React.useRef<boolean>(computedActive)
  const [justActivated, setJustActivated] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!wasActiveRef.current && computedActive) {
      setJustActivated(true)
      const t = setTimeout(() => setJustActivated(false), 240)
      return () => clearTimeout(t)
    }
    wasActiveRef.current = computedActive
  }, [computedActive])

  const baseClass = cn(
    'w-full inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors transition-transform will-change-[transform]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    open ? 'justify-start' : 'justify-center',
    computedActive
      ? cn(
          'bg-gradient-to-b from-white to-primary-300/40 text-primary font-semibold border border-border shadow-[inset_0_-4px_0_0_rgb(var(--primary-400))] active:shadow-[inset_0_-3px_0_0_rgb(var(--primary-400))] active:from-white active:to-primary-300/30',
          justActivated && 'animate-sidebar-pop-in',
        )
      : cn('text-foreground hover:text-primary-500'),
    disabled && 'opacity-40 pointer-events-none text-muted-foreground',
    className,
  )

  const content = (
    <>
      {icon ? <span className="shrink-0 w-5 h-5 text-current" aria-hidden>{icon}</span> : null}
      {open ? <span className="flex-1 text-left truncate">{children}</span> : null}
      {endAdornment && open ? <span className="shrink-0 ml-auto" aria-hidden>{endAdornment}</span> : null}
    </>
  )

  const onClickAnchor = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      ;(props as any)?.onClick?.(e)
      if (!disabled && itemId && setActiveItem) setActiveItem(itemId)
    },
    [disabled, itemId, setActiveItem, props],
  )

  const onClickButton = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick?.(e)
      if (!disabled && itemId && setActiveItem) setActiveItem(itemId)
    },
    [disabled, itemId, setActiveItem, props],
  )

  const element = href ? (
    <a
      href={href}
      aria-current={computedActive ? 'page' : undefined}
      aria-label={!open ? inferredLabel : undefined}
      className={baseClass}
      data-sidebar-menu-button
      data-active={computedActive ? '' : undefined}
      onClick={onClickAnchor}
      {...(props as any)}
    >
      {content}
    </a>
  ) : (
    <button
      type="button"
      aria-label={!open ? inferredLabel : undefined}
      className={baseClass}
      data-sidebar-menu-button
      data-active={computedActive ? '' : undefined}
      disabled={disabled}
      onClick={onClickButton}
      {...props}
    >
      {content}
    </button>
  )

  return element
}

export interface SidebarMenuBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}
const SidebarMenuBadgeImpl = ({ className, ...props }: SidebarMenuBadgeProps): JSX.Element => (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-border px-1.5 text-2xs h-5',
        'bg-muted text-foreground/80',
        className,
      )}
      {...props}
    />
)

export interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}
const SidebarSeparatorImpl = ({ className, ...props }: SidebarSeparatorProps): JSX.Element => (
  <hr className={cn('border-t border-border my-4', className)} {...props} />
)

export const SidebarMenu = React.memo(SidebarMenuImpl)
export const SidebarMenuItem = React.memo(SidebarMenuItemImpl)
export const SidebarMenuButton = React.memo(SidebarMenuButtonImpl)
export const SidebarMenuBadge = React.memo(SidebarMenuBadgeImpl)
export const SidebarSeparator = React.memo(SidebarSeparatorImpl)


