import React from 'react'
import { cn } from '../../lib/cn'
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors, DragOverEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { useSidebarOpenContext } from './SidebarProvider'
import { SortableGroupContext } from './SortableGroupContext'
import * as Collapsible from '@radix-ui/react-collapsible'

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  reorderGroups?: boolean
  defaultGroupOrder?: string[]
  groupOrder?: string[]
  onGroupOrderChange?: (next: string[]) => void
}

interface SortableGroupWrapperProps { id: string; children: React.ReactNode }
function SortableGroupWrapper({ id, children }: SortableGroupWrapperProps): JSX.Element {
  const sortable = useSortable({ id })
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = sortable
  const ctx = React.useMemo(
    () => ({ active: true, attributes, listeners, setNodeRef, transform, transition, isDragging, id }),
    [attributes, listeners, setNodeRef, transform, transition, isDragging, id],
  )
  return <SortableGroupContext.Provider value={ctx}>{children}</SortableGroupContext.Provider>
}

function GroupChip(): JSX.Element {
  return (
    <div className="rounded-md border border-border bg-background px-2 py-1 opacity-95 text-xs font-medium uppercase tracking-wide text-muted-foreground">
      Release when done to reorder
    </div>
  )
}

function InsertionIndicator({ containerRef, beforeId, ids }: { containerRef: React.RefObject<HTMLDivElement>; beforeId: string; ids: string[] }) {
  const [style, setStyle] = React.useState<React.CSSProperties | null>(null)
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const item = container.querySelector(`[data-id='${beforeId}']`) as HTMLElement | null
    const rect = item?.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    if (rect) {
      setStyle({
        position: 'absolute',
        top: rect.top - containerRect.top + (container.scrollTop ?? 0) - 3,
        left: 8,
        right: 8,
        height: 3,
        background: 'rgb(var(--primary-400))',
        boxShadow: `0 0 0 1px rgb(var(--border))`,
        borderRadius: 1.5,
        opacity: 0.9,
        transition: 'top 120ms ease-out',
      })
    } else {
      setStyle(null)
    }
  }, [beforeId, containerRef, ids.join('|')])
  if (!style) return null
  return <div aria-hidden className="pointer-events-none z-10" style={style} />
}

