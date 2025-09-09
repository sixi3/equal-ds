import React, { useState, useMemo } from 'react'
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
  SidebarTrigger,
  Dropdown,
  DropdownTrigger,
  DropdownContentMultiselect,
  DatePicker,
  DateRangeValue,
  ChevronIcon
} from '../../src'
import { Component, Landmark, FileQuestion, LayoutTemplate, BellDot, Grid2x2Plus, Braces, FileInput, FileX2, FileStack, TextSearch, ChartLine, FileChartPie, Cog, MonitorCog, UserCog, BookText, FileCode2, ChartPie, ArrowLeftCircle, Filter } from 'lucide-react'

// Import component-specific utilities
import {
  createTriggerStyles,
  getDropdownContentStyles,
  getFilterLabelStyles,
  createExpansionAnimationStyles,
  formatMultiselectDisplay,
  createItemsByIdMap,
  getInitialOrder,
  validateSelections,
  debounce,
  createUniqueId
} from './sidebar-utils'
import {
  getStatusBadgeStyle,
  ANIMATION_CONSTANTS
} from './sidebar-constants'
import './sidebar-styles.css'

// Import sidebar-specific configuration
import {
  SIDEBAR_ITEMS,
  SIDEBAR_GROUPS,
  FILTER_OPTIONS,
  DEFAULT_FILTER_SELECTIONS,
  SIDEBAR_DEFAULTS
} from './sidebar-config'

interface FinProSidebarProps {
  className?: string
  headerText?: string
  defaultSelected?: string
  defaultExpanded?: boolean
}

