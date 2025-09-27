import React from 'react'
import { cn, useCopyToClipboard } from '../../lib'
import { TableCell } from './TableCell'
import type { TableColumn, TableCellProps } from './types'

/**
 * Safely calls an accessor function, handling missing properties gracefully
 */
function safeAccessor<T>(accessor: (row: T) => any, row: T): any {
  try {
    const result = accessor(row)
    // Return '--' for missing/undefined values, otherwise return the result
    return result ?? '--'
  } catch (error) {
    // If accessor throws an error (e.g., accessing property on undefined), return placeholder
    console.warn('Accessor function failed:', error)
    return '--'
  }
}

/**
 * Safely calls a copyable function, handling errors gracefully
 */
function safeCopyable<T>(copyableFn: (row: T, value: any) => string, row: T, value: any): string {
  try {
    return copyableFn(row, value)
  } catch (error) {
    console.warn('Copyable function failed:', error)
    return String(value ?? '')
  }
}

interface TableRowProps<T = any> {
  row: T
  index: number
  columns: TableColumn<T>[]
  onClick?: (row: T, index: number) => void
  selectable?: boolean
  isSelected?: boolean
  onSelectionChange?: (rowId: string | number, selected: boolean) => void
  isRefreshing?: boolean
}

function TableRowImpl<T = any>({
  row,
  index,
  columns,
  onClick,
  selectable = false,
  isSelected = false,
  onSelectionChange,
  isRefreshing = false,
}: TableRowProps<T>): JSX.Element {
  const handleClick = () => {
    onClick?.(row, index)
  }

  const handleSelectionChange = (selected: boolean) => {
    onSelectionChange?.(index, selected)
  }

  return (
    <tr
      className={cn(
        'bg-background-secondary hover:bg-background-tertiary transition-all duration-200 border-b border-border-default last:border-b-0',
        onClick && 'cursor-pointer',
        index % 2 === 1 && 'bg-gray-100',
        isSelected && 'bg-background-tertiary',
        isRefreshing && 'opacity-60 bg-gray-300'
      )}
      onClick={handleClick}
    >
      {/* Selection column */}
      {selectable && (
        <td className="w-12 px-3 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => handleSelectionChange(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="rounded border-border-default text-brand-primary focus:ring-brand-primary focus:ring-2"
          />
        </td>
      )}

      {/* Data columns */}
      {columns.map((column) => {
        let cellContent: any
        try {
          if (column.render) {
            // If both accessor and render exist, pass accessor result to render
            // Otherwise pass the row object
            const accessorResult = column.accessor ? safeAccessor(column.accessor, row) : row
            cellContent = column.render(accessorResult, row, index)
          } else if (column.accessor) {
            cellContent = safeAccessor(column.accessor, row)
          } else {
            cellContent = column.content
          }
        } catch (error) {
          // If accessor or render function throws an error, show placeholder
          console.warn(`Error rendering column "${column.key}" for row ${index}:`, error)
          cellContent = '--'
        }

        // Determine which TableCell prop to use based on content type
        let cellProps: Partial<TableCellProps> = {}

        if (React.isValidElement(cellContent)) {
          // Handle React elements (JSX from render functions)
          cellProps.children = cellContent
        } else if (typeof cellContent === 'object' && cellContent !== null && 'type' in cellContent) {
          // Handle structured content objects (buttons/tags from render functions)
          if (cellContent.type === 'button') {
            cellProps.button = cellContent.props
          } else if (cellContent.type === 'tag') {
            cellProps.tag = cellContent.props
          } else {
            // Unknown object type, convert to string
            cellProps.text = String(cellContent)
          }
        } else if (typeof cellContent === 'string' || typeof cellContent === 'number' || typeof cellContent === 'boolean' || cellContent === null || cellContent === undefined) {
          // Handle primitive values (string, number, boolean, null, undefined)
          cellProps.text = cellContent ?? undefined
        } else {
          // Handle any other types by converting to string
          cellProps.text = String(cellContent)
        }

        const copyValue = column.copyable
          ? typeof column.copyable === 'function'
            ? safeCopyable(column.copyable, row, cellContent)
            : typeof cellProps.text !== 'undefined' && cellProps.text !== '--'
              ? String(cellProps.text ?? '')
              : typeof column.accessor === 'function'
                ? String(safeAccessor(column.accessor, row) ?? '')
                : ''
          : undefined

        return (
          <TableCell
            key={column.key}
            align={column.align}
            className={column.isActions ? cn(
              'sticky right-0',
              index % 2 === 1 ? 'bg-gray-100' : 'bg-background-secondary',
              isSelected && 'bg-background-tertiary'
            ) : ''}
            copyValue={copyValue}
            copyLabel={column.copyLabel}
            {...cellProps}
          />
        )
      })}
    </tr>
  )
}

export const TableRow = React.memo(TableRowImpl) as <T = any>(props: TableRowProps<T>) => JSX.Element
