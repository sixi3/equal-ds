import './tailwind.css'
import '../finpro-components/dropdown/finpro-styles.css'
import React from 'react'
import type { StoryObj } from '@storybook/react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownContentMultiselect, DropdownItem, DropdownItemMultiselect, DropdownSeparator } from '../src'
import { FinProDropdown } from '../finpro-components/dropdown/FinProDropdown'
import { ChevronDown, Settings, User, LogOut, Hammer, Wrench, Bell, Mail, Heart, Star } from 'lucide-react'
import { cn } from '../src/lib/cn'
import { useState } from 'react'



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
      transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
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
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
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

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown label="Default" variant="default" {...args} />
      <ExampleDropdown label="Outline" variant="outline" {...args} />
      <ExampleDropdown label="Ghost" variant="ghost" {...args} />
      <ExampleDropdown label="Primary" variant="primary" {...args} />
      <ExampleDropdown label="Destructive" variant="destructive" {...args} />
    </div>
  ),
}

// Simplified controls - everything is handled by the simple controls system

export const FinPro: Story = {
  render: (args: any) => {
    const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    
    const templateOptions = [
      { value: 'template-1', label: 'Template One' },
      { value: 'template-2', label: 'Template Two' },
      { value: 'template-3', label: 'Template Three' },
      { value: 'template-4', label: 'Template Four' },
      { value: 'template-5', label: 'Template Five' },
    ]

    // Hover effect styles for the multiselect dropdown
    const getMultiselectTriggerStyles = () => {
      const baseStyles: any = {
        backgroundColor: 'var(--color-background-secondary)',
        color: 'var(--color-text-primary)',
        borderColor: 'var(--color-border-hover)',
        fontSize: 'var(--typography-fontSize-sm)',
        fontWeight: 'var(--typography-fontWeight-medium)',
        letterSpacing: '0.025em',
        padding: 'var(--spacing-2)',
        borderRadius: 'var(--border-radius-lg)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderBottomWidth: '3px',
        boxShadow: 'var(--component-card-shadow)',
        transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
        transition: 'all 0.2s ease-in-out',
      }

      // Apply hover styles
      if (isHovered) {
        baseStyles.backgroundColor = 'var(--color-background-tertiary)'
        baseStyles.boxShadow = 'var(--shadow-md)'
      }

      return baseStyles
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)
    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">FinPro Filter Section</h3>
          <p className="text-sm text-gray-600 mt-1">First dropdown now uses multiselect functionality</p>
        </div>
        <div className="bg-white border border-border-default rounded-xl p-3 shadow-md">
          <div className={`flex justify-between items-center ${args.headerGap || 'mb-4'}`}>
            <h2 className="text-xl font-medium text-text-primary tracking-wider">
              Filter By
            </h2>
            <ChevronDown className="w-4 h-4 text-text-primary" />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${args.dropdownGap || 'gap-6'} w-full`}>
            {/* Multiselect Consent Template Dropdown */}
            {/* <div className="w-full">
              <label className="block text-xs font-normal text-text-secondary tracking-widest mb-1">
                Consent Template
              </label>
              <Dropdown>
                <DropdownTrigger
                  variant="default"
                  className="w-full"
                  style={getMultiselectTriggerStyles()}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                >
                  <span className="flex-1 text-left">
                    {selectedTemplates.length === 0 
                      ? 'All Templates' 
                      : `${selectedTemplates.length} selected`
                    }
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
                </DropdownTrigger>
                <DropdownContentMultiselect
                  options={templateOptions}
                  selectedValues={selectedTemplates}
                  onSelectionChange={setSelectedTemplates}
                  enableSelectAll={true}
                  selectAllLabel="All Templates"
                  maxHeight="200px"
                />
              </Dropdown>
            </div> */}
            
            <ExampleDropdown
              label="Purpose Code"
              showLabel={true}
              {...args}
            />
            <ExampleDropdown
              label="Consent Status"
              showLabel={true}
              {...args}
            />
            <ExampleDropdown
              label="Account Aggregator"
              showLabel={true}
              {...args}
            />
            <ExampleDropdown
              label="Consent Created On"
              showLabel={true}
              {...args}
            />
          </div>
          
          {/* Show selected templates */}
          {/* {selectedTemplates.length > 0 && (
            <div className="mt-4 p-3 bg-background-tertiary rounded-md">
              <p className="text-sm font-medium text-text-primary mb-2">Selected Templates:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTemplates.map(value => {
                  const option = templateOptions.find(opt => opt.value === value)
                  return (
                    <span
                      key={value}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-primary-100 text-primary-800 text-xs font-medium"
                    >
                      {option?.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )} */}
        </div>
      </div>
    )
  },
  args: {
    // Layout controls
    headerGap: "mb-3", // Gap between header and dropdowns
    dropdownGap: "gap-4", // Gap between dropdown components

    // Use design system defaults
    backgroundColor: "--color-background-secondary",

    textColor: '--color-text-primary',
    borderColor: "--color-border-hover",
    fontSize: "--typography-fontSize-sm",
    fontWeight: "--typography-fontWeight-medium",
    letterSpacing: "0.025em",
    padding: '--spacing-2',
    borderRadius: "--border-radius-lg",
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomWidth: "3px",
    hoverBorderBottomWidth: '3px',
    showLabel: true,
    hoverBackgroundColor: "--color-background-tertiary",
    hoverTextColor: "--color-text-primary",
    hoverBorderColor: "--color-border-hover",
    hoverBoxShadow: "--shadow-md",

    // Label typography controls
    labelFontSize: "--typography-fontSize-xs",

    labelFontWeight: "--typography-fontWeight-normal",
    labelLetterSpacing: "0.1em",
    labelTextColor: "--color-text-secondary",
    boxShadow: "--component-card-shadow"
  },
}

export const FinProExported: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">FinPro Filter Section (Using Exported Component)</h3>
        <p className="text-sm text-gray-600 mt-1">This demonstrates the reusable FinProDropdown component with all styling and interactions.</p>
      </div>
      <div className="bg-white border border-border-default rounded-xl p-3 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-medium text-text-primary tracking-wider">
            Filter By
          </h2>
          <ChevronDown className="w-4 h-4 text-text-primary" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          <FinProDropdown label="Consent Template" />
          <FinProDropdown label="Purpose Code" />
          <FinProDropdown label="Consent Status" />
          <FinProDropdown label="Account Aggregator" />
          <FinProDropdown label="Consent Created On" />
        </div>
      </div>
    </div>
  ),
}

export const FinProStylesShowcase: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 p-4 space-y-8">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">FinPro Styles & Interactions Showcase</h3>
        <p className="text-sm text-gray-600 mt-1">Demonstrates all exported styling approaches and hover interactions.</p>
      </div>

      {/* Ready-to-Use Component */}
      <div className="bg-white border border-border-default rounded-xl p-4 shadow-md">
        <h4 className="text-md font-medium text-gray-900 mb-3">1. Ready-to-Use Component</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FinProDropdown label="Component A" />
          <FinProDropdown label="Component B" />
          <FinProDropdown label="Component C" />
        </div>
      </div>

      {/* CSS Classes Approach */}
      <div className="bg-white border border-border-default rounded-xl p-4 shadow-md">
        <h4 className="text-md font-medium text-gray-900 mb-3">2. CSS Classes Approach</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="finpro-dropdown-container">
            <label className="finpro-dropdown-label">CSS Classes A</label>
            <Dropdown>
              <DropdownTrigger className="finpro-dropdown-trigger">
                <span>CSS Classes A</span>
                <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
              </DropdownTrigger>
              <DropdownContent className="finpro-dropdown-content">
                <DropdownItem><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownItem>
                <DropdownItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
          <div className="finpro-dropdown-container">
            <label className="finpro-dropdown-label">CSS Classes B</label>
            <Dropdown>
              <DropdownTrigger className="finpro-dropdown-trigger">
                <span>CSS Classes B</span>
                <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
              </DropdownTrigger>
              <DropdownContent className="finpro-dropdown-content">
                <DropdownItem><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Inline Styles Approach */}
      <div className="bg-white border border-border-default rounded-xl p-4 shadow-md">
        <h4 className="text-md font-medium text-gray-900 mb-3">3. Inline Styles Approach</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="w-full">
            <label
              className="mb-1 block"
              style={{
                fontSize: 'var(--typography-fontSize-xs)',
                fontWeight: 'var(--typography-fontWeight-normal)',
                letterSpacing: '0.1em',
                color: 'var(--color-text-secondary)',
              }}
            >
              Inline Styles A
            </label>
            <Dropdown>
              <DropdownTrigger
                className="w-full flex items-center justify-between"
                style={{
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-primary)',
                  borderColor: 'var(--color-border-hover)',
                  fontSize: 'var(--typography-fontSize-sm)',
                  fontWeight: 'var(--typography-fontWeight-medium)',
                  letterSpacing: '0.025em',
                  padding: 'var(--spacing-2)',
                  borderRadius: 'var(--border-radius-lg)',
                  borderWidth: '1px',
                  borderBottomWidth: '3px',
                  boxShadow: 'var(--component-card-shadow)',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <span>Inline Styles A</span>
                <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
              </DropdownTrigger>
              <DropdownContent
                style={{
                  backgroundColor: 'var(--color-background-secondary)',
                  borderColor: 'var(--color-border-hover)',
                  borderRadius: 'var(--border-radius-lg)',
                }}
              >
                <DropdownItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Complete Filter Section */}
      <div className="bg-white border border-border-default rounded-xl p-4 shadow-md">
        <h4 className="text-md font-medium text-gray-900 mb-3">4. Complete Filter Section</h4>
        <div className="finpro-filter-section">
          <div className="finpro-filter-header">
            <h2 className="finpro-filter-title">Filter By</h2>
            <ChevronDown className="w-4 h-4 text-text-primary" />
          </div>
          <div className="finpro-filter-grid">
            <FinProDropdown label="Consent Template" />
            <FinProDropdown label="Purpose Code" />
            <FinProDropdown label="Consent Status" />
            <FinProDropdown label="Account Aggregator" />
            <FinProDropdown label="Consent Created On" />
          </div>
        </div>
      </div>
    </div>
  ),
}

// Multiselect Dropdown Stories
export const MultiselectBasic: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    
    const options = [
      { value: 'template-1', label: 'Template One' },
      { value: 'template-2', label: 'Template Two' },
      { value: 'template-3', label: 'Template Three' },
      { value: 'template-4', label: 'Template Four' },
      { value: 'template-5', label: 'Template Five' },
    ]

    return (
      <div className="p-8">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Consent Templates
          </label>
          <Dropdown>
            <DropdownTrigger>
              <button className="inline-flex items-center gap-2 rounded-md border border-border-default bg-background-secondary text-sm font-medium shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2">
                {selectedValues.length === 0 
                  ? 'Select templates...' 
                  : `${selectedValues.length} template${selectedValues.length === 1 ? '' : 's'} selected`
                }
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownTrigger>
            <DropdownContentMultiselect
              options={options}
              selectedValues={selectedValues}
              onSelectionChange={setSelectedValues}
              enableSelectAll={true}
              selectAllLabel="All Templates"
            />
          </Dropdown>
          
          {selectedValues.length > 0 && (
            <div className="mt-4 p-3 bg-background-tertiary rounded-md">
              <p className="text-sm font-medium text-text-primary mb-2">Selected:</p>
              <div className="flex flex-wrap gap-2">
                {selectedValues.map(value => {
                  const option = options.find(opt => opt.value === value)
                  return (
                    <span
                      key={value}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-primary-100 text-primary-800 text-xs font-medium"
                    >
                      {option?.label}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
}

export const MultiselectWithSearch: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['template-1', 'template-3'])
    
    const options = [
      { value: 'template-1', label: 'Template One' },
      { value: 'template-2', label: 'Template Two' },
      { value: 'template-3', label: 'Template Three' },
      { value: 'template-4', label: 'Template Four' },
      { value: 'template-5', label: 'Template Five' },
      { value: 'template-6', label: 'Advanced Template' },
      { value: 'template-7', label: 'Basic Template' },
      { value: 'template-8', label: 'Custom Template' },
    ]

    return (
      <div className="p-8">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Search Templates
          </label>
          <Dropdown>
            <DropdownTrigger>
              <button className="inline-flex items-center gap-2 rounded-md border border-border-default bg-background-secondary text-sm font-medium shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2">
                {selectedValues.length === 0 
                  ? 'Search templates...' 
                  : `${selectedValues.length} template${selectedValues.length === 1 ? '' : 's'} selected`
                }
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownTrigger>
            <DropdownContentMultiselect
              options={options}
              selectedValues={selectedValues}
              onSelectionChange={setSelectedValues}
              enableSelectAll={true}
              selectAllLabel="All Templates"
              enableSearch={true}
              searchPlaceholder="Search templates..."
              maxHeight="250px"
            />
          </Dropdown>
        </div>
      </div>
    )
  },
}

export const MultiselectDisabled: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['template-1'])
    
    const options = [
      { value: 'template-1', label: 'Template One' },
      { value: 'template-2', label: 'Template Two', disabled: true },
      { value: 'template-3', label: 'Template Three' },
      { value: 'template-4', label: 'Template Four', disabled: true },
      { value: 'template-5', label: 'Template Five' },
    ]

    return (
      <div className="p-8">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Templates (Some Disabled)
          </label>
          <Dropdown>
            <DropdownTrigger>
              <button className="inline-flex items-center gap-2 rounded-md border border-border-default bg-background-secondary text-sm font-medium shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2">
                {selectedValues.length === 0 
                  ? 'Select templates...' 
                  : `${selectedValues.length} template${selectedValues.length === 1 ? '' : 's'} selected`
                }
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownTrigger>
            <DropdownContentMultiselect
              options={options}
              selectedValues={selectedValues}
              onSelectionChange={setSelectedValues}
              enableSelectAll={true}
              selectAllLabel="All Templates"
            />
          </Dropdown>
        </div>
      </div>
    )
  },
}

export const MultiselectEmpty: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    
    return (
      <div className="p-8">
        <div className="max-w-md">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Empty Templates
          </label>
          <Dropdown>
            <DropdownTrigger>
              <button className="inline-flex items-center gap-2 rounded-md border border-border-default bg-background-secondary text-sm font-medium shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2">
                Select templates...
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownTrigger>
            <DropdownContentMultiselect
              options={[]}
              selectedValues={selectedValues}
              onSelectionChange={setSelectedValues}
              enableSelectAll={false}
              placeholder="No templates available"
            />
          </Dropdown>
        </div>
      </div>
    )
  },
}








