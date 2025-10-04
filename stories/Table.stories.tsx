import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Table, type TableColumn, TableActionsMenu, type TableAction, SearchBar, Button, Dropdown, DropdownTrigger, DropdownContentMultiselect, DatePicker, DateRangeValue, getSmartDefaults } from '../src'
import { Edit, Trash2, Eye, Download, Logs, RotateCw, GitPullRequestArrow, PlusCircle, Filter, ChevronUp, LucidePlus, ListPlus, Check } from 'lucide-react'
import { getConsentStatusTag, getDataStatusTag, ChevronIcon, useFilterState } from '../src'

// Sample data types
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  department: string
  joinDate: string
  salary: number
  manager: string
  location: string
  phone: string
  lastLogin: string
  permissions: string[]
  projects: number
  tasksCompleted: number
  rating: number
  certifications: string[]
  skills: string[]
  experience: number
}

// FinPro data types
interface FinProData {
  id: number
  fiData: string
  dataRequestMode: string
  dataStatus: 'DATA_READY' | 'DELIVERED' | 'DENIED' | 'PENDING' | 'TIMEOUT'
  mobileNumber: string
  vua: string
  consentStatus: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'REVOKED' | 'PAUSED' | 'FAILED'
  accountId: string
  consentHandle: string
  consentId: string
  consentTemplateId: string
  consentValidity: string
  consentMode: string
  consentType: string
  fetchType: string
  fiDataRange: string
  dataLife: string
  fiTypes: string[]
  frequency: string
  purposeCode: string
  purposeText: string
  accountsLinked: number
  aaId: string
  consentCreatedBy: string
  consentCreatedAt: string
  consentActedOn: string
}

// Generate sample data
const generateSampleData = (count: number): User[] => {
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson', 'Frank Miller', 'Grace Lee', 'Henry Davis', 'Iris Chen', 'Jack Wilson']
  const emails = names.map(name => name.toLowerCase().replace(' ', '.') + '@company.com')
  const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'QA Engineer', 'DevOps', 'Product Manager', 'Sales Rep', 'HR Manager', 'CTO']
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Legal', 'Support', 'Executive']
  const statuses: User['status'][] = ['active', 'inactive', 'pending']
  const locations = ['New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto', 'Singapore', 'Amsterdam', 'Paris']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: emails[i % emails.length],
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    department: departments[i % departments.length],
    joinDate: new Date(2020 + (i % 4), i % 12, 1 + (i % 28)).toLocaleDateString(),
    salary: 50000 + (i * 5000),
    manager: names[(i + 1) % names.length],
    location: locations[i % locations.length],
    phone: `+1-555-${String(1000 + i).padStart(4, '0')}`,
    lastLogin: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString(),
    permissions: ['read', 'write'][i % 2] === 'read' ? ['read'] : ['read', 'write', 'admin'],
    projects: Math.floor(Math.random() * 20) + 1,
    tasksCompleted: Math.floor(Math.random() * 500) + 10,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    certifications: ['AWS', 'React', 'Node.js', 'Python', 'Docker'].slice(0, Math.floor(Math.random() * 3) + 1),
    skills: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'Go'].slice(0, Math.floor(Math.random() * 5) + 1),
    experience: Math.floor(Math.random() * 15) + 1,
  }))
}

// Generate FinPro sample data
const generateFinProData = (count: number): FinProData[] => {
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson', 'Frank Miller', 'Grace Lee', 'Henry Davis', 'Iris Chen', 'Jack Wilson']
  const dataRequestModes = ['AUTOMATIC', 'MANUAL']
  // Use only the 5 Figma data tag statuses
  const dataStatuses: FinProData['dataStatus'][] = ['DATA_READY', 'DELIVERED', 'DENIED', 'PENDING', 'TIMEOUT']
  const consentStatuses: FinProData['consentStatus'][] = ['ACTIVE', 'PENDING', 'REJECTED', 'REVOKED', 'PAUSED', 'FAILED']
  const consentModes = ['STORE', 'VIEW', 'QUERY']
  const consentTypes = ['PROFILE', 'TRANSACTIONS', 'SUMMARY']
  const fetchTypes = ['ONETIME', 'PERIODIC']
  const frequencies = ['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY']
  const fiTypes = ['DEPOSIT', 'MUTUAL_FUNDS', 'INSURANCE_POLICIES', 'GOVERNMENT_SECURITIES', 'EQUITIES', 'BONDS', 'DEBENTURES', 'RECURRING_DEPOSIT', 'PROVIDENT_FUND', 'NPS', 'ULIP', 'SENIOR_CITIZEN_SAVINGS_SCHEME', 'PUBLIC_PROVIDENT_FUND', 'LIQUID_FUNDS', 'FIXED_DEPOSIT', 'SYSTEMATIC_INVESTMENT_PLAN', 'ETF', 'IDR']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    fiData: `FI-${String(1000 + i).padStart(4, '0')}`,
    dataRequestMode: dataRequestModes[i % dataRequestModes.length],
    dataStatus: dataStatuses[i % dataStatuses.length],
    mobileNumber: `+91-${String(9000000000 + i).slice(-10)}`,
    vua: `user${i + 1}@okhdfcbank`,
    consentStatus: consentStatuses[i % consentStatuses.length],
    accountId: `ACC${String(100000 + i).padStart(6, '0')}`,
    consentHandle: `CH-${String(10000 + i).padStart(5, '0')}`,
    consentId: `CONS-${String(100000 + i).padStart(6, '0')}`,
    consentTemplateId: `TEMP-${String(1000 + i).padStart(4, '0')}`,
    consentValidity: new Date(Date.now() + (i * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
    consentMode: consentModes[i % consentModes.length],
    consentType: consentTypes[i % consentTypes.length],
    fetchType: fetchTypes[i % fetchTypes.length],
    fiDataRange: `${new Date(Date.now() - (365 * 24 * 60 * 60 * 1000)).toLocaleDateString().slice(-4)}-${new Date().toLocaleDateString().slice(-4)}`,
    dataLife: `${Math.floor(Math.random() * 365) + 30} days`,
    fiTypes: fiTypes.slice(0, Math.floor(Math.random() * 5) + 1),
    frequency: frequencies[i % frequencies.length],
    purposeCode: `PURP${String(100 + i).padStart(3, '0')}`,
    purposeText: ['Account verification', 'Credit assessment', 'Loan processing', 'Investment advisory', 'Insurance claims'][i % 5],
    accountsLinked: Math.floor(Math.random() * 10) + 1,
    aaId: `AA-${String(1000 + i).padStart(4, '0')}`,
    consentCreatedBy: names[i % names.length],
    consentCreatedAt: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString(),
    consentActedOn: new Date(Date.now() - ((i % 7) * 24 * 60 * 60 * 1000)).toLocaleDateString(),
  }))
}

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful, lightweight table component that supports 20+ columns with horizontal scrolling, pagination, sorting, and flexible cell content including buttons and tags.',
      },
    },
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Enable row selection with checkboxes',
    },
    enableHorizontalScroll: {
      control: { type: 'boolean' },
      description: 'Enable horizontal scrolling for many columns',
    },
  },
}

