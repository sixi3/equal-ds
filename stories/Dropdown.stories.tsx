import './tailwind.css'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '../src'
import { ChevronDown, Settings, User, LogOut, CreditCard } from 'lucide-react'
import { cn } from '../src/lib/cn'
import { useState } from 'react'
import { CopyCodeButton } from '../src/story-utils/CopyCodeButton'
import { generateDropdownSnippet, generateFinProSnippet } from '../src/story-utils/snippets'

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
  argTypes: {
    borderColor: {
      control: { type: 'select' },
      options: [
        '--color-border-default (Default Border)',
        '--color-border-hover (Hover Border)',
        '--color-border-focus (Focus Border)',
        '--color-gray-600 (Gray 600)',
        '--color-gray-700 (Gray 700)',
        '--color-gray-800 (Gray 800)',
        '--color-gray-900 (Black)',
      ],
      mapping: {
        '--color-border-default (Default Border)': '#E7EDF0',
        '--color-border-hover (Hover Border)': '#C1E4FB',
        '--color-border-focus (Focus Border)': '#0F3340',
        '--color-gray-600 (Gray 600)': '#909BAA',
        '--color-gray-700 (Gray 700)': '#757575',
        '--color-gray-800 (Gray 800)': '#708497',
        '--color-gray-900 (Black)': '#000000',
      },
      description: 'Border color from design tokens',
      defaultValue: '--color-border-default (Default Border)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#E7EDF0 (--color-border-default)' },
        category: 'Design Tokens'
      }
    },
    backgroundColor: {
      control: { type: 'select' },
      options: [
        '--color-gray-50 (Pure White)',
        '--color-primary-50 (Primary 50)',
        '--color-gray-100 (Gray 100)',
        '--color-gray-200 (Gray 200)',
        '--color-gray-300 (Gray 300)',
        '--color-gray-400 (Gray 400)',
        '--color-gray-500 (Gray 500)',
        '--color-gray-600 (Gray 600)',
        '--color-gray-700 (Gray 700)',
        '--color-gray-800 (Gray 800)',
        '--color-gray-900 (Black)',
      ],
      mapping: {
        '--color-gray-50 (Pure White)': '#FFFFFF',
        '--color-primary-50 (Primary 50)': '#F8FEFF',
        '--color-gray-100 (Gray 100)': '#F6FCFF',
        '--color-gray-200 (Gray 200)': '#F3F8FC',
        '--color-gray-300 (Gray 300)': '#F0F6FA',
        '--color-gray-400 (Gray 400)': '#FAFDFF',
        '--color-gray-500 (Gray 500)': '#E7EDF0',
        '--color-gray-600 (Gray 600)': '#909BAA',
        '--color-gray-700 (Gray 700)': '#757575',
        '--color-gray-800 (Gray 800)': '#708497',
        '--color-gray-900 (Black)': '#000000',
      },
      description: 'Background color from design tokens',
      defaultValue: '--color-gray-50 (Pure White)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#FFFFFF (--color-gray-50)' },
        category: 'Design Tokens'
      }
    },
    textColor: {
      control: { type: 'select' },
      options: [
        '--color-text-primary (Primary Text)',
        '--color-text-secondary (Secondary Text)',
        '--color-text-tertiary (Tertiary Text)',
        '--color-text-muted (Muted Text)',
        '--color-gray-900 (Black Text)',
        '--color-gray-50 (White Text)',
      ],
      mapping: {
        '--color-text-primary (Primary Text)': '#0F3340',
        '--color-text-secondary (Secondary Text)': '#757575',
        '--color-text-tertiary (Tertiary Text)': '#909BAA',
        '--color-text-muted (Muted Text)': '#708497',
        '--color-gray-900 (Black Text)': '#000000',
        '--color-gray-50 (White Text)': '#FFFFFF',
      },
      description: 'Text color from design tokens',
      defaultValue: '--color-text-primary (Primary Text)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#0F3340 (--color-text-primary)' },
        category: 'Design Tokens'
      }
    },
    padding: {
      control: { type: 'select' },
      options: [
        '--spacing-1 (XS - 4px)',
        '--spacing-2 (S - 8px)',
        '--spacing-3 (M - 12px)',
        '--spacing-4 (L - 16px)',
        '--spacing-5 (XL - 20px)',
        '--spacing-6 (2XL - 24px)',
        '--spacing-8 (3XL - 32px)',
        '--spacing-12 (4XL - 48px)',
      ],
      mapping: {
        '--spacing-1 (XS - 4px)': '0.25rem',
        '--spacing-2 (S - 8px)': '0.5rem',
        '--spacing-3 (M - 12px)': '0.75rem',
        '--spacing-4 (L - 16px)': '1rem',
        '--spacing-5 (XL - 20px)': '1.25rem',
        '--spacing-6 (2XL - 24px)': '1.5rem',
        '--spacing-8 (3XL - 32px)': '2rem',
        '--spacing-12 (4XL - 48px)': '3rem',
      },
      description: 'Padding from design tokens',
      defaultValue: '--spacing-4 (L - 16px)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1rem (--spacing-4 - 16px)' },
        category: 'Design Tokens'
      }
    },
    borderRadius: {
      control: { type: 'select' },
      options: [
        '--border-radius-none (None - 0px)',
        '--border-radius-sm (Small - 2px)',
        '--border-radius-base (Base - 4px)',
        '--border-radius-md (Medium - 6px)',
        '--border-radius-lg (Large - 8px)',
        '--border-radius-xl (XL - 12px)',
        '--border-radius-2xl (2XL - 16px)',
      ],
      mapping: {
        '--border-radius-none (None - 0px)': '0',
        '--border-radius-sm (Small - 2px)': '0.125rem',
        '--border-radius-base (Base - 4px)': '0.25rem',
        '--border-radius-md (Medium - 6px)': '0.375rem',
        '--border-radius-lg (Large - 8px)': '0.5rem',
        '--border-radius-xl (XL - 12px)': '0.75rem',
        '--border-radius-2xl (2XL - 16px)': '1rem',
      },
      description: 'Border radius from design tokens',
      defaultValue: '--border-radius-md (Medium - 6px)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0.375rem (--border-radius-md - 6px)' },
        category: 'Design Tokens'
      }
    },
    triggerVariant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost', 'primary', 'destructive'],
      description: 'Visual style variant of the trigger button',
      defaultValue: 'default',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Trigger'
      }
    },
    contentAlignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      description: 'Alignment of dropdown content',
      defaultValue: 'start',
      table: {
        type: { summary: 'start | center | end' },
        defaultValue: { summary: 'start' },
        category: 'Layout'
      }
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'Distance between trigger and content',
      defaultValue: 6,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
        category: 'Layout'
      }
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Whether to show the label above the dropdown',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Display'
      }
    },
    borderTopWidth: {
      control: { type: 'select' },
      options: [
        '0px',
        '1px', 
        '2px',
        '3px',
        '4px',
        '6px',
        '8px'
      ],
      description: 'Thickness of the top border edge',
      defaultValue: '1px',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1px' },
        category: 'Border Edges'
      }
    },
    borderRightWidth: {
      control: { type: 'select' },
      options: [
        '0px',
        '1px', 
        '2px',
        '3px',
        '4px',
        '6px',
        '8px'
      ],
      description: 'Thickness of the right border edge',
      defaultValue: '1px',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1px' },
        category: 'Border Edges'
      }
    },
    borderBottomWidth: {
      control: { type: 'select' },
      options: [
        '0px',
        '1px', 
        '2px',
        '3px',
        '4px',
        '6px',
        '8px'
      ],
      description: 'Thickness of the bottom border edge',
      defaultValue: '1px',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1px' },
        category: 'Border Edges'
      }
    },
    borderLeftWidth: {
      control: { type: 'select' },
      options: [
        '0px',
        '1px', 
        '2px',
        '3px',
        '4px',
        '6px',
        '8px'
      ],
      description: 'Thickness of the left border edge',
      defaultValue: '1px',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1px' },
        category: 'Border Edges'
      }
    },
    hoverBackgroundColor: {
      control: { type: 'select' },
      options: [
        '--color-gray-50 (Pure White)',
        '--color-primary-50 (Primary 50)',
        '--color-gray-100 (Gray 100)',
        '--color-gray-200 (Gray 200)',
        '--color-gray-300 (Gray 300)',
        '--color-gray-400 (Gray 400)',
        '--color-gray-500 (Gray 500)',
        '--color-gray-600 (Gray 600)',
        '--color-gray-700 (Gray 700)',
        '--color-gray-800 (Gray 800)',
        '--color-gray-900 (Black)',
        '--color-border-hover (Hover Border)',
        '--color-border-focus (Focus Border)',
      ],
      description: 'Background color on hover',
      defaultValue: '--color-gray-100 (Gray 100)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '--color-gray-100 (Gray 100)' },
        category: 'Hover States'
      }
    },
    hoverBorderColor: {
      control: { type: 'select' },
      options: [
        '--color-border-default (Default Border)',
        '--color-border-hover (Hover Border)',
        '--color-border-focus (Focus Border)',
        '--color-gray-600 (Gray 600)',
        '--color-gray-700 (Gray 700)',
        '--color-gray-800 (Gray 800)',
        '--color-gray-900 (Black)',
        '--color-primary-500 (Primary)',
      ],
      description: 'Border color on hover',
      defaultValue: '--color-border-hover (Hover Border)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '--color-border-hover (Hover Border)' },
        category: 'Hover States'
      }
    },
    hoverTextColor: {
      control: { type: 'select' },
      options: [
        '--color-text-primary (Primary Text)',
        '--color-text-secondary (Secondary Text)',
        '--color-text-tertiary (Tertiary Text)',
        '--color-text-muted (Muted Text)',
        '--color-gray-900 (Black Text)',
        '--color-gray-50 (White Text)',
        '--color-primary-500 (Primary)',
      ],
      description: 'Text color on hover',
      defaultValue: '--color-text-primary (Primary Text)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '--color-text-primary (Primary Text)' },
        category: 'Hover States'
      }
    },
    hoverBorderBottomWidth: {
      control: { type: 'select' },
      options: [
        '0px',
        '1px', 
        '2px',
        '3px',
        '4px',
        '6px',
        '8px'
      ],
      description: 'Bottom border thickness on hover',
      defaultValue: '2px',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '2px' },
        category: 'Hover States'
      }
    },
    hoverBorderRadius: {
      control: { type: 'select' },
      options: [
        '--border-radius-none (None - 0px)',
        '--border-radius-sm (Small - 2px)',
        '--border-radius-base (Base - 4px)',
        '--border-radius-md (Medium - 6px)',
        '--border-radius-lg (Large - 8px)',
        '--border-radius-xl (XL - 12px)',
        '--border-radius-2xl (2XL - 16px)',
      ],
      description: 'Border radius on hover',
      defaultValue: '--border-radius-md (Medium - 6px)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '--border-radius-md (Medium - 6px)' },
        category: 'Hover States'
      }
    },
    dropdownGap: {
      control: { type: 'select' },
      options: [
        '8px',
        '12px',
        '16px',
        '20px',
        '24px',
        '32px'
      ],
      description: 'Gap between dropdown triggers',
      defaultValue: '16px',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '16px' },
        category: 'Layout'
      }
    },
    labelTypography: {
      control: { type: 'select' },
      options: [
        'text-ui-label',
        'text-ui-button',
        'text-ui-caption',
        'text-body-xs',
        'text-body-small',
        'text-body-base',
        'text-h6',
        'text-h5',
        'text-h4'
      ],
      description: 'Typography style for dropdown labels',
      defaultValue: 'text-ui-label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text-ui-label' },
        category: 'Typography'
      }
    },
    headerTypography: {
      control: { type: 'select' },
      options: [
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-h5',
        'text-h6',
        'text-body-large',
        'text-body-base',
        'text-display-small',
        'text-display-medium',
        'text-display-large'
      ],
      description: 'Typography style for section headers',
      defaultValue: 'text-h2',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text-h2' },
        category: 'Typography'
      }
    }
  },
} satisfies Meta

