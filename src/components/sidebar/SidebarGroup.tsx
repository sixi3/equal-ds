import React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { cn } from '../../lib/cn'
import { ChevronDown, GripVertical } from 'lucide-react'
import { useSidebarOpenContext } from './SidebarProvider'
import { SortableGroupContext } from './SortableGroupContext'

function safeCall(fn?: () => void, context: string = 'handler'): void {
  if (!fn) return
  try {
    fn()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[Sidebar] Error in ${context}:`, error)
  }
}

export interface SidebarGroupProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Root> {
  id?: string
}

function SidebarGroupImpl({ className, children, ...props }: SidebarGroupProps): JSX.Element {
  const sortable = React.useContext(SortableGroupContext)
  const { setNodeRef, isDragging, transform, transition, id: sortableId } = sortable
  const normalizedTransition = transition ?? undefined
  const style = React.useMemo<React.CSSProperties | undefined>(() => {
    if (!transform) return normalizedTransition ? { transition: normalizedTransition } : undefined
    return {
      transform: `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`,
      transition: normalizedTransition,
      touchAction: isDragging ? 'none' as const : 'auto' as const,
    }
  }, [transform, normalizedTransition, isDragging])

  return (
    <Collapsible.Root
      ref={setNodeRef as any}
      className={cn('group relative', isDragging && 'z-10 opacity-60 border border-border pointer-events-none', className)}
      data-id={sortableId}
      style={style}
      {...props}
    >
      {children}
    </Collapsible.Root>
  )
}

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroupLabelImpl = ({ className, ...props }: SidebarGroupLabelProps): JSX.Element => (
  <div className={cn(' text-xs uppercase text-muted-foreground', className)} {...props} />
)

export interface SidebarGroupContentProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Content> {}

const SidebarGroupContentImpl = ({ className, ...props }: SidebarGroupContentProps): JSX.Element => (
  <Collapsible.Content className={cn('space-y-2 sidebar-collapsible', className)} {...props} />
)

export interface SidebarGroupTriggerProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Trigger> {}

function SidebarGroupTriggerImpl({ className, children, ...props }: SidebarGroupTriggerProps): JSX.Element {
  const { open } = useSidebarOpenContext()
  const sortable = React.useContext(SortableGroupContext)
  const { active, listeners, attributes, onHandlePress, isOver, dragging, isActive } = sortable
  
  return (
    <Collapsible.Trigger
      className={cn(
        'group/trigger w-full flex flex-col rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'px-1 py-2',
        isActive && 'cursor-grabbing',
        className,
      )}
      aria-disabled={isActive || undefined}
      data-moving={isActive ? '' : undefined}
      {...props}
    >
        <div className={cn(
          'flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground rounded-md w-full bg-transparent',
          open ? 'justify-start' : 'justify-center',
          dragging && open && 'px-1 outline outline-1 outline-border',
          isOver && open && 'px-1 outline outline-2 outline-primary-400'
        )}>
        {open && (
          <div className="min-w-0 truncate flex items-center gap-1">
            {/* drag handle (visible on hover) */}
            <span
              className={cn(
                'inline-flex h-5 w-5 items-center justify-center rounded opacity-10 transition-opacity duration-150',
                'group-hover/trigger:opacity-100 focus:opacity-100',
                'text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
              tabIndex={0}
              aria-label="Reorder group"
              role="button"
              data-drag-handle
              {...(attributes as any)}
              {...(listeners as any)}
              onClick={(e) => { e.preventDefault(); safeCall(onHandlePress, 'drag handle press') }}
              onMouseDown={(e) => { e.stopPropagation(); safeCall(onHandlePress, 'drag handle press') }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement)?.blur?.() }}
              onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter' || e.key === ' ') safeCall(onHandlePress, 'drag handle press (kbd)') }}
              onKeyUp={(e) => { if (e.key === 'Enter' || e.key === ' ') (e.currentTarget as HTMLElement)?.blur?.() }}
            >
              <GripVertical className="h-4 w-4" aria-hidden />
            </span>
              <span className={cn('truncate', isActive && 'opacity-50 pointer-events-none')}>{children}</span>
          </div>
        )}
        <div className={cn(
          'h-px bg-border',
          open ? 'flex-1' : 'w-3'
        )} />
        <span className={cn(
          'inline-flex items-center justify-center h-6 w-6 rounded-full',
          dragging ? 'pointer-events-none transition-none bg-transparent' : 'transition-colors group-hover/trigger:bg-gray-300/40'
        )}>
          <ChevronDown
            aria-hidden
            className={cn(
              'h-3 w-3 shrink-0 transition-transform duration-200 ease-out text-muted-foreground',
              'group-data-[state=open]:rotate-180',
            )}
          />
        </span>
      </div>
    </Collapsible.Trigger>
  )
}

export const SidebarGroup = React.memo(SidebarGroupImpl)
export const SidebarGroupLabel = React.memo(SidebarGroupLabelImpl)
export const SidebarGroupContent = React.memo(SidebarGroupContentImpl)
export const SidebarGroupTrigger = React.memo(SidebarGroupTriggerImpl)

// Display names for better introspection
;(SidebarGroup as any).displayName = 'SidebarGroup'
;(SidebarGroupLabel as any).displayName = 'SidebarGroupLabel'
;(SidebarGroupContent as any).displayName = 'SidebarGroupContent'
;(SidebarGroupTrigger as any).displayName = 'SidebarGroupTrigger'


