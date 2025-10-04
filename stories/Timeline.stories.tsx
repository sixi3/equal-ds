import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Timeline, type TimelineItemType } from '../src'

// Sample timeline data based on Figma design
const sampleTimelineItems: TimelineItemType[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    status: { type: 'success' },
    title: 'FIU requests data',
    description: 'Financial institution initiated data request from Account Aggregator',
    tooltip: {
      title: 'Request Details',
      content: 'A secure request has been sent to the Account Aggregator for customer financial data retrieval.',
      details: {
        'Request ID': 'REQ-2024-001',
        'FIU Code': 'FIU001',
        'Priority': 'High'
      }
    }
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 4 * 60 * 1000), // 4 minutes ago
    status: { type: 'pending', label: 'PENDING' },
    title: 'Data request sent to AA',
    description: 'Request forwarded to Account Aggregator for processing',
    action: {
      type: 'copy',
      label: 'Txn ID: 53242143z122133123x1',
      value: '53242143z122133123x1'
    },
    tooltip: {
      title: 'Transaction Status',
      content: 'The request is currently being processed by the Account Aggregator. You will receive a notification once the data is available.',
      details: {
        'Transaction ID': '53242143z122133123x1',
        'Status': 'In Progress',
        'Estimated Time': '2-3 minutes'
      }
    }
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    status: { type: 'success' },
    title: 'Notification received from AA',
    description: 'Account Aggregator has acknowledged the request',
    tooltip: {
      title: 'Acknowledgment Details',
      content: 'The Account Aggregator has confirmed receipt of your data request and is preparing the financial information.',
      details: {
        'Response Time': '1.2 seconds',
        'AA Reference': 'AA-REF-789456',
        'Next Step': 'Data Preparation'
      }
    }
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    status: { type: 'success' },
    title: 'Data received from AA',
    description: 'Financial data successfully retrieved',
    action: {
      type: 'copy',
      label: 'Txn ID: 53242143z122133123x1',
      value: '53242143z122133123x1'
    },
    tooltip: {
      title: 'Data Retrieval Complete',
      content: 'All requested financial data has been securely retrieved from the Account Aggregator.',
      details: {
        'Data Size': '2.4 MB',
        'Records': '156',
        'Encryption': 'AES-256'
      }
    }
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    status: { type: 'info' },
    title: 'Notification sent to FIU',
    description: 'Data availability notification delivered to Financial Institution',
    action: {
      type: 'copy',
      label: 'Txn ID: 53242143z122133123x1',
      value: '53242143z122133123x1'
    },
    tooltip: {
      title: 'Delivery Confirmation',
      content: 'The notification has been successfully delivered to the Financial Institution via secure channel.',
      details: {
        'Delivery Method': 'Secure API',
        'Confirmation': 'ACK-2024-789',
        'Processing Time': '850ms'
      }
    }
  },
  {
    id: '6',
    timestamp: new Date(), // Now
    status: { type: 'success' },
    title: 'Data fetched by FIU',
    description: 'Financial Institution has successfully accessed the data',
    tooltip: {
      title: 'Final Step Complete',
      content: 'The complete data flow has been successfully executed. All parties have been notified and the transaction is complete.',
      details: {
        'Total Time': '5 minutes 23 seconds',
        'Data Integrity': 'Verified',
        'Compliance': 'GDPR Compliant'
      }
    }
  }
]

// Error and warning examples
const errorTimelineItems: TimelineItemType[] = [
  {
    id: 'error-1',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    status: { type: 'error' },
    title: 'Authentication failed',
    description: 'Failed to authenticate with Account Aggregator',
    tooltip: {
      title: 'Authentication Error',
      content: 'The authentication process failed due to invalid credentials or token expiration.',
      details: {
        'Error Code': 'AUTH_401',
        'Retry Count': '3',
        'Next Action': 'Contact Support'
      }
    }
  },
  {
    id: 'error-2',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    status: { type: 'warning' },
    title: 'Partial data received',
    description: 'Only 75% of requested data was retrieved',
    action: {
      type: 'copy',
      label: 'Txn ID: ERR-2024-001',
      value: 'ERR-2024-001'
    },
    tooltip: {
      title: 'Data Retrieval Warning',
      content: 'Some data records were not available or could not be retrieved due to permissions or data availability.',
      details: {
        'Retrieved': '117/156 records',
        'Missing': '39 records',
        'Reason': 'Data not available'
      }
    }
  }
]

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A timeline component for displaying chronological events with status indicators, actions, and detailed tooltips. Designed for financial data flows and transaction tracking.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact'],
      description: 'Timeline visual variant'
    },
    showConnectors: {
      control: { type: 'boolean' },
      description: 'Whether to show connector lines between events',
      defaultValue: true
    }
  },
  args: {
    variant: 'default',
    showConnectors: true
  }
}

