# Table Component

A powerful, lightweight table component that supports 20+ columns with horizontal scrolling, pagination, sorting, and flexible cell content including buttons and tags.

## Features

- ✅ **20+ Columns Support**: Horizontal scrolling for wide tables
- ✅ **Sticky Actions Column**: Actions column remains visible while scrolling horizontally
- ✅ **Lightweight**: No heavy dependencies, built with pure React
- ✅ **Pagination**: Built-in pagination with customizable page sizes
- ✅ **Sorting**: Column-based sorting with visual indicators
- ✅ **Flexible Cell Content**: Support for raw data, buttons, and tags
- ✅ **Row Selection**: Optional checkbox selection for rows
- ✅ **Actions Dropdown Menu**: Three-dot menu for organized action buttons
- ✅ **Responsive Design**: Mobile-friendly with horizontal scrolling
- ✅ **TypeScript**: Full type safety and IntelliSense support
- ✅ **Design System Integration**: Uses your existing design tokens

## Basic Usage

```tsx
import { Table } from 'equal-ds'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const columns = [
  { key: 'name', header: 'Name', accessor: (row: User) => row.name, sortable: true },
  { key: 'email', header: 'Email', accessor: (row: User) => row.email },
  { key: 'role', header: 'Role', accessor: (row: User) => row.role },
  {
    key: 'status',
    header: 'Status',
    accessor: (row: User) => row.status,
    render: (value) => ({
      tag: {
        children: value,
        variant: value === 'active' ? 'success' : 'error'
      }
    })
  }
]

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'inactive' }
]

function MyTable() {
  return (
    <Table
      columns={columns}
      data={data}
      className="min-w-[800px]"
    />
  )
}
```

## Actions Column with Dropdown Menu

For a cleaner and more organized approach to actions, use the sticky actions column with dropdown menus:

```tsx
import { Table, TableActionsMenu, type TableColumn, type TableAction } from 'equal-ds'
import { Edit, Trash2, Eye } from 'lucide-react'

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
  { key: 'email', header: 'Email', accessor: (row) => row.email },
  { key: 'role', header: 'Role', accessor: (row) => row.role },
  { key: 'status', header: 'Status', accessor: (row) => ({
    type: 'tag',
    props: {
      children: row.status,
      variant: row.status === 'active' ? 'success' : 'error'
    }
  })},
  {
    key: 'actions',
    header: 'Actions',
    isActions: true, // Makes this column sticky to the right
    width: 60,
    render: (value, row) => (
      <TableActionsMenu
        actions={[
          {
            key: 'view',
            label: 'View',
            onClick: () => handleView(row),
            icon: Eye,
          },
          {
            key: 'edit',
            label: 'Edit',
            onClick: () => handleEdit(row),
            icon: Edit,
            className: 'text-primary-600 hover:text-primary-700 font-medium', // Custom styling
          },
          {
            key: 'delete',
            label: 'Delete',
            onClick: () => handleDelete(row),
            icon: Trash2,
            destructive: true, // Red text for destructive actions
          },
        ]}
        srLabel={`Actions for ${row.name}`}
      />
    )
  }
]

function MyActionsTable() {
  return (
    <Table
      columns={columns}
      data={data}
      enableHorizontalScroll={true} // Enable horizontal scroll to see sticky column effect
    />
  )
}
```

## Advanced Usage with Buttons and Pagination

For inline buttons or simpler action layouts:

