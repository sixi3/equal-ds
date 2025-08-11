import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '../src'
import { ArrowLeftCircle, Grid2x2Plus, ChartPie, Cog } from 'lucide-react'

const meta = {
  title: 'Navigation/Sidebar/Reorderable',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const ReorderGroups: Story = {
  render: () => {
    const [order, setOrder] = React.useState<string[]>(() => {
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem('sidebarGroupOrder') : null
      return saved ? JSON.parse(saved) : ['a', 'b', 'c', 'd']
    })

    React.useEffect(() => {
      if (typeof window !== 'undefined') window.localStorage.setItem('sidebarGroupOrder', JSON.stringify(order))
    }, [order])

    return (
      <div className="h-screen flex">
        <SidebarProvider defaultOpen>
          <Sidebar aria-label="Primary" className="shrink-0">
            <SidebarHeader className="flex items-center justify-between h-16">
              <div className="font-semibold">Reorder Demo</div>
              <SidebarTrigger srLabel="Collapse sidebar" className="h-8 w-8">
                <ArrowLeftCircle className="h-5 w-5" />
              </SidebarTrigger>
            </SidebarHeader>
            <SidebarContent reorderGroups groupOrder={order} onGroupOrderChange={setOrder}>
              <SidebarGroup id="a" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>Group A</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton icon={<Grid2x2Plus className="w-5 h-5" />}>Item A</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup id="b" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>Group B</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton icon={<ChartPie className="w-5 h-5" />}>Item B</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup id="c" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>Group C</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton icon={<Cog className="w-5 h-5" />}>Item C</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup id="d" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>Group D</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton icon={<Cog className="w-5 h-5" />}>Item D</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex-1 p-6 space-y-4">
            <SidebarTrigger>
              <ArrowLeftCircle className="h-5 w-5" />
            </SidebarTrigger>
            <div>Order: {order.join(', ')}</div>
          </div>
        </SidebarProvider>
      </div>
    )
  },
}


