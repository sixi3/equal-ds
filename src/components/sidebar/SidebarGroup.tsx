import React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { cn, ChevronIcon } from '../../lib'
import { GripVertical } from 'lucide-react'
import { useSidebarOpenContext } from './SidebarProvider'
import { GroupReorderContext } from './SidebarContent'

export interface SidebarGroupProps extends React.ComponentPropsWithoutRef<typeof Collapsible.Root> {}

export interface SidebarGroupWithIdProps extends SidebarGroupProps {
  groupId?: string
}

function SidebarGroupImpl({ className, children, groupId, open: openProp, defaultOpen, ...props }: SidebarGroupWithIdProps): JSX.Element {
  const reorderCtx = React.useContext(GroupReorderContext)
  const [internalOpen, setInternalOpen] = React.useState<boolean>(Boolean(defaultOpen))
  const isControlled = typeof openProp === 'boolean'
  const open = isControlled ? Boolean(openProp) : internalOpen

  React.useEffect(() => {
    if (reorderCtx?.forceClosed) {
      if (isControlled) {
        // If consumer controls, we cannot change it; rely on visuals only
      } else {
        setInternalOpen(false)
      }
    } else {
      // restore defaultOpen after dragging ends only if uncontrolled
      if (!isControlled && typeof defaultOpen !== 'undefined') setInternalOpen(Boolean(defaultOpen))
    }
  }, [reorderCtx?.forceClosed, isControlled, defaultOpen])

  const setRef = React.useCallback((node: HTMLDivElement | null) => {
    if (reorderCtx?.enabled && groupId) reorderCtx.registerGroup?.(groupId, node)
  }, [reorderCtx, groupId])

  return (
    <Collapsible.Root ref={setRef as any} className={cn('group', className)} data-sidebar-group-id={groupId} open={open} onOpenChange={setInternalOpen} {...props}>
      {children}
    </Collapsible.Root>
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
  const { open, fullyOpen } = useSidebarOpenContext()
  const reorderCtx = React.useContext(GroupReorderContext)
  const handleRef = React.useRef<HTMLSpanElement | null>(null)
  const labelRef = React.useRef<HTMLDivElement | null>(null)

  // Custom drag preview
  const dragPreviewRef = React.useRef<HTMLDivElement | null>(null)
  const createDragPreview = React.useCallback((e: React.DragEvent) => {
    if (!e.dataTransfer) return
    const current = e.currentTarget as HTMLElement
    const doc = current.ownerDocument || document
    // Get label text from the group root if possible
    const groupEl = current.closest('[data-sidebar-group-id]') as HTMLElement | null
    const labelEl = groupEl?.querySelector('[data-sidebar-group-label]') as HTMLElement | null
    const labelText = (labelEl?.textContent || labelRef.current?.textContent || '').toString().trim()

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
    if (labelText) {
      const text = doc.createElement('span')
      text.textContent = labelText
      text.style.fontSize = '12px'
      text.style.fontWeight = '500'
      text.style.whiteSpace = 'nowrap'
      el.appendChild(text)
    }

    doc.body.appendChild(el)
    try { e.dataTransfer.setDragImage(el, 12, 14) } catch {}
    dragPreviewRef.current = el
  }, [])

  const cleanupDragPreview = React.useCallback(() => {
    const el = dragPreviewRef.current
    if (el && el.parentNode) el.parentNode.removeChild(el)
    dragPreviewRef.current = null
  }, [])

  const onDragStart = React.useCallback((e: React.DragEvent<HTMLSpanElement>) => {
    if (!reorderCtx?.enabled) return
    createDragPreview(e)
    // Find the parent group id
    const groupEl = (e.currentTarget as HTMLElement).closest('[data-sidebar-group-id]') as HTMLElement | null
    const id = groupEl?.dataset.sidebarGroupId
    if (!id) return
    reorderCtx.onGroupDragStart?.(e as any, id)
  }, [reorderCtx, createDragPreview])
  const onDragEnd = React.useCallback((e: React.DragEvent<HTMLSpanElement>) => {
    if (!reorderCtx?.enabled) return
    cleanupDragPreview()
    const groupEl = (e.currentTarget as HTMLElement).closest('[data-sidebar-group-id]') as HTMLElement | null
    const id = groupEl?.dataset.sidebarGroupId
    if (!id) return
    reorderCtx.onGroupDragEnd?.(e as any, id)
  }, [reorderCtx, cleanupDragPreview])
  
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
        open ? 'justify-start gap-2' : 'justify-center'
      )}>
        {/* Handle - only visible when reordering is enabled and sidebar is open */}
        {open && reorderCtx?.enabled ? (
          <span
            ref={handleRef}
            className="inline-flex items-center justify-center w-4 h-4 opacity-50 hover:opacity-100 cursor-grab active:cursor-grabbing group/icon"
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <GripVertical className="w-3 h-3 text-secondary" />
          </span>
        ) : null}
        {/* Label text */}
        {fullyOpen && (
          <div ref={labelRef} className="min-w-0 break-words animate-sidebar-text-fade-in">{children}</div>
        )}
        <div className={cn(
          'h-px bg-border-default',
          open ? 'flex-1' : 'w-3'
        )} />
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full transition-colors group-hover/trigger:bg-primary-300/20">
          <ChevronIcon
            aria-hidden
            isOpen={open}
            size="sm"
            className="text-secondary"
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


