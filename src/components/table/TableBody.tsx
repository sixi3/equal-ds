import React from 'react'
import { TableRow } from './TableRow'
import type { TableColumn } from './types'

interface TableBodyProps<T = any> {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  loadingText?: React.ReactNode
  emptyText?: React.ReactNode
  onRowClick?: (row: T, index: number) => void
  selectable?: boolean
  selectedRows?: (string | number)[]
  onRowSelection?: (rowId: string | number, selected: boolean) => void
  refreshingRows?: Set<string | number>
}

function TableBodyImpl<T = any>({
  columns,
  data,
  loading = false,
  loadingText = 'Loading...',
  emptyText = 'No data available',
  onRowClick,
  selectable = false,
  selectedRows = [],
  onRowSelection,
  refreshingRows = new Set(),
}: TableBodyProps<T>): JSX.Element {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (selectable ? 1 : 0)}
            className="px-4 py-8 text-center text-text-secondary"
          >
            {loadingText}
          </td>
        </tr>
      </tbody>
    )
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (selectable ? 1 : 0)}
            className="px-4 py-8 text-center text-text-secondary"
          >
            {emptyText}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {data.map((row, index) => {
        // Check if row is refreshing by id or index
        const rowId = (row as any).id || index
        const isRefreshing = refreshingRows.has(rowId)

        return (
          <TableRow
            key={index}
            row={row}
            index={index}
            columns={columns}
            onClick={onRowClick}
            selectable={selectable}
            isSelected={selectedRows.includes(index)}
            onSelectionChange={onRowSelection}
            isRefreshing={isRefreshing}
          />
        )
      })}
    </tbody>
  )
}

export const TableBody = React.memo(TableBodyImpl) as <T = any>(props: TableBodyProps<T>) => JSX.Element