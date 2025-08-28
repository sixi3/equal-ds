import './tailwind.css'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '../src'
import { ChevronDown, Settings, User, LogOut, CreditCard } from 'lucide-react'
import { cn } from '../src/lib/cn'
import { useState } from 'react'
import { CopyCodeButton } from '../src/story-utils/CopyCodeButton'
import { SmartCopyCodeButton } from '../src/story-utils/SmartCopyCodeButton'
import { generateDropdownSnippet, generateFinProSnippet } from '../src/story-utils/snippets'
import { resolveControlCssVar } from '../src/story-utils/designTokens'
import { createAutoStoryConfig } from '../src/story-utils/autoControls'

// Enhanced design token mappings with clear labels
// These provide both hex values and token names in the controls
const TOKEN_MAPPINGS = {
  borderColors: {
    '#E7EDF0': '--color-border-default (Default Border)',
    '#C1E4FB': '--color-border-hover (Hover Border)',
    '#0F3340': '--color-border-focus (Focus Border)',
    '#909BAA': '--color-gray-600 (Gray 600)',
    '#757575': '--color-gray-700 (Gray 700)',
    '#708497': '--color-gray-800 (Gray 800)',
    '#000000': '--color-gray-900 (Black)',
  },
  backgroundColors: {
    '#FFFFFF': '--color-gray-50 (Pure White)',
    '#F8FEFF': '--color-primary-50 (Primary 50)',
    '#F6FCFF': '--color-gray-100 (Gray 100)',
    '#F3F8FC': '--color-gray-200 (Gray 200)',
    '#F0F6FA': '--color-gray-300 (Gray 300)',
    '#FAFDFF': '--color-gray-400 (Gray 400)',
    '#E7EDF0': '--color-gray-500 (Gray 500)',
    '#909BAA': '--color-gray-600 (Gray 600)',
    '#757575': '--color-gray-700 (Gray 700)',
    '#708497': '--color-gray-800 (Gray 800)',
    '#000000': '--color-gray-900 (Black)',
  },
  textColors: {
    '#0F3340': '--color-text-primary (Primary Text)',
    '#757575': '--color-text-secondary (Secondary Text)',
    '#909BAA': '--color-text-tertiary (Tertiary Text)',
    '#708497': '--color-text-muted (Muted Text)',
    '#000000': '--color-gray-900 (Black Text)',
    '#FFFFFF': '--color-gray-50 (White Text)',
  },
  spacing: {
    '0.25rem': '--spacing-1 (XS - 4px)',
    '0.5rem': '--spacing-2 (S - 8px)',
    '0.75rem': '--spacing-3 (M - 12px)',
    '1rem': '--spacing-4 (L - 16px)',
    '1.25rem': '--spacing-5 (XL - 20px)',
    '1.5rem': '--spacing-6 (2XL - 24px)',
    '2rem': '--spacing-8 (3XL - 32px)',
    '3rem': '--spacing-12 (4XL - 48px)',
  },
  borderRadius: {
    '0': '--border-radius-none (None - 0px)',
    '0.125rem': '--border-radius-sm (Small - 2px)',
    '0.25rem': '--border-radius-base (Base - 4px)',
    '0.375rem': '--border-radius-md (Medium - 6px)',
    '0.5rem': '--border-radius-lg (Large - 8px)',
    '0.75rem': '--border-radius-xl (XL - 12px)',
    '1rem': '--border-radius-2xl (2XL - 16px)',
  },
}

// Helper function to get token label
const getTokenLabel = (value: string, category: keyof typeof TOKEN_MAPPINGS) => {
  return TOKEN_MAPPINGS[category][value] || value
}

// Enhanced descriptions with token information
const getEnhancedDescription = (value: string, category: keyof typeof TOKEN_MAPPINGS) => {
  const tokenLabel = getTokenLabel(value, category)
  return `${tokenLabel} - Use this value in your CSS: ${value}`
}

