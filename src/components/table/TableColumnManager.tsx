import React, { useMemo, useState } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, RefreshCcw, Eye, EyeOff, Columns3, ListRestart, Lock } from 'lucide-react'
import { DrawerProvider, Drawer, DrawerOverlay, DrawerHeader, DrawerContent } from '../drawer'
import { cn } from '../../lib/cn'
import type { TableColumn } from './types'

interface TableColumnManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  columns: TableColumn<any>[]
  columnOrder: string[]
  onColumnOrderChange: (nextOrder: string[]) => void
  defaultOrder: string[]
  title?: string
  description?: string
  width?: number | string
  resetLabel?: string
  allowHiding?: boolean
  visibleColumnKeys?: string[]
  onColumnVisibilityChange?: (key: string, visible: boolean) => void
  onResetVisibility?: () => void
}

interface SortableColumnCardProps {
  column: TableColumn<any>
  index: number
  disabled?: boolean
  allowHiding?: boolean
  visible?: boolean
  onToggleVisibility?: (key: string, visible: boolean) => void
}

function SortableColumnCard({
  column,
  index,
  disabled = false,
  allowHiding,
  visible = true,
  onToggleVisibility,
}: SortableColumnCardProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column.key, disabled })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'border border-border-default bg-background-primary hover:bg-background-secondary shadow-sm first:rounded-t-lg last:rounded-b-lg',
        'data-[dragging=true]:shadow-lg data-[dragging=true]:border-border-hover data-[dragging=true]:bg-background-secondary',
        isDragging && 'shadow-lg border-border-hover bg-background-secondary',
        (disabled || !visible) && 'opacity-60',
      )}
      data-dragging={isDragging ? 'true' : undefined}
    >
      <div className="flex items-center gap-3 px-3 py-4">
        <button
          type="button"
          aria-label={disabled ? `${column.header} is fixed` : `Reorder ${column.header}`}
          className={cn(
            'flex h-8 w-8 flex-none items-center justify-center rounded-md text-text-secondary transition-colors duration-150',
            'hover:border-border-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
            disabled && 'pointer-events-none opacity-80 cursor-grab',
          )}
          {...listeners}
          {...attributes}
          disabled={disabled}
        >
          <GripVertical className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-primary tracking-wide ">{column.header.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</span>
          
          {column.isActions && (
            <span className="text-xs text-text-tertiary tracking-wide">Actions column</span>
          )}
          {disabled && (
            <div className="flex items-center gap-1 text-xs text-text-tertiary tracking-wide"><Lock className="h-3 w-3" aria-hidden="true" /> Locked</div>
          )}
          
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-text-tertiary">#{index + 1}</span>
          {allowHiding && column.hideable !== false && onToggleVisibility && (
            <button
              type="button"
              aria-label={visible ? `Hide ${column.header}` : `Show ${column.header}`}
              onClick={() => onToggleVisibility(column.key, !visible)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md border border-border-default text-text-secondary transition-colors duration-150',
                'hover:border-border-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
                !visible && 'border-dashed opacity-70',
              )}
            >
              {visible ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function TableColumnManager({
  open,
  onOpenChange,
  columns,
  columnOrder,
  onColumnOrderChange,
  defaultOrder,
  title = 'Arrange columns',
  description = 'Use the controls below to view/hide/reorganise the columns in the table.',
  width = 900,
  resetLabel = 'Reset Table',
  allowHiding = false,
  visibleColumnKeys,
  onColumnVisibilityChange,
  onResetVisibility,
}: TableColumnManagerProps): JSX.Element | null {
  const [internalOrder, setInternalOrder] = useState<string[]>(columnOrder)
  const columnMap = useMemo(() => new Map(columns.map((column) => [column.key, column])), [columns])
  const visibleSet = useMemo(() => new Set(visibleColumnKeys ?? columns.map((column) => column.key)), [columns, visibleColumnKeys])
  const defaultOrderNormalized = useMemo(
    () => defaultOrder.filter((key) => columnMap.has(key)),
    [defaultOrder, columnMap],
  )

  React.useEffect(() => {
    setInternalOrder(columnOrder)
  }, [columnOrder])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeId = String(active.id)
    const overId = String(over.id)
    const oldIndex = internalOrder.indexOf(activeId)
    const newIndex = internalOrder.indexOf(overId)

    if (oldIndex === -1 || newIndex === -1) return

    const activeColumn = columnMap.get(activeId)
    const overColumn = columnMap.get(overId)

    if (activeColumn?.locked || overColumn?.locked) {
      return
    }

    if (activeColumn?.reorderable === false || overColumn?.reorderable === false) {
      return
    }

    const next = arrayMove(internalOrder, oldIndex, newIndex)
    setInternalOrder(next)
    onColumnOrderChange(next)
  }

  const handleReset = () => {
    setInternalOrder(defaultOrderNormalized)
    onColumnOrderChange(defaultOrderNormalized)
    onResetVisibility?.()
  }

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next)
  }

  return (
    <DrawerProvider open={open} onOpenChange={handleOpenChange} side="right">
      <DrawerOverlay aria-hidden="true" />
      <Drawer width={width} aria-label="Column manager">
        <DrawerHeader
          title={title}
          subtitle={description}
          icon={<Columns3 className="h-5 w-5" aria-hidden="true" />}
          onClose={() => onOpenChange(false)}
        />
        <DrawerContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1 text-xs text-text-secondary">
                <span>Drag using the handles</span>
                <span>(</span>
                <GripVertical className="h-4 w-4 text-text-primary" aria-hidden="true" />
                <span>)</span>
                <span>to re-order columns.</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-text-secondary transition-colors duration-150',
                'hover:border-border-hover hover:text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
              )}
            >
              <ListRestart className="h-4 w-4" aria-hidden="true" />
              {resetLabel}
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={internalOrder} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col" role="list">
                {internalOrder.map((columnKey, index) => {
                  const column = columnMap.get(columnKey)
                  if (!column || column.isActions) return null
                  const isLocked = column.reorderable === false || column.locked
                  const isVisible = visibleSet.has(column.key)
                  return (
                    <SortableColumnCard
                      key={column.key}
                      column={column}
                      index={index}
                      disabled={isLocked}
                      allowHiding={allowHiding}
                      visible={isVisible}
                      onToggleVisibility={onColumnVisibilityChange}
                    />
                  )
                })}
              </div>
            </SortableContext>
          </DndContext>
        </DrawerContent>
      </Drawer>
    </DrawerProvider>
  )
}
