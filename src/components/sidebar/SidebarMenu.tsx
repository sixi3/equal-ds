import React from 'react'
import { GripVertical } from 'lucide-react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/cn'
import { useSidebarOpenContext, useSidebarActiveItemContext } from './SidebarProvider'
import { useHoverAnimation } from '../../lib/useHoverAnimation'
import { HoverIndicator } from '../ui/HoverIndicator'

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Enable drag-to-reorder for items that opt-in via `SidebarMenuItem.dragId`.
   * When enabled, a drop indicator will appear and `onReorder` will be called
   * with the next item id order after a drop is completed.
   */
  reorderable?: boolean
  /**
   * Called with the next order of item ids after a successful drop.
   * Consumers should re-render children according to this order.
   */
  onReorder?: (nextOrder: string[]) => void
}
// Per-document tooltip root to avoid leaking a top-window overlay in Storybook
const tooltipRootMap: WeakMap<Document, HTMLElement> = new WeakMap()
function getTooltipRoot(doc: Document): HTMLElement | null {
  if (typeof window === 'undefined') return null
  const cached = tooltipRootMap.get(doc)
  if (cached && doc.body.contains(cached)) return cached
  const existing = doc.getElementById('eds-tooltip-root') as HTMLElement | null
  if (existing) {
    // Ensure the root never intercepts pointer interactions and doesn't create a page-sized box
    try {
      existing.style.pointerEvents = 'none'
      existing.style.position = 'relative'
      existing.style.width = '0'
      existing.style.height = '0'
      existing.style.overflow = 'visible'
      existing.setAttribute('inert', '')
      existing.setAttribute('aria-hidden', 'true')
    } catch {}
    tooltipRootMap.set(doc, existing)
    return existing
  }
  const el = doc.createElement('div')
  el.id = 'eds-tooltip-root'
  el.setAttribute('data-equal-ds', 'tooltip-root')
  // Make absolutely sure this root cannot block clicks in consuming apps (e.g., Storybook UI)
  try {
    el.style.pointerEvents = 'none'
    el.style.position = 'relative'
    el.style.width = '0'
    el.style.height = '0'
    el.style.overflow = 'visible'
    el.setAttribute('inert', '')
    el.setAttribute('aria-hidden', 'true')
  } catch {}
  doc.body.appendChild(el)
  tooltipRootMap.set(doc, el)
  return el
}

function measureItemRects(list: HTMLUListElement): Record<string, DOMRect> {
  const rects: Record<string, DOMRect> = {}
  list.querySelectorAll('li[data-drag-id]')?.forEach((el) => {
    const id = (el as HTMLElement).dataset.dragId
    if (id) rects[id] = el.getBoundingClientRect()
  })
  return rects
}

const DROP_THRESHOLD_PX = 12
const ITEM_INDICATOR_GAP_PX = 4

type DropIndicator = { top: number; left: number; width: number; visible: boolean }

type ReorderContextValue = {
  enabled: boolean
  registerItem?: (id: string, el: HTMLLIElement | null) => void
  onItemDragStart?: (e: React.DragEvent<HTMLLIElement>, id: string) => void
  onItemDragEnd?: (e: React.DragEvent<HTMLLIElement>, id: string) => void
}

const ReorderContext = React.createContext<ReorderContextValue | null>(null)
const ItemDragContext = React.createContext<{ draggable: boolean; dragId?: string } | null>(null)

