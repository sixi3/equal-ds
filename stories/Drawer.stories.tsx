import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DrawerProvider,
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerOverlay,
} from '../src'
import { Settings, User, Bell, Menu, Columns3, ArrowLeft } from 'lucide-react'

const meta: Meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A side drawer component with smooth slide-in/out animations from the sides and pure fade overlay backdrop.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['overlay', 'floating'],
    },
    side: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    width: {
      control: { type: 'select' },
      options: [320, 400, 500, 600, 800, 'w-64', 'w-80', 'w-96', '50vw', 'var(--drawer-width)'],
      description: 'Drawer width: numbers (px), Tailwind classes, or CSS values',
    },
  },
}

export default meta

type Story = StoryObj

const DrawerExample = ({
  title = 'Edit Columns',
  subtitle = 'Use the controls below to view/hide/reorganise the columns in the table.',
  icon = <Columns3 className="w-5 h-5" />,
  variant = 'overlay',
  side = 'right',
  width = 600,
}: {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  variant?: 'overlay' | 'floating'
  side?: 'left' | 'right'
  width?: string | number
}) => (
  <DrawerProvider side={side}>
    <div className="relative h-screen bg-gray-100">
      {/* Trigger Button */}
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Menu className="w-5 h-5" />
      </DrawerTrigger>

      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        <p className="text-gray-600 mb-4">
          Click the menu button to open the drawer. The drawer slides in smoothly from the {side} with a fade overlay backdrop.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Card 1</h3>
            <p>Some content here</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Card 2</h3>
            <p>Some content here</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Card 3</h3>
            <p>Some content here</p>
          </div>
        </div>
      </div>

      {/* Overlay (only for overlay variant) */}
      {variant === 'overlay' && <DrawerOverlay />}

      {/* Drawer */}
      <Drawer variant={variant} width={width}>
        <DrawerHeader title={title} subtitle={subtitle} icon={icon} />
        <DrawerContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <User className="w-5 h-5 text-gray-500" />
              <span>Profile</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Settings className="w-5 h-5 text-gray-500" />
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Bell className="w-5 h-5 text-gray-500" />
              <span>Notifications</span>
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 uppercase tracking-wide">
                Quick Actions
              </h4>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                Export Data
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                Import Settings
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                Clear Cache
              </button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </DrawerProvider>
)

export const Default: Story = {
  render: () => <DrawerExample />,
}

export const LeftSide: Story = {
  render: () => <DrawerExample side="left" />,
}

export const CustomWidth: Story = {
  render: () => <DrawerExample width={1000} />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer with custom width of 1000px using numeric value.',
      },
    },
  },
}

export const TailwindWidth: Story = {
  render: () => <DrawerExample width="w-96" />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer using Tailwind width class "w-96" (24rem/384px).',
      },
    },
  },
}

export const ResponsiveWidth: Story = {
  render: () => <DrawerExample width="w-72 sm:w-80 md:w-96 lg:w-[500px]" />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer with responsive width that adapts to screen size.',
      },
    },
  },
}

export const FloatingVariant: Story = {
  render: () => (
    <DrawerExample
      variant="floating"
      title="Floating Drawer"
      icon={<Settings className="w-5 h-5" />}
    />
  ),
}

export const WithCustomHeader: Story = {
  render: () => (
    <DrawerProvider>
      <div className="relative h-screen bg-gray-100">
        <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md">
          <Menu className="w-5 h-5" />
        </DrawerTrigger>

        <DrawerOverlay />

        <Drawer>
          <DrawerHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
            </div>
          </DrawerHeader>
          <DrawerContent>
            <div className="space-y-4">
              <p>Custom header content with user profile information.</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium">Account Status</h4>
                <p className="text-sm text-gray-600">Premium Account</p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </DrawerProvider>
  ),
}
