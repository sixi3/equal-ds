import React from 'react'
import { cn } from '../../lib/cn'
import { Headphones } from 'lucide-react'
import { useSidebarContext } from './SidebarProvider'

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps): JSX.Element {
  const { open } = useSidebarContext()
  
  return (
    <div className={cn('mt-auto border-t border-border', className)} {...props}>
      <div className="p-3">
        <button
          className={cn(
            'w-full inline-flex items-center gap-3 rounded-lg text-sm hover:bg-primary-300/20 border border-transparent hover:border-border transition-[padding,opacity] transition-colors duration-200 ease-out text-foreground',
            // Keep left alignment in both states to avoid reflow; adjust padding to visually center icon
            open ? 'px-3 py-2.5' : 'px-0 py-2.5'
          )}
        >
          <span className={cn(
            'inline-flex items-center justify-center h-10 w-10 shrink-0',
            // Reserve a fixed square for the icon so the label can fade without affecting layout
            !open && 'mx-auto'
          )}>
            <Headphones className="w-5 h-5 text-current" />
          </span>
          <span
            className={cn(
              'whitespace-nowrap',
              open ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'
            )}
          >
            Contact Support
          </span>
        </button>
      </div>
    </div>
  )
}


