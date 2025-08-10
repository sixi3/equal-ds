import type { Meta, StoryObj } from '@storybook/react'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarGroupTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../src'

const meta = {
  title: 'Navigation/Sidebar/Groups',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Nested: Story = {
  render: () => (
    <div className="h-screen flex">
      <SidebarProvider defaultOpen>
        <Sidebar aria-label="Primary" className="shrink-0">
          <SidebarHeader>Groups</SidebarHeader>
          <SidebarContent>
            <SidebarGroup defaultOpen>
              <SidebarGroupTrigger>
                <SidebarGroupLabel>Section A</SidebarGroupLabel>
              </SidebarGroupTrigger>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Item A1</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupTrigger>
                <SidebarGroupLabel>Section B</SidebarGroupLabel>
              </SidebarGroupTrigger>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Item B1</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarGroup>
                    <SidebarGroupTrigger>
                      <SidebarGroupLabel>Subsection B.1</SidebarGroupLabel>
                    </SidebarGroupTrigger>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>Item B1.a</SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-6">Content Area</div>
      </SidebarProvider>
    </div>
  ),
}


