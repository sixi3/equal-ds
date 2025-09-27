import React from 'react'

/**
 * Represents the content that can be rendered in a table cell
 */
export type TableCellContent =
  | React.ReactNode // Raw data (strings, numbers, JSX elements)
  | {
      type: 'button'
      props: {
        children: React.ReactNode
        onClick?: () => void
        variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
        size?: 'sm' | 'md' | 'lg'
        disabled?: boolean
      }
    }
  | {
      type: 'tag'
      props: {
        children: React.ReactNode
        variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
        size?: 'sm' | 'md'
      }
    }

/**
 * Represents a single column configuration
 */
export interface TableColumn<T = any> {
  /** Unique identifier for the column */
  key: string
  /** Display header text */
  header: string
  /** Function to extract/display data from row item */
  accessor?: (row: T) => TableCellContent
  /** Static content for all cells in this column */
  content?: TableCellContent
  /** Column width - can be px, %, fr, or auto */
  width?: string | number
  /** Minimum column width */
  minWidth?: string | number
  /** Whether column can be sorted */
  sortable?: boolean
  /** Custom cell renderer */
  render?: (value: any, row: T, index: number) => React.ReactNode | TableCellContent
  /** Alignment of cell content */
  align?: 'left' | 'center' | 'right'
  /** Whether to hide column on mobile */
  hideOnMobile?: boolean
  /** Whether this is an actions column that should be sticky */
  isActions?: boolean
  /** Whether this column should show copy to clipboard affordance */
  copyable?: boolean | ((row: T, value: any) => string)
  /** Optional label for copy tooltip */
  copyLabel?: string
  /** Whether this column participates in user-driven reordering */
  reorderable?: boolean
  /** Whether users can toggle visibility for this column */
  hideable?: boolean
  /** Whether column is locked from reordering and visibility changes */
  locked?: boolean
}

/**
 * Represents a single row of table data
 */
export interface TableRow {
  /** Unique identifier for the row */
  id: string | number
  /** Row data object */
  data: Record<string, any>
}

/**
 * Pagination configuration
 */
export interface TablePaginationProps {
  /** Current page (1-indexed) */
  currentPage: number
  /** Total number of pages */
  totalPages?: number
  /** Items per page */
  pageSize: number
  /** Total number of items */
  totalItems?: number
  /** Number of items in the current page (used when total is unknown) */
  currentPageItems?: number
  /** Callback when page changes */
  onPageChange: (page: number) => void
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void
  /** Available page size options */
  pageSizeOptions?: number[]
  /** Show page size selector */
  showPageSizeSelector?: boolean
  /** Whether to show a loading indicator next to the selector */
  isFetching?: boolean
}


/**
 * Main table props
 */
export interface TableProps<T = any> {
  /** Table columns configuration */
  columns: TableColumn<T>[]
  /** Table data rows */
  data: T[]
  /** Whether table is loading */
  loading?: boolean
  /** Loading text/component */
  loadingText?: React.ReactNode
  /** Empty state text/component */
  emptyText?: React.ReactNode
  /** Pagination configuration */
  pagination?: TablePaginationProps
  /** Row click callback */
  onRowClick?: (row: T, index: number) => void
  /** Whether rows are selectable */
  selectable?: boolean
  /** Selected row IDs */
  selectedRows?: (string | number)[]
  /** Selection change callback */
  onSelectionChange?: (selectedRows: (string | number)[]) => void
  /** Row refresh callback */
  onRefreshRow?: (row: T, rowIndex: number) => void | Promise<void>
  /** Set of row IDs currently being refreshed */
  refreshingRows?: Set<string | number>
  /** Custom label for refresh action */
  refreshRowLabel?: string
  /** Custom className */
  className?: string
  /** Whether to enable horizontal scrolling for many columns */
  enableHorizontalScroll?: boolean
  /** Additional classes applied to the inner table element */
  tableClassName?: string
  /** Whether to add a shadow under the header when vertically scrolled */
  showHeaderShadowOnScroll?: boolean
  /** External control over column ordering */
  columnOrder?: string[]
  /** Default order used when uncontrolled or for reset */
  defaultColumnOrder?: string[]
  /** Callback when column order changes */
  onColumnOrderChange?: (order: string[]) => void
  /** Column manager (drawer) configuration */
  columnManager?: {
    enabled?: boolean
    triggerLabel?: string
    triggerSrLabel?: string
    drawerTitle?: string
    drawerDescription?: string
    drawerWidth?: number | string
    resetLabel?: string
    allowHiding?: boolean
  }
  /** External visibility control for columns */
  columnVisibility?: Record<string, boolean>
  /** Default visibility map when uncontrolled */
  defaultColumnVisibility?: Record<string, boolean>
  /** Callback when column visibility changes */
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void
}

/**
 * Table cell props - separate props for different content types for better type safety
 */
export interface TableCellProps {
  // Content type props (mutually exclusive - only one should be provided)
  children?: React.ReactNode          // JSX elements and React nodes
  button?: {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
  }
  tag?: {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
    size?: 'sm' | 'md'
  }
  text?: string | number | boolean | null | undefined  // Primitive values

  // Layout props
  align?: 'left' | 'center' | 'right'
  className?: string
  copyValue?: string
  copyLabel?: string
}

/**
 * Table header cell props
 */
export interface TableHeaderCellProps {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string | number
  minWidth?: string | number
  className?: string
}
