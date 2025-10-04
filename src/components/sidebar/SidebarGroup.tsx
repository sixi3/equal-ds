import React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { cn, ChevronIcon } from '../../lib'
import { GripVertical } from 'lucide-react'
import { useSidebarOpenContext } from './SidebarProvider'
import { SortableGroupContext } from './SortableGroupContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS, type Transform } from '@dnd-kit/utilities'

export interface SidebarGroupProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Root> {}

export interface SidebarGroupWithIdProps extends SidebarGroupProps {
  groupId?: string
}

function SidebarGroupImpl({ className, children, groupId, open: openProp, defaultOpen, ...props }: SidebarGroupWithIdProps): JSX.Element {
  const groupCtx = React.useContext(SortableGroupContext)
  const enabled = Boolean(groupId && groupCtx.enabled)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: groupId ?? '', disabled: !enabled })
  const [internalOpen, setInternalOpen] = React.useState<boolean>(Boolean(defaultOpen))
  const isControlled = typeof openProp === 'boolean'
  const open = isControlled ? Boolean(openProp) : internalOpen
  const previousOpenRef = React.useRef<boolean>(open)
  const wasForceClosedRef = React.useRef<boolean>(false)

  React.useEffect(() => {
    if (groupCtx.enabled) return
    if (!isControlled) setInternalOpen(Boolean(defaultOpen))
  }, [groupCtx.enabled, isControlled, defaultOpen])

  React.useEffect(() => {
    if (isControlled) return
    if (groupCtx.forceClosed) {
      if (!wasForceClosedRef.current) {
        previousOpenRef.current = internalOpen
        if (internalOpen) setInternalOpen(false)
      }
      wasForceClosedRef.current = true
    } else {
      if (wasForceClosedRef.current) {
        setInternalOpen(previousOpenRef.current)
      }
      wasForceClosedRef.current = false
    }
  }, [groupCtx.forceClosed, internalOpen, isControlled])

  React.useEffect(() => {
    if (groupCtx.forceClosed) return
    previousOpenRef.current = internalOpen
  }, [internalOpen, groupCtx.forceClosed])

  const normalizedTransform = React.useMemo<Transform | null>(() => {
    if (!transform) return null
    return { ...transform, scaleX: 1, scaleY: 1 }
  }, [transform])

  const style = React.useMemo<React.CSSProperties>(() => ({
    transform: enabled && normalizedTransform ? CSS.Transform.toString(normalizedTransform) : undefined,
    transition: enabled && !isDragging ? transition ?? undefined : undefined,
  }), [enabled, normalizedTransform, transition, isDragging])

  const sortableValue = React.useMemo(() => ({
    enabled,
    forceClosed: groupCtx.forceClosed,
    id: groupId,
    attributes: enabled ? attributes : undefined,
    listeners: enabled ? listeners : undefined,
    setNodeRef: enabled ? setNodeRef : undefined,
    isDragging,
  }), [enabled, groupCtx.forceClosed, groupId, attributes, listeners, setNodeRef, isDragging])

  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof setNodeRef === 'function') setNodeRef(node)
    },
    [setNodeRef],
  )

  return (
    <SortableGroupContext.Provider value={sortableValue}>
      <Collapsible.Root
        ref={mergedRef as any}
        className={cn('group', className)}
        data-sidebar-group-id={groupId}
        open={open}
        onOpenChange={setInternalOpen}
        style={style}
        {...props}
      >
        {children}
      </Collapsible.Root>
    </SortableGroupContext.Provider>
  )
}

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroupLabelImpl = ({ className, ...props }: SidebarGroupLabelProps): JSX.Element => (
  <div data-sidebar-group-label className={cn(' text-xs uppercase text-text-secondary font-medium tracking-widest pt-0.25', className)} {...props} />
)

export interface SidebarGroupContentProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Content> {}

const SidebarGroupContentImpl = ({ className, ...props }: SidebarGroupContentProps): JSX.Element => (
  <Collapsible.Content className={cn('space-y-2 sidebar-collapsible', className)} {...props} />
)

export interface SidebarGroupTriggerProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Trigger> {}

function SidebarGroupTriggerImpl({ className, children, ...props }: SidebarGroupTriggerProps): JSX.Element {
  const { open: sidebarOpen, fullyOpen } = useSidebarOpenContext()
  const sortableCtx = React.useContext(SortableGroupContext)

  return (
    <Collapsible.Trigger
      className={cn(
        'group/trigger w-full flex flex-col rounded-md',
        'px-1 py-3',
        className,
      )}
      {...props}
    >
      <div className={cn(
        'flex items-center text-xs font-semibold uppercase tracking-widest text-secondary',
        sidebarOpen ? 'justify-start gap-2' : 'justify-center'
      )}>
        {sidebarOpen && sortableCtx.enabled ? (
          <span
            className="inline-flex items-center justify-center w-4 h-4 opacity-50 hover:opacity-100 cursor-grab active:cursor-grabbing group/icon"
            role="presentation"
            {...sortableCtx.listeners}
            {...sortableCtx.attributes}
          >
            <GripVertical className="w-3 h-3 text-secondary" />
          </span>
        ) : null}
        {fullyOpen && (
          <div className="min-w-0 break-words animate-sidebar-text-fade-in">{children}</div>
        )}
        <div className={cn(
          'h-px bg-border-default',
          sidebarOpen ? 'flex-1' : 'w-3'
        )} />
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full transition-colors group-hover/trigger:bg-primary-300/20">
          <ChevronIcon
            aria-hidden
            size="sm"
            className="text-secondary group-data-[state=open]:rotate-180"
            duration={300}
            easing="ease-out"
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


