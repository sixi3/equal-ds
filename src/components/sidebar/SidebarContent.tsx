import React from 'react'
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '../../lib/cn'
import { useSidebarOpenContext } from './SidebarProvider'
import { SortableGroupContext } from './SortableGroupContext'

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SidebarContentReorderableProps extends SidebarContentProps {
  reorderableGroups?: boolean
  onGroupReorder?: (nextOrder: string[]) => void
}

function SidebarContentImpl({ className, children, reorderableGroups = false, onGroupReorder, ...props }: SidebarContentReorderableProps): JSX.Element {
  const { open } = useSidebarOpenContext()
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const [showTopFade, setShowTopFade] = React.useState(false)
  const [showBottomFade, setShowBottomFade] = React.useState(false)
  const [forceClosed, setForceClosed] = React.useState(false)

  const sensors = useSensors(useSensor(PointerSensor))
  const sortableIds = React.useMemo(() => {
    const ids: string[] = []
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return
      if (child.type === React.Fragment) {
        ids.push(
          ...React.Children.toArray(child.props.children).flatMap((inner) =>
            React.isValidElement(inner) ? (inner.props as { groupId?: string }).groupId ?? [] : [],
          ) as string[],
        )
        return
      }
      const id = (child.props as { groupId?: string }).groupId
      if (id) ids.push(id)
    })
    return ids
  }, [children])

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      if (!reorderableGroups || !open) {
        setForceClosed(false)
        return
      }
      const { active, over } = event
      if (!over || active.id === over.id) {
        setForceClosed(false)
        return
      }
      const activeId = String(active.id)
      const overId = String(over.id)
      const oldIndex = sortableIds.indexOf(activeId)
      const newIndex = sortableIds.indexOf(overId)
      if (oldIndex === -1 || newIndex === -1) {
        setForceClosed(false)
        return
      }
      const next = arrayMove(sortableIds, oldIndex, newIndex)
      onGroupReorder?.(next)
      setForceClosed(false)
    },
    [reorderableGroups, open, sortableIds, onGroupReorder],
  )

  const handleDragStart = React.useCallback(() => {
    if (!reorderableGroups || !open) return
    setForceClosed(true)
  }, [reorderableGroups, open])

  const handleDragCancel = React.useCallback(() => {
    setForceClosed(false)
  }, [])

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

  const sortableContextValue = React.useMemo(
    () => ({
      enabled: Boolean(reorderableGroups && open),
      forceClosed,
    }),
    [reorderableGroups, open, forceClosed],
  )

  return (
    <SortableGroupContext.Provider value={sortableContextValue}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
          <div className={cn('relative flex-1 min-h-0', className)} {...props}>
            <div
              ref={scrollRef}
              className={cn(
                'px-2 pt-1 pb-3 space-y-2 h-full overflow-y-auto relative',
                'overscroll-contain',
              )}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as const}
              onScrollCapture={() => {
                scrollRef.current?.style.setProperty('--_noop', '1')
              }}
            >
              {children}
            </div>
            <div
              className={cn(
                'pointer-events-none absolute inset-x-0 top-0 h-10 z-10 bg-gradient-to-b from-gray-700/20 to-transparent transition-opacity duration-200',
                showTopFade ? 'opacity-100' : 'opacity-0',
              )}
            />
            <div
              className={cn(
                'pointer-events-none absolute inset-x-0 bottom-0 h-10 z-10 bg-gradient-to-t from-gray-700/20 to-transparent transition-opacity duration-200',
                showBottomFade ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>
        </SortableContext>
      </DndContext>
    </SortableGroupContext.Provider>
  )
}

export const SidebarContent = React.memo(SidebarContentImpl)


