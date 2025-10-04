import '../styles/finpro-tags.css'

/**
 * FinPro Status Tag Helpers
 *
 * A comprehensive utility library for managing status tags in FinPro applications.
 * Provides centralized mapping for consent status and data status tags used in
 * tables, filter dropdowns, and other UI components.
 *
 * ## Features
 *
 * - **Type-safe status keys**: Strongly typed enums for consent and data statuses
 * - **Consistent styling**: Uses design system component-status tokens for colors
 * - **Flexible rendering**: Works with any component that accepts className props
 * - **Fallback handling**: Gracefully handles unknown status values
 * - **Centralized configuration**: Single source of truth for status labels and styles
 *
 * ## Usage
 *
 * ### Basic Usage
 * ```typescript
 * import { getConsentStatusTag, getDataStatusTag } from 'your-design-system'
 *
 * // Get consent status tag configuration
 * const consentTag = getConsentStatusTag('ACTIVE')
 * // { label: 'ACTIVE', tagProps: { children: 'ACTIVE', className: 'status-active' } }
 *
 * // Get data status tag configuration
 * const dataTag = getDataStatusTag('DELIVERED')
 * // { label: 'DELIVERED', tagProps: { children: 'DELIVERED', className: 'status-active' } }
 * ```
 *
 * ### With UI Components
 * ```typescript
 * import { Tag } from 'your-design-system'
 *
 * function StatusCell({ status }) {
 *   const tagConfig = getConsentStatusTag(status)
 *   return <Tag {...tagConfig.tagProps} />
 * }
 * ```
 *
 * ### Available Status Types
 *
 * **Consent Status Keys:**
 * - `ACTIVE` → "ACTIVE" (green)
 * - `PENDING` → "PENDING" (blue)
 * - `REJECTED` → "REJECTED" (red)
 * - `REVOKED` → "REVOKED" (purple)
 * - `PAUSED` → "PAUSED" (orange)
 * - `FAILED` → "FAILED" (dark red)
 *
 * **Data Status Keys:**
 * - `DATA_READY` → "DATA READY" (orange)
 * - `DELIVERED` → "DELIVERED" (green)
 * - `DENIED` → "DENIED" (red)
 * - `PENDING` → "PENDING" (blue)
 * - `TIMEOUT` → "TIMEOUT" (purple)
 *
 * ## Styling
 *
 * Status tags use CSS classes that map to design system tokens:
 * - `.status-active` - Green theme for success/active states
 * - `.status-pending` - Blue theme for pending/processing states
 * - `.status-rejected` - Red theme for error/rejected states
 * - `.status-revoked` - Purple theme for revoked/expired states
 * - `.status-paused` - Orange theme for paused/inactive states
 * - `.status-failed` - Dark red theme for failed states
 *
 * @packageDocumentation
 */

/**
 * Available consent status keys for FinPro applications.
 * These represent the different states a consent can be in.
 */
export type ConsentStatusKey =
  | 'ACTIVE'
  | 'PENDING'
  | 'REJECTED'
  | 'REVOKED'
  | 'PAUSED'
  | 'FAILED';

/**
 * Available data status keys for FinPro applications.
 * These represent the different states data processing can be in.
 */
export type DataStatusKey =
  | 'DATA_READY'
  | 'DELIVERED'
  | 'DENIED'
  | 'PENDING'
  | 'TIMEOUT';

/**
 * Configuration object for a status tag.
 * Contains the display label and CSS class name for styling.
 */
export interface StatusTagConfig {
  /** The human-readable label to display */
  label: string;
  /** The CSS class name that provides the appropriate styling */
  className: string;
}

/**
 * Result object returned by status tag helper functions.
 * Contains both the label and the props needed to render a tag component.
 */
export interface StatusTagResult {
  /** The human-readable label */
  label: string;
  /** Props to pass to a tag component (children and className) */
  tagProps: {
    children: string;
    className: string;
  };
}

/**
 * Mapping of consent status keys to their display labels and CSS classes
 * Uses design system component-status tokens for consistent styling
 */
const CONSENT_STATUS_CONFIG: Record<ConsentStatusKey, StatusTagConfig> = {
  ACTIVE: { label: 'ACTIVE', className: 'status-active' },
  PENDING: { label: 'PENDING', className: 'status-pending' },
  REJECTED: { label: 'REJECTED', className: 'status-rejected' },
  REVOKED: { label: 'REVOKED', className: 'status-revoked' },
  PAUSED: { label: 'PAUSED', className: 'status-paused' },
  FAILED: { label: 'FAILED', className: 'status-failed' },
};

