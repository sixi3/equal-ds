/**
 * Sidebar-specific configuration - contains only configurations specific to the sidebar component
 */

import { Component, Landmark, FileQuestion, LayoutTemplate, BellDot, Grid2x2Plus, Braces, FileInput, FileX2, FileStack, TextSearch, ChartLine, FileChartPie, Cog, MonitorCog, UserCog, BookText, FileCode2, ChartPie } from 'lucide-react'

// Sidebar menu items configuration (specific to sidebar)
export const SIDEBAR_ITEMS = {
  aa: [
    { id: 'account-aggregator', label: 'Account Aggregator', icon: Component },
    { id: 'fip', label: 'FIP', icon: Landmark },
    { id: 'purpose', label: 'Purpose', icon: FileQuestion },
    { id: 'consent-templates', label: 'Consent Templates', icon: LayoutTemplate },
    { id: 'consent-requests', label: 'Consent Requests', icon: FileStack },
    { id: 'fi-notifications', label: 'FI Notifications', icon: BellDot },
    { id: 'data-fetch-request', label: 'Data Fetch Request', icon: Grid2x2Plus },
  ],
  bulk: [
    { id: 'bulk-consent-request', label: 'Bulk Consent Request', icon: Braces },
    { id: 'bulk-data-fetch', label: 'Bulk Data Fetch', icon: FileInput },
    { id: 'bulk-consent-revoke', label: 'Bulk Consent Revoke', icon: FileX2 },
    { id: 'bulk-csv-upload', label: 'Bulk CSV Upload', icon: FileStack },
  ],
  analytics: [
    { id: 'insights', label: 'Insights', icon: TextSearch },
    { id: 'analytics', label: 'Analytics', icon: ChartLine },
    { id: 'pdf-analytics', label: 'PDF Analytics', icon: FileChartPie },
  ],
  admin: [
    { id: 'settings', label: 'Settings', icon: Cog },
    { id: 'manage-apps', label: 'Manage Apps', icon: MonitorCog },
    { id: 'admin', label: 'Admin', icon: UserCog },
  ],
  docs: [
    { id: 'central-registry', label: 'Central Registry', icon: BookText },
    { id: 'integration-docs', label: 'Integration Docs', icon: FileCode2 },
    { id: 'mis', label: 'MIS', icon: ChartPie },
  ],
}

// Sidebar group configuration (specific to sidebar)
export const SIDEBAR_GROUPS = [
  { id: 'aa', label: 'AA ECOSYSTEM' },
  { id: 'bulk', label: 'BULK OPERATIONS' },
  { id: 'analytics', label: 'ANALYTICS' },
  { id: 'admin', label: 'ADMIN & SETUP' },
  { id: 'docs', label: 'REFERENCE & DOCS' },
]

// Filter options configuration (specific to sidebar functionality)
export const FILTER_OPTIONS = {
  templates: [
    { value: 'template-1', label: 'Template One' },
    { value: 'template-2', label: 'Template Two' },
    { value: 'template-3', label: 'Template Three' },
    { value: 'template-4', label: 'Template Four' },
    { value: 'template-5', label: 'Template Five' },
  ],
  purposeCodes: [
    { value: 'purpose-101', label: 'Purpose 101' },
    { value: 'purpose-102', label: 'Purpose 102' },
    { value: 'purpose-103', label: 'Purpose 103' },
    { value: 'purpose-104', label: 'Purpose 104' },
    { value: 'purpose-105', label: 'Purpose 105' },
  ],
  statuses: [
    { value: 'pending', label: 'PENDING' },
    { value: 'active', label: 'ACTIVE' },
    { value: 'rejected', label: 'REJECTED' },
    { value: 'revoked', label: 'REVOKED' },
    { value: 'paused', label: 'PAUSED' },
    { value: 'failed', label: 'FAILED' },
  ],
  aggregators: [
    { value: 'agg-1', label: 'Aggregator One' },
    { value: 'agg-2', label: 'Aggregator Two' },
    { value: 'agg-3', label: 'Aggregator Three' },
    { value: 'agg-4', label: 'Aggregator Four' },
    { value: 'agg-5', label: 'Aggregator Five' },
  ],
}

// Default selections for filters (specific to sidebar)
export const DEFAULT_FILTER_SELECTIONS = {
  templates: FILTER_OPTIONS.templates.map(option => option.value),
  purposeCodes: FILTER_OPTIONS.purposeCodes.map(option => option.value),
  statuses: FILTER_OPTIONS.statuses.map(option => option.value),
  aggregators: FILTER_OPTIONS.aggregators.map(option => option.value),
}

// Component defaults (specific to sidebar)
export const SIDEBAR_DEFAULTS = {
  selectedItem: 'consent-templates',
  headerText: '/*workasaur 🦖',
  expanded: false,
}