```tsx
import { Table, type TableColumn } from 'equal-ds'
import { Edit, Trash2 } from 'lucide-react'

const columns: TableColumn<User>[] = [
  { key: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
  { key: 'email', header: 'Email', accessor: (row) => row.email },
  { key: 'role', header: 'Role', accessor: (row) => row.role },
  { key: 'status', header: 'Status', accessor: (row) => ({
    type: 'tag',
    props: {
      children: row.status,
      variant: row.status === 'active' ? 'success' : 'error'
    }
  })},
  { key: 'actions', header: 'Actions', render: (value, row) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      {{
        type: 'button',
        props: {
          children: <Edit size={16} />,
          onClick: () => handleEdit(row),
          variant: 'outline',
          size: 'sm'
        }
      }}
      {{
        type: 'button',
        props: {
          children: <Trash2 size={16} />,
          onClick: () => handleDelete(row),
          variant: 'ghost',
          size: 'sm'
        }
      }}
    </div>
  )}
]

function MyAdvancedTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState(null)

  return (
    <Table
      columns={columns}
      data={paginatedData}
      sort={sort}
      onSortChange={setSort}
      pagination={{
        currentPage,
        totalPages: Math.ceil(totalItems / pageSize),
        pageSize,
        totalItems,
        onPageChange: setCurrentPage,
        onPageSizeChange: setPageSize
      }}
      selectable={true}
      onSelectionChange={handleSelectionChange}
    />
  )
}
```

## Sizing and Layout

The table component sizes naturally based on its content. For custom sizing and layout control, use CSS classes and container elements:

```tsx
// Full viewport height with padding
<div className="h-screen flex flex-col p-6 border border-border-default rounded-lg">
  <Table className="min-w-[1200px]" columns={columns} data={data} />
</div>

// Custom height with scrolling
<div className="h-96 overflow-auto">
  <Table columns={columns} data={data} />
</div>

// Responsive width
<div className="w-full max-w-4xl mx-auto">
  <Table columns={columns} data={data} />
</div>
```

## Props API

### Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn<T>[]` | - | Column definitions |
| `data` | `T[]` | - | Array of data rows |
| `loading` | `boolean` | `false` | Show loading state |
| `loadingText` | `ReactNode` | `'Loading...'` | Loading message |
| `emptyText` | `ReactNode` | `'No data available'` | Empty state message |
| `pagination` | `TablePaginationProps` | - | Pagination configuration |
| `sort` | `TableSort` | - | Current sort state |
| `onSortChange` | `(sort: TableSort \| null) => void` | - | Sort change callback |
| `onRowClick` | `(row: T, index: number) => void` | - | Row click callback |
| `selectable` | `boolean` | `false` | Enable row selection |
| `selectedRows` | `(string \| number)[]` | `[]` | Selected row IDs |
| `onSelectionChange` | `(selectedRows: (string \| number)[]) => void` | - | Selection change callback |
| `enableHorizontalScroll` | `boolean` | `true` | Enable horizontal scrolling |
| `className` | `string` | - | Additional CSS classes |

### TableColumn Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | - | Unique column identifier |
| `header` | `string` | - | Column header text |
| `accessor` | `(row: T) => TableCellContent` | - | Function to extract data |
| `content` | `TableCellContent` | - | Static content for all cells |
| `width` | `string \| number` | - | Column width |
| `sortable` | `boolean` | `false` | Enable sorting for column |
| `render` | `(value: any, row: T, index: number) => ReactNode` | - | Custom cell renderer |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `hideOnMobile` | `boolean` | `false` | Hide column on mobile |
| `isActions` | `boolean` | `false` | Whether this is an actions column that should be sticky to the right |

### TableActionsMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `TableAction[]` | - | Array of actions to display in the dropdown |
| `srLabel` | `string` | `'Open actions menu'` | Screen reader label for the dropdown trigger |
| `disabled` | `boolean` | `false` | Whether the dropdown is disabled |

### TableAction Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | - | Unique action identifier |
| `label` | `string` | - | Display label for the action |
| `onClick` | `() => void` | - | Click handler for the action |
| `disabled` | `boolean` | `false` | Whether this action is disabled |
| `icon` | `React.ComponentType` | - | Icon component for the action |
| `destructive` | `boolean` | `false` | Whether this action should be styled as destructive (red text) |
| `className` | `string` | - | Custom CSS classes for the action |

### TableCellContent Types

The table supports flexible cell content:

#### Raw Data
```tsx
accessor: (row) => row.name // string, number, JSX.Element
```

