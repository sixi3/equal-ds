import './tailwind.css'
import React from 'react'
import type { StoryObj } from '@storybook/react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownContentMultiselect, DropdownItem, DropdownItemMultiselect, DropdownSeparator, DatePicker, DateRangePickerContent, DateRangeValue, getSmartDefaults } from '../src'
import { ChevronDown, Settings, User, LogOut, Hammer, Wrench, Bell, Mail, Heart, Star, ChevronUp, Filter } from 'lucide-react'
import { cn } from '../src/lib/cn'
import { ChevronIcon } from '../src/lib/ChevronIcon'
import { useState } from 'react'
import { getConsentStatusTag } from '../src'



// Import controls
import { generateAllControls } from '../src/story-utils/simpleControls'

// Generate controls for dropdown
const { argTypes, args } = generateAllControls('dropdown')


// Storybook meta configuration
const meta = {
  title: 'Actions/Dropdown',
  argTypes: {
    ...argTypes,
    // Add layout controls
    headerGap: {
      control: 'select',
      options: ['mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-6', 'mb-8'],
      description: 'Gap between header and dropdown components',
      table: { category: 'Layout' }
    },
    dropdownGap: {
      control: 'select',
      options: ['gap-0', 'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-6', 'gap-8', 'gap-10', 'gap-12'],
      description: 'Gap between dropdown components',
      table: { category: 'Layout' }
    }
  },
  args,
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst'
    }
  }
}


export default meta
type Story = StoryObj<typeof meta>