export const FinProSidebar: React.FC<FinProSidebarProps> = ({
  className = '',
  headerText = SIDEBAR_DEFAULTS.headerText,
  defaultSelected = SIDEBAR_DEFAULTS.selectedItem,
  defaultExpanded = SIDEBAR_DEFAULTS.expanded
}) => {
  const [selected, setSelected] = useState<string>(defaultSelected)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // Group order for demo: ids match groupId props below
  const initialGroups = ['aa', 'bulk', 'analytics', 'admin', 'docs']
  const [groupOrder, setGroupOrder] = useState<string[]>(initialGroups)

  // Create sidebar items with icons from config
  const createSidebarItemsWithIcons = (items: Array<{ id: string; label: string; icon: any }>) => {
    return items.map(item => ({
      ...item,
      icon: React.createElement(item.icon, { className: "w-5 h-5" })
    }))
  }

  const aaItems = createSidebarItemsWithIcons(SIDEBAR_ITEMS.aa)
  const bulkItems = createSidebarItemsWithIcons(SIDEBAR_ITEMS.bulk)
  const analyticsItems = createSidebarItemsWithIcons(SIDEBAR_ITEMS.analytics)
  const adminItems = createSidebarItemsWithIcons(SIDEBAR_ITEMS.admin)
  const docsItems = createSidebarItemsWithIcons(SIDEBAR_ITEMS.docs)

  const [aaOrder, setAaOrder] = useState<string[]>(getInitialOrder(aaItems))
  const aaById = useMemo(() => createItemsByIdMap(aaItems), [])

  const [bulkOrder, setBulkOrder] = useState<string[]>(getInitialOrder(bulkItems))
  const bulkById = useMemo(() => createItemsByIdMap(bulkItems), [])

  const [analyticsOrder, setAnalyticsOrder] = useState<string[]>(getInitialOrder(analyticsItems))
  const analyticsById = useMemo(() => createItemsByIdMap(analyticsItems), [])

  const [adminOrder, setAdminOrder] = useState<string[]>(getInitialOrder(adminItems))
  const adminById = useMemo(() => createItemsByIdMap(adminItems), [])

  const [docsOrder, setDocsOrder] = useState<string[]>(getInitialOrder(docsItems))
  const docsById = useMemo(() => createItemsByIdMap(docsItems), [])

  // Get group label from config
  const getGroupLabel = (groupId: string): string => {
    const group = SIDEBAR_GROUPS.find(g => g.id === groupId)
    return group?.label || groupId.toUpperCase()
  }

  // Filter options from config
  const templateOptions = FILTER_OPTIONS.templates
  const purposeCodeOptions = FILTER_OPTIONS.purposeCodes
  const statusOptions = FILTER_OPTIONS.statuses
  const aggregatorOptions = FILTER_OPTIONS.aggregators

  // Filter state using defaults from config
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(DEFAULT_FILTER_SELECTIONS.templates)
  const [selectedPurposeCodes, setSelectedPurposeCodes] = useState<string[]>(DEFAULT_FILTER_SELECTIONS.purposeCodes)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(DEFAULT_FILTER_SELECTIONS.statuses)
  const [selectedAggregators, setSelectedAggregators] = useState<string[]>(DEFAULT_FILTER_SELECTIONS.aggregators)

  // Date range picker state - will use smart defaults from DatePicker
  const [selectedRange, setSelectedRange] = useState<DateRangeValue | undefined>(undefined)

  // Individual hover states for each dropdown
  const [isTemplateHovered, setIsTemplateHovered] = useState(false)
  const [isPurposeHovered, setIsPurposeHovered] = useState(false)
  const [isStatusHovered, setIsStatusHovered] = useState(false)
  const [isAggregatorHovered, setIsAggregatorHovered] = useState(false)
  const [isDatePickerHovered, setIsDatePickerHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Helper function to create trigger styles using component utilities
  const createTriggerStylesWithVars = (isHovered: boolean) => {
    return createTriggerStyles(isHovered, isClicked)
  }

  // Individual trigger styles for each dropdown
  const getTemplateTriggerStyles = () => createTriggerStylesWithVars(isTemplateHovered)
  const getPurposeTriggerStyles = () => createTriggerStylesWithVars(isPurposeHovered)
  const getStatusTriggerStyles = () => createTriggerStylesWithVars(isStatusHovered)
  const getAggregatorTriggerStyles = () => createTriggerStylesWithVars(isAggregatorHovered)
  const getDatePickerTriggerStyles = () => createTriggerStylesWithVars(isDatePickerHovered)

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
    <div className={`h-screen flex ${className}`}>
      <SidebarProvider
        defaultOpen
        activeItem={selected}
        onActiveItemChange={(id) => setSelected(id ?? defaultSelected)}
      >
        <Sidebar aria-label="Primary" className="shrink-0">
          <SidebarHeader className="flex items-center justify-between h-16">
            <div className="font-light text-text-secondary italic">{headerText}</div>
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
                    <SidebarGroupLabel>{getGroupLabel('aa')}</SidebarGroupLabel>
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
                    <SidebarGroupLabel>{getGroupLabel('bulk')}</SidebarGroupLabel>
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
                    <SidebarGroupLabel>{getGroupLabel('analytics')}</SidebarGroupLabel>
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
                    <SidebarGroupLabel>{getGroupLabel('admin')}</SidebarGroupLabel>
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
                    <SidebarGroupLabel>{getGroupLabel('docs')}</SidebarGroupLabel>
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
                style={createExpansionAnimationStyles(isExpanded, ANIMATION_CONSTANTS)}
              >
                {/* Multiselect Consent Template Dropdown */}
                <div className="w-full">
                  <label
                    className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                    style={getFilterLabelStyles()}
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
                        {formatMultiselectDisplay(selectedTemplates, templateOptions, 'All Templates', 'None Selected')}
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
                      style={getDropdownContentStyles()}
                    />
                  </Dropdown>
                </div>

                {/* Multiselect Purpose Code Dropdown */}
                <div className="w-full">
                  <label
                    className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                    style={getFilterLabelStyles()}
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
                        {formatMultiselectDisplay(selectedPurposeCodes, purposeCodeOptions, 'All Purpose Codes', 'None Selected')}
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
                      style={getDropdownContentStyles()}
                    />
                  </Dropdown>
                </div>

                {/* Multiselect Consent Status Dropdown */}
                <div className="w-full">
                  <label
                    className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                    style={getFilterLabelStyles()}
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
                              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wider ${getStatusBadgeStyle(option?.value || '')}`}>
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
                      style={getDropdownContentStyles()}
                    />
                  </Dropdown>
                </div>

                {/* Multiselect Account Aggregator Dropdown */}
                <div className="w-full">
                  <label
                    className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                    style={getFilterLabelStyles()}
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
                        {formatMultiselectDisplay(selectedAggregators, aggregatorOptions, 'All Account Aggregators', 'None Selected')}
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
                      style={getDropdownContentStyles()}
                    />
                  </Dropdown>
                </div>

                <div className="w-full">
                  <label
                    className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                    style={getFilterLabelStyles()}
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
}
