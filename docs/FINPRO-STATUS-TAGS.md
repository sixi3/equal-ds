# FinPro Status Tags

A comprehensive utility for managing status tags in FinPro applications. This library provides type-safe, consistent status tag rendering across tables, dropdowns, and other UI components.

## 🚀 Quick Start

```typescript
import {
  getConsentStatusTag,
  getDataStatusTag,
  Tag,
  type ConsentStatusKey,
  type DataStatusKey
} from 'your-design-system'

// Basic usage
const consentTag = getConsentStatusTag('ACTIVE')
const dataTag = getDataStatusTag('DELIVERED')

// Render with Tag component
<Tag {...consentTag.tagProps} />
<Tag {...dataTag.tagProps} />
```

## 📋 Available Status Types

### Consent Status Tags

| Status Key | Display Label | Color Theme | CSS Class |
|------------|---------------|-------------|-----------|
| `ACTIVE` | ACTIVE | Green | `status-active` |
| `PENDING` | PENDING | Blue | `status-pending` |
| `REJECTED` | REJECTED | Red | `status-rejected` |
| `REVOKED` | REVOKED | Purple | `status-revoked` |
| `PAUSED` | PAUSED | Orange | `status-paused` |
| `FAILED` | FAILED | Dark Red | `status-failed` |

### Data Status Tags

| Status Key | Display Label | Color Theme | CSS Class |
|------------|---------------|-------------|-----------|
| `DATA_READY` | DATA READY | Orange | `status-paused` |
| `DELIVERED` | DELIVERED | Green | `status-active` |
| `DENIED` | DENIED | Red | `status-rejected` |
| `PENDING` | PENDING | Blue | `status-pending` |
| `TIMEOUT` | TIMEOUT | Purple | `status-revoked` |

## 🎯 API Reference

### Functions

#### `getConsentStatusTag(status: string): StatusTagResult`

Returns tag configuration for consent statuses.

```typescript
const tag = getConsentStatusTag('active')
// Case-insensitive, returns:
// {
//   label: 'ACTIVE',
//   tagProps: { children: 'ACTIVE', className: 'status-active' }
// }
```

#### `getDataStatusTag(status: string): StatusTagResult`

Returns tag configuration for data processing statuses.

```typescript
const tag = getDataStatusTag('delivered')
// Returns:
// {
//   label: 'DELIVERED',
//   tagProps: { children: 'DELIVERED', className: 'status-active' }
// }
```

#### `getAllConsentStatuses(): Record<ConsentStatusKey, StatusTagConfig>`

Returns all consent status configurations.

#### `getAllDataStatuses(): Record<DataStatusKey, StatusTagConfig>`

Returns all data status configurations.

### Types

#### `ConsentStatusKey`
```typescript
type ConsentStatusKey = 'ACTIVE' | 'PENDING' | 'REJECTED' | 'REVOKED' | 'PAUSED' | 'FAILED'
```

#### `DataStatusKey`
```typescript
type DataStatusKey = 'DATA_READY' | 'DELIVERED' | 'DENIED' | 'PENDING' | 'TIMEOUT'
```

#### `StatusTagResult`
```typescript
interface StatusTagResult {
  label: string
  tagProps: {
    children: string
    className: string
  }
}
```

## 💡 Usage Examples

### In React Components

```typescript
import React from 'react'
import { getConsentStatusTag, Tag } from 'your-design-system'

interface StatusCellProps {
  status: string
}

export const StatusCell: React.FC<StatusCellProps> = ({ status }) => {
  const tagConfig = getConsentStatusTag(status)
  return <Tag {...tagConfig.tagProps} />
}

// Usage
<StatusCell status="ACTIVE" /> // Renders green "ACTIVE" tag
<StatusCell status="pending" /> // Case-insensitive, renders blue "PENDING" tag
```

### In Tables

```typescript
import { getConsentStatusTag, Tag } from 'your-design-system'

const columns = [
  {
    key: 'status',
    header: 'Status',
    accessor: (row: any) => {
      const tagResult = getConsentStatusTag(row.status)
      return {
        type: 'tag' as const,
        props: tagResult.tagProps
      }
    }
  }
]
```

### In Filter Dropdowns

```typescript
import { getAllConsentStatuses } from 'your-design-system'

const statusOptions = Object.entries(getAllConsentStatuses()).map(([key, config]) => ({
  value: key,
  label: config.label,
  tagClassName: config.className
}))

// Use in your dropdown component
<DropdownMultiselect
  options={statusOptions}
  renderOption={(option) => (
    <Tag className={option.tagClassName}>{option.label}</Tag>
  )}
/>
```

### Backend Integration

```typescript
// When your backend returns status strings
const handleApiResponse = (data: any[]) => {
  return data.map(item => ({
    ...item,
    statusTag: getConsentStatusTag(item.consentStatus),
    dataTag: getDataStatusTag(item.dataStatus)
  }))
}

// Render in UI
const items = handleApiResponse(apiResponse)
return items.map(item => (
  <div key={item.id}>
    <Tag {...item.statusTag.tagProps} />
    <Tag {...item.dataTag.tagProps} />
  </div>
))
```

## 🎨 Styling

Status tags use CSS classes that map to your design system's component-status tokens:

- `.status-active` - Success states (green theme)
- `.status-pending` - Processing states (blue theme)
- `.status-rejected` - Error states (red theme)
- `.status-revoked` - Revoked/expired states (purple theme)
- `.status-paused` - Inactive states (orange theme)
- `.status-failed` - Failed states (dark red theme)

These classes are automatically included when you import your design system CSS.

## 🔧 Customization

### Adding New Status Types

To add new status types, update the configuration in your design system:

```typescript
// In finpro-status-tags.ts
const CONSENT_STATUS_CONFIG: Record<ConsentStatusKey, StatusTagConfig> = {
  // ... existing statuses
  NEW_STATUS: { label: 'NEW STATUS', className: 'status-custom' },
}

// Add corresponding CSS class in your tokens.css
.status-custom {
  background-color: var(--component-status-custom-backgroundColor);
  color: var(--component-status-custom-textColor);
}
```

### Handling Unknown Statuses

The library gracefully handles unknown status values by falling back to a neutral style:

```typescript
const tag = getConsentStatusTag('UNKNOWN_STATUS')
// Returns: { label: 'Unknown', className: 'status-paused' }
```

## 📦 Installation & Import

```bash
npm install your-design-system
```

```typescript
// Import individual functions
import { getConsentStatusTag } from 'your-design-system'

// Import all utilities
import {
  getConsentStatusTag,
  getDataStatusTag,
  getAllConsentStatuses,
  getAllDataStatuses,
  Tag
} from 'your-design-system'
```

## 🤝 Contributing

When adding new status types:
1. Update the appropriate status key type
2. Add configuration to the status config object
3. Add corresponding CSS class with design tokens
4. Update this documentation
5. Add tests for the new status

## 📄 License

This library is part of your design system and follows the same licensing terms.