#### Buttons
```tsx
// Single button in a cell using render function
render: (value, row) => ({
  button: {
    children: 'Click me',
    onClick: () => handleClick(row),
    variant: 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
    size: 'sm', // 'sm' | 'md' | 'lg'
    disabled: false
  }
})

// Multiple buttons using render function
render: (value, row) => (
  <div className="flex gap-2">
    <button onClick={() => handleEdit(row)}>Edit</button>
    <button onClick={() => handleDelete(row)}>Delete</button>
  </div>
)
```

#### Tags
```tsx
// Tag in a cell using render function
render: (value, row) => ({
  tag: {
    children: 'Active',
    variant: 'success', // 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
    size: 'sm' // 'sm' | 'md'
  }
})
```

### TablePagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | `1` | Current page number |
| `totalPages` | `number` | `1` | Total number of pages — set `undefined` if unknown |
| `pageSize` | `number` | `10` | Number of items per page |
| `totalItems` | `number` | `0` | Total number of items — set `undefined` if backend does not send a count |
| `onPageChange` | `(page: number) => void` | - | Callback when page changes |
| `onPageSizeChange` | `(size: number) => void` | - | Callback when page size changes |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Available page size options |
| `showPageSizeSelector` | `boolean` | `true` | Enable page size selector |
| `isFetching` | `boolean` | `false` | Show loading state in pagination |

#### Handling Unknown Totals

Some APIs do not expose a total row count. In those scenarios:

- Pass `totalItems={undefined}` (and optionally `totalPages={undefined}`) to hide the “of N” portion of the summary. The component will render `Showing 21–30`.
- Determine when you’ve reached the end of the dataset in your data layer. Once your fetch returns fewer rows than requested, disable the “Next” button by preventing additional page fetches or setting `totalPages` manually.
- Hide the page-size selector (`showPageSizeSelector={false}`) if switching page sizes is not useful when the total is unknown.

## Styling

The table component uses CSS custom properties from your design system:

- `--color-background-primary`
- `--color-background-secondary`
- `--color-text-primary`
- `--color-border-default`
- `--color-brand-primary`
- `--spacing-*`
- `--border-radius-*`

## Row Refresh

Tables support individual row refresh functionality through the `onRefreshRow` prop. When provided, a refresh action is automatically added to any actions column.

```tsx
const [refreshingRows, setRefreshingRows] = useState<Set<number>>(new Set())

const handleRefreshRow = async (row: User, rowIndex: number) => {
  const rowId = row.id
  setRefreshingRows(prev => new Set(prev).add(rowId))

  try {
    const updatedData = await api.refreshRow(rowId)
    updateRowData(rowId, updatedData)
  } catch (error) {
    console.error('Failed to refresh row:', rowId)
  } finally {
    setRefreshingRows(prev => {
      const newSet = new Set(prev)
      newSet.delete(rowId)
      return newSet
    })
  }
}

<Table
  data={data}
  onRefreshRow={handleRefreshRow}
  refreshingRows={refreshingRows}
  columns={columns}
/>
```

**Visual Feedback During Refresh:**
- Refresh button in actions menu is disabled
- Row opacity is reduced to 60%
- Row background changes to a subtle primary-50 color with transparency
- Smooth transition animations for state changes

The refresh action will appear at the top of the actions menu for each row. Rows being refreshed are visually indicated with reduced opacity and background color changes.

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- Focus management
- ARIA labels and roles

## Error Handling

The table gracefully handles missing or malformed data:

- **Missing Properties**: Accessor functions display `--` for missing properties
- **Invalid Accessors**: Failed accessor/render functions show `--` with logged warnings
- **Null/Undefined Values**: Automatically converted to `--` placeholder
- **Type Safety**: Robust type checking prevents runtime errors

```typescript
// These all display "--" gracefully:
const data = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane" },                    // email shows "--"
  { id: 3, name: "Bob", email: null },        // email shows "--"
  { id: 4 },                                  // name and email show "--"
]

// Accessor functions are safe:
accessor: (row) => row.missingProperty      // displays "--"
accessor: (row) => row.deep?.nested?.value  // safe optional chaining
```

## Performance

- Virtual scrolling support for large datasets (planned)
- Memoized components to prevent unnecessary re-renders
- Lightweight bundle size
