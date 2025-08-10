import React from 'react'
import { cn } from '../../lib/cn'

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, children, ...props }: SidebarContentProps): JSX.Element {
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const [showTopFade, setShowTopFade] = React.useState(false)
  const [showBottomFade, setShowBottomFade] = React.useState(false)

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const update = () => {
      const { scrollTop, clientHeight, scrollHeight } = el
      setShowTopFade(scrollTop > 0)
      setShowBottomFade(scrollTop + clientHeight < scrollHeight - 1)
    }

    update()
    el.addEventListener('scroll', update, { passive: true })

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(update)
      resizeObserver.observe(el)
    } else {
      window.addEventListener('resize', update)
    }

    return () => {
      el.removeEventListener('scroll', update)
      if (resizeObserver) resizeObserver.disconnect()
      else window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className={cn('relative flex-1 min-h-0', className)} {...props}>
      <div ref={scrollRef} className={cn('px-2 py-3 space-y-8 h-full overflow-y-auto scrollbar-hide')}>
        {children}
      </div>
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-10 z-10 bg-gradient-to-b from-gray-600/20 to-transparent transition-opacity duration-200',
          showTopFade ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 h-10 z-10 bg-gradient-to-t from-gray-600/20 to-transparent transition-opacity duration-200',
          showBottomFade ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}


