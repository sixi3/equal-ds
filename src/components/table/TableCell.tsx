import React from 'react'
import { cn } from '../../lib/cn'
import { Check, Copy } from 'lucide-react'
import type { TableCellProps } from './types'
import { useCopyToClipboard } from '../../lib'
import { Tag } from '../ui'

/**
 * Button component for table cells
 */
const TableCellButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'sm',
  disabled = false,
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const variantClasses = {
    primary: 'bg-brand-primary text-text-inverse hover:bg-brand-secondary',
    secondary: 'bg-background-secondary text-text-primary hover:bg-background-tertiary',
    outline: 'border border-border-default bg-transparent hover:bg-background-secondary',
    ghost: 'hover:bg-background-secondary hover:text-text-primary',
  }

  const sizeClasses = {
    sm: 'h-7 px-2 text-xs',
    md: 'h-8 px-3 text-sm',
    lg: 'h-9 px-4 text-base',
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}



function TableCellImpl({
  children,
  button,
  tag,
  text,
  align = 'left',
  className,
  copyValue,
  copyLabel = 'Copy value',
  ...props
}: TableCellProps & React.TdHTMLAttributes<HTMLTableCellElement>): JSX.Element {
  // Determine which content type to render
  let content: React.ReactNode

  if (children !== undefined) {
    content = children
  } else if (button) {
    content = <TableCellButton {...button} />
  } else if (tag) {
    content = <Tag {...tag} />
  } else if (text !== undefined) {
    content = text
  } else {
    content = ''
  }

  const { copy, copied } = useCopyToClipboard()

  const handleCopy = async () => {
    if (copyValue) {
      await copy(copyValue)
    }
  }

  const showCopyButton = Boolean(copyValue)

  return (
    <td
      className={cn(
        'px-4 py-3 text-sm text-text-primary whitespace-nowrap',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        showCopyButton && 'relative group',
        className
      )}
      {...props}
    >
      <div className={cn(
        'flex items-center gap-2',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end'
      )}>
        <span className="truncate max-w-[16rem]">
          {content}
        </span>
        {showCopyButton && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copyLabel}
            className="inline-flex h-6 w-6 items-center justify-center rounded border border-border-default bg-background-secondary text-text-tertiary hover:text-text-primary hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </button>
        )}
      </div>
    </td>
  )
}

export const TableCell = React.memo(TableCellImpl)
