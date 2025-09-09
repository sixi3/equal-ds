import React, { useState } from 'react'
import { FinProSidebar } from './FinProSidebar'
import './finpro-sidebar-styles.css'

/**
 * Basic usage example of the FinProSidebar component
 */
export const BasicExample: React.FC = () => {
  return (
    <div className="h-screen">
      <FinProSidebar />
    </div>
  )
}

/**
 * Example with custom header text and default selection
 */
export const CustomHeaderExample: React.FC = () => {
  return (
    <div className="h-screen">
      <FinProSidebar
        headerText="My Custom App"
        defaultSelected="account-aggregator"
      />
    </div>
  )
}

/**
 * Example with expanded filters by default
 */
export const ExpandedFiltersExample: React.FC = () => {
  return (
    <div className="h-screen">
      <FinProSidebar
        headerText="Analytics Dashboard"
        defaultSelected="insights"
        defaultExpanded={true}
      />
    </div>
  )
}

/**
 * Example showing how to handle filter changes
 * Note: This example shows how you could extend the component
 * to handle filter state changes if needed
 */
export const FilterChangeHandlerExample: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState('consent-templates')

  const handleSelectionChange = (itemId: string | undefined) => {
    console.log('Selected item changed:', itemId)
    setSelectedItem(itemId || 'consent-templates')
  }

  return (
    <div className="h-screen">
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold">Current Selection: {selectedItem}</h3>
        <p className="text-sm text-gray-600">
          Open browser console to see selection change logs
        </p>
      </div>
      <FinProSidebar
        headerText="Interactive Example"
        defaultSelected={selectedItem}
      />
    </div>
  )
}

/**
 * Example with custom styling
 */
export const CustomStylingExample: React.FC = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <FinProSidebar
        className="shadow-xl"
        headerText="Styled Sidebar"
        defaultSelected="analytics"
        defaultExpanded={true}
      />
    </div>
  )
}

/**
 * Complete example showing all features
 */
export const CompleteExample: React.FC = () => {
  const [sidebarState, setSidebarState] = useState({
    selectedItem: 'consent-templates',
    isExpanded: false,
  })

  return (
    <div className="h-screen bg-gray-50">
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            FinPro Sidebar - Complete Example
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Selected Item:</strong> {sidebarState.selectedItem}
            </div>
            <div>
              <strong>Filters Expanded:</strong> {sidebarState.isExpanded ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Status:</strong> Ready
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <FinProSidebar
        headerText="Complete Example"
        defaultSelected={sidebarState.selectedItem}
        defaultExpanded={sidebarState.isExpanded}
      />
    </div>
  )
}

/**
 * Responsive example for different screen sizes
 */
export const ResponsiveExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">Responsive Sidebar Example</h1>
            <p className="text-blue-100">
              Try resizing your browser to see how the sidebar adapts
            </p>
          </div>
          <div className="h-96">
            <FinProSidebar
              headerText="Responsive Demo"
              defaultSelected="settings"
              defaultExpanded={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Export all examples as a single object for easy importing
export const FinProSidebarExamples = {
  BasicExample,
  CustomHeaderExample,
  ExpandedFiltersExample,
  FilterChangeHandlerExample,
  CustomStylingExample,
  CompleteExample,
  ResponsiveExample,
}

// Default export for convenience
export default FinProSidebarExamples
