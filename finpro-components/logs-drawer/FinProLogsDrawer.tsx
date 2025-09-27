import React from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
} from '../../src'
import { FileText } from 'lucide-react'

export interface FinProLogsDrawerProps {
  /** Title to display in the drawer header */
  title?: string
  /** Subtitle to display below the title */
  subtitle?: string
  /** Icon to display in the header */
  icon?: React.ReactNode
  /** Children to render inside the drawer content */
  children?: React.ReactNode
  /** Additional CSS class for the drawer */
  className?: string
}

export const FinProLogsDrawer: React.FC<FinProLogsDrawerProps> = ({
  title = 'View Logs',
  subtitle = 'Monitor system activity, errors, and performance metrics in real-time',
  icon = <FileText className="w-5 h-5" />,
  children,
  className = '',
}) => {
  return (
    <Drawer
      variant="overlay"
      className={`border-border-default ${className}`}
      style={{ width: '1200px' }}
    >
      <DrawerHeader title={title} subtitle={subtitle} icon={icon} />
      <DrawerContent>
        {children}
      </DrawerContent>
    </Drawer>
  )
}
