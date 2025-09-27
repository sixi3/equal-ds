import React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, Check, Columns3 } from 'lucide-react'
import { cn } from '../../lib/cn'
import { DropdownTrigger } from '../dropdown/DropdownTrigger'
import { DropdownContent } from '../dropdown/DropdownContent'
import { DropdownItem } from '../dropdown/DropdownItem'
import { Dropdown } from '../dropdown/Dropdown'
import type { TablePaginationProps } from './types'

interface ColumnManagerTriggerProps {
  onOpen: () => void
  label?: string
  srLabel?: string
  disabled?: boolean
}

function TablePaginationImpl({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  currentPageItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showPageSizeSelector = true,
  isFetching = false,
  columnManager,
}: TablePaginationProps & { columnManager?: ColumnManagerTriggerProps }): JSX.Element {
  const startItem = (currentPage - 1) * pageSize + 1
  const totalKnown = typeof totalItems === 'number' && totalItems >= 0
  const endItem = totalKnown ? Math.min(currentPage * pageSize, totalItems) : currentPage * pageSize
  const isLastPage = !totalKnown && typeof currentPageItems === 'number' && currentPageItems < pageSize

  const canGoPrevious = currentPage > 1
  const canGoNext = totalPages ? currentPage < totalPages : !isLastPage

  const handlePageChange = (page: number) => {
    if (page >= 1 && (totalPages ? page <= totalPages : true)) {
      onPageChange(page)
    }
  }

  const getVisiblePages = () => {
    if (!totalPages) {
      const pages = new Set<number>()
      const start = Math.max(1, currentPage - 1)
      const end = isLastPage ? currentPage : currentPage + 1
      for (let i = start; i <= end; i++) {
        pages.add(i)
      }
      const sortedPages = Array.from(pages).sort((a, b) => a - b)
      if (!isLastPage) {
        sortedPages.push(NaN)
      }
      return sortedPages
    }

    if (totalPages <= 1) {
      return [1]
    }

    const delta = 1
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex items-center justify-between px-2 py-4 bg-gradient-to-b from-primary-50 to-primary-100 border border-b-2 border-t-0 border-border-default rounded-b-lg">
      {/* Left side - Results info and page size selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-text-tertiary tracking-wide min-w-[12rem]">
          {isFetching ? (
            <div className="flex items-center gap-1.5 text-text-primary tracking-wide">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Loading your data…</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAYCAYAAAC8/X7cAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1VhPTxNBFH87O7stYglRm+CfaJVgAh4sGsWYiBw4qQeCN7+E8RMQvgEevWFiTLygJsIFDgqJkUAEEkUDCsVQQEBBKpR2uzu+N92FdtmWgoasv3Q6M2/+7O/9me28KoAY/vK9JahpbSqDKGMKKCijQhAebWH3Hbl7ntdcyFkjXDW45rmfIexiWQILxNIZs7O+Otwux4l8eVB/HirTQecMVMaAKXCg8FLIPU5fphBgZCxY3zRgLZl8cLm6qoPrXL0fCupQpqmgY0EvgKIcsAYlALmDhV+crIufVCbThuIOrjEW0bgCGldBQ/Zc9R95B6SAUwe4WjkyPR/hKpKnsCHLq6gdQ+s7DvCKXzdEgXH3OSkUHl57eJ4xW0geyCBBpGz3aaKSDRtFyV9Vii+UEuXKHvbwmis52laQXO1ZbLfN/YhcbzJHkFv7HbkG/2894CDPA64j4D94kGO5HecXz43Rj5OQShvgF+wIoUKDBCJP5VXfWyiGrzNzMPh+HGbnl2R/7ffGVttBHPu0F4HGunHPpR+rUDI8rMuKkScS45Mz0HqrCU5VhaH/3Rh4oX9wTBILBDToGxiS5GbnF+Ezrs1FKFQOx45UyvYA7nXuzAkIH62E3v5h+DQRg/2AexF3yJPV7zRfh4rDh6DhUp18EBGNXqjJn5tYhzASI3ltTcRevw6/sDx90QfpVBpabzdJpebml2H55yosYRkcGQdd12HqW1wWUvDU8XBBsgXPQK5nnPboh0kI6hp0db+WfQqP+MIiTGGouM9D47UoJJDsoycv87wUwPX3WprhGFp5KhbfkpOiZJTmG1egGr1w7vRJaLx6sTh5N1EbHAoo2Xjtoqw7n/VsjTVE66D2fGTHJhTHzY1XJGEnHHQMpyBaN6uILpUm2V9ht7fQfkFh1ds/JOs4hklgH0RnF5Z3f9MV8kCxdz9t2tXzRsZ5Q32d55y7t27iYY9BIrEhPUGhQGeo4nC5HK89f0Z6hzzhyG5g2FWEsm06X1MzcfksmrcXKBNzK9NHQ2WRMp3bCU2+OmtIygFZdq8P+JegjMwwLdg0TFhJbMJqcuMsJ7cIWYS8ZzOxfZ0mVIQOgR/gXKeF2E5uCJwaJiaapoXWt3BAsbauqjsSU3D13bFXyqW/UFJRbC9h58S2kWVu7OQH6YwVy2SsiMGyxC3pAX/eS00rmxMjZzAsEas/ezzGU4bRvpZUmwSSp6SZmyyruM9udRbYZ4CS+pQByWT6McklzezfKhz/VlGiuSmln+CEkGmKGL6tHl6uqeog+R9XwK9tppir6wAAAABJRU5ErkJggg==" alt="Shift key" />
              <span>+</span>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAUCAYAAABWMrcvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHpSURBVHgBhVPNbtRADLY9k+wuB5Te4JYVJ3pauPSaPgJPUPEoPEl74wjiBaAPAEj8CNQeNodKOWalIrKb+cOeTcpkRYVXXo/t77NnMh6EA7lubisIfgUBCoewCejfPn18VKcYHBfrpisdmvOMsNKKYsKzWufBhXDRe/dqJEfS+ubXCrLwfp5RkWkFWmFMBFbjAhjrYGdCDd6cLplITduVoP2bRa6KxUwDW/j2/QouXr+Dr2wfsL/INcxzKgH1uTSh262p8kyVs0zBjLvkmuDjl59xy5/Yij/mtKbqumkr0ohncoaMVfG2FOHkwxD7mjXTGLdNpM44hqUAETnACjglyemQIOYFJ3gpFAMjFg/vAPcxyRMOxYGGYEI4eXZ8ZzG9GyGy0WlglJPnx1Fh+OxjcoQQ/Ecwoe5POJBCGj+QMFmH6JPMyj34CXFfOIDnBclfYCcq3FNgSEQs/8hjqJ33MeBHckiwgy8556VTqMkZf2l5KOM0u3BHjFZArJaLGisY7oJwiet1W8BCfeZhLec8nHGchgkRopB662FrHPze2frJo4dLWi6PNjz6L7rebbqdA7YRsB2s+F1v2fd1H9zp32tg+dG05YxHn7tUKnlPsm1+Th8M2JeTR5jK1U27QqKKMwWzNvYfz/0P9VYBWSIdnCMAAAAASUVORK5CYII=" alt="Mouse" />
              <span>to view all columns</span>
            </div>
          )}
        </div>

        
      </div>

      {/* Right side - Pagination controls */}
      <div className="flex items-center gap-4">
        {showPageSizeSelector && onPageSizeChange && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary tracking-wide">Rows per page</span>
              <Dropdown disabled={isFetching}>
                <DropdownTrigger
                  variant="outline"
                  className="px-2 py-1 h-auto text-xs bg-background-secondary border border-b-2 border-border-default shadow-none hover:translate-y-[-1px] transition-all duration-200"
                  disabled={isFetching}
                  srLabel="Select number of rows per page"
                >
                  {pageSize}
                </DropdownTrigger>
                {!isFetching && (
                  <DropdownContent className="w-20 py-0">
                    {pageSizeOptions.map((size) => (
                      <DropdownItem
                        key={size}
                        onClick={() => onPageSizeChange(size)}
                        data-active={size === pageSize ? "true" : undefined}
                        className={cn(
                          "text-center justify-between my-1",
                          size === pageSize && "bg-background-tertiary text-text-primary font-medium"
                        )}
                      >
                        <span>{size}</span>
                        {size === pageSize && <Check className="h-4 w-4" />}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                )}
              </Dropdown>
            </div>
          )}
        
        <span className="h-4 w-px bg-border-default"></span>
        <div className="flex items-center gap-1">
          {/* First page */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={!canGoPrevious}
            className={cn(
              'p-2 rounded-md text-text-secondary hover:bg-background-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2'
            )}
            aria-label="Go to first page"
          >
            <ChevronsLeft className="w-3 h-3" />
          </button>

          {/* Previous page */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            className={cn(
              'p-2 rounded-md text-text-secondary hover:bg-background-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2'
            )}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {Number.isNaN(page) ? (
                  <span className="w-6 h-6 flex items-center justify-center text-sm text-text-tertiary">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={cn(
                      'w-8 h-8 text-sm rounded-lg transition-colors flex items-center justify-center',
                      'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2',
                      page === currentPage
                        ? 'bg-background-secondary border border-border-hover border-b-2 text-text-primary font-medium'
                        : 'bg-transparent border border-border-default text-text-secondary hover:bg-background-secondary hover:text-text-primary hover:border-border-hover hover:translate-y-[-1px] transition-all duration-200'
                    )}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next page */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canGoNext}
            className={cn(
              'p-2 rounded-md text-text-secondary border hover:bg-background-secondary hover:border-border-hover hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2'
            )}
            aria-label="Go to next page"
          >
            <ChevronRight className="w-3 h-3" />
          </button>

          {/* Last page */}
          {totalPages && (
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={!canGoNext}
              className={cn(
                'p-2 rounded-md text-text-secondary hover:bg-background-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2'
              )}
              aria-label="Go to last page"
            >
              <ChevronsRight className="w-3 h-3" />
            </button>
          )}
          <span className="h-4 w-px bg-border-default" aria-hidden="true"></span>
          {columnManager && (
          <>
            <button
              type="button"
              onClick={columnManager.onOpen}
              disabled={columnManager.disabled}
              className={cn(
                'inline-flex items-center gap-1.5 text-xs font-medium text-text-primary hover:underline transition-colors duration-200 mx-3',
                'hover:border-border-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
                columnManager.disabled && 'opacity-60 cursor-not-allowed',
              )}
              aria-label={columnManager.srLabel ?? columnManager.label ?? 'Manage columns'}
            >
              <Columns3 className="h-4 w-4" aria-hidden="true" />
              <span>{columnManager.label ?? 'Manage columns'}</span>
            </button>
          </>
        )}
        </div>
      </div>
    </div>
  )
}

export const TablePagination = React.memo(TablePaginationImpl)