export default meta

type Story = StoryObj<typeof Table<User>>
type FinProStory = StoryObj<typeof Table<FinProData>>

export const Basic: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name', accessor: (row) => row.name },
      { key: 'email', header: 'Email', accessor: (row) => row.email },
      { key: 'role', header: 'Role', accessor: (row) => row.role },
      { key: 'department', header: 'Department', accessor: (row) => row.department },
      { key: 'status', header: 'Status', accessor: (row) => row.status },
    ],
    data: generateSampleData(10),
  },
}

export const WithButtons: Story = {
  render: (args) => {
    const getActions = (row: User): TableAction[] => [
      {
        key: 'view',
        label: 'View',
        onClick: () => console.log('View', row.id),
        icon: Eye,
      },
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => console.log('Edit', row.id),
        icon: Edit,
      },
      {
        key: 'delete',
        label: 'Delete',
        onClick: () => console.log('Delete', row.id),
        icon: Trash2,
        destructive: true,
      },
    ]

    const columns: TableColumn<User>[] = [
      { key: 'name', header: 'Name', accessor: (row) => row.name },
      { key: 'email', header: 'Email', accessor: (row) => row.email },
      { key: 'role', header: 'Role', accessor: (row) => row.role },
      { key: 'status', header: 'Status', accessor: (row) => ({
        type: 'tag' as const,
        props: {
          children: row.status,
          variant: row.status === 'active' ? 'success' : row.status === 'inactive' ? 'error' : 'warning',
        },
      })},
      {
        key: 'actions',
        header: 'Actions',
        isActions: true,
        width: 60,
        render: (value, row) => (
          <TableActionsMenu
            actions={getActions(row)}
            srLabel={`Actions for ${row.name}`}
          />
        )
      },
    ]

    return (
      <Table
        {...args}
        columns={columns}
      />
    )
  },
  args: {
    data: generateSampleData(10),
  },
}

export const ManyColumns: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', accessor: (row) => row.id, width: 80 },
      { key: 'name', header: 'Full Name', accessor: (row) => row.name, width: 150 },
      { key: 'email', header: 'Email Address', accessor: (row) => row.email, width: 200 },
      { key: 'role', header: 'Job Role', accessor: (row) => row.role, width: 120 },
      { key: 'department', header: 'Department', accessor: (row) => row.department, width: 130 },
      { key: 'status', header: 'Status', accessor: (row) => ({
        type: 'tag' as const,
        props: {
          children: row.status,
          variant: row.status === 'active' ? 'success' : row.status === 'inactive' ? 'error' : 'warning',
        },
      }), width: 100 },
      { key: 'joinDate', header: 'Join Date', accessor: (row) => row.joinDate, width: 120 },
      { key: 'salary', header: 'Salary', accessor: (row) => `$${row.salary.toLocaleString()}`, align: 'right' as const, width: 120 },
      { key: 'manager', header: 'Manager', accessor: (row) => row.manager, width: 150 },
      { key: 'location', header: 'Location', accessor: (row) => row.location, width: 120 },
      { key: 'phone', header: 'Phone', accessor: (row) => row.phone, width: 140 },
      { key: 'lastLogin', header: 'Last Login', accessor: (row) => row.lastLogin, width: 120 },
      { key: 'projects', header: 'Projects', accessor: (row) => row.projects, align: 'center' as const, width: 100 },
      { key: 'tasksCompleted', header: 'Tasks Done', accessor: (row) => row.tasksCompleted, align: 'center' as const, width: 110 },
      { key: 'rating', header: 'Rating', accessor: (row) => `${row.rating}⭐`, align: 'center' as const, width: 90 },
      { key: 'experience', header: 'Experience (Years)', accessor: (row) => row.experience, align: 'center' as const, width: 140 },
      { key: 'permissions', header: 'Permissions', accessor: (row) => row.permissions.join(', '), width: 150 },
      { key: 'certifications', header: 'Certifications', accessor: (row) => row.certifications.join(', '), width: 200 },
      { key: 'skills', header: 'Skills', accessor: (row) => row.skills.join(', '), width: 250 },
      { key: 'actions', header: 'Actions', width: 150, render: (value, row) => (
        <div className="flex gap-1">
          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-background-secondary hover:text-text-primary h-7 px-2 text-xs"
            onClick={() => console.log('View', row.id)}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-default bg-transparent hover:bg-background-secondary h-7 px-2 text-xs"
            onClick={() => console.log('Edit', row.id)}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-background-secondary hover:text-text-primary h-7 px-2 text-xs"
            onClick={() => console.log('Download', row.id)}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      )},
    ],
    data: generateSampleData(25),
    enableHorizontalScroll: true,
    tableClassName: 'min-w-[2000px]',
  },
}

