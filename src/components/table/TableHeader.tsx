import React from 'react'
import { cn } from '../../lib/cn'
import { TableHeaderCell } from './TableHeaderCell'
import type { TableColumn } from './types'

interface TableHeaderProps<T = any> {
  columns: TableColumn<T>[]
  selectable?: boolean
  allSelected?: boolean
  onSelectAll?: (selected: boolean) => void
  showShadow?: boolean
}

function TableHeaderImpl<T = any>({
  columns,
  selectable = false,
  allSelected = false,
  onSelectAll,
  showShadow = false,
}: TableHeaderProps<T>): JSX.Element {
  return (
    <thead className="sticky top-0 z-30">
      <tr
        className={cn(
          'bg-gradient-to-b from-primary-50 to-primary-100 transition-shadow',
          showShadow ? 'shadow-md' : 'shadow-none'
        )}
      >
        {/* Selection column */}
        {selectable && (
          <th className="w-12 px-3 py-3 text-left">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll?.(e.target.checked)}
              className="rounded border-border-default text-brand-primary focus:ring-brand-primary focus:ring-2"
            />
          </th>
        )}

        {/* Data columns */}
        {columns.map((column) => (
          <TableHeaderCell
            key={column.key}
            align={column.align}
            width={column.width}
            minWidth={column.minWidth}
            className={column.isActions ? 'sticky top-0 right-0 bg-gradient-to-b from-primary-50 to-primary-100' : ''}
          >
            {column.header}
          </TableHeaderCell>
        ))}
      </tr>
    </thead>
  )
}

export const TableHeader = React.memo(TableHeaderImpl) as <T = any>(props: TableHeaderProps<T>) => JSX.Element
