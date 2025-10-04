import React from 'react'
import { GripVertical } from 'lucide-react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { DraggableAttributes } from '@dnd-kit/core'
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

function collectDragIds(children: React.ReactNode): string[] {
  const ids: string[] = []
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === React.Fragment) {
      ids.push(...collectDragIds(child.props.children))
      return
    }
    if (child.props?.children) {
      ids.push(...collectDragIds(child.props.children))
    }
    const maybeDragId = (child.props as { dragId?: string; draggable?: boolean }).dragId
    const isDraggable = (child.props as { draggable?: boolean }).draggable
    if (maybeDragId && isDraggable) ids.push(String(maybeDragId))
  })
  return ids
}

type ItemDragContextValue = {
  draggable: boolean
  dragId?: string
  attributes?: DraggableAttributes
  listeners?: any
  setNodeRef?: (node: HTMLElement | null) => void
  transform?: React.CSSProperties['transform']
  transition?: string | null
  isDragging?: boolean
}

const ItemDragContext = React.createContext<ItemDragContextValue | null>(null)

const SortableMenuContext = React.createContext<{ enabled: boolean }>({ enabled: false })

function SidebarMenuImpl({ className, children, reorderable = false, onReorder, ...props }: SidebarMenuProps): JSX.Element {
  const { open, fullyOpen } = useSidebarOpenContext()

  const sortableEnabled = Boolean(reorderable && open)
  const [isDragging, setIsDragging] = React.useState(false)

  const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
    itemSelector: '[data-sidebar-menu-button]',
    enabled: !isDragging,
  })

  const [tooltip, setTooltip] = React.useState<{ top: number; left: number; visible: boolean }>({ top: 0, left: 0, visible: false })
  const [tooltipLabel, setTooltipLabel] = React.useState<string>('')
  const tooltipLabelRef = React.useRef<string>('')
  const [textVisible, setTextVisible] = React.useState<boolean>(false)
  const textFadeTimeout = React.useRef<number | null>(null)
  const measureRef = React.useRef<HTMLSpanElement | null>(null)

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))
  const sortableIds = React.useMemo(() => collectDragIds(children), [children])

  const handleDragStart = React.useCallback(() => {
    if (!reorderable) return
    setIsDragging(true)
  }, [reorderable])

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    if (!reorderable) return
    const { active, over } = event
    if (!over || active.id === over.id) {
      setIsDragging(false)
      return
    }
    const activeId = String(active.id)
    const overId = String(over.id)
    const currentOrder = sortableIds
    const oldIndex = currentOrder.indexOf(activeId)
    const newIndex = currentOrder.indexOf(overId)
    if (oldIndex === -1 || newIndex === -1) {
      setIsDragging(false)
      return
    }
    const next = arrayMove(currentOrder, oldIndex, newIndex)
    onReorder?.(next)
    setIsDragging(false)
  }, [reorderable, sortableIds, onReorder])

  const handleDragCancel = React.useCallback(() => {
    setIsDragging(false)
  }, [])

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
    if (isDragging) return
    const container = e.currentTarget
    if (!container) return

    const targetButton = (e.target as HTMLElement).closest('[data-sidebar-menu-button]') as HTMLElement | null
    if (!targetButton) return

    const cRect = container.getBoundingClientRect()
    const label = targetButton.getAttribute('aria-label') || targetButton.textContent?.trim() || ''

    const sidebarRight = Math.round(cRect.right)
    const tooltipTop = Math.round(e.clientY)
    const tooltipLeft = sidebarRight + 20
    setTooltip({ top: tooltipTop, left: tooltipLeft, visible: true })

    if (label !== tooltipLabelRef.current) {
      setTextVisible(false)
      requestAnimationFrame(() => {
        tooltipLabelRef.current = label
        if (measureRef.current) {
          measureRef.current.textContent = label
        }
        setTooltipLabel(label)
        if (textFadeTimeout.current) window.clearTimeout(textFadeTimeout.current)
        textFadeTimeout.current = window.setTimeout(() => setTextVisible(true), 16)
      })
    } else {
      setTextVisible(true)
    }

    handleMouseMove(e)
  }, [handleMouseMove, isDragging])

  const handleLeave = React.useCallback(() => {
    handleMouseLeave()
    setTooltip((prev) => ({ ...prev, visible: false }))
    setTextVisible(false)
  }, [handleMouseLeave])

  React.useEffect(() => () => { if (textFadeTimeout.current) window.clearTimeout(textFadeTimeout.current) }, [])

  const tooltipElement =
    portalMounted && tooltipContainerRef.current
      ? createPortal(
          <div
            aria-hidden
            className={cn(
              'pointer-events-none fixed z-[9999] rounded-md border border-border-default bg-background-primary px-2 py-1 text-sm shadow tooltip-follow transition-[opacity] duration-150 ease-out antialiased',
              textVisible && !open && tooltip.visible ? 'opacity-100' : 'opacity-0',
            )}
            style={{
              top: Math.round(tooltip.top),
              left: Math.round(tooltip.left),
              visibility: !open && tooltip.visible ? 'visible' : 'hidden',
            }}
          >
            {/* Arrow: border (outer) */}
            <span
              className="pointer-events-none absolute left-[-8px] top-1/2 -translate-y-1/2 h-0 w-0 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent border-transparent"
              style={{ borderRightColor: 'var(--color-border-hover)' }}
              aria-hidden
            />
            {/* Arrow: fill (inner) */}
            <span
              className="pointer-events-none absolute left-[-7px] top-1/2 -translate-y-1/2 h-0 w-0 border-t-[5px] border-b-[5px] border-r-[7px] border-t-transparent border-b-transparent border-transparent"
              style={{ borderRightColor: 'var(--color-background-secondary)' }}
              aria-hidden
            />
            <span className={cn('block whitespace-nowrap transition-opacity duration-150 antialiased', textVisible ? 'opacity-100' : 'opacity-0')}>
              {tooltipLabel}
            </span>
            {/* Hidden measurer for smooth width animation */}
            <span ref={measureRef} className="absolute left-[-9999px] top-[-9999px] whitespace-nowrap text-sm" aria-hidden />
          </div>,
          tooltipContainerRef.current,
        )
      : null

  return (
    <>
      {tooltipElement}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
          <SortableMenuContext.Provider value={{ enabled: sortableEnabled }}>
            <ul
              ref={setContainerRef}
              data-sidebar-menu
              onMouseMove={handlePointerMove}
              onMouseLeave={() => {
                handleLeave()
              }}
              className={cn('relative px-1 py-2', className)}
              {...props}
            >
              {!isDragging ? <HoverIndicator indicator={indicator} variant="default" zIndex={0} /> : null}
              {children}
            </ul>
          </SortableMenuContext.Provider>
        </SortableContext>
      </DndContext>
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
  { className, active, disabled, draggable: draggableProp, dragId, ...props },
  ref,
) {
  const sortableCtx = React.useContext(SortableMenuContext)
  const enabled = Boolean(sortableCtx.enabled && draggableProp && dragId)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: dragId ?? '', disabled: !enabled })

  const appliedListeners = enabled ? listeners : undefined
  const appliedAttributes = enabled ? attributes : undefined

  const mergedRef = React.useCallback(
    (node: HTMLLIElement | null) => {
      setNodeRef(node)
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLLIElement | null>).current = node
    },
    [setNodeRef, ref],
  )

  const style = React.useMemo<React.CSSProperties>(() => ({
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition ?? undefined,
  }), [transform, transition])

  const providerValue = React.useMemo<ItemDragContextValue>(() => ({
    draggable: enabled,
    dragId,
    attributes: appliedAttributes,
    listeners: appliedListeners,
    setNodeRef,
    transform: style.transform,
    transition: style.transition,
    isDragging,
  }), [enabled, dragId, appliedAttributes, appliedListeners, setNodeRef, style.transform, style.transition, isDragging])

  return (
    <li
      ref={mergedRef}
      data-active={active ? '' : undefined}
      aria-disabled={disabled || undefined}
      className={cn('list-none relative z-10 group/reorder py-1', isDragging && 'opacity-70', className)}
      data-drag-id={enabled && dragId ? dragId : undefined}
      style={style}
      {...props}
    >
      <ItemDragContext.Provider value={providerValue}>{props.children}</ItemDragContext.Provider>
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
  const itemDrag = React.useContext(ItemDragContext)
  const sortableCtx = React.useContext(SortableMenuContext)
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
    'w-full inline-flex items-center gap-3 rounded-lg px-3  text-sm transition-all duration-200 ease-out will-change-[transform] h-10',
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

  const content = (
    <>
      {icon ? (
        <span className="shrink-0 w-5 h-5 text-current transition-colors duration-200 ease-out relative group/icon" aria-hidden>
          <span className={cn('absolute inset-0 transition-opacity', (itemDrag?.draggable && itemDrag.dragId) ? 'opacity-100 group-hover/icon:opacity-0' : 'opacity-100')}>
            {icon}
          </span>
          {(itemDrag?.draggable && itemDrag.dragId && sortableCtx.enabled) ? (
            <span
              className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 cursor-grab active:cursor-grabbing flex items-center justify-center"
              role="presentation"
              {...itemDrag.listeners}
              {...itemDrag.attributes}
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


