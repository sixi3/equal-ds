import React from 'react'
import { cn } from '../../lib/cn'

export interface TagProps {
  children: React.ReactNode
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Tag component for displaying status labels, badges, or categorized items
 * Provides consistent styling with design system colors and multiple size variants
 *
 * @example
 * // Custom styling with className (for status tags)
 * <Tag className="status-active" size="sm">Active</Tag>
 * <Tag className="status-pending" size="md">Pending</Tag>
 *
 * // Available sizes: sm, md
 */
export const Tag: React.FC<TagProps> = ({
  children,
  size = 'sm',
  className,
}) => {
  const baseClasses = 'inline-flex items-center  leading-none tracking-wide font-mono'

  const sizeClasses = {
    sm: 'px-1 py-0.5 text-xs rounded-md',
    md: 'px-2 py-1 text-sm rounded-md',
  }

  const finalClasses = cn(baseClasses, sizeClasses[size], className)

  return (
    <span className={finalClasses}>
      {children}
    </span>
  )
}
