import React, { useState } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContentMultiselect,
  DatePicker,
  DateRangeValue,
  getSmartDefaults,
  getConsentStatusTag,
  ChevronIcon,
} from '../../../src'
import { Filter } from 'lucide-react'
import { createTriggerStyles, createLabelStyles } from './filter-table-utils'
import {
  DEFAULT_TEMPLATE_OPTIONS,
  DEFAULT_PURPOSE_CODE_OPTIONS,
  DEFAULT_STATUS_OPTIONS,
  DEFAULT_AGGREGATOR_OPTIONS,
  FILTER_TABLE_CONSTANTS,
  FILTER_TABLE_DEFAULTS,
  type FilterOption,
} from './filter-table-config'
import './filter-table-styles.css'

export interface FilterTableProps {
  // Component props
  className?: string
  title?: string
  defaultExpanded?: boolean
  
  // Filter options (can be customized)
  templateOptions?: FilterOption[]
  purposeCodeOptions?: FilterOption[]
  statusOptions?: FilterOption[]
  aggregatorOptions?: FilterOption[]
  
  // Initial selections
  initialSelectedTemplates?: string[]
  initialSelectedPurposeCodes?: string[]
  initialSelectedStatuses?: string[]
  initialSelectedAggregators?: string[]
  initialSelectedDateRange?: DateRangeValue
  
  // Callbacks
  onTemplateChange?: (selected: string[]) => void
  onPurposeCodeChange?: (selected: string[]) => void
  onStatusChange?: (selected: string[]) => void
  onAggregatorChange?: (selected: string[]) => void
  onDateRangeChange?: (range: DateRangeValue) => void
  onExpandedChange?: (expanded: boolean) => void
  
  // Layout props
  headerGap?: string
  dropdownGap?: string
  
  // Style props
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
  
  // Show/hide labels
  showLabel?: boolean
}

