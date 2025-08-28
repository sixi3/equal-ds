import React from 'react'
import { cn } from '../../lib/cn'
import { useSidebarOpenContext } from './SidebarProvider'

function measureGroupRects(list: HTMLElement): Record<string, DOMRect> {
  const rects: Record<string, DOMRect> = {}
  list.querySelectorAll('[data-sidebar-group-id]')?.forEach((el) => {
    const id = (el as HTMLElement).dataset.sidebarGroupId
    if (id) rects[id] = el.getBoundingClientRect()
  })
  return rects
}

const GROUP_DROP_THRESHOLD_PX = 12
const GROUP_INDICATOR_GAP_PX = 4

type GroupDropIndicator = { top: number; left: number; width: number; visible: boolean }

type GroupReorderContextValue = {
  enabled: boolean
  registerGroup?: (id: string, el: HTMLElement | null) => void
  onGroupDragStart?: (e: React.DragEvent<HTMLElement>, id: string) => void
  onGroupDragOver?: (e: React.DragEvent<HTMLElement>, id: string) => void
  onGroupDrop?: (e: React.DragEvent<HTMLElement>, id: string) => void
  onGroupDragEnd?: (e: React.DragEvent<HTMLElement>, id: string) => void
  forceClosed?: boolean
}

export const GroupReorderContext = React.createContext<GroupReorderContextValue | null>(null)

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

  // Group reordering state
  const draggingGroupIdRef = React.useRef<string | null>(null)
  const overGroupIdRef = React.useRef<string | null>(null)
  const atEndRef = React.useRef<boolean>(false)
  const [dropIndicator, setDropIndicator] = React.useState<GroupDropIndicator>({ top: 0, left: 0, width: 0, visible: false })
  const [forceGroupsClosed, setForceGroupsClosed] = React.useState<boolean>(false)

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

  const registerGroup = React.useCallback((_id: string, _el: HTMLElement | null) => {
    // No-op: DOM is queried directly for ordering operations
  }, [])

  const updateDropIndicator = React.useCallback((targetEl: HTMLElement, atEnd?: boolean) => {
    const container = scrollRef.current
    if (!container) return
    const cRect = container.getBoundingClientRect()
    const tRect = targetEl.getBoundingClientRect()
    
    // Position indicator precisely between groups with proper spacing
    let top: number
    if (atEnd) {
      // After the last group
      top = tRect.bottom + GROUP_INDICATOR_GAP_PX
    } else {
      // Before the target group
      top = tRect.top - GROUP_INDICATOR_GAP_PX
    }
    
    setDropIndicator({
      top: top - cRect.top + (container.scrollTop ?? 0),
      left: tRect.left - cRect.left + (container.scrollLeft ?? 0),
      width: tRect.width,
      visible: true,
    })
  }, [])

  const handleGroupDragStart = React.useCallback((e: React.DragEvent<HTMLElement>, id: string) => {
    if (!reorderableGroups || !open) return
    draggingGroupIdRef.current = id
    overGroupIdRef.current = null
    setForceGroupsClosed(true)
    try { e.dataTransfer.setData('text/plain', id) } catch {}
    e.dataTransfer.effectAllowed = 'move'
  }, [reorderableGroups, open])

  const handleGroupDragOver = React.useCallback((e: React.DragEvent<HTMLElement>, id: string) => {
    if (!reorderableGroups || !open) return
    const draggingId = draggingGroupIdRef.current
    if (!draggingId || draggingId === id) return
    e.preventDefault()
    const target = e.currentTarget as HTMLElement
    overGroupIdRef.current = id
    // end-of-list detection
    const container = scrollRef.current
    const all = container ? Array.from(container.querySelectorAll('[data-sidebar-group-id]')) as HTMLElement[] : []
    const last = all[all.length - 1]
    let atEnd = false
    if (last && last.dataset.sidebarGroupId === id) {
      const rect = target.getBoundingClientRect()
      if (e.clientY >= rect.bottom - GROUP_DROP_THRESHOLD_PX) atEnd = true
    }
    atEndRef.current = atEnd
    updateDropIndicator(target, atEnd)
    e.dataTransfer.dropEffect = 'move'
  }, [reorderableGroups, open, updateDropIndicator])

  const computeNextGroupOrder = React.useCallback((): string[] | null => {
    const container = scrollRef.current
    const draggingId = draggingGroupIdRef.current
    const overId = overGroupIdRef.current
    const atEnd = atEndRef.current
    if (!container || !draggingId || !overId) return null
    const ids = Array.from(container.querySelectorAll('[data-sidebar-group-id]')).map((el) => (el as HTMLElement).dataset.sidebarGroupId!).filter(Boolean)
    const fromIndex = ids.indexOf(draggingId)
    const toIndex = ids.indexOf(overId)
    if (fromIndex === -1 || toIndex === -1) return null
    const next = ids.filter((x) => x !== draggingId)
    let insertionIndex = toIndex
    if (toIndex > fromIndex) insertionIndex = toIndex - 1
    if (atEnd) insertionIndex = next.length
    insertionIndex = Math.max(0, Math.min(next.length, insertionIndex))
    next.splice(insertionIndex, 0, draggingId)
    return next
  }, [])

  const clearGroupDragState = React.useCallback(() => {
    draggingGroupIdRef.current = null
    overGroupIdRef.current = null
    atEndRef.current = false
    setDropIndicator((prev) => ({ ...prev, visible: false }))
    setForceGroupsClosed(false)
  }, [])

  const handleGroupDrop = React.useCallback((e: React.DragEvent<HTMLElement>, _id: string) => {
    if (!reorderableGroups || !open) return
    e.preventDefault()
    const list = scrollRef.current
    const beforeRects = list ? measureGroupRects(list) : {}
    const next = computeNextGroupOrder()
    clearGroupDragState()
    if (next && onGroupReorder) {
      onGroupReorder(next)
      requestAnimationFrame(() => {
        const l = scrollRef.current
        if (!l) return
        const afterRects = measureGroupRects(l)
        // Apply slide-in for groups whose vertical position changed
        next.forEach((id) => {
          const el = l.querySelector(`[data-sidebar-group-id="${id}"]`) as HTMLElement | null
          if (!el) return
          const before = beforeRects[id]
          const after = afterRects[id]
          if (!before || !after) return
          if (Math.abs(before.top - after.top) > 1) {
            el.classList.add('animate-sidebar-reorder-slide')
            const onEnd = () => {
              el.classList.remove('animate-sidebar-reorder-slide')
              el.removeEventListener('animationend', onEnd)
            }
            el.addEventListener('animationend', onEnd)
          }
        })
      })
    }
  }, [reorderableGroups, open, computeNextGroupOrder, clearGroupDragState, onGroupReorder])

  const handleGroupDragEnd = React.useCallback((e: React.DragEvent<HTMLElement>, _id: string) => {
    if (!reorderableGroups || !open) return
    clearGroupDragState()
  }, [reorderableGroups, open, clearGroupDragState])

  const groupReorderValue = React.useMemo<GroupReorderContextValue>(() => ({
    enabled: Boolean(reorderableGroups && open),
    registerGroup: registerGroup,
    onGroupDragStart: handleGroupDragStart,
    onGroupDragOver: handleGroupDragOver,
    onGroupDrop: handleGroupDrop,
    onGroupDragEnd: handleGroupDragEnd,
    forceClosed: forceGroupsClosed,
  }), [reorderableGroups, open, registerGroup, handleGroupDragStart, handleGroupDragOver, handleGroupDrop, handleGroupDragEnd, forceGroupsClosed])

  return (
    <GroupReorderContext.Provider value={groupReorderValue}>
      <div className={cn('relative flex-1 min-h-0', className)} {...props}>
        <div
          ref={scrollRef}
          className={cn(
            'px-2 pt-1 pb-3 space-y-2 h-full overflow-y-auto relative',
            'overscroll-contain',
          )}
          style={scrollStyles}
          /* Hide webkit scrollbar */
          onScrollCapture={() => {
            if (!scrollRef.current) return
            // no-op trigger to ensure style applies
            scrollRef.current.style.setProperty('--_noop', '1')
          }}
          onDragOver={(e) => {
            if (!reorderableGroups || !open) return
            const draggingId = draggingGroupIdRef.current
            if (!draggingId) return
            e.preventDefault()
            const container = scrollRef.current
            if (!container) return
            const groups = Array.from(container.querySelectorAll('[data-sidebar-group-id]')) as HTMLElement[]
            if (groups.length === 0) return
            // Find nearest boundary (top of first, between groups, bottom of last)
            let targetEl: HTMLElement = groups[0]
            let atEndLocal = false
            for (let i = 0; i < groups.length; i++) {
              const g = groups[i]
              const rect = g.getBoundingClientRect()
              if (e.clientY < rect.top + GROUP_DROP_THRESHOLD_PX) {
                targetEl = g
                atEndLocal = false
                break
              }
              const isLast = i === groups.length - 1
              if (!isLast && e.clientY < rect.bottom + GROUP_DROP_THRESHOLD_PX) {
                targetEl = g
                atEndLocal = false
                break
              }
              if (isLast) {
                targetEl = g
                atEndLocal = e.clientY >= rect.bottom - GROUP_DROP_THRESHOLD_PX
              }
            }
            const overId = targetEl.dataset.sidebarGroupId || null
            if (overId) {
              overGroupIdRef.current = overId
              atEndRef.current = atEndLocal
              updateDropIndicator(targetEl, atEndLocal)
              e.dataTransfer.dropEffect = 'move'
            }
          }}
          onDrop={(e) => {
            if (!reorderableGroups || !open) return
            e.preventDefault()
            const next = computeNextGroupOrder()
            clearGroupDragState()
            if (next && onGroupReorder) onGroupReorder(next)
          }}
        >
          {children}
          {/* Group drop indicator (render after children to avoid space-y top gap) */}
          <div
            aria-hidden
            className={cn('pointer-events-none absolute z-20 h-[2px] transition-all duration-75 ease-out shadow-sm', dropIndicator.visible && reorderableGroups && open ? 'opacity-100' : 'opacity-0')}
            style={{ top: dropIndicator.top, left: dropIndicator.left, width: dropIndicator.width, backgroundColor: 'rgb(var(--color-primary-400))' }}
          />
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
    </GroupReorderContext.Provider>
  )
}

export const SidebarContent = React.memo(SidebarContentImpl)