export default meta
type Story = StoryObj

function ExampleDropdown({ 
  label, 
  showLabel = true,
  borderColor = '--color-border-default (Default Border)',
  backgroundColor = '--color-gray-50 (Pure White)',
  textColor = '--color-text-primary (Primary Text)',
  padding = '--spacing-4 (L - 16px)',
  borderRadius = '--border-radius-md (Medium - 6px)',
  triggerVariant = 'default',
  contentAlignment = 'start',
  sideOffset = 6,
  borderTopWidth = '1px',
  borderRightWidth = '1px',
  borderBottomWidth = '1px',
  borderLeftWidth = '1px',
  hoverBackgroundColor = '--color-gray-100 (Gray 100)',
  hoverBorderColor = '--color-border-hover (Hover Border)',
  hoverTextColor = '--color-text-primary (Primary Text)',
  hoverBorderBottomWidth = '2px',
  hoverBorderRadius = '--border-radius-md (Medium - 6px)',
  dropdownGap = '16px',
  labelTypography = 'text-ui-label',
  headerTypography = 'text-h2',
}: { 
  label: string
  showLabel?: boolean
  borderColor?: string
  backgroundColor?: string
  textColor?: string
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
  hoverTextColor?: string
  hoverBorderBottomWidth?: string
  hoverBorderRadius?: string
  dropdownGap?: string
  labelTypography?: string
  headerTypography?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Extract actual values from the friendly names
  const getValue = (friendlyName: string) => {
    if (friendlyName.includes('--color-')) {
      // Extract hex value from friendly name like "--color-border-default (Default Border)"
      const match = friendlyName.match(/\(([^)]+)\)/)
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
        return colorMap[match[1]] || friendlyName
      }
    } else if (friendlyName.includes('--spacing-')) {
      // Extract rem value from friendly name like "--spacing-4 (L - 16px)"
      const match = friendlyName.match(/\([^-]+-\s*(\d+px)\)/)
      if (match) {
        return match[1]
      }
    } else if (friendlyName.includes('--border-radius-')) {
      // Extract rem value from friendly name like "--border-radius-md (Medium - 6px)"
      const match = friendlyName.match(/\([^-]+-\s*(\d+px)\)/)
      if (match) {
        return match[1]
      }
    }
    return friendlyName
  }

  const getTriggerClasses = () => {
    const baseClasses = 'transition-all duration-200'
    
    if (triggerVariant === 'outline') {
      return cn(baseClasses, 'border-2 border-dashed')
    }
    
    return baseClasses
  }

  // Dynamic styles based on state
  const getTriggerStyles = () => {
    const baseStyles = {
      borderColor: isHovered ? getValue(hoverBorderColor) : getValue(borderColor),
      backgroundColor: isHovered ? getValue(hoverBackgroundColor) : (triggerVariant === 'default' ? getValue(backgroundColor) : undefined),
      color: isHovered ? getValue(hoverTextColor) : getValue(textColor),
      padding: getValue(padding),
      borderRadius: isHovered ? getValue(hoverBorderRadius) : getValue(borderRadius),
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth: isHovered ? hoverBorderBottomWidth : borderBottomWidth,
      borderLeftWidth,
      borderStyle: 'solid',
      transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
      transition: 'all 0.2s ease-in-out',
    }

    return baseStyles
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  const handleMouseDown = () => setIsClicked(true)
  const handleMouseUp = () => setIsClicked(false)

  return (
    <div className="space-y-2 w-full">
      {showLabel && (
        <label className={cn(labelTypography || 'text-ui-label', 'text-foreground')}>
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
          <span className="flex-1 text-left">{label}</span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent 
          align={contentAlignment}
          sideOffset={sideOffset}
          style={{
            borderColor: getValue(borderColor),
            backgroundColor: getValue(backgroundColor),
            borderRadius: getValue(borderRadius),
            borderTopWidth,
            borderRightWidth,
            borderBottomWidth,
            borderLeftWidth,
            borderStyle: 'solid',
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
        <h3 className="text-sm font-medium text-foreground">Example usage</h3>
        <CopyCodeButton generator={generateDropdownSnippet} args={args} />
      </div>
      <div className="flex flex-wrap gap-4">
        <ExampleDropdown label="User Menu" {...args} />
      </div>
    </div>
  ),
  args: {
    borderColor: '--color-border-default (Default Border)',
    backgroundColor: '--color-gray-50 (Pure White)',
    textColor: '--color-text-primary (Primary Text)',
    padding: '--spacing-4 (L - 16px)',
    borderRadius: '--border-radius-md (Medium - 6px)',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
    showLabel: true,
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    hoverBackgroundColor: '--color-gray-100 (Gray 100)',
    hoverBorderColor: '--color-border-hover (Hover Border)',
    hoverTextColor: '--color-text-primary (Primary Text)',
    hoverBorderBottomWidth: '2px',
    hoverBorderRadius: '--border-radius-md (Medium - 6px)',
    dropdownGap: '16px',
  },
}

export const MultipleDropdowns: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown label="User Menu" {...args} />
      <ExampleDropdown label="Settings" {...args} />
      <ExampleDropdown label="Actions" {...args} />
      <ExampleDropdown label="More" {...args} />
    </div>
  ),
  args: {
    borderColor: '--color-border-default (Default Border)',
    backgroundColor: '--color-gray-50 (Pure White)',
    textColor: '--color-text-primary (Primary Text)',
    padding: '--spacing-4 (L - 16px)',
    borderRadius: '--border-radius-md (Medium - 6px)',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
    showLabel: true,
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    hoverBackgroundColor: '--color-gray-100 (Gray 100)',
    hoverBorderColor: '--color-border-hover (Hover Border)',
    hoverTextColor: '--color-text-primary (Primary Text)',
    hoverBorderBottomWidth: '2px',
    hoverBorderRadius: '--border-radius-md (Medium - 6px)',
  },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown label="Default" {...args} triggerVariant="default" />
      <ExampleDropdown label="Outline" {...args} triggerVariant="outline" />
      <ExampleDropdown label="Ghost" {...args} triggerVariant="ghost" />
      <ExampleDropdown label="Destructive" {...args} triggerVariant="destructive" />
    </div>
  ),
  args: {
    borderColor: '--color-border-default (Default Border)',
    backgroundColor: '--color-gray-50 (Pure White)',
    textColor: '--color-text-primary (Primary Text)',
    padding: '--spacing-4 (L - 16px)',
    borderRadius: '--border-radius-md (Medium - 6px)',
    contentAlignment: 'start',
    sideOffset: 6,
    showLabel: true,
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    hoverBackgroundColor: '--color-gray-100 (Gray 100)',
    hoverBorderColor: '--color-border-hover (Hover Border)',
    hoverTextColor: '--color-text-primary (Primary Text)',
    hoverBorderBottomWidth: '2px',
    hoverBorderRadius: '--border-radius-md (Medium - 6px)',
  },
}

export const CustomColors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown 
        label="Primary Theme" 
        {...args} 
        borderColor="--color-border-focus (Focus Border)"
        backgroundColor="--color-primary-50 (Primary 50)"
        textColor="--color-text-primary (Primary Text)"
      />
      <ExampleDropdown 
        label="Gray Theme" 
        {...args} 
        borderColor="--color-gray-600 (Gray 600)"
        backgroundColor="--color-gray-200 (Gray 200)"
        textColor="--color-text-secondary (Secondary Text)"
      />
      <ExampleDropdown 
        label="Accent Theme" 
        {...args} 
        borderColor="--color-border-hover (Hover Border)"
        backgroundColor="--color-gray-300 (Gray 300)"
        textColor="--color-primary-700 (Primary 700)"
      />
    </div>
  ),
  args: {
    padding: '--spacing-4 (L - 16px)',
    borderRadius: '--border-radius-md (Medium - 6px)',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
    showLabel: true,
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    hoverBackgroundColor: '--color-gray-100 (Gray 100)',
    hoverBorderColor: '--color-border-hover (Hover Border)',
    hoverTextColor: '--color-text-primary (Primary Text)',
    hoverBorderBottomWidth: '2px',
    hoverBorderRadius: '--border-radius-md (Medium - 6px)',
  },
}

