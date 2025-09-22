import React from 'react'
import { cn } from '../../lib/cn'
import { useDrawerContext } from './DrawerProvider'
import { ArrowLeftToLine, ArrowRightToLine, Columns3 } from 'lucide-react'

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  onClose?: () => void
}

function DrawerHeaderImpl({
  className,
  title,
  subtitle,
  icon,
  onClose,
  children,
  ...props
}: DrawerHeaderProps): JSX.Element {
  const { open, toggle, side } = useDrawerContext()

  const handleClose = () => {
    onClose?.()
    toggle?.()
  }

  return (
    <div
      className={cn(
        'p-4 border-b border-border-default bg-background-secondary',
        className,
      )}
      {...props}
    >
      {/* Header Row - Icon, Title, and Close Button */}
      <div className="flex items-center justify-between mb-2">
        {/* Left side - Icon and Title */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && (
            <div className="flex-shrink-0 w-8 h-8 bg-[#E5F5FF] rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 text-[#0F3340]">
                {icon}
              </div>
            </div>
          )}
          {title && (
            <h2 className="text-xl font-bold text-[#0F3340] uppercase tracking-[0.05em] truncate">
              {title}
            </h2>
          )}
          {children}
        </div>

        {/* Right side - Close/Collapse button */}
        <button
          onClick={handleClose}
          className={cn(
            'grid place-items-center h-8 w-8 rounded-md border border-transparent text-[#0F3340] leading-none',
            'hover:bg-primary-300/20 hover:border-border-default transition-all duration-200 ease-out',
            'focus:outline-none focus:ring-2 focus:ring-primary-400',
          )}
          aria-label={open ? 'Close drawer' : 'Open drawer'}
        >
          <ArrowRightToLine className="w-4 h-4" />
        </button>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-base text-text-secondary leading-relaxed tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export const DrawerHeader = React.memo(DrawerHeaderImpl)
