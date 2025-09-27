import React, { useState, useRef, useEffect, useCallback } from 'react'
import { RotateCw } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Loader } from '../loader'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { TablePagination } from './TablePagination'
import { TableActionsMenu } from './TableActionsMenu'
import type { TableProps } from './types'

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
  ...props
}: TableProps<T>): JSX.Element {
  // Calculate actions column width for positioning blur indicator
  const actionsColumn = columns.find(col => col.isActions)
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

    const newSelected = selected ? data.map((_, index) => index) : []
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


  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {/* Table Container with horizontal scroll */}
      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Bottom blur indicator */}
        {showBottomBlur && (
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 z-10 h-6 bg-gradient-to-t from-primary-500/20 via-white/20 to-transparent" />
        )}

        {/* Left blur indicator */}
        {enableHorizontalScroll && showLeftBlur && (
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-50 w-10 rounded-tl-lg bg-gradient-to-r from-primary-500/20 via-white/20 to-transparent" />
        )}

        {/* Right blur indicator - positioned before actions column */}
        {enableHorizontalScroll && showRightBlur && (
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-50 w-10 bg-gradient-to-l from-primary-500/20 via-white/20 to-transparent"
            style={{ right: `${actionsColumnWidth}px` }} // Position before actions column
          />
        )}

        <div
          ref={scrollContainerRef}
          className={cn(
            'flex-1 min-h-0 overflow-x-auto overflow-y-auto rounded-t-lg border border border-border-default',
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
            <table className={cn('w-full h-full border-collapse table-fixed', tableClassName)}>
              <TableHeader
                columns={columns}
                selectable={selectable}
                allSelected={data.length > 0 && selectedRows.length === data.length}
                onSelectAll={handleSelectAll}
                showShadow={showHeaderShadowOnScroll && isScrolled}
              />
              <TableBody
                columns={columns.map(column => {
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
          <TablePagination {...pagination} />
        </div>
      )}
    </div>
  )
}

export const Table = React.memo(TableImpl) as <T = any>(props: TableProps<T>) => JSX.Element
export type { TableProps }