function ExampleDropdown({
  label,
  showLabel = true,
  variant = 'default',
  disabled = false,
  // Style props from simple controls
  backgroundColor,
  textColor,
  borderColor,
  hoverBackgroundColor,
  hoverTextColor,
  hoverBorderColor,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  padding,
  borderRadius,
  borderWidth,
  borderStyle,
  borderBottomWidth,
  hoverBorderBottomWidth,
  boxShadow,
  hoverBoxShadow,
  // Label typography props
  labelFontSize,
  labelFontWeight,
  labelLetterSpacing,
  labelTextColor
}: {
  label: string
  showLabel?: boolean
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
  disabled?: boolean
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
  padding?: string
  borderRadius?: string
  borderWidth?: string
  borderStyle?: string
  borderBottomWidth?: string
  hoverBorderBottomWidth?: string
  boxShadow?: string
  hoverBoxShadow?: string
  // Label typography props
  labelFontSize?: string
  labelFontWeight?: string
  labelLetterSpacing?: string
  labelTextColor?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Simple style generation
  const getTriggerStyles = () => {
    const baseStyles: any = {
      transform: isHovered ? 'translateY(-1px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
      transition: 'all 0.2s ease-in-out',
    }

    // Apply base styles or hover styles based on hover state
    const bgColor = isHovered && hoverBackgroundColor ? hoverBackgroundColor : backgroundColor
    const txtColor = isHovered && hoverTextColor ? hoverTextColor : textColor
    const brdColor = isHovered && hoverBorderColor ? hoverBorderColor : borderColor
    const shadow = isHovered && hoverBoxShadow ? hoverBoxShadow : boxShadow
    const borderBottomWidthValue = isHovered && hoverBorderBottomWidth ? hoverBorderBottomWidth : borderBottomWidth || '1px'

    // Apply CSS variables directly (they'll be resolved by CSS)
    if (bgColor) baseStyles.backgroundColor = `var(${bgColor})`
    if (txtColor) baseStyles.color = `var(${txtColor})`
    if (brdColor) baseStyles.borderColor = `var(${brdColor})`
    if (fontSize) baseStyles.fontSize = `var(${fontSize})`
    if (fontWeight) baseStyles.fontWeight = `var(${fontWeight})`
    if (lineHeight) baseStyles.lineHeight = `var(${lineHeight})`
    if (letterSpacing) {
      baseStyles.letterSpacing = letterSpacing.startsWith('--') ? `var(${letterSpacing})` : letterSpacing
    }
    if (padding) baseStyles.padding = `var(${padding})`
    if (borderRadius) baseStyles.borderRadius = `var(${borderRadius})`
    if (borderWidth) baseStyles.borderWidth = borderWidth
    if (borderStyle) baseStyles.borderStyle = borderStyle
    if (borderBottomWidthValue) baseStyles.borderBottomWidth = borderBottomWidthValue
    if (shadow) baseStyles.boxShadow = `var(${shadow})`

    return baseStyles
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  const handleMouseDown = () => setIsClicked(true)
  const handleMouseUp = () => setIsClicked(false)

  return (
    <div className="w-full">
      {showLabel && (
        <label
          className="mb-1 block"
          style={{
            fontSize: labelFontSize ? `var(${labelFontSize})` : undefined,
            fontWeight: labelFontWeight ? `var(${labelFontWeight})` : undefined,
            letterSpacing: labelLetterSpacing
              ? (labelLetterSpacing.startsWith('--') ? `var(${labelLetterSpacing})` : labelLetterSpacing)
              : undefined,
            color: labelTextColor ? `var(${labelTextColor})` : undefined,
          }}
        >
          {label}
        </label>
      )}
      <Dropdown>
        <DropdownTrigger
          variant={variant}
          disabled={disabled}
          className="w-full"
          style={getTriggerStyles()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <span className="flex-1 text-left">
            {label}
          </span>
        </DropdownTrigger>
        <DropdownContent
          style={{
            borderColor: borderColor ? `var(${borderColor})` : undefined,
            backgroundColor: backgroundColor ? `var(${backgroundColor})` : undefined,
            borderRadius: borderRadius ? `var(${borderRadius})` : undefined,
          }}
        >
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownItem>
          <DropdownItem>
            <Hammer className="mr-2 h-4 w-4" />
            <span>Hammer</span>
          </DropdownItem>
          <DropdownItem>
            <Wrench className="mr-2 h-4 w-4" />
            <span>Wrench</span>
          </DropdownItem>
          <DropdownItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </DropdownItem>
          <DropdownItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>Messages</span>
          </DropdownItem>
          <DropdownItem>
            <Heart className="mr-2 h-4 w-4" />
            <span>Favorites</span>
          </DropdownItem>
          <DropdownItem>
            <Star className="mr-2 h-4 w-4" />
            <span>Starred</span>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Example usage</h3>
      </div>
      <div className="flex flex-wrap gap-4">
        <ExampleDropdown label="User Menu" {...args} />
      </div>
    </div>
  ),
}

export const MultiselectFilter: Story = {
  render: (args: any) => {
    const [isClicked, setIsClicked] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    // Define options arrays first
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

    // Initialize with all options selected by default
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

    // Individual hover states for each dropdown
    const [isTemplateHovered, setIsTemplateHovered] = useState(false)
    const [isPurposeHovered, setIsPurposeHovered] = useState(false)
    const [isStatusHovered, setIsStatusHovered] = useState(false)
    const [isAggregatorHovered, setIsAggregatorHovered] = useState(false)
    const [isDatePickerHovered, setIsDatePickerHovered] = useState(false)

    // Date range picker state - initialized with smart defaults (current time rounded to last 30 mins)
    const [selectedRange, setSelectedRange] = useState<DateRangeValue>(getSmartDefaults)

    // Helper function to create trigger styles
    const createTriggerStyles = (isHovered: boolean) => {
      const baseStyles: any = {
        transform: isHovered ? 'translateY(-1px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
        transition: 'all 0.2s ease-in-out',
      }

      // Apply base styles or hover styles based on hover state
      const bgColor = isHovered && args.hoverBackgroundColor ? args.hoverBackgroundColor : args.backgroundColor
      const txtColor = isHovered && args.hoverTextColor ? args.hoverTextColor : args.textColor
      const brdColor = isHovered && args.hoverBorderColor ? args.hoverBorderColor : args.borderColor
      const shadow = isHovered && args.hoverBoxShadow ? args.hoverBoxShadow : args.boxShadow
      const borderBottomWidthValue = isHovered && args.hoverBorderBottomWidth ? args.hoverBorderBottomWidth : args.borderBottomWidth || '3px'

      // Apply CSS variables directly (they'll be resolved by CSS)
      if (bgColor) baseStyles.backgroundColor = `var(${bgColor})`
      if (txtColor) baseStyles.color = `var(${txtColor})`
      if (brdColor) baseStyles.borderColor = `var(${brdColor})`
      if (args.fontSize) baseStyles.fontSize = `var(${args.fontSize})`
      if (args.fontWeight) baseStyles.fontWeight = `var(${args.fontWeight})`
      if (args.lineHeight) baseStyles.lineHeight = `var(${args.lineHeight})`
      if (args.letterSpacing) {
        baseStyles.letterSpacing = args.letterSpacing.startsWith('--') ? `var(${args.letterSpacing})` : args.letterSpacing
      }
      if (args.padding) baseStyles.padding = `var(${args.padding})`
      if (args.borderRadius) baseStyles.borderRadius = `var(${args.borderRadius})`
      if (args.borderWidth) baseStyles.borderWidth = args.borderWidth
      if (args.borderStyle) baseStyles.borderStyle = args.borderStyle
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
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-white border border-border-default rounded-xl p-3 shadow-md">
          <div
            className="flex justify-between items-center cursor-pointer rounded-lg p-2 -m-2 transition-colors duration-200"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-background-tertiary p-1.5 rounded-lg">
                <Filter className="w-4 h-4 text-text-primary" />
              </div>
              <h2 className="text-xl font-medium text-text-primary tracking-wider">
                Filter Table
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
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ${args.dropdownGap || 'gap-6'} w-full`}
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
                  fontSize: args.labelFontSize ? `var(${args.labelFontSize})` : undefined,
                  fontWeight: args.labelFontWeight ? `var(${args.labelFontWeight})` : undefined,
                  letterSpacing: args.labelLetterSpacing
                    ? (args.labelLetterSpacing.startsWith('--') ? `var(${args.labelLetterSpacing})` : args.labelLetterSpacing)
                    : undefined,
                  color: args.labelTextColor ? `var(${args.labelTextColor})` : undefined,
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
                    borderColor: args.borderColor ? `var(${args.borderColor})` : undefined,
                    backgroundColor: args.backgroundColor ? `var(${args.backgroundColor})` : undefined,
                    borderRadius: args.borderRadius ? `var(${args.borderRadius})` : undefined,
                  }}
                />
              </Dropdown>
            </div>

            {/* Multiselect Purpose Code Dropdown */}
            <div className="w-full">
              <label
                className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                style={{
                  fontSize: args.labelFontSize ? `var(${args.labelFontSize})` : undefined,
                  fontWeight: args.labelFontWeight ? `var(${args.labelFontWeight})` : undefined,
                  letterSpacing: args.labelLetterSpacing
                    ? (args.labelLetterSpacing.startsWith('--') ? `var(${args.labelLetterSpacing})` : args.labelLetterSpacing)
                    : undefined,
                  color: args.labelTextColor ? `var(${args.labelTextColor})` : undefined,
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
                    borderColor: args.borderColor ? `var(${args.borderColor})` : undefined,
                    backgroundColor: args.backgroundColor ? `var(${args.backgroundColor})` : undefined,
                    borderRadius: args.borderRadius ? `var(${args.borderRadius})` : undefined,
                  }}
                />
              </Dropdown>
            </div>

            {/* Multiselect Consent Status Dropdown */}
            <div className="w-full">
              <label
                className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                style={{
                  fontSize: args.labelFontSize ? `var(${args.labelFontSize})` : undefined,
                  fontWeight: args.labelFontWeight ? `var(${args.labelFontWeight})` : undefined,
                  letterSpacing: args.labelLetterSpacing
                    ? (args.labelLetterSpacing.startsWith('--') ? `var(${args.labelLetterSpacing})` : args.labelLetterSpacing)
                    : undefined,
                  color: args.labelTextColor ? `var(${args.labelTextColor})` : undefined,
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
                          const tagResult = getConsentStatusTag(option?.value || '')
                          return (
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wider ${tagResult.tagProps.className}`}>
                              {tagResult.label}
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
                    borderColor: args.borderColor ? `var(${args.borderColor})` : undefined,
                    backgroundColor: args.backgroundColor ? `var(${args.backgroundColor})` : undefined,
                    borderRadius: args.borderRadius ? `var(${args.borderRadius})` : undefined,
                  }}
                />
              </Dropdown>
            </div>

            {/* Multiselect Account Aggregator Dropdown */}
            <div className="w-full">
              <label
                className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                style={{
                  fontSize: args.labelFontSize ? `var(${args.labelFontSize})` : undefined,
                  fontWeight: args.labelFontWeight ? `var(${args.labelFontWeight})` : undefined,
                  letterSpacing: args.labelLetterSpacing
                    ? (args.labelLetterSpacing.startsWith('--') ? `var(${args.labelLetterSpacing})` : args.labelLetterSpacing)
                    : undefined,
                  color: args.labelTextColor ? `var(${args.labelTextColor})` : undefined,
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
                    borderColor: args.borderColor ? `var(${args.borderColor})` : undefined,
                    backgroundColor: args.backgroundColor ? `var(${args.backgroundColor})` : undefined,
                    borderRadius: args.borderRadius ? `var(${args.borderRadius})` : undefined,
                  }}
                />
              </Dropdown>
            </div>

            <div className="w-full">
              <label
                className="block text-xs font-normal text-text-secondary tracking-widest mb-1"
                style={{
                  fontSize: args.labelFontSize ? `var(${args.labelFontSize})` : undefined,
                  fontWeight: args.labelFontWeight ? `var(${args.labelFontWeight})` : undefined,
                  letterSpacing: args.labelLetterSpacing
                    ? (args.labelLetterSpacing.startsWith('--') ? `var(${args.labelLetterSpacing})` : args.labelLetterSpacing)
                    : undefined,
                  color: args.labelTextColor ? `var(${args.labelTextColor})` : undefined,
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
    )
  },
  args: {
    // Layout controls
    headerGap: "mb-4", // Gap between header and dropdowns
    dropdownGap: "gap-4", // Gap between dropdown components

    // Use design system defaults
    backgroundColor: "--color-background-secondary",

    textColor: '--color-text-primary',
    borderColor: "--color-border-default",
    fontSize: "--typography-fontSize-sm",
    fontWeight: "--typography-fontWeight-medium",
    letterSpacing: "0.05em",
    padding: '--spacing-2',
    borderRadius: "--border-radius-lg",
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomWidth: "2px",
    hoverBorderBottomWidth: "3px",
    showLabel: true,
    hoverBackgroundColor: "--color-background-primary",
    hoverTextColor: "--color-text-primary",
    hoverBorderColor: "--color-border-hover",
    hoverBoxShadow: "--shadow-md",

    // Label typography controls
    labelFontSize: "--typography-fontSize-xs",

    labelFontWeight: "--typography-fontWeight-medium",
    labelLetterSpacing: "0.05em",
    labelTextColor: "--color-text-secondary",
    boxShadow: "--core-shadows-sm"
  },
}















