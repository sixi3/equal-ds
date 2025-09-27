import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, type ButtonProps, type ButtonDropdownOption } from '../src'
import { Download, Upload, Settings } from 'lucide-react'

// Sample dropdown options
const sampleDropdownOptions: ButtonDropdownOption[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'csv', label: 'CSV ' },
  { value: 'xlsx', label: 'XLSX' },
]

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile button component with Primary, Secondary, and Disabled variants. Supports optional attached dropdown functionality similar to the SearchBar component.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'disabled'],
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    withDropdown: {
      control: { type: 'boolean' },
      description: 'Whether to show an attached dropdown',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof Button>

// Basic button variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    children: 'Disabled Button',
    disabled: true,
  },
}

// Different sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
  args: {
    variant: 'primary',
  },
}

// Buttons with icons
export const WithIcons: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} variant="primary">
        <Download size={16} />
        Download
      </Button>
      <Button {...args} variant="secondary">
        <Upload size={16} />
        Upload
      </Button>
      <Button {...args} variant="primary">
        Settings
        <Settings size={16} />
      </Button>
    </div>
  ),
}

// Buttons with dropdown
export const PrimaryWithDropdown: Story = {
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState('pdf')

    return (
      <Button
        {...args}
        withDropdown
        dropdownOptions={sampleDropdownOptions}
        selectedDropdownOption={selectedOption}
        onDropdownChange={setSelectedOption}
        showDropdownHeader
        dropdownHeaderText="Select Format:"
      >
        Export Data
      </Button>
    )
  },
  args: {
    variant: 'primary',
    children: 'Export Data',
  },
}

export const SecondaryWithDropdown: Story = {
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState('csv')

    return (
      <Button
        {...args}
        withDropdown
        dropdownOptions={sampleDropdownOptions}
        selectedDropdownOption={selectedOption}
        onDropdownChange={setSelectedOption}
        showDropdownHeader
        dropdownHeaderText="Select Format:"
      >
        Import Data
      </Button>
    )
  },
  args: {
    variant: 'secondary',
    children: 'Import Data',
  },
}

// All variants comparison
export const AllVariants: Story = {
  render: (args) => {
    const [selectedOption, setSelectedOption] = useState('pdf')

    return (
      <div className="flex flex-col gap-8">
        {/* Basic variants */}
        <div className="flex items-center gap-4">
          <Button variant="primary" size="md">Primary</Button>
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="disabled" size="md" disabled>Disabled</Button>
        </div>

        {/* With icons */}
        <div className="flex items-center gap-4">
          <Button variant="primary" size="md">
            <Download size={16} />
            Download
          </Button>
          <Button variant="secondary" size="md">
            <Upload size={16} />
            Upload
          </Button>
        </div>

        {/* With dropdown */}
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="md"
            withDropdown
            dropdownOptions={sampleDropdownOptions}
            selectedDropdownOption={selectedOption}
            onDropdownChange={setSelectedOption}
          >
            Export
          </Button>
          <Button
            variant="secondary"
            size="md"
            withDropdown
            dropdownOptions={sampleDropdownOptions}
            selectedDropdownOption={selectedOption}
            onDropdownChange={setSelectedOption}
          >
            Import
          </Button>
        </div>

        {/* Different sizes */}
        <div className="flex items-center gap-4">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>
    )
  },
}

// Interactive example with state
export const InteractiveExample: Story = {
  render: (args) => {
    const [clickCount, setClickCount] = useState(0)
    const [selectedFormat, setSelectedFormat] = useState('pdf')

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <div className="text-sm text-gray-600">
          Click count: {clickCount}
        </div>

        <Button
          variant="primary"
          onClick={() => setClickCount(prev => prev + 1)}
        >
          Click me!
        </Button>

        <Button
          variant="secondary"
          withDropdown
          dropdownOptions={sampleDropdownOptions}
          selectedDropdownOption={selectedFormat}
          onDropdownChange={setSelectedFormat}
          onClick={() => setClickCount(prev => prev + 1)}
        >
          Export ({selectedFormat.toUpperCase()})
        </Button>
      </div>
    )
  },
}