function SidebarContentImpl({ className, children, reorderGroups = false, defaultGroupOrder, groupOrder, onGroupOrderChange, ...props }: SidebarContentProps): JSX.Element {
  const { open } = useSidebarOpenContext()
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const [showTopFade, setShowTopFade] = React.useState(false)
  const [showBottomFade, setShowBottomFade] = React.useState(false)

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

  const scrollStyles = React.useMemo(() => ({ scrollbarWidth: 'none', msOverflowStyle: 'none' } as const), [])

  // Reorder logic: collect direct child SidebarGroup nodes and their ids (memoized)
  const groupChildren = React.useMemo(() => {
    const childArray = React.Children.toArray(children) as React.ReactElement[]
    return childArray.filter((child) => React.isValidElement(child) && (child.type as any)?.displayName !== 'SidebarSeparator')
  }, [children])
  const groupIds = React.useMemo(() => {
    return (groupChildren
      .map((child) => (child.props?.id as string | undefined))
      .filter(Boolean) as string[])
  }, [groupChildren])

  const initialOrder = React.useMemo<string[]>(() => {
    if (Array.isArray(groupOrder) && groupOrder.length) return groupOrder
    if (Array.isArray(defaultGroupOrder) && defaultGroupOrder.length) return defaultGroupOrder
    return groupIds
  }, [groupOrder, defaultGroupOrder, groupIds])

  const initialOrderHash = React.useMemo(() => (Array.isArray(initialOrder) ? initialOrder.join('|') : ''), [initialOrder])

  const [internalOrder, setInternalOrder] = React.useState<string[]>(initialOrder)
  React.useEffect(() => {
    setInternalOrder(initialOrder)
  }, [initialOrderHash])

  const currentOrder: string[] = Array.isArray(groupOrder) ? groupOrder : internalOrder ?? []

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  )

  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [pressedHandle, setPressedHandle] = React.useState<boolean>(false)
  const [overId, setOverId] = React.useState<string | null>(null)
  const dragging = Boolean(activeId)

  const handleDragStart = React.useCallback((event: any) => {
    setActiveId(event.active?.id ?? null)
    setPressedHandle(true)
  }, [])

  const handleDragOver = React.useCallback((event: DragOverEvent) => {
    const { over } = event
    setOverId(over ? String(over.id) : null)
  }, [])

  const clearDragState = React.useCallback(() => {
    setActiveId(null)
    setPressedHandle(false)
    setOverId(null)
  }, [])

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event
    clearDragState()
    // Proactively blur any focused drag handle to ensure it fades
    requestAnimationFrame(() => {
      const focused = document.activeElement as HTMLElement | null
      if (focused && focused.hasAttribute('data-drag-handle')) {
        focused.blur()
      }
    })
    if (!over || active.id === over.id) return
    const oldIndex = currentOrder.indexOf(String(active.id))
    const newIndex = currentOrder.indexOf(String(over.id))
    if (oldIndex < 0 || newIndex < 0) return
    const next = arrayMove(currentOrder, oldIndex, newIndex)
    if (onGroupOrderChange) onGroupOrderChange(next)
    if (!groupOrder) setInternalOrder(next)
  }, [currentOrder, onGroupOrderChange, groupOrder, clearDragState])

  const handleDragCancel = React.useCallback(() => {
    clearDragState()
  }, [clearDragState])

  React.useEffect(() => {
    if (!pressedHandle) return
    const onUp = () => {
      if (!activeId) setPressedHandle(false)
    }
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [pressedHandle, activeId])

  const renderWithOrder = React.useMemo(() => {
    if (!reorderGroups) return children
    const map = new Map<string, React.ReactElement>()
    for (const child of groupChildren) {
      const id = child.props?.id as string | undefined
      if (id) map.set(id, child)
    }
    return currentOrder.map((id) => map.get(id) ?? null)
  }, [reorderGroups, children, groupChildren, currentOrder])

  const contentBody = (
    <div className={cn('relative flex-1 min-h-0', className)} data-dragging={dragging ? '' : undefined} {...props}>
      <div
        ref={scrollRef}
        className={cn(
          'px-2 py-3 space-y-8 h-full overflow-y-auto',
          'overscroll-contain',
        )}
        data-dragging={dragging ? '' : undefined}
        style={scrollStyles}
        /* Hide webkit scrollbar */
        onScrollCapture={() => {
          if (!scrollRef.current) return
          // no-op trigger to ensure style applies
          scrollRef.current.style.setProperty('--_noop', '1')
        }}
        onMouseLeave={() => {
          // Ensure any pressed state resets when cursor leaves sidebar
          if (!activeId) {
            setPressedHandle(false)
            setOverId(null)
          }
        }}
      >
        {reorderGroups && open ? (
          <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
            <SortableContext items={currentOrder} strategy={verticalListSortingStrategy}>
              {(currentOrder ?? []).map((id) => {
                const original = groupChildren.find((c) => c.props?.id === id)
                if (!original) return null
                return (
                  <SortableGroupContext.Provider key={id} value={{ active: true, onHandlePress: () => setPressedHandle(true), id, isOver: overId === id, dragging, isActive: activeId === id }}>
                    <SortableGroupWrapper id={id}>
                      {pressedHandle ? React.cloneElement(original, { open: false }) : original}
                    </SortableGroupWrapper>
                  </SortableGroupContext.Provider>
                )
              })}
            </SortableContext>
            {/* insertion indicator removed in favor of background highlight on hovered group */}
            {/* No preview overlay during drag */}
          </DndContext>
        ) : (
          renderWithOrder
        )}
      </div>
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-10 z-10 bg-gradient-to-b from-gray-600/20 to-transparent transition-opacity duration-200',
          showTopFade ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 h-10 z-10 bg-gradient-to-t from-gray-600/20 to-transparent transition-opacity duration-200',
          showBottomFade ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )

  return contentBody
}

export const SidebarContent = React.memo(SidebarContentImpl)


