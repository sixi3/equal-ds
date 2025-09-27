import React from 'react'
import { cn } from '../../lib/cn'
import type { TableHeaderCellProps } from './types'

function TableHeaderCellImpl({
  children,
  align = 'left',
  width,
  minWidth,
  className,
  ...props
}: TableHeaderCellProps & React.ThHTMLAttributes<HTMLTableCellElement>): JSX.Element {
  // Prepare inline styles for width
  const style: React.CSSProperties = {}

  // Handle width and minWidth logic
  if (width) {
    if (typeof width === 'number') {
      style.width = `${width}px`
      style.minWidth = `${width}px`
    } else {
      style.width = width
      style.minWidth = width
    }
  }

  // If minWidth is provided, ensure we have at least a width
  if (minWidth) {
    const minWidthValue = typeof minWidth === 'number' ? `${minWidth}px` : minWidth
    style.minWidth = minWidthValue
    // If no width was set, use minWidth as the width too
    if (!style.width) {
      style.width = minWidthValue
    }
  }

  return (
    <th
      className={cn(
        'px-4 py-3 text-sm font-medium text-text-primary uppercase tracking-wider whitespace-nowrap bg-gradient-to-b from-primary-50 to-primary-100',
        // Alignment
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </th>
  )
}

export const TableHeaderCell = React.memo(TableHeaderCellImpl)
export type { TableHeaderCellProps }