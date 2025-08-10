import type { Meta, StoryObj } from '@storybook/react'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../src'

const meta = {
  title: 'Navigation/Sidebar/RightSide',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Right: Story = {
  render: () => (
    <div className="h-screen flex">
      <div className="flex-1 p-6">Content Area</div>
      <SidebarProvider defaultOpen side="right">
        <Sidebar aria-label="Secondary" className="shrink-0">
          <SidebarHeader>Right</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">Item</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>Footer</SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  ),
}