const meta = {
  title: 'Actions/Dropdown',
  parameters: { 
    layout: 'padded',
    controls: {
      sort: 'requiredFirst',
    },
  },
  // Remove global argTypes - let auto-controls handle all controls
  // argTypes: { ... } - REMOVED to allow auto-controls to work
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj

function ExampleDropdown({ 
  label, 
  showLabel = true,
  borderColor,
  backgroundColor,
  padding,
  borderRadius,
  triggerVariant = 'default',
  contentAlignment = 'start',
  sideOffset = 6,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  hoverBackgroundColor,
  hoverBorderColor,
  hoverBorderTopWidth,
  hoverBorderRightWidth,
  hoverBorderBottomWidth,
  hoverBorderLeftWidth,
  hoverBorderWidth,
  hoverBorderRadius,
  dropdownGap,
  labelTypography = 'text-ui-label',
  headerTypography = 'text-h2',
  labelKerning = 'tracking-normal',
  headerKerning = 'tracking-normal',
  dropdownTextKerning = 'tracking-normal',
  // Separate text color controls for label and dropdown
  labelTextColor = '--text-primary',
  dropdownTextColor = '--text-primary',
  hoverLabelTextColor,
  hoverDropdownTextColor,
  headerTextColor = '--text-primary',
  // Separate typography controls for label and dropdown text
  labelFontSize,
  labelFontWeight,
  labelLineHeight,
  labelLetterSpacing,
  dropdownFontSize,
  dropdownFontWeight,
  dropdownLineHeight,
  dropdownLetterSpacing,
  boxShadow,
  hoverBoxShadow,
  shadowDisplacementX,
  shadowDisplacementY,
  shadowOpacity
}: { 
  label: string
  showLabel?: boolean
  borderColor?: string
  backgroundColor?: string
  padding?: string
  borderRadius?: string
  triggerVariant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
  contentAlignment?: 'start' | 'center' | 'end'
  sideOffset?: number
  borderTopWidth?: string
  borderRightWidth?: string
  borderBottomWidth?: string
  borderLeftWidth?: string
  hoverBackgroundColor?: string
  hoverBorderColor?: string
  hoverBorderTopWidth?: string
  hoverBorderRightWidth?: string
  hoverBorderBottomWidth?: string
  hoverBorderLeftWidth?: string
  hoverBorderWidth?: string
  hoverBorderRadius?: string
  dropdownGap?: string
  labelTypography?: string
  headerTypography?: string
  labelKerning?: string
  headerKerning?: string
  dropdownTextKerning?: string
  // Separate text color controls for label and dropdown
  labelTextColor?: string
  dropdownTextColor?: string
  hoverLabelTextColor?: string
  hoverDropdownTextColor?: string
  headerTextColor?: string
  // Separate typography controls for label and dropdown text
  labelFontSize?: string
  labelFontWeight?: string
  labelLineHeight?: string
  labelLetterSpacing?: string
  dropdownFontSize?: string
  dropdownFontWeight?: string
  dropdownLineHeight?: string
  dropdownLetterSpacing?: string
  boxShadow?: string
  hoverBoxShadow?: string
  shadowDisplacementX?: number
  shadowDisplacementY?: number
  shadowOpacity?: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Extract actual values from the friendly names or clean token names
  const getValue = (tokenName: string) => {
    if (!tokenName) return undefined
    
    // If it's already a clean token name (starts with --), convert to actual CSS value
    if (tokenName.startsWith('--') && !tokenName.includes('(')) {
      // Map design tokens to actual CSS values
      const tokenToValue: Record<string, string> = {
          // Background colors
          '--background': '#FAFAFA',
          '--background-primary': '#FAFAFA',
          '--background-secondary': '#FFFFFF',
          '--background-tertiary': '#F6F6F6',
          '--background-inverse': '#0F3340',
          
          // Text colors
          '--text-primary': '#0F3340',
          '--text-secondary': '#757575',
          '--text-tertiary': '#909BAA',
          '--text-inverse': '#FFFFFF',
          '--text-muted': '#708497',
          
          // Primary colors
          '--primary': '#0F3340',
          '--primary-50': '#F8FEFF',
          '--primary-100': '#F0F6FA',
          '--primary-200': '#E1F0F9',
          '--primary-300': '#C1E4FB',
          '--primary-400': '#9DD4F7',
          '--primary-500': '#0F3340',
          '--primary-600': '#0A1F26',
          '--primary-700': '#061419',
          '--primary-800': '#030A0D',
          '--primary-900': '#010506',
          
          // Gray colors
          '--gray-50': '#FFFFFF',
          '--gray-100': '#F6FCFF',
          '--gray-200': '#F3F8FC',
          '--gray-300': '#F0F6FA',
          '--gray-400': '#FAFDFF',
          '--gray-500': '#E7EDF0',
          '--gray-600': '#909BAA',
          '--gray-700': '#757575',
          '--gray-800': '#708497',
          '--gray-900': '#000000',
          
          // Border colors
          '--border': '#E7EDF0',
          '--border-default': '#E7EDF0',
          '--border-hover': '#C1E4FB',
          '--border-focus': '#0F3340',
          '--border-light': '#F0F6FA',
          
          // Other colors
          '--secondary': '#F6F6F6',
          '--muted': '#F6F6F6',
          '--accent': '#F0F6FA',
          '--destructive': '#DC2626',
          '--success': '#16A34A',
          '--warning': '#D97706',
          '--info': '#0891B2',
          
          // Typography - Font Sizes
          '--font-size-xs': '0.75rem',
          '--font-size-sm': '0.875rem',
          '--font-size-base': '1rem',
          '--font-size-lg': '1.125rem',
          '--font-size-xl': '1.25rem',
          '--font-size-2xl': '1.5rem',
          '--font-size-3xl': '1.875rem',
          '--font-size-4xl': '2.25rem',
          '--font-size-5xl': '3rem',
          '--font-size-6xl': '3.75rem',
          
          // Typography - Font Weights
          '--font-weight-thin': '100',
          '--font-weight-extralight': '200',
          '--font-weight-light': '300',
          '--font-weight-normal': '400',
          '--font-weight-medium': '500',
          '--font-weight-semibold': '600',
          '--font-weight-bold': '700',
          '--font-weight-extrabold': '800',
          '--font-weight-black': '900',
          
          // Typography - Line Heights
          '--line-height-none': '1',
          '--line-height-tight': '1.25',
          '--line-height-snug': '1.375',
          '--line-height-normal': '1.5',
          '--line-height-relaxed': '1.625',
          '--line-height-loose': '2',
          
          // Typography - Letter Spacing
          '--letter-spacing-tighter': '-0.05em',
          '--letter-spacing-tight': '-0.025em',
          '--letter-spacing-normal': '0em',
          '--letter-spacing-wide': '0.025em',
          '--letter-spacing-wider': '0.05em',
          '--letter-spacing-widest': '0.1em',
          
          // Spacing (essential only)
          '--spacing-0': '0',
          '--spacing-1': '0.25rem',
          '--spacing-2': '0.5rem',
          '--spacing-3': '0.75rem',
          '--spacing-4': '1rem',
          '--spacing-5': '1.25rem',
          '--spacing-6': '1.5rem',
          '--spacing-8': '2rem',
          '--spacing-10': '2.5rem',
          '--spacing-12': '3rem',
          '--spacing-16': '4rem',
          '--spacing-20': '5rem',
          '--spacing-24': '6rem',
          '--spacing-32': '8rem',
          
          // Border Radius
          '--border-radius-none': '0',
          '--border-radius-sm': '0.125rem',
          '--border-radius-base': '0.25rem',
          '--border-radius-md': '0.375rem',
          '--border-radius-lg': '0.5rem',
          '--border-radius-xl': '0.75rem',
          '--border-radius-2xl': '1rem',
          '--border-radius-3xl': '1.5rem',
          '--border-radius-full': '9999px',
          
          // Shadows
          '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          '--shadow-base': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          '--shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          '--shadow-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          '--shadow-2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          '--shadow-inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
          
          // Transitions
          '--transition-all': 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '--transition-colors': 'color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '--transition-opacity': 'opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '--transition-shadow': 'box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '--transition-transform': 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      
      return tokenToValue[tokenName] || tokenName
    }
    
    // Handle old friendly name format for backward compatibility
    if (tokenName.includes('--color-')) {
      // Extract hex value from friendly name like "--color-border-default (Default Border)"
      const match = tokenName.match(/\(([^)]+)\)/)
      if (match) {
        // Map friendly names to actual hex values
        const colorMap: Record<string, string> = {
          'Default Border': '#E7EDF0',
          'Hover Border': '#C1E4FB',
          'Focus Border': '#0F3340',
          'Gray 600': '#909BAA',
          'Gray 700': '#757575',
          'Gray 800': '#708497',
          'Black': '#000000',
          'Pure White': '#FFFFFF',
          'Primary 50': '#F8FEFF',
          'Gray 100': '#F6FCFF',
          'Gray 200': '#F3F8FC',
          'Gray 300': '#F0F6FA',
          'Gray 400': '#FAFDFF',
          'Gray 500': '#E7EDF0',
          'Primary Text': '#0F3340',
          'Secondary Text': '#757575',
          'Tertiary Text': '#909BAA',
          'Muted Text': '#708497',
          'Black Text': '#000000',
          'White Text': '#FFFFFF',
          'Primary': '#0F3340'
        }
        return colorMap[match[1]] || tokenName
      }
    } else if (tokenName.includes('--spacing-')) {
      // Extract rem value from friendly name like "--spacing-4 (L - 16px)"
      const match = tokenName.match(/\([^-]+-\s*(\d+px)\)/)
      if (match) {
        return match[1]
      }
    } else if (tokenName.includes('--border-radius-')) {
      // Extract rem value from friendly name like "--border-radius-md (Medium - 6px)"
      const match = tokenName.match(/\([^-]+-\s*(\d+px)\)/)
      if (match) {
        return match[1]
      }
    }
    
    // Return as is for other values
    return tokenName
  }

  const getTriggerClasses = () => {
    const baseClasses = 'transition-all duration-200'
    
    if (triggerVariant === 'outline') {
      return cn(baseClasses, 'border-2 border-dashed')
    }
    
    return baseClasses
  }

  // Dynamic styles based on state - respect package component layout
  const getTriggerStyles = () => {
    const baseStyles: any = {
      borderStyle: 'solid',
      transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
      transition: 'all 0.2s ease-in-out',
    }

    // Border widths - individual controls for each side
    if (isHovered) {
      baseStyles.borderTopWidth = hoverBorderTopWidth || borderTopWidth || '1px'
      baseStyles.borderRightWidth = hoverBorderRightWidth || borderRightWidth || '1px'
      baseStyles.borderBottomWidth = hoverBorderBottomWidth || borderBottomWidth || '1px'
      baseStyles.borderLeftWidth = hoverBorderLeftWidth || borderLeftWidth || '1px'
    } else {
      baseStyles.borderTopWidth = borderTopWidth || '1px'
      baseStyles.borderRightWidth = borderRightWidth || '1px'
      baseStyles.borderBottomWidth = borderBottomWidth || '1px'
      baseStyles.borderLeftWidth = borderLeftWidth || '1px'
    }

    // Only add styles if values are provided - respect package component design
    if (borderColor) baseStyles.borderColor = isHovered ? (hoverBorderColor ? getValue(hoverBorderColor) : getValue(borderColor)) : getValue(borderColor)
    if (backgroundColor && triggerVariant === 'default') baseStyles.backgroundColor = isHovered ? (hoverBackgroundColor ? getValue(hoverBackgroundColor) : getValue(backgroundColor)) : getValue(backgroundColor)
    if (dropdownTextColor) baseStyles.color = isHovered ? (hoverDropdownTextColor ? getValue(hoverDropdownTextColor) : getValue(dropdownTextColor)) : getValue(dropdownTextColor)
    if (padding) baseStyles.padding = getValue(padding)
    if (borderRadius) baseStyles.borderRadius = isHovered ? (hoverBorderRadius ? getValue(hoverBorderRadius) : getValue(borderRadius)) : getValue(borderRadius)
    
    // Keep only essential design controls - no layout overrides
    // Typography for dropdown trigger text
    if (dropdownFontSize) baseStyles.fontSize = getValue(dropdownFontSize)
    if (dropdownFontWeight) baseStyles.fontWeight = getValue(dropdownFontWeight)
    if (dropdownLineHeight) baseStyles.lineHeight = getValue(dropdownLineHeight)
    
    // Shadows
    if (boxShadow) baseStyles.boxShadow = isHovered ? (hoverBoxShadow ? getValue(hoverBoxShadow) : getValue(boxShadow)) : getValue(boxShadow)
    
    // Custom shadow with displacement
    if (shadowDisplacementX !== undefined || shadowDisplacementY !== undefined) {
      const x = shadowDisplacementX || 0
      const y = shadowDisplacementY || 2
      const opacity = shadowOpacity || 0.1
      if (boxShadow) {
        baseStyles.boxShadow = isHovered ? (hoverBoxShadow ? getValue(hoverBoxShadow) : getValue(boxShadow)) : getValue(boxShadow)
      } else {
        baseStyles.boxShadow = `${x}px ${y}px 4px rgba(0, 0, 0, ${opacity})`
      }
    }

    return baseStyles
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  const handleMouseDown = () => setIsClicked(true)
  const handleMouseUp = () => setIsClicked(false)

  return (
    <div className="space-y-1 w-full">
      {showLabel && (
        <label className={`${labelTypography || 'text-ui-label'} ${labelKerning || ''}`}
          style={{ 
            color: isHovered ? (hoverLabelTextColor ? getValue(hoverLabelTextColor) : getValue(labelTextColor)) : getValue(labelTextColor),
            // Separate typography controls for label text
            fontSize: labelFontSize ? getValue(labelFontSize) : undefined,
            fontWeight: labelFontWeight ? getValue(labelFontWeight) : undefined,
            lineHeight: labelLineHeight ? getValue(labelLineHeight) : undefined,
            letterSpacing: labelLetterSpacing ? getValue(labelLetterSpacing) : undefined
          }}
        >
          {label}
        </label>
      )}
      <Dropdown>
        <DropdownTrigger 
          variant={triggerVariant}
          className={cn(getTriggerClasses(), "w-full")}
          style={getTriggerStyles()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <span 
            className={`flex-1 text-left ${dropdownTextKerning}`}
            style={{
              letterSpacing: dropdownLetterSpacing ? getValue(dropdownLetterSpacing) : undefined
            }}
          >
            {label}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent 
          align={contentAlignment}
          sideOffset={sideOffset}
          style={{
            borderTopWidth,
            borderRightWidth,
            borderBottomWidth,
            borderLeftWidth,
            borderStyle: 'solid',
            ...(borderColor && { borderColor: getValue(borderColor) }),
            ...(backgroundColor && { backgroundColor: getValue(backgroundColor) }),
            ...(borderRadius && { borderRadius: getValue(borderRadius) }),
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
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Example usage</h3>
      </div>
      <div className="flex flex-wrap gap-4">
        <ExampleDropdown label="User Menu" />
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown label="Default" triggerVariant="default" />
      <ExampleDropdown label="Outline" triggerVariant="outline" />
      <ExampleDropdown label="Ghost" triggerVariant="ghost" />
      <ExampleDropdown label="Destructive" triggerVariant="destructive" />
    </div>
  ),
}

// Auto-controls configuration for FinPro story - exclude layout controls
const finProAutoControls = await createAutoStoryConfig('Dropdown', {
  includeCategories: ['colors', 'spacing', 'borders', 'shadows']
  // Removed 'layout', 'interactive', and 'typography' to use separate typography controls
})

// Add separate typography and text color controls for labels and dropdown text
const separateTypographyControls = {
  argTypes: {
    // Label Typography Controls
    labelFontSize: {
      control: { type: 'select' },
      options: ['--font-size-xs', '--font-size-sm', '--font-size-base', '--font-size-lg', '--font-size-xl', '--font-size-2xl'],
      description: 'Font size for the label text',
      table: { category: 'Label Typography' }
    },
    labelFontWeight: {
      control: { type: 'select' },
      options: ['--font-weight-light', '--font-weight-normal', '--font-weight-medium', '--font-weight-semibold', '--font-weight-bold'],
      description: 'Font weight for the label text',
      table: { category: 'Label Typography' }
    },
    labelLineHeight: {
      control: { type: 'select' },
      options: ['--line-height-tight', '--line-height-snug', '--line-height-normal', '--line-height-relaxed'],
      description: 'Line height for the label text',
      table: { category: 'Label Typography' }
    },
    labelLetterSpacing: {
      control: { type: 'select' },
      options: ['--letter-spacing-tight', '--letter-spacing-normal', '--letter-spacing-wide', '--letter-spacing-wider'],
      description: 'Letter spacing for the label text',
      table: { category: 'Label Typography' }
    },
    labelTextColor: {
      control: { type: 'select' },
      options: [
        '--text-primary', '--text-secondary', '--text-tertiary', '--text-inverse', '--text-muted',
        '--primary', '--primary-50', '--primary-100', '--primary-200', '--primary-300', '--primary-400', '--primary-500',
        '--primary-600', '--primary-700', '--primary-800', '--primary-900',
        '--gray-50', '--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500', '--gray-600', '--gray-700', '--gray-800', '--gray-900',
        '--background', '--background-primary', '--background-secondary', '--background-tertiary', '--background-inverse',
        '--border', '--border-default', '--border-hover', '--border-focus', '--border-light',
        '--secondary', '--muted', '--accent', '--destructive', '--success', '--warning', '--info'
      ],
      description: 'Text color for the label',
      table: { category: 'Label Typography' }
    },
    hoverLabelTextColor: {
      control: { type: 'select' },
      options: [
        '--text-primary', '--text-secondary', '--text-tertiary', '--text-inverse', '--text-muted',
        '--primary', '--primary-50', '--primary-100', '--primary-200', '--primary-300', '--primary-400', '--primary-500',
        '--primary-600', '--primary-700', '--primary-800', '--primary-900',
        '--gray-50', '--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500', '--gray-600', '--gray-700', '--gray-800', '--gray-900',
        '--background', '--background-primary', '--background-secondary', '--background-tertiary', '--background-inverse',
        '--border', '--border-default', '--border-hover', '--border-focus', '--border-light',
        '--secondary', '--muted', '--accent', '--destructive', '--success', '--warning', '--info'
      ],
      description: 'Text color for the label on hover',
      table: { category: 'Label Typography' }
    },
    // Dropdown Text Typography Controls
    dropdownFontSize: {
      control: { type: 'select' },
      options: ['--font-size-xs', '--font-size-sm', '--font-size-base', '--font-size-lg', '--font-size-xl', '--font-size-2xl'],
      description: 'Font size for the dropdown trigger text',
      table: { category: 'Dropdown Typography' }
    },
    dropdownFontWeight: {
      control: { type: 'select' },
      options: ['--font-weight-light', '--font-weight-normal', '--font-weight-medium', '--font-weight-semibold', '--font-weight-bold'],
      description: 'Font weight for the dropdown trigger text',
      table: { category: 'Dropdown Typography' }
    },
    dropdownLineHeight: {
      control: { type: 'select' },
      options: ['--line-height-tight', '--line-height-snug', '--line-height-normal', '--line-height-relaxed'],
      description: 'Line height for the dropdown trigger text',
      table: { category: 'Dropdown Typography' }
    },
    dropdownLetterSpacing: {
      control: { type: 'select' },
      options: ['--letter-spacing-tight', '--letter-spacing-normal', '--letter-spacing-wide', '--letter-spacing-wider'],
      description: 'Letter spacing for the dropdown trigger text',
      table: { category: 'Dropdown Typography' }
    },
    dropdownTextColor: {
      control: { type: 'select' },
      options: [
        '--text-primary', '--text-secondary', '--text-tertiary', '--text-inverse', '--text-muted',
        '--primary', '--primary-50', '--primary-100', '--primary-200', '--primary-300', '--primary-400', '--primary-500',
        '--primary-600', '--primary-700', '--primary-800', '--primary-900',
        '--gray-50', '--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500', '--gray-600', '--gray-700', '--gray-800', '--gray-900',
        '--background', '--background-primary', '--background-secondary', '--background-tertiary', '--background-inverse',
        '--border', '--border-default', '--border-hover', '--border-focus', '--border-light',
        '--secondary', '--muted', '--accent', '--destructive', '--success', '--warning', '--info'
      ],
      description: 'Text color for the dropdown trigger',
      table: { category: 'Dropdown Typography' }
    },
    hoverDropdownTextColor: {
      control: { type: 'select' },
      options: [
        '--text-primary', '--text-secondary', '--text-tertiary', '--text-inverse', '--text-muted',
        '--primary', '--primary-50', '--primary-100', '--primary-200', '--primary-300', '--primary-400', '--primary-500',
        '--primary-600', '--primary-700', '--primary-800', '--primary-900',
        '--gray-50', '--gray-100', '--gray-200', '--gray-300', '--gray-400', '--gray-500', '--gray-600', '--gray-700', '--gray-800', '--gray-900',
        '--background', '--background-primary', '--background-secondary', '--background-tertiary', '--background-inverse',
        '--border', '--border-default', '--border-hover', '--border-focus', '--border-light',
        '--secondary', '--muted', '--accent', '--destructive', '--success', '--warning', '--info'
      ],
      description: 'Text color for the dropdown trigger on hover',
      table: { category: 'Dropdown Typography' }
    },
    // Border Radius Control
    borderRadius: {
      control: { type: 'select' },
      options: [
        '--border-radius-none', '--border-radius-sm', '--border-radius-base', '--border-radius-md',
        '--border-radius-lg', '--border-radius-xl', '--border-radius-2xl', '--border-radius-3xl', '--border-radius-full'
      ],
      description: 'Border radius for the dropdown trigger',
      table: { category: 'Border Controls' }
    },
    // Individual Border Controls
    borderTopWidth: {
      control: { type: 'select' },
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border width for top side',
      table: { category: 'Border Controls' }
    },
    borderRightWidth: {
      control: { type: 'select' },
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border width for right side',
      table: { category: 'Border Controls' }
    },
    borderBottomWidth: {
      control: { type: 'select' },
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border width for bottom side',
      table: { category: 'Border Controls' }
    },
    borderLeftWidth: {
      control: { type: 'select' },
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border width for left side',
      table: { category: 'Border Controls' }
    },
    // Hover Border Controls
    hoverBorderTopWidth: {
      control: { type: 'select' },
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border width for top side on hover',
      table: { category: 'Hover Border Controls' }
    },
    hoverBorderRightWidth: {
      control: { type: 'select' },
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border width for right side on hover',
      table: { category: 'Hover Border Controls' }
    },
    hoverBorderBottomWidth: {
      control: { type: 'select' },
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border width for bottom side on hover',
      table: { category: 'Hover Border Controls' }
    },
    hoverBorderLeftWidth: {
      control: { type: 'select' },
      options: ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'],
      description: 'Border width for left side on hover',
      table: { category: 'Hover Border Controls' }
    },
    // Hover Shadow Control
    hoverBoxShadow: {
      control: { type: 'select' },
      options: [
        '--shadow-sm', '--shadow-base', '--shadow-md', '--shadow-lg', '--shadow-xl', '--shadow-2xl', '--shadow-inner'
      ],
      description: 'Box shadow for the dropdown trigger on hover',
      table: { category: 'Hover Shadow Controls' }
    }
  }
}

export const FinPro: Story = {
  render: (args: any) => (
    <div className="min-h-screen bg-[#FAFAFA] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h4 text-foreground">Filter Section layout</h3>
        <div className="flex gap-2">
          <SmartCopyCodeButton fallbackGenerator={generateFinProSnippet} fallbackArgs={args} currentArgs={args} />
        <CopyCodeButton generator={generateFinProSnippet} args={args} />
        </div>
      </div>
      <div className="bg-white border border-border-light rounded-xl p-3 shadow-md" style={{ minHeight: '140px', boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${args.headerTypography || 'text-h2'} ${args.headerKerning || ''}`}
            style={{ color: resolveControlCssVar(args.headerTextColor) || 'rgb(var(--text-primary))' }}
          >
            Filter By
          </h2>
          <div className="w-4 h-4 bg-[#3B3F45] rounded" />
        </div>
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 w-full"
          style={{ 
            gap: args.dropdownGap,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}
        >
          <div className="w-full min-w-0">
            <ExampleDropdown 
              label="Consent Template" 
              {...args} 
              showLabel={args.showLabel}
            />
          </div>
          <div className="w-full min-w-0">
            <ExampleDropdown 
              label="Purpose Code" 
              {...args} 
              showLabel={args.showLabel}
            />
          </div>
          <div className="w-full min-w-0">
            <ExampleDropdown 
              label="Consent Status" 
              {...args} 
              showLabel={args.showLabel}
            />
          </div>
          <div className="w-full min-w-0">
            <ExampleDropdown 
              label="Account Aggregator" 
              {...args} 
              showLabel={args.showLabel}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  // Merge auto-controls with separate typography controls
  ...finProAutoControls,
  argTypes: {
    ...finProAutoControls.argTypes,
    ...separateTypographyControls.argTypes
  },
  // Only keep essential custom args that aren't in auto-controls
  args: {
    ...finProAutoControls.args,

    // Essential custom args only
    dropdownGap: '20px',

    showLabel: true,

    // Auto-generated color controls will provide all options
    backgroundColor: "--gray-50",

    borderColor: "--border-default",
    hoverBackgroundColor: "--primary-50",
    hoverBorderColor: "--border-hover",
    padding: "--spacing-2",
    borderRadius: "--border-radius-lg",

    // Border width defaults
    borderTopWidth: '1px',

    borderRightWidth: '1px',
    borderBottomWidth: "3px",
    borderLeftWidth: '1px',
    hoverBorderTopWidth: "1px",
    hoverBorderRightWidth: "1px",

    // Special bottom border for hover effect
    hoverBorderBottomWidth: '4px',

    hoverBorderLeftWidth: "1px",

    // Separate typography defaults for labels and dropdown text
    labelFontSize: "--font-size-xs",

    labelFontWeight: "--font-weight-medium",
    labelLineHeight: '--line-height-normal',
    labelLetterSpacing: "--letter-spacing-wider",
    labelTextColor: '--text-secondary',
    hoverLabelTextColor: '--text-primary',
    dropdownFontSize: "--font-size-base",
    dropdownFontWeight: "--font-weight-medium",
    dropdownLineHeight: '--line-height-normal',
    dropdownLetterSpacing: "--letter-spacing-wider",
    dropdownTextColor: '--text-primary',
    hoverDropdownTextColor: '--primary',
    shadowDisplacementY: -2,
    
    // Hover shadow control
    hoverBoxShadow: "--shadow-md"
  },
}








