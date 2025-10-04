import * as React from 'react'
import { cn } from '../../lib/cn'
import { HorizontalTabs } from './HorizontalTabs'
import { CardTabs } from './CardTabs'
import type { TabSwitcherProps } from './types'

/**
 * TabSwitcher component that supports two variations:
 * - horizontal: Classic horizontal tabs (like Consent Logs / Data Logs)
 * - cards: Card-based tabs (like account/session selection)
 *
 * Uses design system tokens and CSS variables for consistent styling.
 */
export const TabSwitcher = React.forwardRef<HTMLDivElement, TabSwitcherProps>(
  ({
    tabs,
    activeTab,
    onTabChange,
    variant = 'horizontal',
    disabled = false,
    className,
    renderTab,
    ...props
  }, ref) => {
    const handleTabChange = (tabId: string) => {
      if (disabled) return
      onTabChange(tabId)
    }

    const commonProps = {
      tabs,
      activeTab,
      onTabChange: handleTabChange,
      disabled,
      className,
      renderTab,
    }

    return (
      <div ref={ref} className={className} {...props}>
        {variant === 'horizontal' ? (
          <HorizontalTabs {...commonProps} />
        ) : (
          <CardTabs {...commonProps} />
        )}
      </div>
    )
  }
)

TabSwitcher.displayName = 'TabSwitcher'
