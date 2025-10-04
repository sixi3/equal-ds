import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TabSwitcher, type TabSwitcherProps, type TabItem } from '../src'

// Sample data for horizontal tabs
const horizontalTabs: TabItem[] = [
  { id: 'consent-logs', label: 'Consent Logs' },
  { id: 'data-logs', label: 'Data Logs' },
]

// Sample data for card tabs (matching Figma design)
const cardTabs: TabItem[] = [
  {
    id: 'session-1',
    label: 'SESSION',
    status: 'active',
    metadata: '53242143z122133123x1dssadasd',
  },
  {
    id: 'session-2',
    label: 'SESSION',
    status: 'failed',
    metadata: 'a1b2c3d4e5f6g7h8i9j0',
  },
  {
    id: 'session-3',
    label: 'SESSION',
    status: 'data-ready',
    metadata: 'a1b2c3d4e5f6g7h8i9j0',
  },
  {
    id: 'session-4',
    label: 'SESSION',
    status: 'partial-data',
    metadata: 'a1b2c3d4e5f6g7h8i9j0',
  },
]

// Sample data with disabled tabs
const tabsWithDisabled: TabItem[] = [
  { id: 'tab-1', label: 'Active Tab' },
  { id: 'tab-2', label: 'Disabled Tab', disabled: true },
  { id: 'tab-3', label: 'Another Tab' },
]

const meta: Meta<typeof TabSwitcher> = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible tab switcher component with two variations: horizontal tabs (classic style) and card-based tabs. Built with accessibility and design system integration in mind.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['horizontal', 'cards'],
      description: 'Tab switcher variant',
    },
    activeTab: {
      control: { type: 'text' },
      description: 'Currently active tab ID',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the entire tab switcher is disabled',
    },
  },
  args: {
    variant: 'horizontal',
    activeTab: 'consent-logs',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof TabSwitcher>

// Interactive wrapper component for state management
const TabSwitcherWithState = (args: TabSwitcherProps) => {
  const [activeTab, setActiveTab] = useState(args.activeTab || args.tabs[0]?.id || '')

  return (
    <TabSwitcher
      {...args}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  )
}

export const HorizontalTabs: Story = {
  render: (args) => <TabSwitcherWithState {...args} />,
  args: {
    tabs: horizontalTabs,
    activeTab: 'consent-logs',
    variant: 'horizontal',
    
  },
  parameters: {
    docs: {
      description: {
        story: 'Classic horizontal tabs variation. Features a container with background and active tab highlighting.',
      },
    },
  },
}

export const CardTabs: Story = {
  render: (args) => <TabSwitcherWithState {...args} />,
  args: {
    tabs: cardTabs,
    activeTab: 'session-1',
    variant: 'cards',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card-based tabs variation. Each tab is rendered as a card with status badges and metadata.',
      },
    },
  },
}

export const WithDisabledTabs: Story = {
  render: (args) => <TabSwitcherWithState {...args} />,
  args: {
    tabs: tabsWithDisabled,
    activeTab: 'tab-1',
    variant: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates disabled tab functionality. Disabled tabs cannot be selected.',
      },
    },
  },
}

export const KeyboardNavigation: Story = {
  render: (args) => <TabSwitcherWithState {...args} />,
  args: {
    tabs: horizontalTabs,
    activeTab: 'consent-logs',
    variant: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Test keyboard navigation with arrow keys, Enter, and Space. Focus management is built-in.',
      },
    },
  },
}

export const SlidingAnimation: Story = {
  render: (args) => <TabSwitcherWithState {...args} />,
  args: {
    tabs: horizontalTabs,
    activeTab: 'consent-logs',
    variant: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the smooth sliding animation when switching between tabs. Click different tabs to see the active indicator slide smoothly.',
      },
    },
  },
}

export const FullyDisabled: Story = {
  render: (args) => <TabSwitcherWithState {...args} />,
  args: {
    tabs: horizontalTabs,
    activeTab: 'consent-logs',
    variant: 'horizontal',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the tab switcher in a fully disabled state.',
      },
    },
  },
}