export const WithLabels: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-6 p-8">
      <ExampleDropdown 
        label="User Menu" 
        {...args} 
        showLabel={true}
      />
      <ExampleDropdown 
        label="Settings" 
        {...args} 
        showLabel={true}
      />
      <ExampleDropdown 
        label="Actions" 
        {...args} 
        showLabel={false}
      />
      <ExampleDropdown 
        label="More Options" 
        {...args} 
        showLabel={true}
      />
    </div>
  ),
  args: {
    borderColor: '--color-border-default (Default Border)',
    backgroundColor: '--color-gray-50 (Pure White)',
    textColor: '--color-text-primary (Primary Text)',
    padding: '--spacing-4 (L - 16px)',
    borderRadius: '--border-radius-md (Medium - 6px)',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
    showLabel: true,
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    hoverBackgroundColor: '--color-gray-100 (Gray 100)',
    hoverBorderColor: '--color-border-hover (Hover Border)',
    hoverTextColor: '--color-text-primary (Primary Text)',
    hoverBorderBottomWidth: '2px',
    hoverBorderRadius: '--border-radius-md (Medium - 6px)',
  },
}

export const FinPro: Story = {
  render: (args: any) => (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h4 text-foreground">FinPro layout</h3>
        <CopyCodeButton generator={generateFinProSnippet} args={args} />
      </div>
      <div className="bg-white border border-border-light rounded-xl p-3 shadow-sm" style={{ minHeight: '140px', boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={cn(args.headerTypography || 'text-h2', 'text-[#0F3340]')}>Filter By</h2>
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
              showLabel={true}
            />
          </div>
          <div className="w-full min-w-0">
            <ExampleDropdown 
              label="Purpose Code" 
              {...args} 
              showLabel={true}
            />
          </div>
          <div className="w-full min-w-0">
            <ExampleDropdown 
              label="Consent Status" 
              {...args} 
              showLabel={true}
            />
          </div>
          <div className="w-full min-w-0">
            <ExampleDropdown 
              label="Account Aggregator" 
              {...args} 
              showLabel={true}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    borderColor: '--color-border-default (Default Border)',
    backgroundColor: '--color-gray-50 (Pure White)',
    textColor: '--color-text-primary (Primary Text)',
    padding: "--spacing-2 (S - 8px)",
    borderRadius: '--border-radius-md (Medium - 6px)',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
    showLabel: true,
    borderTopWidth: "1px",
    borderRightWidth: '1px',
    borderBottomWidth: "3px",
    borderLeftWidth: '1px',
    hoverBackgroundColor: '--color-gray-100 (Gray 100)',
    hoverBorderColor: '--color-border-hover (Hover Border)',
    hoverTextColor: '--color-text-primary (Primary Text)',
    hoverBorderBottomWidth: "3px",
    hoverBorderRadius: '--border-radius-md (Medium - 6px)',
    dropdownGap: "20px",
    labelTypography: 'text-ui-label',
    headerTypography: "text-display-small",
  },
}

export const HoverAndClickAnimations: Story = {
  render: (args: any) => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Hover & Click Animations</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Hover over the dropdown to see it move up and change styles. Click to see it return to original position with reduced bottom border.
          Use the controls below to customize the hover effects.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Interactive Dropdown</h4>
          <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <ExampleDropdown 
              label="Hover Me!" 
              {...args} 
              showLabel={true}
            />
          </div>
          <p className="text-xs text-gray-500">
            Hover: Moves up 2px, changes colors, increases bottom border to {args.hoverBorderBottomWidth}<br/>
            Click: Returns to position, bottom border becomes 1px
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Animation Details</h4>
          <div className="text-sm text-muted-foreground space-y-3">
            <div className="p-3 bg-white border rounded-lg">
              <div className="font-medium text-foreground mb-2">Hover State</div>
              <div className="space-y-1 text-xs">
                <div>• Background: {args.hoverBackgroundColor}</div>
                <div>• Border: {args.hoverBorderColor}</div>
                <div>• Text: {args.hoverTextColor}</div>
                <div>• Bottom Border: {args.hoverBorderBottomWidth}</div>
                <div>• Border Radius: {args.hoverBorderRadius}</div>
                <div>• Transform: translateY(-2px)</div>
              </div>
            </div>
            
            <div className="p-3 bg-white border rounded-lg">
              <div className="font-medium text-foreground mb-2">Click State</div>
              <div className="space-y-1 text-xs">
                <div>• Returns to original position</div>
                <div>• Bottom border: 1px</div>
                <div>• Smooth transition back</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Default Hover</label>
          <ExampleDropdown 
            label="Default" 
            {...args} 
            showLabel={false}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Custom Hover</label>
          <ExampleDropdown 
            label="Custom" 
            {...args} 
            hoverBackgroundColor="--color-primary-50 (Primary 50)"
            hoverBorderColor="--color-primary-500 (Primary)"
            hoverTextColor="--color-primary-500 (Primary)"
            hoverBorderBottomWidth="4px"
            showLabel={false}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Subtle Hover</label>
          <ExampleDropdown 
            label="Subtle" 
            {...args} 
            hoverBackgroundColor="--color-gray-200 (Gray 200)"
            hoverBorderColor="--color-gray-600 (Gray 600)"
            hoverBorderBottomWidth="1px"
            showLabel={false}
          />
        </div>
      </div>
    </div>
  ),
  args: {
    borderColor: '--color-border-default (Default Border)',
    backgroundColor: '--color-gray-50 (Pure White)',
    textColor: '--color-text-primary (Primary Text)',
    padding: '--spacing-4 (L - 16px)',
    borderRadius: '--border-radius-md (Medium - 6px)',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
    showLabel: true,
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    hoverBackgroundColor: '--color-gray-100 (Gray 100)',
    hoverBorderColor: '--color-border-hover (Hover Border)',
    hoverTextColor: '--color-text-primary (Primary Text)',
    hoverBorderBottomWidth: '2px',
    hoverBorderRadius: '--border-radius-md (Medium - 6px)',
  },
}

export const BorderEdgeControls: Story = {
  render: (args: any) => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Border Edge Controls</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Use the controls below to adjust the thickness of each border edge independently. 
          Create unique border styles like underline-only, left-accent, or custom patterns.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Custom Border Example</h4>
          <ExampleDropdown 
            label="Custom Borders" 
            {...args} 
            showLabel={true}
          />
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Border Edge Guide</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-t-4 border-l-0 border-r-0 border-b-0 border-foreground"></div>
              <span>Top: {args.borderTopWidth}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-t-0 border-l-0 border-r-4 border-b-0 border-foreground"></div>
              <span>Right: {args.borderRightWidth}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-t-0 border-l-0 border-r-0 border-b-4 border-foreground"></div>
              <span>Bottom: {args.borderBottomWidth}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-t-0 border-l-4 border-r-0 border-b-0 border-foreground"></div>
              <span>Left: {args.borderLeftWidth}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Underline Style</label>
          <ExampleDropdown 
            label="Underline" 
            {...args} 
            borderTopWidth="0px"
            borderRightWidth="0px"
            borderBottomWidth="3px"
            borderLeftWidth="0px"
            showLabel={false}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Left Accent</label>
          <ExampleDropdown 
            label="Left Accent" 
            {...args} 
            borderTopWidth="0px"
            borderRightWidth="0px"
            borderBottomWidth="0px"
            borderLeftWidth="4px"
            showLabel={false}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Top Border Only</label>
          <ExampleDropdown 
            label="Top Border" 
            {...args} 
            borderTopWidth="3px"
            borderRightWidth="0px"
            borderBottomWidth="0px"
            borderLeftWidth="0px"
            showLabel={false}
          />
        </div>
      </div>
    </div>
  ),
  args: {
    borderColor: '--color-border-default (Default Border)',
    backgroundColor: '--color-gray-50 (Pure White)',
    textColor: '--color-text-primary (Primary Text)',
    padding: '--spacing-4 (L - 16px)',
    borderRadius: '--border-radius-md (Medium - 6px)',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
    showLabel: true,
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    hoverBackgroundColor: '--color-gray-100 (Gray 100)',
    hoverBorderColor: '--color-border-hover (Hover Border)',
    hoverTextColor: '--color-text-primary (Primary Text)',
    hoverBorderBottomWidth: '2px',
    hoverBorderRadius: '--border-radius-md (Medium - 6px)',
  },
}