/**
 * Mapping of data status keys to their display labels and CSS classes
 * Matches Figma data tag design with appropriate status colors
 */
const DATA_STATUS_CONFIG: Record<DataStatusKey, StatusTagConfig> = {
  DATA_READY: { label: 'DATA READY', className: 'data-refreshing' }, // White background with orange border
  DELIVERED: { label: 'DELIVERED', className: 'data-fetched' }, // White background with green border
  DENIED: { label: 'DENIED', className: 'data-denied' }, // White background with gray border
  PENDING: { label: 'PENDING', className: 'data-new' }, // White background with blue border
  TIMEOUT: { label: 'TIMEOUT', className: 'data-timeout' }, // White background with gray border
};

/**
 * Default fallback configuration for unknown status keys
 */
const DEFAULT_STATUS_CONFIG: StatusTagConfig = {
  label: 'Unknown',
  className: 'data-expired', // Neutral fallback with white background
};

/**
 * Get consent status tag configuration for a given status key.
 *
 * This function takes a status string (case-insensitive) and returns the appropriate
 * tag configuration with label and styling for consent statuses.
 *
 * @param status - The consent status key (case-insensitive)
 * @returns Object containing label and tag props for rendering
 *
 * @example
 * ```typescript
 * const tag = getConsentStatusTag('active');
 * // Returns: { label: 'ACTIVE', tagProps: { children: 'ACTIVE', className: 'status-active' } }
 *
 * const tag2 = getConsentStatusTag('PENDING');
 * // Returns: { label: 'PENDING', tagProps: { children: 'PENDING', className: 'status-pending' } }
 * ```
 */
export function getConsentStatusTag(status: string): StatusTagResult {
  const key = status.toUpperCase() as ConsentStatusKey;
  const config = CONSENT_STATUS_CONFIG[key] || DEFAULT_STATUS_CONFIG;

  return {
    label: config.label,
    tagProps: {
      children: config.label,
      className: config.className,
    },
  };
}

/**
 * Get data status tag configuration for a given status key.
 *
 * This function takes a status string (case-insensitive) and returns the appropriate
 * tag configuration with label and styling for data processing statuses.
 *
 * @param status - The data status key (case-insensitive)
 * @returns Object containing label and tag props for rendering
 *
 * @example
 * ```typescript
 * const tag = getDataStatusTag('delivered');
 * // Returns: { label: 'DELIVERED', tagProps: { children: 'DELIVERED', className: 'status-active' } }
 *
 * const tag2 = getDataStatusTag('DATA_READY');
 * // Returns: { label: 'DATA READY', tagProps: { children: 'DATA READY', className: 'status-paused' } }
 * ```
 */
export function getDataStatusTag(status: string): StatusTagResult {
  const key = status.toUpperCase() as DataStatusKey;
  const config = DATA_STATUS_CONFIG[key] || DEFAULT_STATUS_CONFIG;

  return {
    label: config.label,
    tagProps: {
      children: config.label,
      className: config.className,
    },
  };
}

/**
 * Get all available consent status configurations.
 *
 * Returns a complete mapping of all consent status keys to their configurations.
 * Useful for building dropdown options, documentation, or iterating through all statuses.
 *
 * @returns Record mapping consent status keys to their configurations
 *
 * @example
 * ```typescript
 * const allStatuses = getAllConsentStatuses();
 * // Returns: { ACTIVE: { label: 'ACTIVE', className: 'status-active' }, ... }
 *
 * // Use for dropdown options
 * const options = Object.entries(allStatuses).map(([key, config]) => ({
 *   value: key,
 *   label: config.label,
 *   className: config.className
 * }));
 * ```
 */
export function getAllConsentStatuses(): Record<ConsentStatusKey, StatusTagConfig> {
  return { ...CONSENT_STATUS_CONFIG };
}

/**
 * Get all available data status configurations.
 *
 * Returns a complete mapping of all data status keys to their configurations.
 * Useful for building dropdown options, documentation, or iterating through all statuses.
 *
 * @returns Record mapping data status keys to their configurations
 *
 * @example
 * ```typescript
 * const allStatuses = getAllDataStatuses();
 * // Returns: { DATA_READY: { label: 'DATA READY', className: 'status-paused' }, ... }
 *
 * // Use for filter options
 * const options = Object.entries(allStatuses).map(([key, config]) => ({
 *   value: key,
 *   label: config.label
 * }));
 * ```
 */
export function getAllDataStatuses(): Record<DataStatusKey, StatusTagConfig> {
  return { ...DATA_STATUS_CONFIG };
}
