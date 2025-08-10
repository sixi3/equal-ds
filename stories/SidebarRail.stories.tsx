import type { Meta, StoryObj } from '@storybook/react'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarTrigger } from '../src'

const meta = {
  title: 'Navigation/Sidebar/Rail',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Collapsed: Story = {
  render: () => (
    <div className="h-screen flex">
      <SidebarProvider defaultOpen={false}>
        <Sidebar aria-label="Primary" className="shrink-0">
          <SidebarHeader>•</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>🏠</span>} label="Home" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>🔎</span>} endAdornment={<SidebarMenuBadge>3</SidebarMenuBadge>} label="Search" />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<span>⚙️</span>} label="Settings" />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6 space-y-4">
          <SidebarTrigger>Toggle</SidebarTrigger>
          <div>Content Area</div>
        </div>
      </SidebarProvider>
    </div>
  ),
}