export const WithPagination: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const allData = generateSampleData(125)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = allData.slice(startIndex, endIndex)

    return (
      <Table
        {...args}
        data={paginatedData}
        pagination={{
          currentPage,
          totalPages: Math.ceil(allData.length / pageSize),
          pageSize,
          totalItems: allData.length,
          onPageChange: setCurrentPage,
          onPageSizeChange: setPageSize,
          pageSizeOptions: [5, 10, 25, 50],
          showPageSizeSelector: true,

        }}
      />
    )
  },
  args: {
    columns: [
      { key: 'name', header: 'Name', accessor: (row) => row.name },
      { key: 'email', header: 'Email', accessor: (row) => row.email },
      { key: 'role', header: 'Role', accessor: (row) => row.role },
      { key: 'department', header: 'Department', accessor: (row) => row.department },
      { key: 'status', header: 'Status', accessor: (row) => row.status, render: (value) => ({
        type: 'tag' as const,
        props: {
          children: value,
          variant: value === 'active' ? 'success' : value === 'inactive' ? 'error' : 'warning',
        },
      })},
      {
        key: 'actions',
        header: 'Actions',
        isActions: true,
        width: 60,
        render: (value, row) => (
          <TableActionsMenu
            actions={[
              {
                key: 'view',
                label: 'View',
                onClick: () => console.log('View', row.id),
                icon: Eye,
              },
              {
                key: 'edit',
                label: 'Edit',
                onClick: () => console.log('Edit', row.id),
                icon: Edit,
              },
            ]}
            srLabel={`Actions for ${row.name}`}
          />
        )
      },
    ],
  },
}

export const Selectable: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])

    return (
      <Table
        {...args}
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
    )
  },
  args: {
    columns: [
      { key: 'name', header: 'Name', accessor: (row) => row.name },
      { key: 'email', header: 'Email', accessor: (row) => row.email },
      { key: 'role', header: 'Role', accessor: (row) => row.role },
      { key: 'department', header: 'Department', accessor: (row) => row.department },
      { key: 'status', header: 'Status', accessor: (row) => row.status, render: (value) => ({
        type: 'tag' as const,
        props: {
          children: value,
          variant: value === 'active' ? 'success' : value === 'inactive' ? 'error' : 'warning',
        },
      })},
    ],
    data: generateSampleData(15),
  },
}

export const Loading: Story = {
  args: {
    ...Basic.args,
    loading: true,
    loadingText: 'Fetching user data...',
  },
}

