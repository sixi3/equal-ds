import React, { useState } from 'react'
import { FilterTable } from './FilterTable'
import { DateRangeValue } from '../../../src'

export const BasicExample: React.FC = () => {
  return (
    <div className="p-4">
      <FilterTable />
    </div>
  )
}

export const WithCallbacks: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    templates: [] as string[],
    purposeCodes: [] as string[],
    statuses: [] as string[],
    aggregators: [] as string[],
    dateRange: null as DateRangeValue | null,
  })

  const handleTemplateChange = (selected: string[]) => {
    setSelectedFilters(prev => ({ ...prev, templates: selected }))
    console.log('Templates changed:', selected)
  }

  const handlePurposeCodeChange = (selected: string[]) => {
    setSelectedFilters(prev => ({ ...prev, purposeCodes: selected }))
    console.log('Purpose codes changed:', selected)
  }

  const handleStatusChange = (selected: string[]) => {
    setSelectedFilters(prev => ({ ...prev, statuses: selected }))
    console.log('Statuses changed:', selected)
  }

  const handleAggregatorChange = (selected: string[]) => {
    setSelectedFilters(prev => ({ ...prev, aggregators: selected }))
    console.log('Aggregators changed:', selected)
  }

  const handleDateRangeChange = (range: DateRangeValue) => {
    setSelectedFilters(prev => ({ ...prev, dateRange: range }))
    console.log('Date range changed:', range)
  }

  return (
    <div className="p-4 space-y-4">
      <FilterTable
        onTemplateChange={handleTemplateChange}
        onPurposeCodeChange={handlePurposeCodeChange}
        onStatusChange={handleStatusChange}
        onAggregatorChange={handleAggregatorChange}
        onDateRangeChange={handleDateRangeChange}
      />
      
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-medium mb-2">Current Selections:</h3>
        <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">
          {JSON.stringify(selectedFilters, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export const CustomOptions: React.FC = () => {
  const customTemplateOptions = [
    { value: 'custom-1', label: 'Custom Template One' },
    { value: 'custom-2', label: 'Custom Template Two' },
    { value: 'custom-3', label: 'Custom Template Three' },
  ]

  const customPurposeCodeOptions = [
    { value: 'code-1', label: 'Code 001' },
    { value: 'code-2', label: 'Code 002' },
    { value: 'code-3', label: 'Code 003' },
  ]

  return (
    <div className="p-4">
      <FilterTable
        title="Custom Filter Options"
        templateOptions={customTemplateOptions}
        purposeCodeOptions={customPurposeCodeOptions}
        initialSelectedTemplates={[]}
        initialSelectedPurposeCodes={[]}
      />
    </div>
  )
}

export const PreSelectedFilters: React.FC = () => {
  return (
    <div className="p-4">
      <FilterTable
        title="Pre-selected Filters"
        initialSelectedTemplates={['template-1', 'template-2']}
        initialSelectedPurposeCodes={['purpose-101']}
        initialSelectedStatuses={['active']}
        initialSelectedAggregators={['agg-1', 'agg-2']}
      />
    </div>
  )
}

export const ExpandedByDefault: React.FC = () => {
  return (
    <div className="p-4">
      <FilterTable
        title="Expanded Filter Panel"
        defaultExpanded={true}
      />
    </div>
  )
}

export const CustomStyling: React.FC = () => {
  return (
    <div className="p-4">
      <FilterTable
        title="Custom Styled Filter"
        backgroundColor="--color-background-primary"
        hoverBackgroundColor="--color-background-tertiary"
        borderColor="--color-border-focus"
        hoverBorderColor="--color-border-focus"
        borderRadius="--border-radius-xl"
        dropdownGap="gap-8"
      />
    </div>
  )
}

export const WithoutLabels: React.FC = () => {
  return (
    <div className="p-4">
      <FilterTable
        title="Filter Without Labels"
        showLabel={false}
      />
    </div>
  )
}

export const ControlledExpansion: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isExpanded ? 'Collapse' : 'Expand'} Filter Panel
        </button>
        <span className="text-sm text-gray-600">
          Panel is {isExpanded ? 'expanded' : 'collapsed'}
        </span>
      </div>
      
      <FilterTable
        title="Controlled Expansion"
        defaultExpanded={isExpanded}
        onExpandedChange={setIsExpanded}
      />
    </div>
  )
}

