import React from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerWidth,
} from '../../src'
import { Columns3 } from 'lucide-react'

export interface FinProDrawerProps {
  /** Title to display in the drawer header */
  title?: string
  /** Subtitle to display below the title */
  subtitle?: string
  /** Icon to display in the header */
  icon?: React.ReactNode
  /** Drawer variant - overlay or floating */
  variant?: 'overlay' | 'floating'
  /**
   * Drawer width:
   * - Numbers: converted to px (e.g., 500 → 500px)
   * - Strings: used directly (e.g., "400px", "w-96", "50vw")
   */
  width?: DrawerWidth
  /** Children to render inside the drawer content */
  children?: React.ReactNode
  className?: string
}

export const FinProDrawer: React.FC<FinProDrawerProps> = ({
  title = 'Edit Columns',
  subtitle = 'Use the controls below to view/hide/reorganise the columns in the table.',
  icon = <Columns3 className="w-5 h-5" />,
  variant = 'overlay',
  width = 1000,
  children,
  className = '',
}) => {
  return (
    <Drawer variant={variant} width={width} className={className}>
      <DrawerHeader title={title} subtitle={subtitle} icon={icon} />
      <DrawerContent>
        {children || (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <span>Sample content - replace with your drawer content</span>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
