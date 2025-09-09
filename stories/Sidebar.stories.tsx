import './tailwind.css'
import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarGroupTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarTrigger, Dropdown, DropdownTrigger, DropdownContentMultiselect, DatePicker, DateRangeValue } from '../src'
import { Component, Landmark, FileQuestion, LayoutTemplate, BellDot, Grid2x2Plus, Braces, FileInput, FileX2, FileStack, TextSearch, ChartLine, FileChartPie, Cog, MonitorCog, UserCog, BookText, FileCode2, ChartPie, ArrowLeftCircle, Filter } from 'lucide-react'
import { ChevronIcon } from '../src/lib/ChevronIcon'

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

export const WithFilters: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('consent-templates')
    const [isExpanded, setIsExpanded] = useState(false)

    // Group order for demo: ids match groupId props below
    const initialGroups = ['aa', 'bulk', 'analytics', 'admin', 'docs']
    const [groupOrder, setGroupOrder] = useState<string[]>(initialGroups)

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
    const [aaOrder, setAaOrder] = useState<string[]>(aaItems.map((x) => x.id))
    const aaById = React.useMemo(() => Object.fromEntries(aaItems.map((x) => [x.id, x])), [])

    // BULK OPERATIONS
    const bulkItems = [
      { id: 'bulk-consent-request', label: 'Bulk Consent Request', icon: <Braces className="w-5 h-5" /> },
      { id: 'bulk-data-fetch', label: 'Bulk Data Fetch', icon: <FileInput className="w-5 h-5" /> },
      { id: 'bulk-consent-revoke', label: 'Bulk Consent Revoke', icon: <FileX2 className="w-5 h-5" /> },
      { id: 'bulk-csv-upload', label: 'Bulk CSV Upload', icon: <FileStack className="w-5 h-5" /> },
    ]
    const [bulkOrder, setBulkOrder] = useState<string[]>(bulkItems.map((x) => x.id))
    const bulkById = React.useMemo(() => Object.fromEntries(bulkItems.map((x) => [x.id, x])), [])

    // ANALYTICS
    const analyticsItems = [
      { id: 'insights', label: 'Insights', icon: <TextSearch className="w-5 h-5" /> },
      { id: 'analytics', label: 'Analytics', icon: <ChartLine className="w-5 h-5" /> },
      { id: 'pdf-analytics', label: 'PDF Analytics', icon: <FileChartPie className="w-5 h-5" /> },
    ]
    const [analyticsOrder, setAnalyticsOrder] = useState<string[]>(analyticsItems.map((x) => x.id))
    const analyticsById = React.useMemo(() => Object.fromEntries(analyticsItems.map((x) => [x.id, x])), [])

    // ADMIN & SETUP
    const adminItems = [
      { id: 'settings', label: 'Settings', icon: <Cog className="w-5 h-5" /> },
      { id: 'manage-apps', label: 'Manage Apps', icon: <MonitorCog className="w-5 h-5" /> },
      { id: 'admin', label: 'Admin', icon: <UserCog className="w-5 h-5" /> },
    ]
    const [adminOrder, setAdminOrder] = useState<string[]>(adminItems.map((x) => x.id))
    const adminById = React.useMemo(() => Object.fromEntries(adminItems.map((x) => [x.id, x])), [])

    // REFERENCE & DOCS
    const docsItems = [
      { id: 'central-registry', label: 'Central Registry', icon: <BookText className="w-5 h-5" /> },
      { id: 'integration-docs', label: 'Integration Docs', icon: <FileCode2 className="w-5 h-5" /> },
      { id: 'mis', label: 'MIS', icon: <ChartPie className="w-5 h-5" /> },
    ]
    const [docsOrder, setDocsOrder] = useState<string[]>(docsItems.map((x) => x.id))
    const docsById = React.useMemo(() => Object.fromEntries(docsItems.map((x) => [x.id, x])), [])

    // Filter options
    const templateOptions = [
      { value: 'template-1', label: 'Template One' },
      { value: 'template-2', label: 'Template Two' },
      { value: 'template-3', label: 'Template Three' },
      { value: 'template-4', label: 'Template Four' },
      { value: 'template-5', label: 'Template Five' },
    ]

    const purposeCodeOptions = [
      { value: 'purpose-101', label: 'Purpose 101' },
      { value: 'purpose-102', label: 'Purpose 102' },
      { value: 'purpose-103', label: 'Purpose 103' },
      { value: 'purpose-104', label: 'Purpose 104' },
      { value: 'purpose-105', label: 'Purpose 105' },
    ]

    const statusOptions = [
      { value: 'pending', label: 'PENDING' },
      { value: 'active', label: 'ACTIVE' },
      { value: 'rejected', label: 'REJECTED' },
      { value: 'revoked', label: 'REVOKED' },
      { value: 'paused', label: 'PAUSED' },
      { value: 'failed', label: 'FAILED' },
    ]

    const aggregatorOptions = [
      { value: 'agg-1', label: 'Aggregator One' },
      { value: 'agg-2', label: 'Aggregator Two' },
      { value: 'agg-3', label: 'Aggregator Three' },
      { value: 'agg-4', label: 'Aggregator Four' },
      { value: 'agg-5', label: 'Aggregator Five' },
    ]

    // Filter state
    const [selectedTemplates, setSelectedTemplates] = useState<string[]>(
      templateOptions.map(option => option.value)
    )
    const [selectedPurposeCodes, setSelectedPurposeCodes] = useState<string[]>(
      purposeCodeOptions.map(option => option.value)
    )
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
      statusOptions.map(option => option.value)
    )
    const [selectedAggregators, setSelectedAggregators] = useState<string[]>(
      aggregatorOptions.map(option => option.value)
    )

    // Date range picker state - will use smart defaults from DatePicker
    const [selectedRange, setSelectedRange] = useState<DateRangeValue | undefined>(undefined)

    // Individual hover states for each dropdown
    const [isTemplateHovered, setIsTemplateHovered] = useState(false)
    const [isPurposeHovered, setIsPurposeHovered] = useState(false)
    const [isStatusHovered, setIsStatusHovered] = useState(false)
    const [isAggregatorHovered, setIsAggregatorHovered] = useState(false)
    const [isDatePickerHovered, setIsDatePickerHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    // Helper function to create trigger styles
    const createTriggerStyles = (isHovered: boolean) => {
      const baseStyles: any = {
        transform: isHovered ? 'translateY(-1px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
        transition: 'all 0.2s ease-in-out',
      }

      // Apply base styles or hover styles based on hover state
      const bgColor = isHovered ? '--color-background-tertiary' : '--color-background-secondary'
      const txtColor = '--color-text-primary'
      const brdColor = isHovered ? '--color-border-hover' : '--color-border-default'
      const shadow = isHovered ? '--shadow-md' : '--core-shadows-sm'
      const borderBottomWidthValue = isHovered ? '3px' : '3px'

      // Apply CSS variables directly (they'll be resolved by CSS)
      if (bgColor) baseStyles.backgroundColor = `var(${bgColor})`
      if (txtColor) baseStyles.color = `var(${txtColor})`
      if (brdColor) baseStyles.borderColor = `var(${brdColor})`
      baseStyles.fontSize = 'var(--typography-fontSize-sm)'
      baseStyles.fontWeight = 'var(--typography-fontWeight-medium)'
      baseStyles.letterSpacing = '0.05em'
      baseStyles.padding = 'var(--spacing-2)'
      baseStyles.borderRadius = 'var(--border-radius-lg)'
      baseStyles.borderWidth = '1px'
      baseStyles.borderStyle = 'solid'
      if (borderBottomWidthValue) baseStyles.borderBottomWidth = borderBottomWidthValue
      if (shadow) baseStyles.boxShadow = `var(${shadow})`

      return baseStyles
    }

    // Individual trigger styles for each dropdown
    const getTemplateTriggerStyles = () => createTriggerStyles(isTemplateHovered)
    const getPurposeTriggerStyles = () => createTriggerStyles(isPurposeHovered)
    const getStatusTriggerStyles = () => createTriggerStyles(isStatusHovered)
    const getAggregatorTriggerStyles = () => createTriggerStyles(isAggregatorHovered)
    const getDatePickerTriggerStyles = () => createTriggerStyles(isDatePickerHovered)

    // Individual hover handlers
    const handleTemplateMouseEnter = () => setIsTemplateHovered(true)
    const handleTemplateMouseLeave = () => setIsTemplateHovered(false)
    const handlePurposeMouseEnter = () => setIsPurposeHovered(true)
    const handlePurposeMouseLeave = () => setIsPurposeHovered(false)
    const handleStatusMouseEnter = () => setIsStatusHovered(true)
    const handleStatusMouseLeave = () => setIsStatusHovered(false)
    const handleAggregatorMouseEnter = () => setIsAggregatorHovered(true)
    const handleAggregatorMouseLeave = () => setIsAggregatorHovered(false)
    const handleDatePickerMouseEnter = () => setIsDatePickerHovered(true)
    const handleDatePickerMouseLeave = () => setIsDatePickerHovered(false)

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

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

          {/* Main content with filters */}
          <div className="flex-1 flex flex-col bg-background-primary">
            {/* Filter Section */}
            <div className="p-3">
              <div className="bg-background-secondary border border-border-default rounded-xl p-3 shadow-md">
                <div
                  className="flex justify-between items-center cursor-pointer rounded-lg p-2 -m-2 transition-colors duration-200"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-background-tertiary p-1.5 rounded-lg">
                      <Filter className="w-4 h-4 text-text-primary" />
                    </div>
                    <h2 className="text-xl font-medium text-text-primary tracking-wider">
                      Filters
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded hover:bg-background-primary hover:border hover:border-border-default transition-colors duration-200">
                      <ChevronIcon
                        isOpen={isExpanded}
                        className="text-text-primary"
                        duration={200}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full`}
                  style={{
                    transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-out, margin-top 0.5s ease-out',
                    maxHeight: isExpanded ? '384px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                    marginTop: isExpanded ? '16px' : '0px'
                  }}
                >
                  {/* Multiselect Consent Template Dropdown */}
                  <div className="w-full">
                    <label
                      className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                      style={{
                        fontSize: 'var(--typography-fontSize-xs)',
                        fontWeight: 'var(--typography-fontWeight-medium)',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      Consent Template
                    </label>
                    <Dropdown>
                      <DropdownTrigger
                        variant="default"
                        className="w-full"
                        style={getTemplateTriggerStyles()}
                        onMouseEnter={handleTemplateMouseEnter}
                        onMouseLeave={handleTemplateMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      >
                        <span className={`flex-1 text-left ${selectedTemplates.length === 0 ? 'text-text-secondary' : ''}`}>
                          {selectedTemplates.length === templateOptions.length
                            ? 'All Templates'
                            : selectedTemplates.length === 0
                            ? 'None Selected'
                            : `${selectedTemplates.length} selected`
                          }
                        </span>
                      </DropdownTrigger>
                      <DropdownContentMultiselect
                        options={templateOptions}
                        selectedValues={selectedTemplates}
                        onSelectionChange={setSelectedTemplates}
                        enableSelectAll={true}
                        selectAllLabel="All Templates"
                        enableSearch={true}
                        searchPlaceholder="Search for templates"
                        maxHeight="200px"
                        style={{
                          borderColor: 'var(--color-border-default)',
                          backgroundColor: 'var(--color-background-secondary)',
                          borderRadius: 'var(--border-radius-lg)',
                        }}
                      />
                    </Dropdown>
                  </div>

                  {/* Multiselect Purpose Code Dropdown */}
                  <div className="w-full">
                    <label
                      className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                      style={{
                        fontSize: 'var(--typography-fontSize-xs)',
                        fontWeight: 'var(--typography-fontWeight-medium)',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      Purpose Code
                    </label>
                    <Dropdown>
                      <DropdownTrigger
                        variant="default"
                        className="w-full"
                        style={getPurposeTriggerStyles()}
                        onMouseEnter={handlePurposeMouseEnter}
                        onMouseLeave={handlePurposeMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      >
                        <span className={`flex-1 text-left ${selectedPurposeCodes.length === 0 ? 'text-text-secondary' : ''}`}>
                          {selectedPurposeCodes.length === purposeCodeOptions.length
                            ? 'All Purpose Codes'
                            : selectedPurposeCodes.length === 0
                            ? 'None Selected'
                            : `${selectedPurposeCodes.length} selected`
                          }
                        </span>
                      </DropdownTrigger>
                      <DropdownContentMultiselect
                        options={purposeCodeOptions}
                        selectedValues={selectedPurposeCodes}
                        onSelectionChange={setSelectedPurposeCodes}
                        enableSelectAll={true}
                        selectAllLabel="All Purpose Codes"
                        enableSearch={true}
                        searchPlaceholder="Search purpose codes"
                        maxHeight="200px"
                        style={{
                          borderColor: 'var(--color-border-default)',
                          backgroundColor: 'var(--color-background-secondary)',
                          borderRadius: 'var(--border-radius-lg)',
                        }}
                      />
                    </Dropdown>
                  </div>

                  {/* Multiselect Consent Status Dropdown */}
                  <div className="w-full">
                    <label
                      className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                      style={{
                        fontSize: 'var(--typography-fontSize-xs)',
                        fontWeight: 'var(--typography-fontWeight-medium)',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      Consent Status
                    </label>
                    <Dropdown>
                      <DropdownTrigger
                        variant="default"
                        className="w-full"
                        style={getStatusTriggerStyles()}
                        onMouseEnter={handleStatusMouseEnter}
                        onMouseLeave={handleStatusMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      >
                        <span className={`flex-1 text-left ${selectedStatuses.length === 0 ? 'text-text-secondary' : ''}`}>
                          {selectedStatuses.length === statusOptions.length
                            ? 'All Statuses'
                            : selectedStatuses.length === 0
                            ? 'None Selected'
                            : selectedStatuses.length === 1
                            ? (() => {
                                const option = statusOptions.find(opt => opt.value === selectedStatuses[0])
                              return (
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wider ${
                                  option?.label.toLowerCase() === 'active'
                                    ? 'bg-status-active-bg text-status-active-text'
                                    : option?.label.toLowerCase() === 'pending'
                                    ? 'bg-status-pending-bg text-status-pending-text'
                                    : option?.label.toLowerCase() === 'rejected'
                                    ? 'bg-status-rejected-bg text-status-rejected-text'
                                    : option?.label.toLowerCase() === 'revoked'
                                    ? 'bg-status-revoked-bg text-status-revoked-text'
                                    : option?.label.toLowerCase() === 'paused'
                                    ? 'bg-status-paused-bg text-status-paused-text'
                                    : option?.label.toLowerCase() === 'failed'
                                    ? 'bg-status-failed-bg text-status-failed-text'
                                    : 'bg-[#F3F4F6] text-[#374151]'
                                }`}>
                                  {option?.label}
                                </span>
                              )
                              })()
                            : `${selectedStatuses.length} selected`
                          }
                        </span>
                      </DropdownTrigger>
                      <DropdownContentMultiselect
                        options={statusOptions}
                        selectedValues={selectedStatuses}
                        onSelectionChange={setSelectedStatuses}
                        enableSelectAll={true}
                        selectAllLabel="All Statuses"
                        enableSearch={true}
                        searchPlaceholder="Search statuses"
                        maxHeight="200px"
                        isStatusTag={true}
                        style={{
                          borderColor: 'var(--color-border-default)',
                          backgroundColor: 'var(--color-background-secondary)',
                          borderRadius: 'var(--border-radius-lg)',
                        }}
                      />
                    </Dropdown>
                  </div>

                  {/* Multiselect Account Aggregator Dropdown */}
                  <div className="w-full">
                    <label
                      className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                      style={{
                        fontSize: 'var(--typography-fontSize-xs)',
                        fontWeight: 'var(--typography-fontWeight-medium)',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      Account Aggregator
                    </label>
                    <Dropdown>
                      <DropdownTrigger
                        variant="default"
                        className="w-full"
                        style={getAggregatorTriggerStyles()}
                        onMouseEnter={handleAggregatorMouseEnter}
                        onMouseLeave={handleAggregatorMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      >
                        <span className={`flex-1 text-left ${selectedAggregators.length === 0 ? 'text-text-secondary' : ''}`}>
                          {selectedAggregators.length === aggregatorOptions.length
                            ? 'All Account Aggregators'
                            : selectedAggregators.length === 0
                            ? 'None Selected'
                            : `${selectedAggregators.length} selected`
                          }
                        </span>
                      </DropdownTrigger>
                      <DropdownContentMultiselect
                        options={aggregatorOptions}
                        selectedValues={selectedAggregators}
                        onSelectionChange={setSelectedAggregators}
                        enableSelectAll={true}
                        selectAllLabel="All Aggregators"
                        enableSearch={true}
                        searchPlaceholder="Search aggregators"
                        maxHeight="200px"
                        style={{
                          borderColor: 'var(--color-border-default)',
                          backgroundColor: 'var(--color-background-secondary)',
                          borderRadius: 'var(--border-radius-lg)',
                        }}
                      />
                    </Dropdown>
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                      style={{
                        fontSize: 'var(--typography-fontSize-xs)',
                        fontWeight: 'var(--typography-fontWeight-medium)',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      Consent Created On
                    </label>
                    <DatePicker
                      selectedRange={selectedRange}
                      rangeMode={true}
                      onRangeChange={setSelectedRange}
                      placeholder="Select date range"
                      dateFormat="medium"
                      variant="default"
                      showCalendarIcon={true}
                      triggerClassName="w-full"
                      triggerStyle={getDatePickerTriggerStyles()}
                      onTriggerMouseEnter={handleDatePickerMouseEnter}
                      onTriggerMouseLeave={handleDatePickerMouseLeave}
                      onTriggerMouseDown={handleMouseDown}
                      onTriggerMouseUp={handleMouseUp}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </SidebarProvider>
      </div>
    )
  },
}


