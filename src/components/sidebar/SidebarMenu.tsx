import React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { cn } from '../../lib/cn'
import { useSidebarContext } from './SidebarProvider'

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}
export function SidebarMenu({ className, children, ...props }: SidebarMenuProps): JSX.Element {
  const containerRef = React.useRef<HTMLUListElement | null>(null)
  const [indicator, setIndicator] = React.useState<{ top: number; left: number; width: number; height: number; visible: boolean }>({ top: 0, left: 0, width: 0, height: 0, visible: false })

  const handlePointerMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const container = containerRef.current
    if (!container) return

    const targetButton = (e.target as HTMLElement).closest('[data-sidebar-menu-button]') as HTMLElement | null
    if (!targetButton) return

    const cRect = container.getBoundingClientRect()
    const tRect = targetButton.getBoundingClientRect()

    setIndicator({
      top: tRect.top - cRect.top + container.scrollTop,
      left: tRect.left - cRect.left + container.scrollLeft,
      width: tRect.width,
      height: tRect.height,
      visible: true,
    })
  }, [])

  const handleLeave = React.useCallback(() => {
    setIndicator((prev) => ({ ...prev, visible: false }))
  }, [])

  return (
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
  )
}

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean
  disabled?: boolean
}

export function SidebarMenuItem({ className, active, disabled, ...props }: SidebarMenuItemProps): JSX.Element {
  return (
    <li
      data-active={active ? '' : undefined}
      aria-disabled={disabled || undefined}
      className={cn('list-none relative z-10', className)}
      {...props}
    />
  )
}

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

export function SidebarMenuButton({ className, icon, endAdornment, label, href, active, disabled, itemId, children, ...props }: SidebarMenuButtonProps): JSX.Element {
  const { open, activeItem, setActiveItem } = useSidebarContext()
  const inferredLabel = label ?? (typeof children === 'string' ? children : undefined)
  const computedActive = active ?? (itemId ? activeItem === itemId : false)
  const wasActiveRef = React.useRef<boolean>(computedActive)
  const [justActivated, setJustActivated] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (!wasActiveRef.current && computedActive) {
      setJustActivated(true)
      const t = setTimeout(() => setJustActivated(false), 180)
      return () => clearTimeout(t)
    }
    wasActiveRef.current = computedActive
  }, [computedActive])

  const baseClass = cn(
    'w-full inline-flex items-center rounded-lg py-2.5 text-sm',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'transition-[color,transform] duration-200 ease-out',
    // Keep left alignment and consistent spacing to prevent horizontal jumps
    'justify-start px-3 gap-3',
    computedActive
      ? cn(
          'bg-gradient-to-b from-white to-primary-300/40 text-primary font-semibold border-t border-l border-r border-b-4 border-primary-400 active:border-primary-400/60 active:from-white active:to-primary-300/30 active:translate-y-[1px]',
          justActivated && 'animate-sidebar-pop-in',
        )
      : cn('text-foreground hover:text-primary-500'),
    disabled && 'opacity-40 pointer-events-none text-muted-foreground',
    className,
  )

  const content = (
    <>
      {icon ? (
        <span className={cn('shrink-0 w-5 h-5 text-current')} aria-hidden>
          {icon}
        </span>
      ) : null}
      <span
        className={cn(
          'text-left truncate overflow-hidden transition-[opacity,max-width,transform] duration-200 ease-out',
          open ? 'flex-1 opacity-100 max-w-[240px] translate-x-0' : 'flex-none opacity-0 max-w-0 -translate-x-1',
        )}
      >
        {children}
      </span>
      {endAdornment && open ? <span className="shrink-0 ml-auto" aria-hidden>{endAdornment}</span> : null}
    </>
  )

  const element = href ? (
    <a
      href={href}
      aria-current={computedActive ? 'page' : undefined}
      aria-label={!open ? inferredLabel : undefined}
      className={baseClass}
      data-sidebar-menu-button
      data-active={computedActive ? '' : undefined}
      onClick={(e) => {
        ;(props as any)?.onClick?.(e)
        if (!disabled && itemId && setActiveItem) {
          setActiveItem(itemId)
        }
      }}
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
      onClick={(e) => {
        props.onClick?.(e)
        if (!disabled && itemId && setActiveItem) {
          setActiveItem(itemId)
        }
      }}
      {...props}
    >
      {content}
    </button>
  )

  if (open || !inferredLabel) return element

  return (
    <Tooltip.Provider delayDuration={120}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{element}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="right" align="center" sideOffset={8} className={cn('z-50 rounded-md border border-border bg-background px-2 py-1 text-sm shadow')}>{inferredLabel}</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export interface SidebarMenuBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}
export function SidebarMenuBadge({ className, ...props }: SidebarMenuBadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-border px-1.5 text-2xs h-5',
        'bg-muted text-foreground/80',
        className,
      )}
      {...props}
    />
  )
}

export interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}
export function SidebarSeparator({ className, ...props }: SidebarSeparatorProps): JSX.Element {
  return <hr className={cn('border-t border-border my-4', className)} {...props} />
}


