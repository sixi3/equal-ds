import '../styles/finpro-tags.css'

export type ConsentStatusKey = 'ACTIVE' | 'PENDING' | 'REJECTED' | 'REVOKED' | 'PAUSED' | 'FAILED' | 'EXPIRED'

export type DataStatusKey = 'DATA_READY' | 'DELIVERED' | 'DENIED' | 'PENDING' | 'TIMEOUT'

export interface StatusTagConfig {
  label: string
  className: string
}

export interface StatusTagResult {
  label: string
  tagProps: {
    children: string
    className: string
  }
}

const CONSENT_STATUS_CONFIG: Record<ConsentStatusKey, StatusTagConfig> = {
  ACTIVE: { label: 'ACTIVE', className: 'status-active' },
  PENDING: { label: 'PENDING', className: 'status-pending' },
  REJECTED: { label: 'REJECTED', className: 'status-rejected' },
  REVOKED: { label: 'REVOKED', className: 'status-revoked' },
  PAUSED: { label: 'PAUSED', className: 'status-paused' },
  FAILED: { label: 'FAILED', className: 'status-failed' },
  EXPIRED: { label: 'EXPIRED', className: 'status-expired' },
}

const DATA_STATUS_CONFIG: Record<DataStatusKey, StatusTagConfig> = {
  DATA_READY: { label: 'DATA READY', className: 'status-paused' },
  DELIVERED: { label: 'DELIVERED', className: 'status-active' },
  DENIED: { label: 'DENIED', className: 'status-rejected' },
  PENDING: { label: 'PENDING', className: 'status-pending' },
  TIMEOUT: { label: 'TIMEOUT', className: 'status-revoked' },
}

export function getConsentStatusTag(status: string | undefined): StatusTagResult {
  if (!status) {
    return {
      label: 'UNKNOWN',
      tagProps: { children: 'UNKNOWN', className: 'status-paused' }
    }
  }

  const normalized = status.toUpperCase() as ConsentStatusKey
  const config = CONSENT_STATUS_CONFIG[normalized]

  if (!config) {
    return {
      label: status.toUpperCase(),
      tagProps: { children: status.toUpperCase(), className: 'status-paused' }
    }
  }

  return {
    label: config.label,
    tagProps: { children: config.label, className: config.className }
  }
}

export function getDataStatusTag(status: string | undefined): StatusTagResult {
  if (!status) {
    return {
      label: 'UNKNOWN',
      tagProps: { children: 'UNKNOWN', className: 'status-paused' }
    }
  }

  const normalized = status.toUpperCase() as DataStatusKey
  const config = DATA_STATUS_CONFIG[normalized]

  if (!config) {
    return {
      label: status.toUpperCase(),
      tagProps: { children: status.toUpperCase(), className: 'status-paused' }
    }
  }

  return {
    label: config.label,
    tagProps: { children: config.label, className: config.className }
  }
}

export function getAllConsentStatuses(): Record<ConsentStatusKey, StatusTagConfig> {
  return CONSENT_STATUS_CONFIG
}

export function getAllDataStatuses(): Record<DataStatusKey, StatusTagConfig> {
  return DATA_STATUS_CONFIG
}