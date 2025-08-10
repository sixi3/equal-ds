import type { Meta, StoryObj } from '@storybook/react'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge } from '../src'

const meta = {
  title: 'Navigation/Sidebar/States',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const AllStates: Story = {
  render: () => (
    <div className="h-screen flex">
      <SidebarProvider defaultOpen>
        <Sidebar aria-label="Primary" className="shrink-0">
          <SidebarHeader>States</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>🏠</span>} label="Home" active>
                  Active item
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>🔎</span>} endAdornment={<SidebarMenuBadge>3</SidebarMenuBadge>} label="Search">
                  Default item with badge
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>⚙️</span>} label="Settings" disabled>
                  Disabled item
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>📄</span>} label="Very Long Label Example" href="#">
                  Very long label that should truncate gracefully
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">Content Area</div>
      </SidebarProvider>
    </div>
  ),
}


