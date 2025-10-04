import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { RotateCw } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useControllableState } from '../../lib/useControllableProp'
import { Loader } from '../loader'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { TablePagination } from './TablePagination'
import { TableColumnManager } from './TableColumnManager'
import { TableActionsMenu } from './TableActionsMenu'
import type { TableProps, TableColumn } from './types'

/**
 * Main Table component that supports 20+ columns with pagination and flexible cell content
 */
function TableImpl<T = any>({
  columns,
  data,
  loading = false,
  loadingText = 'Loading your data...',
  emptyText = 'No data available',
  pagination,
  onRowClick,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  onRefreshRow,
  refreshingRows = new Set(),
  refreshRowLabel = 'Refresh Details',
  className,
  enableHorizontalScroll = true,
  tableClassName,
  showHeaderShadowOnScroll = true,
  columnOrder: columnOrderProp,
  defaultColumnOrder,
  onColumnOrderChange,
  columnManager,
  columnVisibility: columnVisibilityProp,
  defaultColumnVisibility,
  onColumnVisibilityChange,
  ...props
}: TableProps<T>): JSX.Element {
  const initialOrder = useMemo(() => {
    const base = columns.map((column) => column.key)
    if (defaultColumnOrder && defaultColumnOrder.length) {
      const normalized = defaultColumnOrder.filter((key) => base.includes(key))
      const missing = base.filter((key) => !normalized.includes(key))
      return [...normalized, ...missing]
    }
    return base
  }, [columns, defaultColumnOrder])

  const [columnOrder, setColumnOrder] = useControllableState<string[]>({
    value: columnOrderProp,
    defaultValue: initialOrder,
    onChange: onColumnOrderChange,
  })

  const initialVisibility = useMemo(() => {
    const visibility: Record<string, boolean> = {}
    columns.forEach((column) => {
      const key = column.key
      if (defaultColumnVisibility && key in defaultColumnVisibility) {
        visibility[key] = Boolean(defaultColumnVisibility[key])
      } else {
        visibility[key] = true
      }
    })
    return visibility
  }, [columns, defaultColumnVisibility])

  const [columnVisibility, setColumnVisibility] = useControllableState<Record<string, boolean>>({
    value: columnVisibilityProp,
    defaultValue: initialVisibility,
    onChange: onColumnVisibilityChange,
  })
  const [visibilityBaseline] = useState(initialVisibility)

  const columnKeys = useMemo(() => columns.map((column) => column.key), [columns])

  const effectiveOrder = useMemo(() => {
    const source = columnOrder && columnOrder.length ? columnOrder : initialOrder
    const deduped = source.filter((key) => columnKeys.includes(key))
    const missing = columnKeys.filter((key) => !deduped.includes(key))
    return [...deduped, ...missing]
  }, [columnKeys, columnOrder, initialOrder])

  useEffect(() => {
    if (columnOrderProp !== undefined) return
    if (
      !columnOrder ||
      columnOrder.length !== effectiveOrder.length ||
      effectiveOrder.some((key, index) => key !== columnOrder[index])
    ) {
      setColumnOrder(effectiveOrder)
    }
  }, [columnOrderProp, columnOrder, effectiveOrder, setColumnOrder])

  const orderedColumns = useMemo(() => {
    const columnMap = new Map(columns.map((column) => [column.key, column]))
    return effectiveOrder
      .map((key) => columnMap.get(key))
      .filter((col): col is typeof columns[number] => Boolean(col))
  }, [columns, effectiveOrder])

  const managedColumns = useMemo<TableColumn<T>[]>(() => {
    if (!columnManager?.enabled) {
      return orderedColumns
    }
    return orderedColumns.map((column) => ({
      ...column,
      reorderable: column.reorderable ?? (!column.isActions && !column.locked),
      hideable: column.hideable ?? (!column.isActions && !column.locked),
    }))
  }, [columnManager?.enabled, orderedColumns])

  const visibleColumns = useMemo(() => {
    return managedColumns.filter((column) => {
      if (column.locked === true || column.isActions) return true
      return columnVisibility[column.key] !== false
    })
  }, [managedColumns, columnVisibility])

  const handleColumnOrderChange = useCallback(
    (nextOrder: string[]) => {
      setColumnOrder(nextOrder)
    },
    [setColumnOrder],
  )

  const handleColumnVisibilityToggle = useCallback(
    (key: string, visible: boolean) => {
      const column = managedColumns.find((col) => col.key === key)
      if (!column || column.locked || column.isActions) return

      setColumnVisibility({
        ...columnVisibility,
        [key]: visible,
      })
    },
    [columnVisibility, managedColumns, setColumnVisibility],
  )

  const [isColumnManagerOpen, setIsColumnManagerOpen] = useState(false)

  // Calculate actions column width for positioning blur indicator
  const actionsColumn = visibleColumns.find(col => col.isActions)
  const actionsColumnWidth = actionsColumn?.width
    ? typeof actionsColumn.width === 'string'
      ? parseInt(actionsColumn.width.toString())
      : actionsColumn.width
    : 0

  // Scroll tracking state
  const [showLeftBlur, setShowLeftBlur] = useState(false)
  const [showRightBlur, setShowRightBlur] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBottomBlur, setShowBottomBlur] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleRowSelection = (rowId: string | number, selected: boolean) => {
    if (!onSelectionChange) return

    const newSelected = selected
      ? [...selectedRows, rowId]
      : selectedRows.filter(id => id !== rowId)

    onSelectionChange(newSelected)
  }

  const handleSelectAll = (selected: boolean) => {
    if (!onSelectionChange) return

    const newSelected = selected ? data.map((row, index) => (row as any).id ?? index) : []
    onSelectionChange(newSelected)
  }

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth, scrollTop, scrollHeight, clientHeight } = container
    const isAtStart = scrollLeft === 0
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1 // -1 for rounding errors
    const isAtTop = scrollTop === 0
    const isAtBottom = scrollTop >= scrollHeight - clientHeight - 1

    setShowLeftBlur(!isAtStart)
    setShowRightBlur(!isAtEnd)
    setIsScrolled(!isAtTop)
    setShowBottomBlur(!isAtBottom)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      // Initial check
      handleScroll()

      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [enableHorizontalScroll, handleScroll])

  // Recalculate blur indicators when data or layout changes that could affect scroll height
  useEffect(() => {
    handleScroll()
  }, [data.length, loading, tableClassName, handleScroll])

  const isCompact = data.length <= 1

  return (
    <div className={cn('flex flex-col', className, isCompact && 'flex-none')} {...props}>
      {/* Table Container with horizontal scroll */}
      <div
        className={cn(
          'relative flex flex-col',
          isCompact ? 'flex-none' : 'flex-1 min-h-0',
        )}
      >
        {/* Bottom blur indicator */}
        {showBottomBlur && (
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 z-10 h-6 bg-gradient-to-t from-primary-500/20 via-white/20 to-transparent" />
        )}

        {/* Left blur indicator */}
        {enableHorizontalScroll && showLeftBlur && (
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-40 w-10 rounded-tl-lg bg-gradient-to-r from-primary-500/20 via-white/20 to-transparent" />
        )}

        {/* Right blur indicator - positioned before actions column */}
        {enableHorizontalScroll && showRightBlur && (
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-40 w-10 bg-gradient-to-l from-primary-500/30 via-white/20 to-transparent"
            style={{ right: `${actionsColumnWidth}px` }} // Position before actions column
          />
        )}

        <div
          ref={scrollContainerRef}
          className={cn(
            'overflow-x-auto overflow-y-auto rounded-t-lg border border border-border-default',
            isCompact ? 'flex-none' : 'flex-1 min-h-0',
            enableHorizontalScroll && 'scrollbar-hide'
          )}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-4">
              <Loader
                cellSize={12}
              />
              <div className="text-text-secondary tracking-wide">
                {loadingText}
              </div>
            </div>
          ) : (
            <table
              className={cn(
                'w-full h-full border-collapse table-fixed',
                isCompact ? 'min-h-[64px]' : 'min-h-0',
                tableClassName,
              )}
            >
              <TableHeader
                columns={visibleColumns}
                selectable={selectable}
                allSelected={data.length > 0 && selectedRows.length === data.length}
                someSelected={selectedRows.length > 0 && selectedRows.length < data.length}
                onSelectAll={handleSelectAll}
                showShadow={showHeaderShadowOnScroll && isScrolled}
              />
              <TableBody
                columns={visibleColumns.map(column => {
                  // If this is an actions column and onRefreshRow is provided,
                  // modify the render function to include the refresh action
                  if (column.isActions && onRefreshRow && column.render) {
                    return {
                      ...column,
                      render: (value: any, row: T, index: number) => {
                        const originalContent = column.render!(value, row, index)

                        // If the render returns a TableActionsMenu, we need to modify its actions
                        if (React.isValidElement(originalContent) && originalContent.type === TableActionsMenu) {
                          const existingActions = (originalContent.props as any).actions || []
                          const refreshAction = {
                            key: 'refresh',
                            label: refreshRowLabel,
                            onClick: () => onRefreshRow(row, index),
                            disabled: refreshingRows.has((row as any).id || index),
                            icon: RotateCw,
                            className: 'text-primary-500 font-medium'
                          }

                          // Add refresh action at the beginning if it doesn't already exist
                          const hasRefresh = existingActions.some((action: any) => action.key === 'refresh')
                          const actions = hasRefresh ? existingActions : [...existingActions, refreshAction]

                          return React.cloneElement(originalContent, { actions })
                        }

                        return originalContent
                      }
                    }
                  }

                  return column
                })}
                data={data}
                loading={false}
                loadingText={loadingText}
                emptyText={emptyText}
                onRowClick={onRowClick}
                selectable={selectable}
                selectedRows={selectedRows}
                onRowSelection={handleRowSelection}
                refreshingRows={refreshingRows}
              />
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="shrink-0">
          <TablePagination
            {...pagination}
            columnManager={columnManager?.enabled
              ? {
                  onOpen: () => setIsColumnManagerOpen(true),
                  label: columnManager.triggerLabel,
                  srLabel: columnManager.triggerSrLabel,
                  disabled: loading,
                }
              : undefined}
          />
        </div>
      )}

      {columnManager?.enabled && (
        <TableColumnManager
          open={isColumnManagerOpen}
          onOpenChange={setIsColumnManagerOpen}
          columns={managedColumns}
          visibleColumnKeys={visibleColumns.map((column) => column.key)}
          columnOrder={managedColumns.length ? effectiveOrder : []}
          onColumnOrderChange={handleColumnOrderChange}
          defaultOrder={initialOrder}
          title={columnManager.drawerTitle}
          description={columnManager.drawerDescription}
          width={columnManager.drawerWidth}
          resetLabel={columnManager.resetLabel}
          allowHiding={columnManager.allowHiding}
          onColumnVisibilityChange={handleColumnVisibilityToggle}
          onResetVisibility={() => setColumnVisibility(visibilityBaseline)}
        />
      )}
    </div>
  )
}

export const Table = React.memo(TableImpl) as <T = any>(props: TableProps<T>) => JSX.Element
export type { TableProps }