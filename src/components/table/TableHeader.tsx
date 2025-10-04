import React from 'react'
import { cn } from '../../lib/cn'
import { TableHeaderCell } from './TableHeaderCell'
import type { TableColumn } from './types'

interface TableHeaderProps<T = any> {
  columns: TableColumn<T>[]
  selectable?: boolean
  allSelected?: boolean
  someSelected?: boolean
  onSelectAll?: (selected: boolean) => void
  showShadow?: boolean
}

function TableHeaderImpl<T = any>({
  columns,
  selectable = false,
  allSelected = false,
  someSelected = false,
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
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = someSelected && !allSelected
                  }
                }}
                onChange={(e) => onSelectAll?.(e.target.checked)}
                className="sr-only"
                tabIndex={-1}
              />
              <div
                className={cn(
                  'w-4 h-4 border-2 rounded border-border-default flex items-center justify-center relative cursor-pointer',
                  'transition-all duration-200 ease-in-out',
                  (allSelected || someSelected) && 'bg-primary-700 border-primary-700',
                  // Subtle scale effect when checked/indeterminate
                  (allSelected || someSelected) && 'scale-105'
                )}
                onClick={() => onSelectAll?.(!(allSelected || someSelected))}
              >
                {/* Checkmark */}
                <div
                  className={cn(
                    'transition-all duration-200 ease-in-out',
                    allSelected && !someSelected
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75'
                  )}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Indeterminate mark */}
                <div
                  className={cn(
                    'absolute transition-all duration-200 ease-in-out',
                    someSelected && !allSelected
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75'
                  )}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
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
