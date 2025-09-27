import React from 'react'
import { DrawerProvider, DrawerTrigger, DrawerOverlay } from '../../src'
import { FinProLogsDrawer } from './FinProLogsDrawer'
import { Menu, AlertTriangle, Info, Bug } from 'lucide-react'

export const BasicLogsDrawerExample: React.FC = () => (
  <DrawerProvider side="right">
    <div className="relative h-screen bg-gray-100">
      {/* Trigger Button */}
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Menu className="w-5 h-5" />
      </DrawerTrigger>

      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">System Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Click the menu button to view system logs. The logs drawer provides a wide view for monitoring system activity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">System Status</h3>
            <p className="text-green-600">All systems operational</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Active Users</h3>
            <p className="text-blue-600">1,247 online</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Server Load</h3>
            <p className="text-yellow-600">67% capacity</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <DrawerOverlay />

      {/* Logs Drawer */}
      <FinProLogsDrawer />
    </div>
  </DrawerProvider>
)

export const LogsWithContentDrawerExample: React.FC = () => {
  const sampleLogs = [
    { timestamp: '2024-01-15 10:30:45', level: 'info', message: 'Server started successfully on port 8080' },
    { timestamp: '2024-01-15 10:31:12', level: 'info', message: 'Database connection established' },
    { timestamp: '2024-01-15 10:32:05', level: 'warn', message: 'High memory usage detected: 85%' },
    { timestamp: '2024-01-15 10:33:22', level: 'error', message: 'Failed to process user request: Invalid token' },
    { timestamp: '2024-01-15 10:34:01', level: 'info', message: 'User authentication successful' },
    { timestamp: '2024-01-15 10:35:18', level: 'debug', message: 'Cache invalidation completed for key: user_12345' },
    { timestamp: '2024-01-15 10:36:33', level: 'info', message: 'Scheduled backup completed successfully' },
    { timestamp: '2024-01-15 10:37:45', level: 'warn', message: 'Rate limit exceeded for IP: 192.168.1.100' },
  ]

  const getLogClassName = (level: string) => {
    switch (level) {
      case 'error': return 'finpro-log-error'
      case 'warn': return 'finpro-log-warn'
      case 'info': return 'finpro-log-info'
      case 'debug': return 'finpro-log-debug'
      default: return ''
    }
  }

  return (
    <DrawerProvider side="right">
      <div className="relative h-screen bg-gray-100">
        {/* Trigger Button */}
        <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-red-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow">
          <AlertTriangle className="w-5 h-5" />
        </DrawerTrigger>

        {/* Main Content */}
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">System Monitoring</h1>
          <p className="text-gray-600 mb-4">
            Monitor system logs in real-time. The wide drawer provides ample space for detailed log information.
          </p>
        </div>

        {/* Overlay */}
        <DrawerOverlay />

        {/* Logs Drawer with Content */}
        <FinProLogsDrawer
          title="System Logs"
          subtitle="Real-time monitoring of system activity, errors, and performance metrics"
        >
          <div className="finpro-logs-scrollable finpro-logs-content">
            {sampleLogs.map((log, index) => (
              <div key={index} className={`finpro-log-entry ${getLogClassName(log.level)}`}>
                <span className="finpro-log-timestamp">{log.timestamp}</span>
                <span className="finpro-log-message">{log.message}</span>
              </div>
            ))}
          </div>
        </FinProLogsDrawer>
      </div>
    </DrawerProvider>
  )
}

export const CustomStyledLogsDrawerExample: React.FC = () => (
  <DrawerProvider side="right">
    <div className="relative h-screen bg-gray-900 text-white">
      {/* Trigger Button */}
      <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-green-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow">
        <Bug className="w-5 h-5" />
      </DrawerTrigger>

      {/* Main Content */}
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug Console</h1>
        <p className="text-gray-300 mb-4">
          Debug mode enabled. View detailed logs in the terminal-style interface.
        </p>
      </div>

      {/* Overlay */}
      <DrawerOverlay />

      {/* Dark Theme Logs Drawer */}
      <FinProLogsDrawer
        className="finpro-logs-drawer-dark"
        title="Debug Logs"
        subtitle="Terminal-style log viewer with syntax highlighting"
      >
        <div className="finpro-logs-scrollable finpro-logs-content p-4">
          <div className="space-y-1 font-mono text-sm">
            <div className="text-green-400">[INFO] Application startup complete</div>
            <div className="text-blue-400">[DEBUG] Loading configuration from /etc/app/config.json</div>
            <div className="text-yellow-400">[WARN] Deprecated API usage detected in module 'auth'</div>
            <div className="text-red-400">[ERROR] Connection timeout to database server</div>
            <div className="text-blue-400">[DEBUG] Retrying connection attempt 1/3</div>
            <div className="text-green-400">[INFO] Database connection restored</div>
            <div className="text-blue-400">[DEBUG] Cache warm-up completed in 2.3s</div>
            <div className="text-green-400">[INFO] All services operational</div>
          </div>
        </div>
      </FinProLogsDrawer>
    </div>
  </DrawerProvider>
)

export const CompactLogsDrawerExample: React.FC = () => {
  const compactLogs = [
    { time: '10:30', level: 'INFO', msg: 'Server start' },
    { time: '10:31', level: 'INFO', msg: 'DB connected' },
    { time: '10:32', level: 'WARN', msg: 'High memory' },
    { time: '10:33', level: 'ERROR', msg: 'Auth failed' },
    { time: '10:34', level: 'INFO', msg: 'User login' },
    { time: '10:35', level: 'DEBUG', msg: 'Cache cleared' },
  ]

  return (
    <DrawerProvider side="right">
      <div className="relative h-screen bg-gray-100">
        {/* Trigger Button */}
        <DrawerTrigger className="fixed top-4 left-4 z-30 p-2 bg-blue-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow">
          <Info className="w-5 h-5" />
        </DrawerTrigger>

        {/* Main Content */}
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Mobile Monitoring</h1>
          <p className="text-gray-600 mb-4">
            Compact log viewer optimized for smaller screens and quick monitoring.
          </p>
        </div>

        {/* Overlay */}
        <DrawerOverlay />

        {/* Compact Logs Drawer */}
        <FinProLogsDrawer
          className="finpro-logs-drawer-compact"
          title="Compact Logs"
          subtitle="Space-efficient log viewer for mobile and embedded use"
        >
          <div className="finpro-logs-scrollable finpro-logs-content">
            {compactLogs.map((log, index) => (
              <div key={index} className={`finpro-log-entry ${log.level === 'ERROR' ? 'finpro-log-error' : log.level === 'WARN' ? 'finpro-log-warn' : 'finpro-log-info'}`}>
                <span className="finpro-log-timestamp">{log.time}</span>
                <span className="finpro-log-message">{log.msg}</span>
              </div>
            ))}
          </div>
        </FinProLogsDrawer>
      </div>
    </DrawerProvider>
  )
}
