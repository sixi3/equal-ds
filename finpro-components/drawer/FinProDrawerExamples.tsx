import React from 'react'
import { DrawerProvider, DrawerTrigger, DrawerOverlay } from '../../../src'
import { FinProDrawer } from './FinProDrawer'
import { Settings, User, Bell, Menu } from 'lucide-react'

export const BasicDrawerExample: React.FC = () => (
  <DrawerProvider>
    <div className="relative h-screen bg-gray-100">
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Menu className="w-5 h-5" />
      </DrawerTrigger>
      <DrawerOverlay />
      <FinProDrawer />
    </div>
  </DrawerProvider>
)

export const CustomContentDrawerExample: React.FC = () => (
  <DrawerProvider side="right">
    <div className="relative h-screen bg-gray-100">
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Menu className="w-5 h-5" />
      </DrawerTrigger>
      <DrawerOverlay />
      <FinProDrawer
        title="User Settings"
        subtitle="Manage your account preferences and settings"
        icon={<Settings className="w-5 h-5" />}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <User className="w-5 h-5 text-gray-500" />
            <span>Profile Settings</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Bell className="w-5 h-5 text-gray-500" />
            <span>Notification Preferences</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <Settings className="w-5 h-5 text-gray-500" />
            <span>Advanced Settings</span>
          </div>
        </div>
      </FinProDrawer>
    </div>
  </DrawerProvider>
)

export const LeftSideDrawerExample: React.FC = () => (
  <DrawerProvider side="left">
    <div className="relative h-screen bg-gray-100">
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Menu className="w-5 h-5" />
      </DrawerTrigger>
      <DrawerOverlay />
      <FinProDrawer
        width={600}
        title="Navigation Menu"
        subtitle="Quick access to all sections"
      />
    </div>
  </DrawerProvider>
)

export const FloatingDrawerExample: React.FC = () => (
  <DrawerProvider side="right">
    <div className="relative h-screen bg-gray-100">
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Menu className="w-5 h-5" />
      </DrawerTrigger>
      {/* No overlay for floating variant */}
      <FinProDrawer
        variant="floating"
        width={400}
        title="Quick Actions"
        subtitle="Frequently used tools and shortcuts"
      />
    </div>
  </DrawerProvider>
)

export const CustomWidthDrawerExample: React.FC = () => (
  <DrawerProvider side="right">
    <div className="relative h-screen bg-gray-100">
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Menu className="w-5 h-5" />
      </DrawerTrigger>
      <DrawerOverlay />
      <FinProDrawer
        width={800}
        title="Wide Drawer (800px)"
        subtitle="This drawer is 800px wide"
      >
        <div className="p-4">
          <p>This drawer has a custom width of 800px instead of the default 1000px.</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p>You can pass any width value:</p>
            <ul className="mt-2 list-disc list-inside">
              <li>Numbers: <code>width={600}</code></li>
              <li>Tailwind: <code>width="w-96"</code></li>
              <li>CSS: <code>width="75vw"</code></li>
            </ul>
          </div>
        </div>
      </FinProDrawer>
    </div>
  </DrawerProvider>
)

export const CustomStyledDrawerExample: React.FC = () => (
  <DrawerProvider side="right">
    <div className="relative h-screen bg-gray-100">
      <DrawerTrigger className="fixed top-4 right-4 z-30 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors">
        <Settings className="w-6 h-6" />
      </DrawerTrigger>
      <DrawerOverlay />
      <FinProDrawer
        width={800}
        title="Analytics Dashboard"
        subtitle="View detailed analytics and reports"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900">Revenue</h4>
            <p className="text-2xl font-bold text-blue-600">$45,231</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900">Users</h4>
            <p className="text-2xl font-bold text-green-600">2,350</p>
          </div>
        </div>
      </FinProDrawer>
    </div>
  </DrawerProvider>
)
