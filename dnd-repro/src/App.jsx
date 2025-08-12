import React from 'react'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarGroupTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarRail,
} from 'equal-ds-ui'
import { ArrowLeftCircle, Grid2x2Plus, ChartPie, Cog } from 'lucide-react'

export default function App() {
  const [order, setOrder] = React.useState(['a', 'b', 'c', 'd'])
  React.useEffect(() => { import('@dnd-kit/core').then(() => console.log('DnD OK')) }, [])
  React.useEffect(() => {
    const id = setInterval(() => {
      const h = document.querySelector('[data-drag-handle]')
      console.log('drag handle present:', Boolean(h))
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="h-screen flex">
      <SidebarProvider defaultOpen open>
        <Sidebar aria-label="Primary" className="shrink-0">
          <SidebarHeader className="flex items-center justify-between h-16">
            <div className="font-semibold">Reorder Demo</div>
            <SidebarTrigger srLabel="Collapse sidebar" className="h-8 w-8">
              <ArrowLeftCircle className="h-5 w-5" />
            </SidebarTrigger>
          </SidebarHeader>
          <SidebarContent
            reorderGroups
            defaultGroupOrder={['a','b','c','d']}
            onGroupOrderChange={setOrder}
          >
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
          <SidebarFooter />
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
}