export const FilterTable: React.FC<FilterTableProps> = ({
  className = '',
  title = FILTER_TABLE_DEFAULTS.title,
  defaultExpanded = FILTER_TABLE_DEFAULTS.defaultExpanded,
  templateOptions = DEFAULT_TEMPLATE_OPTIONS,
  purposeCodeOptions = DEFAULT_PURPOSE_CODE_OPTIONS,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  aggregatorOptions = DEFAULT_AGGREGATOR_OPTIONS,
  initialSelectedTemplates,
  initialSelectedPurposeCodes,
  initialSelectedStatuses,
  initialSelectedAggregators,
  initialSelectedDateRange,
  onTemplateChange,
  onPurposeCodeChange,
  onStatusChange,
  onAggregatorChange,
  onDateRangeChange,
  onExpandedChange,
  headerGap = FILTER_TABLE_DEFAULTS.headerGap,
  dropdownGap = FILTER_TABLE_DEFAULTS.dropdownGap,
  backgroundColor = FILTER_TABLE_DEFAULTS.backgroundColor,
  textColor = FILTER_TABLE_DEFAULTS.textColor,
  borderColor = FILTER_TABLE_DEFAULTS.borderColor,
  hoverBackgroundColor = FILTER_TABLE_DEFAULTS.hoverBackgroundColor,
  hoverTextColor = FILTER_TABLE_DEFAULTS.hoverTextColor,
  hoverBorderColor = FILTER_TABLE_DEFAULTS.hoverBorderColor,
  fontSize = FILTER_TABLE_DEFAULTS.fontSize,
  fontWeight = FILTER_TABLE_DEFAULTS.fontWeight,
  letterSpacing = FILTER_TABLE_DEFAULTS.letterSpacing,
  padding = FILTER_TABLE_DEFAULTS.padding,
  borderRadius = FILTER_TABLE_DEFAULTS.borderRadius,
  borderWidth = FILTER_TABLE_DEFAULTS.borderWidth,
  borderStyle = FILTER_TABLE_DEFAULTS.borderStyle,
  borderBottomWidth = FILTER_TABLE_DEFAULTS.borderBottomWidth,
  hoverBorderBottomWidth = FILTER_TABLE_DEFAULTS.hoverBorderBottomWidth,
  boxShadow = FILTER_TABLE_DEFAULTS.boxShadow,
  hoverBoxShadow = FILTER_TABLE_DEFAULTS.hoverBoxShadow,
  labelFontSize = FILTER_TABLE_DEFAULTS.labelFontSize,
  labelFontWeight = FILTER_TABLE_DEFAULTS.labelFontWeight,
  labelLetterSpacing = FILTER_TABLE_DEFAULTS.labelLetterSpacing,
  labelTextColor = FILTER_TABLE_DEFAULTS.labelTextColor,
  showLabel = FILTER_TABLE_DEFAULTS.showLabel,
}) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // Initialize selections with provided values or all options selected by default
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>(
    initialSelectedTemplates !== undefined
      ? initialSelectedTemplates
      : templateOptions.map(option => option.value)
  )
  const [selectedPurposeCodes, setSelectedPurposeCodes] = useState<string[]>(
    initialSelectedPurposeCodes !== undefined
      ? initialSelectedPurposeCodes
      : purposeCodeOptions.map(option => option.value)
  )
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    initialSelectedStatuses !== undefined
      ? initialSelectedStatuses
      : statusOptions.map(option => option.value)
  )
  const [selectedAggregators, setSelectedAggregators] = useState<string[]>(
    initialSelectedAggregators !== undefined
      ? initialSelectedAggregators
      : aggregatorOptions.map(option => option.value)
  )
  const [selectedRange, setSelectedRange] = useState<DateRangeValue>(
    initialSelectedDateRange || getSmartDefaults
  )

  // Individual hover states for each dropdown
  const [isTemplateHovered, setIsTemplateHovered] = useState(false)
  const [isPurposeHovered, setIsPurposeHovered] = useState(false)
  const [isStatusHovered, setIsStatusHovered] = useState(false)
  const [isAggregatorHovered, setIsAggregatorHovered] = useState(false)
  const [isDatePickerHovered, setIsDatePickerHovered] = useState(false)

  // Handle selection changes with callbacks
  const handleTemplateChange = (selected: string[]) => {
    setSelectedTemplates(selected)
    onTemplateChange?.(selected)
  }

  const handlePurposeCodeChange = (selected: string[]) => {
    setSelectedPurposeCodes(selected)
    onPurposeCodeChange?.(selected)
  }

  const handleStatusChange = (selected: string[]) => {
    setSelectedStatuses(selected)
    onStatusChange?.(selected)
  }

  const handleAggregatorChange = (selected: string[]) => {
    setSelectedAggregators(selected)
    onAggregatorChange?.(selected)
  }

  const handleDateRangeChange = (range: DateRangeValue) => {
    setSelectedRange(range)
    onDateRangeChange?.(range)
  }

  const handleExpandedChange = (expanded: boolean) => {
    setIsExpanded(expanded)
    onExpandedChange?.(expanded)
  }

  // Helper function to create trigger styles
  const createTriggerStylesForDropdown = (isHovered: boolean) => {
    return createTriggerStyles({
      isHovered,
      isClicked,
      backgroundColor,
      textColor,
      borderColor,
      hoverBackgroundColor,
      hoverTextColor,
      hoverBorderColor,
      fontSize,
      fontWeight,
      letterSpacing,
      padding,
      borderRadius,
      borderWidth,
      borderStyle,
      borderBottomWidth,
      hoverBorderBottomWidth,
      boxShadow,
      hoverBoxShadow,
    })
  }

  // Individual trigger styles for each dropdown
  const getTemplateTriggerStyles = () => createTriggerStylesForDropdown(isTemplateHovered)
  const getPurposeTriggerStyles = () => createTriggerStylesForDropdown(isPurposeHovered)
  const getStatusTriggerStyles = () => createTriggerStylesForDropdown(isStatusHovered)
  const getAggregatorTriggerStyles = () => createTriggerStylesForDropdown(isAggregatorHovered)
  const getDatePickerTriggerStyles = () => createTriggerStylesForDropdown(isDatePickerHovered)

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

  // Label styles
  const labelStyles = createLabelStyles(labelFontSize, labelFontWeight, labelLetterSpacing, labelTextColor)

  // Dropdown content styles
  const dropdownContentStyles = {
    borderColor: borderColor ? `var(${borderColor})` : undefined,
    backgroundColor: backgroundColor ? `var(${backgroundColor})` : undefined,
    borderRadius: borderRadius ? `var(${borderRadius})` : undefined,
  }

  return (
    <div className={`filter-table-container ${className}`}>
      <div className="filter-table-card">
        <div
          className="filter-table-header"
          onClick={() => handleExpandedChange(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="filter-table-header-icon">
              <Filter className="w-4 h-4 text-text-primary" />
            </div>
            <h2 className="filter-table-title">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 rounded hover:bg-background-primary hover:border hover:border-border-default transition-colors duration-200">
              <ChevronIcon
                isOpen={isExpanded}
                className="text-text-primary"
                duration={FILTER_TABLE_CONSTANTS.hoverDuration}
              />
            </div>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ${dropdownGap} w-full filter-table-content`}
          style={{
            transition: FILTER_TABLE_CONSTANTS.filterTransition,
            maxHeight: isExpanded ? FILTER_TABLE_CONSTANTS.expandedHeight : FILTER_TABLE_CONSTANTS.collapsedHeight,
            opacity: isExpanded ? FILTER_TABLE_CONSTANTS.expandedOpacity : FILTER_TABLE_CONSTANTS.collapsedOpacity,
            marginTop: isExpanded ? FILTER_TABLE_CONSTANTS.expandedMargin : FILTER_TABLE_CONSTANTS.collapsedMargin,
          }}
        >
          {/* Multiselect Consent Template Dropdown */}
          <div className="w-full">
            {showLabel && (
              <label className="filter-table-label" style={labelStyles}>
                Consent Template
              </label>
            )}
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
                onSelectionChange={handleTemplateChange}
                enableSelectAll={true}
                selectAllLabel="All Templates"
                enableSearch={true}
                searchPlaceholder="Search for templates"
                maxHeight="200px"
                style={dropdownContentStyles}
              />
            </Dropdown>
          </div>

          {/* Multiselect Purpose Code Dropdown */}
          <div className="w-full">
            {showLabel && (
              <label className="filter-table-label" style={labelStyles}>
                Purpose Code
              </label>
            )}
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
                onSelectionChange={handlePurposeCodeChange}
                enableSelectAll={true}
                selectAllLabel="All Purpose Codes"
                enableSearch={true}
                searchPlaceholder="Search purpose codes"
                maxHeight="200px"
                style={dropdownContentStyles}
              />
            </Dropdown>
          </div>

          {/* Multiselect Consent Status Dropdown */}
          <div className="w-full">
            {showLabel && (
              <label className="filter-table-label" style={labelStyles}>
                Consent Status
              </label>
            )}
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
                onSelectionChange={handleStatusChange}
                enableSelectAll={true}
                selectAllLabel="All Statuses"
                enableSearch={true}
                searchPlaceholder="Search statuses"
                maxHeight="200px"
                isStatusTag={true}
                style={dropdownContentStyles}
              />
            </Dropdown>
          </div>

          {/* Multiselect Account Aggregator Dropdown */}
          <div className="w-full">
            {showLabel && (
              <label className="filter-table-label" style={labelStyles}>
                Account Aggregator
              </label>
            )}
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
                onSelectionChange={handleAggregatorChange}
                enableSelectAll={true}
                selectAllLabel="All Aggregators"
                enableSearch={true}
                searchPlaceholder="Search aggregators"
                maxHeight="200px"
                style={dropdownContentStyles}
              />
            </Dropdown>
          </div>

          {/* Date Range Picker */}
          <div className="w-full">
            {showLabel && (
              <label className="filter-table-label" style={labelStyles}>
                Consent Created On
              </label>
            )}
            <DatePicker
              selectedRange={selectedRange}
              rangeMode={true}
              onRangeChange={handleDateRangeChange}
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
}