export const VariantsWithHover: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Trigger Variants with Hover States</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Hover over each dropdown to see the different hover effects. Each variant has unique hover states.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Default Variant</label>
          <Dropdown>
            <DropdownTrigger variant="default">
              <span>Default</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownSeparator />
              <DropdownItem>Logout</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Outline Variant</label>
          <Dropdown>
            <DropdownTrigger variant="outline">
              <span>Outline</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownSeparator />
              <DropdownItem>Logout</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Ghost Variant</label>
          <Dropdown>
            <DropdownTrigger variant="ghost">
              <span>Ghost</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownSeparator />
              <DropdownItem>Logout</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Primary Variant</label>
          <Dropdown>
            <DropdownTrigger variant="primary">
              <span>Primary</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownSeparator />
              <DropdownItem>Logout</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Destructive Variant</label>
          <Dropdown>
            <DropdownTrigger variant="destructive">
              <span>Destructive</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Delete Account</DropdownItem>
              <DropdownItem>Remove Data</DropdownItem>
              <DropdownSeparator />
              <DropdownItem>Cancel</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </div>
  ),
}

export const DesignTokens: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Available Design Tokens</h3>
        <p className="text-sm text-muted-foreground mb-6">
          These are the design tokens you can use in the controls above. Each token has a CSS variable name and a hex value.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Border Colors */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Border Colors</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.borderColors).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div 
                    className="w-4 h-4 rounded border-2" 
                    style={{ borderColor: value, backgroundColor: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Background Colors */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Background Colors</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.backgroundColors).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Colors */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Text Colors</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.textColors).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Spacing Scale</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.spacing).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded bg-primary" />
                    <div className="text-xs text-muted-foreground">•</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Border Radius</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.borderRadius).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div 
                    className="w-4 h-4 border-2 border-primary" 
                    style={{ borderRadius: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }, // Disable controls for this story
  },
}