export default meta
type Story = StoryObj<typeof Timeline>

// Basic timeline with all status types
export const Default: Story = {
  args: {
    items: sampleTimelineItems
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl h-full bg-white p-6 rounded-lg border border-border-default">
        <Story />
      </div>
    )
  ]
}

// Timeline with different statuses highlighted
export const StatusShowcase: Story = {
  args: {
    items: [
      {
        id: 'success',
        timestamp: new Date(Date.now() - 6 * 60 * 1000),
        status: { type: 'success' },
        title: 'Operation completed successfully',
        description: 'All systems operational'
      },
      {
        id: 'warning',
        timestamp: new Date(Date.now() - 4 * 60 * 1000),
        status: { type: 'warning' },
        title: 'Performance warning',
        description: 'Response time above threshold'
      },
      {
        id: 'error',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        status: { type: 'error' },
        title: 'System error occurred',
        description: 'Connection timeout'
      },
      {
        id: 'info',
        timestamp: new Date(),
        status: { type: 'info' },
        title: 'Information update',
        description: 'New features available'
      }
    ]
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl h-80 bg-white p-4 rounded-lg border border-border-default">
        <Story />
      </div>
    )
  ]
}

// Timeline with copy actions
export const WithActions: Story = {
  args: {
    items: sampleTimelineItems.filter(item => item.action)
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl h-72 bg-white p-4 rounded-lg border border-border-default">
        <Story />
      </div>
    )
  ]
}

// Timeline with status badges
export const WithStatusBadges: Story = {
  args: {
    items: [
      {
        id: 'pending-1',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        status: { type: 'pending', label: 'PENDING' },
        title: 'Transaction initiated',
        description: 'Waiting for confirmation'
      },
      {
        id: 'processing',
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        status: { type: 'info', label: 'PROCESSING' },
        title: 'Data being processed',
        description: 'Analysis in progress'
      },
      {
        id: 'completed',
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        status: { type: 'success', label: 'COMPLETED' },
        title: 'Transaction finalized',
        description: 'All steps completed successfully'
      }
    ]
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl h-64 bg-white p-4 rounded-lg border border-border-default">
        <Story />
      </div>
    )
  ]
}

// Compact variant
export const Compact: Story = {
  args: {
    variant: 'compact',
    items: sampleTimelineItems.slice(0, 4)
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl h-56 bg-white p-4 rounded-lg border border-border-default">
        <Story />
      </div>
    )
  ]
}

// Error states
export const ErrorStates: Story = {
  args: {
    items: errorTimelineItems
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl h-48 bg-white p-4 rounded-lg border border-border-default">
        <Story />
      </div>
    )
  ]
}

// Rich tooltips example
export const RichTooltips: Story = {
  args: {
    items: sampleTimelineItems.filter(item => item.tooltip)
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl h-80 bg-white p-4 rounded-lg border border-border-default">
        <Story />
      </div>
    )
  ]
}

// Full featured example (combination of all features)
export const FullFeatured: Story = {
  args: {
    items: sampleTimelineItems
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl h-[500px] bg-white p-6 rounded-lg border border-border-default">
        <h3 className="text-lg font-medium text-text-primary mb-4">Financial Data Flow Timeline</h3>
        <Story />
      </div>
    )
  ]
}

// Without connectors
export const WithoutConnectors: Story = {
  args: {
    showConnectors: false,
    items: sampleTimelineItems.slice(0, 3)
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl h-64 bg-white p-4 rounded-lg border border-border-default">
        <Story />
      </div>
    )
  ]
}
