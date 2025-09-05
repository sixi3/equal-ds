import './tailwind.css'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarGroupTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarTrigger } from '../src'
import { Component, Landmark, FileQuestion, LayoutTemplate, BellDot, Grid2x2Plus, Braces, FileInput, FileX2, FileStack, TextSearch, ChartLine, FileChartPie, Cog, MonitorCog, UserCog, BookText, FileCode2, ChartPie, ArrowLeftCircle } from 'lucide-react'

const meta = {
  title: 'Navigation/Sidebar',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>('consent-templates')

    // Group order for demo: ids match groupId props below
    const initialGroups = ['aa', 'bulk', 'analytics', 'admin', 'docs']
    const [groupOrder, setGroupOrder] = React.useState<string[]>(initialGroups)

    // AA ECOSYSTEM
    const aaItems = [
      { id: 'account-aggregator', label: 'Account Aggregator', icon: <Component className="w-5 h-5" /> },
      { id: 'fip', label: 'FIP', icon: <Landmark className="w-5 h-5" /> },
      { id: 'purpose', label: 'Purpose', icon: <FileQuestion className="w-5 h-5" /> },
      { id: 'consent-templates', label: 'Consent Templates', icon: <LayoutTemplate className="w-5 h-5" /> },
      { id: 'consent-requests', label: 'Consent Requests', icon: <FileStack className="w-5 h-5" /> },
      { id: 'fi-notifications', label: 'FI Notifications', icon: <BellDot className="w-5 h-5" /> },
      { id: 'data-fetch-request', label: 'Data Fetch Request', icon: <Grid2x2Plus className="w-5 h-5" /> },
    ]
    const [aaOrder, setAaOrder] = React.useState<string[]>(aaItems.map((x) => x.id))
    const aaById = React.useMemo(() => Object.fromEntries(aaItems.map((x) => [x.id, x])), [])

    // BULK OPERATIONS
    const bulkItems = [
      { id: 'bulk-consent-request', label: 'Bulk Consent Request', icon: <Braces className="w-5 h-5" /> },
      { id: 'bulk-data-fetch', label: 'Bulk Data Fetch', icon: <FileInput className="w-5 h-5" /> },
      { id: 'bulk-consent-revoke', label: 'Bulk Consent Revoke', icon: <FileX2 className="w-5 h-5" /> },
      { id: 'bulk-csv-upload', label: 'Bulk CSV Upload', icon: <FileStack className="w-5 h-5" /> },
    ]
    const [bulkOrder, setBulkOrder] = React.useState<string[]>(bulkItems.map((x) => x.id))
    const bulkById = React.useMemo(() => Object.fromEntries(bulkItems.map((x) => [x.id, x])), [])

    // ANALYTICS
    const analyticsItems = [
      { id: 'insights', label: 'Insights', icon: <TextSearch className="w-5 h-5" /> },
      { id: 'analytics', label: 'Analytics', icon: <ChartLine className="w-5 h-5" /> },
      { id: 'pdf-analytics', label: 'PDF Analytics', icon: <FileChartPie className="w-5 h-5" /> },
    ]
    const [analyticsOrder, setAnalyticsOrder] = React.useState<string[]>(analyticsItems.map((x) => x.id))
    const analyticsById = React.useMemo(() => Object.fromEntries(analyticsItems.map((x) => [x.id, x])), [])

    // ADMIN & SETUP
    const adminItems = [
      { id: 'settings', label: 'Settings', icon: <Cog className="w-5 h-5" /> },
      { id: 'manage-apps', label: 'Manage Apps', icon: <MonitorCog className="w-5 h-5" /> },
      { id: 'admin', label: 'Admin', icon: <UserCog className="w-5 h-5" /> },
    ]
    const [adminOrder, setAdminOrder] = React.useState<string[]>(adminItems.map((x) => x.id))
    const adminById = React.useMemo(() => Object.fromEntries(adminItems.map((x) => [x.id, x])), [])

    // REFERENCE & DOCS
    const docsItems = [
      { id: 'central-registry', label: 'Central Registry', icon: <BookText className="w-5 h-5" /> },
      { id: 'integration-docs', label: 'Integration Docs', icon: <FileCode2 className="w-5 h-5" /> },
      { id: 'mis', label: 'MIS', icon: <ChartPie className="w-5 h-5" /> },
    ]
    const [docsOrder, setDocsOrder] = React.useState<string[]>(docsItems.map((x) => x.id))
    const docsById = React.useMemo(() => Object.fromEntries(docsItems.map((x) => [x.id, x])), [])
    
    return (
      <div className="h-screen flex">
        <SidebarProvider
          defaultOpen
          activeItem={selected}
          onActiveItemChange={(id) => setSelected(id ?? 'consent-templates')}
        >
          <Sidebar aria-label="Primary" className="shrink-0">
            <SidebarHeader className="flex items-center justify-between h-16">
              <div className="font-light text-text-secondary italic">/*workasaur 🦖</div>
              <SidebarTrigger srLabel="Collapse sidebar" className="h-8 w-8">
                <ArrowLeftCircle className="h-5 w-5" />
              </SidebarTrigger>
            </SidebarHeader>
            <SidebarContent reorderableGroups onGroupReorder={(next) => setGroupOrder(next)}>
              {/* AA ECOSYSTEM */}
              {groupOrder.map((groupId) => {
                if (groupId === 'aa') return (
                  <SidebarGroup key="aa" groupId="aa" defaultOpen>
                    <SidebarGroupTrigger>
                      <SidebarGroupLabel>AA ECOSYSTEM</SidebarGroupLabel>
                    </SidebarGroupTrigger>
                    <SidebarGroupContent>
                      <SidebarMenu reorderable onReorder={(next) => setAaOrder(next)}>
                        {aaOrder.map((id) => {
                          const item = aaById[id]
                          return (
                            <SidebarMenuItem key={id} draggable dragId={id}>
                              <SidebarMenuButton itemId={id} icon={item.icon}>{item.label}</SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )
                if (groupId === 'bulk') return (
                  <SidebarGroup key="bulk" groupId="bulk" defaultOpen>
                    <SidebarGroupTrigger>
                      <SidebarGroupLabel>BULK OPERATIONS</SidebarGroupLabel>
                    </SidebarGroupTrigger>
                    <SidebarGroupContent>
                      <SidebarMenu reorderable onReorder={(next) => setBulkOrder(next)}>
                        {bulkOrder.map((id) => {
                          const item = bulkById[id]
                          return (
                            <SidebarMenuItem key={id} draggable dragId={id}>
                              <SidebarMenuButton itemId={id} icon={item.icon}>{item.label}</SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )
                if (groupId === 'analytics') return (
                  <SidebarGroup key="analytics" groupId="analytics" defaultOpen>
                    <SidebarGroupTrigger>
                      <SidebarGroupLabel>ANALYTICS</SidebarGroupLabel>
                    </SidebarGroupTrigger>
                    <SidebarGroupContent>
                      <SidebarMenu reorderable onReorder={(next) => setAnalyticsOrder(next)}>
                        {analyticsOrder.map((id) => {
                          const item = analyticsById[id]
                          return (
                            <SidebarMenuItem key={id} draggable dragId={id}>
                              <SidebarMenuButton itemId={id} icon={item.icon}>{item.label}</SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )
                if (groupId === 'admin') return (
                  <SidebarGroup key="admin" groupId="admin" defaultOpen>
                    <SidebarGroupTrigger>
                      <SidebarGroupLabel>ADMIN & SETUP</SidebarGroupLabel>
                    </SidebarGroupTrigger>
                    <SidebarGroupContent>
                      <SidebarMenu reorderable onReorder={(next) => setAdminOrder(next)}>
                        {adminOrder.map((id) => {
                          const item = adminById[id]
                          return (
                            <SidebarMenuItem key={id} draggable dragId={id}>
                              <SidebarMenuButton itemId={id} icon={item.icon}>{item.label}</SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )
                if (groupId === 'docs') return (
                  <SidebarGroup key="docs" groupId="docs" defaultOpen>
                    <SidebarGroupTrigger>
                      <SidebarGroupLabel>REFERENCE & DOCS</SidebarGroupLabel>
                    </SidebarGroupTrigger>
                    <SidebarGroupContent>
                      <SidebarMenu reorderable onReorder={(next) => setDocsOrder(next)}>
                        {docsOrder.map((id) => {
                          const item = docsById[id]
                          return (
                            <SidebarMenuItem key={id} draggable dragId={id}>
                              <SidebarMenuButton itemId={id} icon={item.icon}>{item.label}</SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )
                return null
              })}
            </SidebarContent>
            <SidebarFooter />
          </Sidebar>
          <div className="flex-1 p-6 space-y-4">
            <SidebarTrigger>
              <ArrowLeftCircle className="h-5 w-5" />
            </SidebarTrigger>
            <div>Selected: {selected}</div>
            <div>Group order: {groupOrder.join(' , ')}</div>
          </div>
        </SidebarProvider>
      </div>
    )
  },
}

export const Reorderable: Story = {
  render: () => {
    const initial = [
      { id: 'account-aggregator', label: 'Account Aggregator', icon: <Component className="w-5 h-5" /> },
      { id: 'fip', label: 'FIP', icon: <Landmark className="w-5 h-5" /> },
      { id: 'purpose', label: 'Purpose', icon: <FileQuestion className="w-5 h-5" /> },
      { id: 'consent-templates', label: 'Consent Templates', icon: <LayoutTemplate className="w-5 h-5" /> },
      { id: 'consent-requests', label: 'Consent Requests', icon: <FileStack className="w-5 h-5" /> },
      { id: 'fi-notifications', label: 'FI Notifications', icon: <BellDot className="w-5 h-5" /> },
    ]
    const [order, setOrder] = React.useState<string[]>(initial.map((x) => x.id))
    const [selected, setSelected] = React.useState<string>('consent-templates')
    const byId = React.useMemo(() => Object.fromEntries(initial.map((x) => [x.id, x])), [])

    return (
      <div className="h-screen flex">
        <SidebarProvider
          defaultOpen
          activeItem={selected}
          onActiveItemChange={(id) => setSelected(id ?? 'consent-templates')}
        >
          <Sidebar aria-label="Primary" className="shrink-0">
            <SidebarHeader className="flex items-center justify-between h-16">
              <div className="font-semibold">FinPro</div>
              <SidebarTrigger srLabel="Collapse sidebar" className="h-8 w-8">
                <ArrowLeftCircle className="h-5 w-5" />
              </SidebarTrigger>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup id="aa" defaultOpen>
                <SidebarGroupTrigger>
                  <SidebarGroupLabel>AA ECOSYSTEM</SidebarGroupLabel>
                </SidebarGroupTrigger>
                <SidebarGroupContent>
                  <SidebarMenu reorderable onReorder={(next) => setOrder(next)}>
                    {order.map((id) => {
                      const item = byId[id]
                      return (
                        <SidebarMenuItem key={id} draggable dragId={id}>
                          <SidebarMenuButton itemId={id} icon={item.icon}>{item.label}</SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
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
            <div>Order: {order.join(' , ')}</div>
          </div>
        </SidebarProvider>
      </div>
    )
  },
}