function SidebarMenuImpl({ className, children, reorderable = false, onReorder, ...props }: SidebarMenuProps): JSX.Element {
  const { open, fullyOpen } = useSidebarOpenContext()
  
  // Use reusable hover animation hook
  const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
    itemSelector: '[data-sidebar-menu-button]',
    enabled: true
  })

  // Tooltip state (keeping this for collapsed sidebar tooltips)
  const [tooltip, setTooltip] = React.useState<{ top: number; left: number; visible: boolean }>({ top: 0, left: 0, visible: false })
  const [tooltipLabel, setTooltipLabel] = React.useState<string>('')
  const tooltipLabelRef = React.useRef<string>('')
  const [textVisible, setTextVisible] = React.useState<boolean>(false)
  const [tooltipWidth, setTooltipWidth] = React.useState<number | null>(null)
  const textFadeTimeout = React.useRef<number | null>(null)
  const measureRef = React.useRef<HTMLSpanElement | null>(null)

  // Drag/reorder state
  const draggingIdRef = React.useRef<string | null>(null)
  const overIdRef = React.useRef<string | null>(null)
  const atEndRef = React.useRef<boolean>(false)
  const [dropIndicator, setDropIndicator] = React.useState<DropIndicator>({ top: 0, left: 0, width: 0, visible: false })

  // Stable portal container per menu instance
  const tooltipContainerRef = React.useRef<HTMLElement | null>(null)
  const [portalMounted, setPortalMounted] = React.useState(false)
  React.useEffect(() => {
    if (typeof document === 'undefined') return
    const doc = document
    const root = getTooltipRoot(doc)
    if (!root) return
    const el = doc.createElement('div')
    // Container should also be transparent to pointer events and size-less
    try {
      el.style.pointerEvents = 'none'
      el.style.position = 'relative'
      el.style.width = '0'
      el.style.height = '0'
      el.style.overflow = 'visible'
      el.setAttribute('inert', '')
      el.setAttribute('aria-hidden', 'true')
    } catch {}
    tooltipContainerRef.current = el
    root.appendChild(el)
    setPortalMounted(true)
    return () => {
      if (root.contains(el)) root.removeChild(el)
      tooltipContainerRef.current = null
      setPortalMounted(false)
    }
  }, [])

  // Custom mouse move handler that combines hover animation and tooltip logic
  const handlePointerMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const container = e.currentTarget
    if (!container) return

    const targetButton = (e.target as HTMLElement).closest('[data-sidebar-menu-button]') as HTMLElement | null
    if (!targetButton) return

    const cRect = container.getBoundingClientRect()
    const tRect = targetButton.getBoundingClientRect()
    const label = targetButton.getAttribute('aria-label') || targetButton.textContent?.trim() || ''

    // Update tooltip position (fixed next to sidebar, ensure pixel-perfect positioning)
    const sidebarRight = Math.round(cRect.right)
    const tooltipTop = Math.round(e.clientY)
    const tooltipLeft = sidebarRight + 20
    setTooltip({ top: tooltipTop, left: tooltipLeft, visible: true })

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

    // Call the hover animation handler
    handleMouseMove(e)
  }, [handleMouseMove, setContainerRef])

  const handleLeave = React.useCallback(() => {
    handleMouseLeave()
    setTooltip((prev) => ({ ...prev, visible: false }))
    setTextVisible(false)
  }, [handleMouseLeave])

  React.useEffect(() => () => { if (textFadeTimeout.current) window.clearTimeout(textFadeTimeout.current) }, [])

  const tooltipElement = portalMounted && tooltipContainerRef.current
    ? createPortal(
        <div
          aria-hidden
          className={cn(
            'pointer-events-none fixed z-[9999] rounded-md border border-border-default bg-background-primary px-2 py-1 text-sm shadow tooltip-follow transition-[width,opacity] duration-150 ease-out antialiased',
            textVisible && !open && tooltip.visible ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            top: Math.round(tooltip.top),
            left: Math.round(tooltip.left),
            width: tooltipWidth ?? 'auto',
            // Keep mounted, only toggle visibility
            visibility: !open && tooltip.visible ? 'visible' : 'hidden',
          }}
        >
          {/* Arrow: border (outer) */}
          <span
            className="pointer-events-none absolute left-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent border-transparent"
            style={{ borderRightColor: 'var(--color-border-hover)' }}
            aria-hidden
          />
          {/* Arrow: fill (inner) */}
          <span
            className="pointer-events-none absolute left-[-7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-r-[7px] border-t-transparent border-b-transparent border-transparent"
            style={{ borderRightColor: 'var(--color-background-secondary)' }}
            aria-hidden
          />
          <span className={cn('block transition-opacity duration-150 whitespace-nowrap antialiased', textVisible ? 'opacity-100' : 'opacity-0')}>
            {tooltipLabel}
          </span>
          {/* Hidden measurer for smooth width animation */}
          <span ref={measureRef} className="absolute left-[-9999px] top-[-9999px] text-sm whitespace-nowrap" aria-hidden />
        </div>,
        tooltipContainerRef.current,
      )
    : null

  // Reorder handlers provided via context to items
  const registerItem = React.useCallback((_id: string, _el: HTMLLIElement | null) => {
    // No-op: DOM is queried directly for ordering operations
  }, [])

  const updateDropIndicator = React.useCallback((targetEl: HTMLElement, atEnd?: boolean) => {
    // Find the specific menu container that contains the target element
    const container = targetEl.closest('[data-sidebar-menu]') as HTMLElement
    if (!container) return
    const cRect = container.getBoundingClientRect()
    const tRect = targetEl.getBoundingClientRect()
    // Show indicator precisely at the boundary with a small gap
    const top = atEnd ? (tRect.bottom + ITEM_INDICATOR_GAP_PX) : (tRect.top - ITEM_INDICATOR_GAP_PX)
    setDropIndicator({
      top: top - cRect.top + (container.scrollTop ?? 0),
      left: tRect.left - cRect.left + (container.scrollLeft ?? 0),
      width: tRect.width,
      visible: true,
    })
  }, [])

  const handleItemDragStart = React.useCallback((e: React.DragEvent<HTMLLIElement>, id: string) => {
    if (!reorderable) return
    draggingIdRef.current = id
    overIdRef.current = null
    try { e.dataTransfer.setData('text/plain', id) } catch {}
    e.dataTransfer.effectAllowed = 'move'
  }, [reorderable])

  // Container-level drag over to avoid dead zones between items
  const handleListDragOver = React.useCallback((e: React.DragEvent<HTMLUListElement>) => {
    if (!reorderable) return
    const draggingId = draggingIdRef.current
    if (!draggingId) return
    e.preventDefault()
    const list = e.currentTarget
    if (!list) return
    const items = Array.from(list.querySelectorAll('li[data-drag-id]')) as HTMLElement[]
    if (items.length === 0) return
    // Find nearest boundary
    let targetEl: HTMLElement = items[0]
    let atEndLocal = false
    for (let i = 0; i < items.length; i++) {
      const it = items[i]
      const rect = it.getBoundingClientRect()
      if (e.clientY < rect.top + DROP_THRESHOLD_PX) { targetEl = it; atEndLocal = false; break }
      const isLast = i === items.length - 1
      if (!isLast && e.clientY < rect.bottom + DROP_THRESHOLD_PX) { targetEl = it; atEndLocal = false; break }
      if (isLast) { targetEl = it; atEndLocal = e.clientY >= rect.bottom - DROP_THRESHOLD_PX }
    }
    const overId = targetEl.dataset.dragId || null
    if (overId) {
      // If hovering the dragged item itself, it's a no-op: hide indicator
      if (overId === draggingId) {
        setDropIndicator((prev) => ({ ...prev, visible: false }))
        e.dataTransfer.dropEffect = 'none'
        return
      }
      overIdRef.current = overId
      atEndRef.current = atEndLocal
      updateDropIndicator(targetEl, atEndLocal)
      e.dataTransfer.dropEffect = 'move'
    }
  }, [reorderable, updateDropIndicator])

  const computeNextOrder = React.useCallback((): string[] | null => {
    const draggingId = draggingIdRef.current
    const overId = overIdRef.current
    const atEnd = atEndRef.current
    if (!draggingId || !overId) return null
    
    // Find the specific menu container that contains the dragged item
    const draggedElement = document.querySelector(`li[data-drag-id="${draggingId}"]`) as HTMLElement
    if (!draggedElement) return null
    const container = draggedElement.closest('[data-sidebar-menu]') as HTMLElement
    if (!container) return null
    
    const ids = Array.from(container.querySelectorAll('li[data-drag-id]')).map((el) => (el as HTMLElement).dataset.dragId!).filter(Boolean)
    const fromIndex = ids.indexOf(draggingId)
    const toIndex = ids.indexOf(overId)
    if (fromIndex === -1 || toIndex === -1) return null
    const next = ids.filter((x) => x !== draggingId)

    let insertionIndex: number
    if (atEnd) {
      // Insert after the last item
      insertionIndex = next.length
    } else {
      // Insert before the hovered target
      insertionIndex = toIndex
      if (toIndex > fromIndex) insertionIndex = toIndex - 1
    }

    insertionIndex = Math.max(0, Math.min(next.length, insertionIndex))
    next.splice(insertionIndex, 0, draggingId)
    return next
  }, [])

  const clearDragState = React.useCallback(() => {
    draggingIdRef.current = null
    overIdRef.current = null
    atEndRef.current = false
    setDropIndicator((prev) => ({ ...prev, visible: false }))
  }, [])

  const handleListDrop = React.useCallback((e: React.DragEvent<HTMLUListElement>) => {
    if (!reorderable) return
    e.preventDefault()
    const draggedId = draggingIdRef.current
    const next = computeNextOrder()
    clearDragState()
    if (next && onReorder) {
      onReorder(next)
      if (draggedId) {
        requestAnimationFrame(() => {
          const l = e.currentTarget
          if (!l) return
          const el = l.querySelector(`li[data-drag-id="${draggedId}"]`) as HTMLElement | null
          if (!el) return
          el.classList.add('animate-sidebar-pop-in')
          const onEnd = () => {
            el.classList.remove('animate-sidebar-pop-in')
            el.removeEventListener('animationend', onEnd)
          }
          el.addEventListener('animationend', onEnd)
        })
      }
    }
  }, [reorderable, computeNextOrder, clearDragState, onReorder])

  const handleItemDragEnd = React.useCallback((e: React.DragEvent<HTMLLIElement>, _id: string) => {
    if (!reorderable) return
    clearDragState()
  }, [reorderable, clearDragState])

  const reorderContextValue = React.useMemo<ReorderContextValue>(() => ({
    enabled: Boolean(reorderable && open),
    registerItem,
    onItemDragStart: handleItemDragStart,
    onItemDragEnd: handleItemDragEnd,
  }), [reorderable, open, registerItem, handleItemDragStart, handleItemDragEnd])

  return (
    <>
      {tooltipElement}
      <ReorderContext.Provider value={reorderContextValue}>
        <ul
          ref={setContainerRef}
          data-sidebar-menu
          onDragOver={handleListDragOver}
          onDrop={handleListDrop}
          onMouseMove={handlePointerMove}
          onMouseLeave={() => {
            handleLeave()
            setDropIndicator((prev) => ({ ...prev, visible: false }))
          }}
          className={cn('relative px-1 py-2', className)}
          {...props}
        >
          <HoverIndicator indicator={indicator} variant="default" zIndex={0} />
          {children}
          {/* Drop indicator bar for reordering (on top of items) */}
          <div
            aria-hidden
            className={cn('pointer-events-none absolute z-[100] h-[2px] transition-all duration-75 ease-out bg-primary-400', dropIndicator.visible && reorderable ? 'opacity-100' : 'opacity-0')}
            style={{ 
              top: dropIndicator.top, 
              left: dropIndicator.left, 
              width: dropIndicator.width
            }}
          />
        </ul>
      </ReorderContext.Provider>
    </>
  )
}

export interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean
  disabled?: boolean
  /**
   * Enable native dragging for this item when the parent menu has `reorderable` enabled.
   */
  draggable?: boolean
  /**
   * Stable id for this item, used for reorder calculations. Required when `draggable` is true.
   */
  dragId?: string
}

const SidebarMenuItemImpl = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(function SidebarMenuItem(
  { className, active, disabled, draggable: draggableProp, dragId, onDragStart, onDragOver, onDrop, onDragEnd, ...props },
  ref,
) {
  const reorderCtx = React.useContext(ReorderContext)
  const draggable = Boolean(draggableProp && reorderCtx?.enabled)

  const composedDragEnd = React.useCallback((e: React.DragEvent<HTMLLIElement>) => {
    onDragEnd?.(e)
    if (draggable && dragId && reorderCtx?.onItemDragEnd) reorderCtx.onItemDragEnd(e, dragId)
  }, [onDragEnd, draggable, dragId, reorderCtx])

  const setRef = React.useCallback((node: HTMLLIElement | null) => {
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as React.MutableRefObject<HTMLLIElement | null>).current = node
    if (draggable && dragId && reorderCtx?.registerItem) reorderCtx.registerItem(dragId, node)
  }, [ref, draggable, dragId, reorderCtx])

  return (
    <li
      ref={setRef}
      data-active={active ? '' : undefined}
      aria-disabled={disabled || undefined}
      className={cn('list-none relative z-10 group/reorder py-1', className)}
      data-drag-id={draggable && dragId ? dragId : undefined}
      onDragEnd={composedDragEnd}
      {...props}
    >
      <ItemDragContext.Provider value={{ draggable, dragId }}>
        {props.children}
      </ItemDragContext.Provider>
    </li>
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
  const { open, fullyOpen } = useSidebarOpenContext()
  const { activeItem, setActiveItem } = useSidebarActiveItemContext()
  const reorderCtx = React.useContext(ReorderContext)
  const itemDrag = React.useContext(ItemDragContext)
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
    'w-full inline-flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ease-out will-change-[transform] h-10',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
    open ? 'justify-start' : 'justify-center',
    // Base styles for all tabs (prevents layout shift)
    'border border-transparent border-b-[2px]',
    computedActive
      ? cn(
          'bg-gradient-to-b from-background-primary to-primary-50 text-text-primary font-medium tracking-wide border-border-hover border-b-primary-400',
          justActivated && 'animate-sidebar-pop-in',
        )
      : cn('text-text-secondary font-normal tracking-wide hover:text-text-primary'),
    disabled && 'opacity-40 pointer-events-none text-text-muted',
    className,
  )

  // Custom drag preview so users see both handle and the tab name while dragging
  const dragPreviewRef = React.useRef<HTMLDivElement | null>(null)
  const createDragPreview = React.useCallback((e: React.DragEvent) => {
    if (!e.dataTransfer) return
    const current = e.currentTarget as HTMLElement
    const btn = current.closest('[data-sidebar-menu-button]') as HTMLElement | null
    const labelText = (btn?.getAttribute('aria-label') || btn?.textContent || inferredLabel || '').toString().trim()
    const doc = current.ownerDocument || document
    const el = doc.createElement('div')
    el.style.pointerEvents = 'none'
    el.style.position = 'fixed'
    el.style.top = '-9999px'
    el.style.left = '-9999px'
    el.style.zIndex = '2147483647'
    el.style.display = 'inline-flex'
    el.style.alignItems = 'center'
    el.style.gap = '8px'
    el.style.padding = '6px 10px'
    el.style.borderRadius = '8px'
    el.style.border = '1px solid var(--color-border-default)'
    el.style.background = 'var(--color-background-secondary)'
    el.style.boxShadow = 'var(--shadow-md)'
    el.style.color = 'rgb(var(--color-text-primary))'

    // Try to clone the handle SVG if present for fidelity
    const svg = current.querySelector('svg')?.cloneNode(true) as SVGElement | null
    if (svg) {
      const wrap = doc.createElement('span')
      wrap.style.display = 'inline-flex'
      wrap.style.width = '20px'
      wrap.style.height = '20px'
      wrap.style.color = 'rgb(var(--color-text-muted))'
      wrap.appendChild(svg)
      el.appendChild(wrap)
    }
    const text = doc.createElement('span')
    text.textContent = labelText
    text.style.fontSize = '12px'
    text.style.fontWeight = '500'
    text.style.whiteSpace = 'nowrap'
    el.appendChild(text)

    doc.body.appendChild(el)
    try { e.dataTransfer.setDragImage(el, 12, 14) } catch {}
    dragPreviewRef.current = el
  }, [inferredLabel])

  const cleanupDragPreview = React.useCallback(() => {
    const el = dragPreviewRef.current
    if (el && el.parentNode) el.parentNode.removeChild(el)
    dragPreviewRef.current = null
  }, [])

  const content = (
    <>
      {icon ? (
        <span className="shrink-0 w-5 h-5 text-current transition-colors duration-200 ease-out relative group/icon" aria-hidden>
          {/* Original icon, hidden on hover when reordering is available */}
          <span className={cn('absolute inset-0 transition-opacity', (reorderCtx?.enabled && itemDrag?.draggable && itemDrag.dragId) ? 'opacity-100 group-hover/icon:opacity-0' : 'opacity-100')}>
            {icon}
          </span>
          {/* Drag handle, shown on hover when reordering is available */}
          {(reorderCtx?.enabled && itemDrag?.draggable && itemDrag.dragId) ? (
            <span
              className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 cursor-grab active:cursor-grabbing flex items-center justify-center"
              draggable
              onClick={(e) => e.preventDefault()}
              onDragStart={(e) => {
                createDragPreview(e)
                if (itemDrag?.dragId) reorderCtx?.onItemDragStart?.(e as any, itemDrag.dragId!)
              }}
              onDragEnd={(e) => {
                cleanupDragPreview()
                if (itemDrag?.dragId) reorderCtx?.onItemDragEnd?.(e as any, itemDrag.dragId!)
              }}
            >
              <GripVertical className="w-5 h-5" />
            </span>
          ) : null}
        </span>
      ) : null}
      {fullyOpen ? <span className="flex-1 text-left leading-normal break-words transition-colors duration-200 ease-out animate-sidebar-text-fade-in">{children}</span> : null}
      {endAdornment && fullyOpen ? <span className="shrink-0 ml-auto transition-colors duration-200 ease-out animate-sidebar-text-fade-in" aria-hidden>{endAdornment}</span> : null}
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
        'inline-flex items-center justify-center rounded-full border border-border-default px-1.5 text-2xs h-5',
        'bg-background-tertiary text-text-muted',
        className,
      )}
      {...props}
    />
)

export interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}
const SidebarSeparatorImpl = ({ className, ...props }: SidebarSeparatorProps): JSX.Element => (
          <hr className={cn('border-t border-border-default my-4', className)} {...props} />
)

export const SidebarMenu = React.memo(SidebarMenuImpl)
export const SidebarMenuItem = React.memo(SidebarMenuItemImpl)
export const SidebarMenuButton = React.memo(SidebarMenuButtonImpl)
export const SidebarMenuBadge = React.memo(SidebarMenuBadgeImpl)
export const SidebarSeparator = React.memo(SidebarSeparatorImpl)


