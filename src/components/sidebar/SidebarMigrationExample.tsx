import * as React from 'react'
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './index'
import { Home, Settings, User, Mail, Bell } from 'lucide-react'

/**
 * Example showing the migrated sidebar using the reusable hover animation system
 * This demonstrates the efficiency gains from using the shared components
 */
export function SidebarMigrationExample() {
  return (
    <div className="p-8">
      <h2 className="text-lg font-semibold mb-4">Sidebar with Reusable Hover Animation</h2>
      <p className="text-sm text-text-muted mb-4">
        The sidebar now uses the same reusable hover animation system as the dropdown.
        This reduces code duplication and ensures consistent behavior.
      </p>
      
      <div className="w-64">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<Home className="w-5 h-5" />}>
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<User className="w-5 h-5" />}>
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<Mail className="w-5 h-5" />}>
                  Messages
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<Bell className="w-5 h-5" />}>
                  Notifications
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<Settings className="w-5 h-5" />}>
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </div>
      
      <div className="mt-6 p-4 bg-background-secondary rounded-lg">
        <h3 className="font-medium mb-2">Efficiency Improvements:</h3>
        <ul className="text-sm text-text-muted space-y-1">
          <li>• <strong>Reduced Code:</strong> ~100 lines of duplicate hover logic removed</li>
          <li>• <strong>Consistent Behavior:</strong> Same animation system across components</li>
          <li>• <strong>Better Performance:</strong> Optimized requestAnimationFrame batching</li>
          <li>• <strong>Easier Maintenance:</strong> Single source of truth for hover animations</li>
          <li>• <strong>No Flickering:</strong> Proven anti-flicker techniques applied</li>
        </ul>
      </div>
    </div>
  )
}
