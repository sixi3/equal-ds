import './tailwind.css'
import React from 'react'
import type { StoryObj } from '@storybook/react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '../src'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'
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
  render: (args: any) => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">FinPro Filter Section</h3>
      </div>
      <div className="bg-white border border-border-default rounded-xl p-3 shadow-md">
        <div className={`flex justify-between items-center ${args.headerGap || 'mb-4'}`}>
          <h2 className="text-xl font-medium text-text-primary tracking-wider">
            Filter By
          </h2>
          <ChevronDown className="w-4 h-4 text-tex  t-primary" />
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ${args.dropdownGap || 'gap-6'} w-full`}>
          <ExampleDropdown
            label="Consent Template"
            showLabel={true}
            {...args}
          />
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
      </div>
    </div>
  ),
  args: {
    // Layout controls
    headerGap: "mb-3", // Gap between header and dropdowns
    dropdownGap: "gap-4", // Gap between dropdown components

    // Use design system defaults
    backgroundColor: '--color-background-secondary',

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