export const FinPro: FinProStory = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [refreshingRows, setRefreshingRows] = useState<Set<number>>(new Set())
    const [selectedFormats, setSelectedFormats] = useState<Record<number, string>>({})
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
    const tableArgs = args as any
    const isFetching = false

    // Filter component state
    const [isFilterExpanded, setIsFilterExpanded] = useState(true)

    // Define options arrays for filters
    const templateOptions = [
      { value: 'template-1', label: 'Template One' },
      { value: 'template-2', label: 'Template Two' },
      { value: 'template-3', label: 'Template Three' },
      { value: 'template-4', label: 'Template Four' },
      { value: 'template-5', label: 'Template Five' },
    ]

    const purposeCodeOptions = [
      { value: 'purpose-101', label: 'Purpose 101' },
      { value: 'purpose-102', label: 'Purpose 102' },
      { value: 'purpose-103', label: 'Purpose 103' },
      { value: 'purpose-104', label: 'Purpose 104' },
      { value: 'purpose-105', label: 'Purpose 105' },
    ]

    const statusOptions = [
      { value: 'pending', label: 'PENDING' },
      { value: 'active', label: 'ACTIVE' },
      { value: 'rejected', label: 'REJECTED' },
      { value: 'revoked', label: 'REVOKED' },
      { value: 'paused', label: 'PAUSED' },
      { value: 'failed', label: 'FAILED' },
    ]

    const aggregatorOptions = [
      { value: 'agg-1', label: 'Aggregator One' },
      { value: 'agg-2', label: 'Aggregator Two' },
      { value: 'agg-3', label: 'Aggregator Three' },
      { value: 'agg-4', label: 'Aggregator Four' },
      { value: 'agg-5', label: 'Aggregator Five' },
    ]

    // Initialize with all options selected by default
    const defaultTemplates = templateOptions.map(option => option.value)
    const defaultPurposeCodes = purposeCodeOptions.map(option => option.value)
    const defaultStatuses = statusOptions.map(option => option.value)
    const defaultAggregators = aggregatorOptions.map(option => option.value)
    const defaultDateRange = getSmartDefaults()


    // Date range comparison function
    const compareDateRanges = (a: DateRangeValue, b: DateRangeValue) => {
      return a.startDate?.getTime() === b.startDate?.getTime() &&
             a.endDate?.getTime() === b.endDate?.getTime()
    }

    // Filter state management
    const [selectedTemplates, setSelectedTemplates, templatesChanged] = useFilterState(defaultTemplates)
    const [selectedPurposeCodes, setSelectedPurposeCodes, purposeCodesChanged] = useFilterState(defaultPurposeCodes)
    const [selectedStatuses, setSelectedStatuses, statusesChanged] = useFilterState(defaultStatuses)
    const [selectedAggregators, setSelectedAggregators, aggregatorsChanged] = useFilterState(defaultAggregators)
    const [selectedRange, setSelectedRange, dateRangeChanged] = useFilterState(defaultDateRange, compareDateRanges)

    // Combined filter change state - tracks if current filters differ from defaults
    const hasUnappliedChanges = React.useMemo(() => {
      return templatesChanged || purposeCodesChanged || statusesChanged || aggregatorsChanged || dateRangeChanged
    }, [templatesChanged, purposeCodesChanged, statusesChanged, aggregatorsChanged, dateRangeChanged])

    // Track if filters have been applied
    const [filtersApplied, setFiltersApplied] = useState(false)

    // Filter action handlers
    const handleApplyFilters = React.useCallback(() => {
      // Here you would apply the filters to the data
      console.log('Applying filters:', {
        templates: selectedTemplates,
        purposeCodes: selectedPurposeCodes,
        statuses: selectedStatuses,
        aggregators: selectedAggregators,
        dateRange: selectedRange
      })
      setFiltersApplied(true)
    }, [selectedTemplates, selectedPurposeCodes, selectedStatuses, selectedAggregators, selectedRange])

    const handleResetFilters = React.useCallback(() => {
      setSelectedTemplates(defaultTemplates)
      setSelectedPurposeCodes(defaultPurposeCodes)
      setSelectedStatuses(defaultStatuses)
      setSelectedAggregators(defaultAggregators)
      setSelectedRange(defaultDateRange)
      setFiltersApplied(false)
    }, [])

    // Individual hover states for each dropdown
    const [isTemplateHovered, setIsTemplateHovered] = useState(false)
    const [isPurposeHovered, setIsPurposeHovered] = useState(false)
    const [isStatusHovered, setIsStatusHovered] = useState(false)
    const [isAggregatorHovered, setIsAggregatorHovered] = useState(false)
    const [isDatePickerHovered, setIsDatePickerHovered] = useState(false)

    // Date range picker state - initialized with smart defaults (current time rounded to last 30 mins)

    // Generate FinPro sample data
    let allData = generateFinProData(120)

    // Add test rows with missing fields
    const testRowsWithMissingFields = [
      {
        id: 99991,
        fiData: "FI-9991",
        dataRequestMode: "Manual",
        dataStatus: "DATA_READY",
        mobileNumber: "+91-9876543210",
        vua: "john.doe@okhdfcbank",
        consentStatus: "ACTIVE",
        accountId: "ACC999991",
        consentHandle: "CH-99991",
        consentId: "CONS999991",
        consentTemplateId: "TEMP9991",
        consentValidity: "2024-12-31",
        consentMode: "STORE",
        consentType: "PROFILE",
        fetchType: "ONETIME",
        fiDataRange: "2023-2024",
        dataLife: "365 days",
        fiTypes: ["DEPOSIT"],
        frequency: "DAILY",
        purposeCode: "PURP999",
        purposeText: "Account verification",
        accountsLinked: 1,
        aaId: "AA-9991",
        consentCreatedBy: "John Doe",
        consentCreatedAt: "2024-01-10",
        consentActedOn: "2024-01-10"
      },
      {
        id: 99992,
        fiData: "FI-9992",
        dataRequestMode: "PERIODIC",
        dataStatus: "DELIVERED",
        mobileNumber: "+91-9876543211",
        vua: "jane.smith@okhdfcbank",
        consentStatus: "PENDING",
        accountId: "ACC999992",
        consentHandle: "CH-99992",
        consentId: "CONS999992",
        consentTemplateId: "TEMP9992",
        consentValidity: "2024-06-30",
        consentMode: "VIEW",
        consentType: "TRANSACTIONS",
        fetchType: "PERIODIC",
        fiDataRange: "2023-2024",
        dataLife: "180 days",
        fiTypes: ["MUTUAL_FUNDS", "EQUITIES"],
        frequency: "MONTHLY",
        purposeCode: "PURP998",
        purposeText: "Credit assessment",
        accountsLinked: 2,
        aaId: "AA-9992",
        consentCreatedBy: "Jane Smith",
        consentCreatedAt: "2024-01-09",
        consentActedOn: "2024-01-09"
      },
      {
        id: 99993,
        fiData: "FI-9993",
        dataRequestMode: "ONETIME",
        dataStatus: "DATA_READY",
        mobileNumber: "+91-9876543212",
        vua: "bob.wilson@okhdfcbank",
        consentStatus: "ACTIVE",
        accountId: "ACC999993",
        consentHandle: "CH-99993",
        consentId: "CONS999993",
        consentTemplateId: "TEMP9993",
        consentValidity: "2025-03-10",
        consentMode: "QUERY",
        consentType: "SUMMARY",
        fetchType: "ONETIME",
        fiDataRange: "2022-2024",
        dataLife: "730 days",
        fiTypes: ["INSURANCE_POLICIES", "BONDS"],
        frequency: "QUARTERLY",
        purposeCode: "PURP997",
        purposeText: "Loan processing",
        accountsLinked: 3,
        aaId: "AA-9993",
        consentCreatedBy: "Bob Wilson",
        consentCreatedAt: "2024-01-08",
        consentActedOn: "2024-01-08"
      }
    ] as FinProData[]

    allData = [...allData, ...testRowsWithMissingFields]
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = allData.slice(startIndex, endIndex)

    // Function to refresh a single row
    const refreshRow = async (row: User, rowIndex: number) => {
      const rowId = row.id
      setRefreshingRows(prev => new Set(prev).add(rowId))

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Here you would update the row data
        console.log('Refreshed row:', rowId)

        // You could update the data state here if needed
        // setData(updatedData)

      } catch (error) {
        console.error('Failed to refresh row:', rowId, error)
      } finally {
        setRefreshingRows(prev => {
          const newSet = new Set(prev)
          newSet.delete(rowId)
          return newSet
        })
      }
    }

    // Function to handle download format selection
    const handleFormatChange = (rowId: number, format: string) => {
      setSelectedFormats(prev => ({
        ...prev,
        [rowId]: format
      }))
      console.log(`Download FI-${String(1000 + rowId).padStart(4, '0')} as ${format}`)
    }

    // Helper function to create trigger styles
    const createTriggerStyles = (isHovered: boolean) => {
      const baseStyles: any = {
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all 0.2s ease-in-out',
      }

      // Apply base styles or hover styles based on hover state
      const bgColor = isHovered ? '--color-background-primary' : '--color-background-secondary'
      const txtColor = '--color-text-primary'
      const brdColor = isHovered ? '--color-border-hover' : '--color-border-default'
      const shadow = isHovered ? '--shadow-md' : '--core-shadows-sm'

      // Apply CSS variables directly (they'll be resolved by CSS)
      if (bgColor) baseStyles.backgroundColor = `var(${bgColor})`
      if (txtColor) baseStyles.color = `var(${txtColor})`
      if (brdColor) baseStyles.borderColor = `var(${brdColor})`
      baseStyles.fontSize = 'var(--typography-fontSize-sm)'
      baseStyles.fontWeight = 'var(--typography-fontWeight-medium)'
      baseStyles.letterSpacing = '0.05em'
      baseStyles.padding = 'var(--spacing-2)'
      baseStyles.borderRadius = 'var(--border-radius-lg)'
      baseStyles.borderWidth = '1px'
      baseStyles.borderStyle = 'solid'
      baseStyles.borderBottomWidth = '2px'
      if (shadow) baseStyles.boxShadow = `var(${shadow})`

      return baseStyles
    }

    // Individual trigger styles for each dropdown
    const getTemplateTriggerStyles = () => createTriggerStyles(isTemplateHovered)
    const getPurposeTriggerStyles = () => createTriggerStyles(isPurposeHovered)
    const getStatusTriggerStyles = () => createTriggerStyles(isStatusHovered)
    const getAggregatorTriggerStyles = () => createTriggerStyles(isAggregatorHovered)
    const getDatePickerTriggerStyles = () => createTriggerStyles(isDatePickerHovered)

    // Individual hover handlers
    const handleTemplateMouseEnter = () => setIsTemplateHovered(true)
    const handleTemplateMouseLeave = () => setIsTemplateHovered(false)
    const handlePurposeMouseEnter = () => setIsPurposeHovered(true)
    const handlePurposeMouseLeave = () => setIsPurposeHovered(false)
    const handleStatusMouseEnter = () => setIsStatusHovered(true)
    const handleStatusMouseLeave = () => setIsStatusHovered(false)
    const handleAggregatorMouseEnter = () => setIsAggregatorHovered(true)
    const handleAggregatorMouseLeave = () => setIsAggregatorHovered(false)
    const handleDatePickerMouseEnter = () => setIsDatePickerHovered(true)
    const handleDatePickerMouseLeave = () => setIsDatePickerHovered(false)
    const domains = [
      { value: 'all', label: 'All Categories' },
      { value: 'clients', label: 'Clients' },
      { value: 'accounts', label: 'Accounts' },
      { value: 'transactions', label: 'Transactions' },
      { value: 'portfolios', label: 'Portfolios' },
      { value: 'documents', label: 'Documents' }
    ]

    const columns: TableColumn<FinProData>[] = [
      {
        key: 'fiData',
        header: 'FI Data',
        width: 220,
        locked: true,
        render: (value, row) => (
          <Button
            variant="secondary"
            withDropdown={true}
            showDropdownHeader
            dropdownHeaderText="Select Format:"
            size="sm"
            dropdownOptions={[
              { value: 'pdf', label: 'PDF' },
              { value: 'csv', label: 'CSV' },
              { value: 'excel', label: 'XLSX' }
            ]}
            selectedDropdownOption={selectedFormats[row.id] || 'pdf'}
            onDropdownChange={(format) => handleFormatChange(row.id, format)}
          >
            <Download className="w-4 h-4" />
            <span className="mr-1">Download</span>
          </Button>
        )
      },
      {
        key: 'dataRequestMode',
        header: 'Data Request Mode',
        width: 220,
        locked: true,
        render: (value, row) => {
          if (row.dataRequestMode === 'MANUAL') {
            return (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => console.log('Request data for', row.id)}
              >
                <GitPullRequestArrow className="w-4 h-4" />
                Request Data
              </Button>
            )
          }
          return row.dataRequestMode
        }
      },
      { key: 'dataStatus', header: 'Data Status', accessor: (row) => {
        const tagResult = getDataStatusTag(row.dataStatus);
        return {
          type: 'tag' as const,
          props: tagResult.tagProps,
        };
      }, width: 200 },
      { key: 'mobileNumber', header: 'Mobile Number', accessor: (row) => row.mobileNumber, width: 200 },
      { key: 'vua', header: 'VUA', accessor: (row) => row.vua, width: 200 },
      { key: 'consentStatus', header: 'Consent Status', accessor: (row) => {
        const tagResult = getConsentStatusTag(row.consentStatus);
        return {
          type: 'tag' as const,
          props: tagResult.tagProps,
        };
      }, width: 200 },
      { key: 'accountId', header: 'Account ID', accessor: (row) => row.accountId, width: 200 },
      { key: 'consentHandle', header: 'Consent Handle', accessor: (row) => row.consentHandle, width: 200, copyable: true },
      { key: 'consentId', header: 'Consent ID', accessor: (row) => row.consentId, width: 200, copyable: true },
      { key: 'consentTemplateId', header: 'Consent Template ID', accessor: (row) => row.consentTemplateId, width: 250 },
      { key: 'consentValidity', header: 'Consent Validity', accessor: (row) => row.consentValidity, width: 200 },
      { key: 'consentMode', header: 'Consent Mode', accessor: (row) => row.consentMode, width: 200 },
      { key: 'consentType', header: 'Consent Type', accessor: (row) => row.consentType, width: 200 },
      { key: 'fetchType', header: 'Fetch Type', accessor: (row) => row.fetchType, width: 200 },
      { key: 'fiDataRange', header: 'FI Data Range', accessor: (row) => row.fiDataRange, width: 200 },
      { key: 'dataLife', header: 'Data Life', accessor: (row) => row.dataLife, width: 180 },
      { key: 'fiTypes', header: 'FI Types', accessor: (row) => row.fiTypes.join(', '), width: 200 },
      { key: 'frequency', header: 'Frequency', accessor: (row) => row.frequency, width: 180 },
      { key: 'purposeCode', header: 'Purpose Code', accessor: (row) => row.purposeCode, width: 180 },
      { key: 'purposeText', header: 'Purpose Text', accessor: (row) => row.purposeText, width: 200 },
      { key: 'accountsLinked', header: 'Accounts Linked', accessor: (row) => row.accountsLinked, width: 180 },
      { key: 'aaId', header: 'AA ID', accessor: (row) => row.aaId, width: 180 },
      { key: 'consentCreatedBy', header: 'Consent Created By', accessor: (row) => row.consentCreatedBy, width: 200 },
      { key: 'consentCreatedAt', header: 'Consent Created At', accessor: (row) => row.consentCreatedAt, width: 200 },
      { key: 'consentActedOn', header: 'Consent Acted On', accessor: (row) => row.consentActedOn, width: 200 },
      {
        key: 'actions',
        header: 'Actions',
        isActions: true,
        width: 100,
        align: 'center',
        render: (value, row) => (
          <TableActionsMenu
            actions={[
              {
                key: 'logs',
                label: 'View Logs',
                icon: Logs,
                subActions: [
                  {
                    key: 'consent',
                    label: 'Consent',
                    onClick: () => console.log('View Consent Logs', row.id),
                  },
                  {
                    key: 'data',
                    label: 'Data',
                    onClick: () => console.log('View Data Logs', row.id),
                  },
                ],
              },
            ]}
            srLabel={`Actions for ${row.consentId}`}
          />
        )
      },
    ]

    return (
      <div className="h-full flex flex-col">
        {/* Filter Component */}
        <div className="bg-white border border-border-default rounded-xl p-4 shadow-md mb-4">
          <div
            className="flex justify-between items-center cursor-pointer rounded-lg p-2 -m-2 transition-colors duration-200"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-background-tertiary p-1.5 rounded-lg">
                <Filter className="w-4 h-4 text-text-primary" />
              </div>
              <h2 className="text-xl font-medium text-text-primary tracking-wider">
                Filter Table
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {hasUnappliedChanges && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleApplyFilters()
                    }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium text-success-100 hover:bg-success-50 transition-colors duration-200"
                  >
                    <Check className="w-3 h-3 mt-1" />
                    Apply Filters
                  </button>
                  <div className="w-px h-4 bg-border-default mx-1" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleResetFilters()
                    }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium text-error-100 hover:bg-error-50 transition-colors duration-200"
                  >
                    <RotateCw className="w-3 h-3 mt-1" />
                    Reset
                  </button>
                </>
              )}
              <div className="p-1 rounded hover:bg-background-primary border border-transparent hover:border hover:border-border-default transition-colors duration-200">
                <ChevronIcon
                  isOpen={isFilterExpanded}
                  className="text-text-primary"
                  duration={200}
                />
              </div>
            </div>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full"
            style={{
              transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-out, margin-top 0.5s ease-out, pointer-events 0.3s ease-out',
              maxHeight: isFilterExpanded ? '384px' : '0px',
              opacity: isFilterExpanded ? 1 : 0,
              marginTop: isFilterExpanded ? '16px' : '0px',
              pointerEvents: isFilterExpanded ? 'auto' : 'none'
            }}
          >
            {/* Multiselect Consent Template Dropdown */}
            <div className="w-full">
              <label className="block text-xs font-normal text-text-tertiary tracking-wide mb-1 font-mono">
                Consent Template
              </label>
              <Dropdown>
                <DropdownTrigger
                  variant="default"
                  className="w-full"
                  style={getTemplateTriggerStyles()}
                  onMouseEnter={handleTemplateMouseEnter}
                  onMouseLeave={handleTemplateMouseLeave}
                >
                  <span className={`flex-1 text-left ${selectedTemplates.length === 0 ? 'text-text-secondary' : ''}`}>
                    {selectedTemplates.length === templateOptions.length
                      ? 'All Templates'
                      : selectedTemplates.length === 0
                      ? 'None Selected'
                      : `${selectedTemplates.length} selected`
                    }
                  </span>
                </DropdownTrigger>
                <DropdownContentMultiselect
                  options={templateOptions}
                  selectedValues={selectedTemplates}
                  onSelectionChange={setSelectedTemplates}
                  enableSelectAll={true}
                  selectAllLabel="All Templates"
                  enableSearch={true}
                  searchPlaceholder="Search for templates"
                  maxHeight="200px"
            
                />
              </Dropdown>
            </div>

            {/* Multiselect Purpose Code Dropdown */}
            <div className="w-full">
              <label className="block text-xs font-normal text-text-tertiary tracking-wide mb-1 font-mono">
                Purpose Code
              </label>
              <Dropdown>
                <DropdownTrigger
                  variant="default"
                  className="w-full"
                  style={getPurposeTriggerStyles()}
                  onMouseEnter={handlePurposeMouseEnter}
                  onMouseLeave={handlePurposeMouseLeave}
                >
                  <span className={`flex-1 text-left ${selectedPurposeCodes.length === 0 ? 'text-text-secondary' : ''}`}>
                    {selectedPurposeCodes.length === purposeCodeOptions.length
                      ? 'All Purpose Codes'
                      : selectedPurposeCodes.length === 0
                      ? 'None Selected'
                      : `${selectedPurposeCodes.length} selected`
                    }
                  </span>
                </DropdownTrigger>
                <DropdownContentMultiselect
                  options={purposeCodeOptions}
                  selectedValues={selectedPurposeCodes}
                  onSelectionChange={setSelectedPurposeCodes}
                  enableSelectAll={true}
                  selectAllLabel="All Purpose Codes"
                  enableSearch={true}
                  searchPlaceholder="Search purpose codes"
                  maxHeight="200px"
                />
              </Dropdown>
            </div>

            {/* Multiselect Consent Status Dropdown */}
            <div className="w-full">
              <label className="block text-xs font-normal text-text-tertiary tracking-wide mb-1 font-mono">
                Consent Status
              </label>
              <Dropdown>
                <DropdownTrigger
                  variant="default"
                  className="w-full"
                  style={getStatusTriggerStyles()}
                  onMouseEnter={handleStatusMouseEnter}
                  onMouseLeave={handleStatusMouseLeave}
                >
                  <span className={`flex-1 text-left ${selectedStatuses.length === 0 ? 'text-text-secondary' : ''}`}>
                    {selectedStatuses.length === statusOptions.length
                      ? 'All Statuses'
                      : selectedStatuses.length === 0
                      ? 'None Selected'
                      : selectedStatuses.length === 1
                      ? (() => {
                          const option = statusOptions.find(opt => opt.value === selectedStatuses[0])
                          const tagResult = getConsentStatusTag(option?.value || '')
                          return (
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wider ${tagResult.tagProps.className}`}>
                              {tagResult.label}
                            </span>
                          )
                        })()
                      : `${selectedStatuses.length} selected`
                    }
                  </span>
                </DropdownTrigger>
                <DropdownContentMultiselect
                  options={statusOptions}
                  selectedValues={selectedStatuses}
                  onSelectionChange={setSelectedStatuses}
                  enableSelectAll={true}
                  selectAllLabel="All Statuses"
                  enableSearch={true}
                  searchPlaceholder="Search statuses"
                  maxHeight="200px"
                  isStatusTag={true}
                />
              </Dropdown>
            </div>

            {/* Multiselect Account Aggregator Dropdown */}
            <div className="w-full">
              <label className="block text-xs font-normal text-text-tertiary tracking-wide mb-1 font-mono">
                Account Aggregator
              </label>
              <Dropdown>
                <DropdownTrigger
                  variant="default"
                  className="w-full"
                  style={getAggregatorTriggerStyles()}
                  onMouseEnter={handleAggregatorMouseEnter}
                  onMouseLeave={handleAggregatorMouseLeave}
                >
                  <span className={`flex-1 text-left ${selectedAggregators.length === 0 ? 'text-text-secondary' : ''}`}>
                    {selectedAggregators.length === aggregatorOptions.length
                      ? 'All Account Aggregators'
                      : selectedAggregators.length === 0
                      ? 'None Selected'
                      : `${selectedAggregators.length} selected`
                    }
                  </span>
                </DropdownTrigger>
                <DropdownContentMultiselect
                  options={aggregatorOptions}
                  selectedValues={selectedAggregators}
                  onSelectionChange={setSelectedAggregators}
                  enableSelectAll={true}
                  selectAllLabel="All Aggregators"
                  enableSearch={true}
                  searchPlaceholder="Search aggregators"
                  maxHeight="200px"
                />
              </Dropdown>
            </div>

            <div className="w-full">
              <label className="block text-xs font-normal text-text-secondary tracking-wide mb-1 font-mono">
                Consent Created On
              </label>
              <DatePicker
                selectedRange={selectedRange}
                rangeMode={true}
                onRangeChange={setSelectedRange}
                placeholder="Select date range"
                dateFormat="medium"
                variant="default"
                showCalendarIcon={true}
                triggerClassName="w-full"
                triggerStyle={getDatePickerTriggerStyles()}
                onTriggerMouseEnter={handleDatePickerMouseEnter}
                onTriggerMouseLeave={handleDatePickerMouseLeave}
              />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 min-h-0 flex flex-col p-4 border border-border-default rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <SearchBar
              variant="with-dropdown"
              domains={domains}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => console.log('Create Consent clicked')}
            >
              <ListPlus className="w-6 h-6" />
              Create Consent
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => console.log('Download clicked')}
            >
              <Download className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <Table
            className="flex-1 min-h-0 shadow-sm rounded-xl"
            {...tableArgs}
            columns={columns}
            data={paginatedData}
            selectable={true}
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            onRefreshRow={refreshRow}
            refreshingRows={refreshingRows}
            columnManager={{
              enabled: true,
              triggerLabel: 'Manage columns',
              allowHiding: true,
            }}
            pagination={{
              currentPage,
              totalPages: undefined,
              pageSize,
              totalItems: undefined,
              currentPageItems: paginatedData.length,
              onPageChange: setCurrentPage,
              onPageSizeChange: setPageSize,
              pageSizeOptions: [1, 5, 10, 25, 50],
              showPageSizeSelector: true,
              isFetching,
            }}
          />
        </div>
      </div>
      </div>
    )
  },
}

export const MissingFields: Story = {
  args: {
    data: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Developer",
        department: "Engineering",
        status: "active"
      },
      {
        id: 2,
        name: "Jane Smith",
        // Missing email field - should show empty cell
        role: "Designer",
        department: "Design",
        // Missing status - should show empty cell
      },
      {
        id: 3,
        // Missing name field - should show empty cell
        email: "bob@example.com",
        role: "Manager",
        // Missing department - should show empty cell
        status: "active"
      },
      {
        id: 4,
        // Missing name, email, role - should show empty cells
        department: "HR",
        status: "pending"
      },
      {
        id: 5,
        name: "Charlie Brown",
        email: "charlie@example.com"
        // Missing role, department, status - should show empty cells
      }
    ] as any[],
    columns: [
      { key: 'id', header: 'ID', accessor: (row) => row.id, width: 80 },
      { key: 'name', header: 'Name', accessor: (row) => row.name, width: 150 },
      { key: 'email', header: 'Email', accessor: (row) => row.email, width: 200 },
      { key: 'role', header: 'Role', accessor: (row) => row.role, width: 120 },
      { key: 'department', header: 'Department', accessor: (row) => row.department, width: 130 },
      { key: 'status', header: 'Status', accessor: (row) => row.status, width: 100 },
      {
        key: 'actions',
        header: 'Actions',
        isActions: true,
        width: 40,
        render: (value, row) => (
          <TableActionsMenu
            actions={[
              {
                key: 'edit',
                label: 'Edit',
                onClick: () => console.log('Edit', row.id),
                icon: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            ]}
            srLabel={`Actions for ${row.name || 'user'}`}
          />
        )
      }
    ],
    enableHorizontalScroll: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the table gracefully handles missing fields in data rows. Empty cells are displayed cleanly without errors or "undefined" text.'
      }
    }
  }
}

export const Empty: Story = {
  args: {
    ...Basic.args,
    data: [],
    emptyText: 'No users found matching your criteria.',
  },
}
