## Component Library Spec (shadcn-based)

### Goal
Build a reusable React component library using shadcn (Radix + Tailwind) as the base. The library should be framework-agnostic for React (works in Next.js, Vite, CRA alternatives), tree-shakeable, accessible, themable, and easy to integrate. The first component to implement is a production-ready Sidebar.

### Principles
- **Accessibility first**: ARIA-correct, keyboard-friendly, screen-reader compliant.
- **Design tokens + theming**: CSS variables and a Tailwind preset; app-wide theme via class on `html` or `body`.
- **Composable primitives**: Small, testable parts with clear composition patterns.
- **Minimal runtime**: Prefer styling via Tailwind classes and CSS variables; avoid heavy JS.
- **Strict typing**: TypeScript everywhere, explicit public types.
- **DX**: Storybook, robust examples, and templates.

### Tech Stack
- **Language**: TypeScript (strict)
- **React**: React 18+ (peer)
- **Styling**: Tailwind CSS (peer) + CSS variables
- **Base UI**: shadcn/ui patterns and Radix primitives (peer)
- **Class utilities**: `class-variance-authority`, `tailwind-merge`
- **Icons**: `lucide-react` (peer)
- **Bundler**: `tsup` (ESM + CJS + DTS)
- **Docs**: Storybook 8
- **Testing**: Vitest + React Testing Library + Axe (a11y) + Playwright (visual/regression optional)
- **Release**: Changesets + GitHub Actions

### Target Environments
- **Runtime**: Browser + SSR; compatible with Next.js RSC. Only mark files with interactivity as `"use client"`.
- **Module formats**: `module` (ESM) and `main` (CJS). `types` for .d.ts.
- **Tree-shaking**: Side-effects-free by default; list CSS side effects explicitly if needed.

### Repository Layout
- Single-package for now; optional future monorepo with `apps/docs` and `packages/ui`.
- For single-package:
  - `src/` library source
  - `src/components/` components
  - `src/lib/` shared utils (e.g., `cn`, tokens)
  - `src/styles/` CSS variables and layers (e.g., `theme.css`)
  - `.storybook/` Storybook config
  - `stories/` component stories
  - `tests/` unit + a11y tests

### Package Boundaries
- Peer dependencies: `react`, `react-dom`, `tailwindcss`, `lucide-react`, `@radix-ui/react-*`
- Dependencies: `class-variance-authority`, `tailwind-merge`
- Dev dependencies: `tsup`, `typescript`, `storybook`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `axe-core`, `@types/*`

### Theming & Tokens
- Dark mode via `.dark` class on `html`.
- Export a Tailwind preset: `@equal-ds/tailwind-preset` (locally as `src/tailwind-preset.ts`, built to `dist`).
- Provide a base CSS file `theme.css` to declare CSS variables (colors, spacing, radius, shadows, z-index). Consumers import once.
- Token model:
  - Color scales: semantic tokens (bg, fg, muted, accent, destructive, ring)
  - Radius: `--radius` (base), `--radius-sm`, `--radius-md`, `--radius-lg`
  - Spacing: `--space-1..12`
  - Shadows: `--shadow-1..3`
  - Transitions: duration, easing

### Tailwind Integration
- Consumers must have Tailwind configured. Provide instructions to:
  - Install peers
  - Import `theme.css`
  - Extend consumer `tailwind.config.{js,ts}` with the library preset
  - Content scanning must include `node_modules/@equal-ds/**` (or this package's name) so classes inside the library are included.

### Build & Distribution
- Build with `tsup`:
  - Formats: `esm`, `cjs`
  - Minify, sourcemap, dts
  - Externalize peers
- `package.json` exports map:
  - `"exports": { ".": { "types": "./dist/index.d.ts", "import": "./dist/index.mjs", "require": "./dist/index.cjs" }, "./theme.css": "./dist/theme.css", "./tailwind-preset": "./dist/tailwind-preset.cjs" }`
- `sideEffects`: include `"*.css"` only.

### Linting & Formatting
- ESLint (typescript, react, react-hooks, jsx-a11y), Prettier
- TS config strict; no `any` in public APIs

### CI/CD
- CI pipeline:
  - Install
  - Lint, typecheck, test (unit + a11y), build
  - Storybook build
- Release via Changesets: versioning, changelog, publish to npm

### Consumer Setup Guide (summary)
1) Install peers: `react`, `react-dom`, `tailwindcss`, `lucide-react`, `@radix-ui/react-*`
2) Install library: `@equal-ds/ui`
3) Import base CSS once (e.g., in `app/layout.tsx` or root):
   ```ts
   import '@equal-ds/ui/theme.css'
   ```
4) Extend Tailwind config:
   ```ts
   import equalPreset from '@equal-ds/ui/tailwind-preset'
   export default {
     presets: [equalPreset],
     content: [
       './src/**/*.{ts,tsx}',
       './node_modules/@equal-ds/ui/**/*.{js,mjs,cjs,ts,tsx}',
     ],
     darkMode: ['class'],
   }
   ```

### Utilities in Library
- `cn(...classes)` merges classes via `tailwind-merge`.
- `slot` helpers for compound components (context + forwardRef patterns).

---

## Page Specification: Consent Management

### Overview
A comprehensive consent management interface for reviewing consent details, creating new consents, and fetching financial data. The page includes filtering capabilities, search functionality, and a detailed data table with extensive columns.

**Figma Reference**: [FinPro Console - Consent Management](https://www.figma.com/design/dI1Z4VPAMnv2lRrFxnS7Xf/FinPro-Console?node-id=5384-965)

### Page Structure

#### 1. Navigation Bar (Collapsed State)
- **Component**: `navbar` (State: Collapsed)
- **Position**: Left side, fixed width
- **Height**: Full viewport height
- **Styling**: 
  - Background: `#FFFFFF`
  - Border: Right border `#E7EDF0` (1px)
  - Padding: 24px 16px (vertical, horizontal)
  - Icon-only state with hover tooltips

#### 2. Main Content Area

##### 2.1 Header Container
- **Layout**: Horizontal flex container with space-between alignment
- **Padding**: 12px
- **Border**: Bottom border `#E7EDF0` (1px)

**2.1.1 Title Section**
- **Title**: "Consent Management"
  - Font: Helvetica Neue, Bold (700)
  - Size: 24px
  - Line height: 1.22em
  - Letter spacing: 2%
  - Color: `#0F3340`
- **Refresh Information**:
  - Icon container: Refresh icon (border radius: 6px)
  - Text: "(Last refreshed on 14:01, 16/04/2025)"
  - Font: Helvetica Neue, Regular (400)
  - Size: 12px
  - Line height: 1.67em
  - Letter spacing: 2%
  - Color: `#919CAB`
- **Subtitle**: "Review consent details, create new consents and fetch financial data."
  - Font: Helvetica Neue, Medium (500)
  - Size: 14px
  - Line height: 1.22em
  - Letter spacing: 2%
  - Color: `#666D78`

**2.1.2 User Info Container**
- **Container**: 
  - Background: `#FFFFFF`
  - Border: `#D9F0FF` (1px)
  - Border radius: 8px
  - Padding: 8px
- **Content**:
  - Avatar: 32x32px circle with initial "A"
    - Background: `#E7EDF0`
    - Border: `#E7EDF0` (0.67px)
  - User Name: "Anand"
    - Font: Helvetica Neue, Medium (500)
    - Size: 14px
    - Color: `#0F3340`
  - User Role: "Admin"
    - Font: Helvetica Neue, Regular (400)
    - Size: 12px
    - Color: `#666D78`
  - Chevron icon (right side)

##### 2.2 Filter Section
- **Container**:
  - Background: `#FFFFFF`
  - Border: `#E7EDF0` (1px)
  - Border radius: 12px
  - Shadow: `shadow-sm` (0px 1px 2px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.1))
  - Padding: 12px
  - Gap: 16px (vertical)

**Filter Header**:
- Title: "Filter By"
  - Font: Helvetica Neue, Medium (500)
  - Size: 20px
  - Line height: 1.22em
  - Letter spacing: 5%
  - Color: `#0F3340`
- Chevron icon (right side)

**Filter Options Container**:
- Layout: Horizontal flex with gap: 24px
- Filter options (5 total):

1. **Consent Template ID**
   - Label: "Consent Template ID"
     - Font: Inter, Medium (500)
     - Size: 12px
     - Color: `#666D78`
   - Dropdown: "All Templates"
     - Background: `#FFFFFF`
     - Border: `#D9F0FF` (1px top/bottom, 2px bottom)
     - Border radius: 8px
     - Padding: 12px
     - Font: Inter, Medium (500)
     - Size: 14px
     - Color: `#0F1012`
   - Chevron-right icon

2. **Purpose Code**
   - Label: "Purpose Code"
   - Dropdown: "All Codes"
   - Same styling as above

3. **Consent Status**
   - Label: "Consent Status"
   - Dropdown: "All Statuses"
   - Same styling as above

4. **Account Aggregator**
   - Label: "Account Aggregator"
   - Dropdown: "All AAs"
   - Same styling as above

5. **Consent Created On**
   - Label: "Consent Created On"
   - Date Range: "12:30 20/06/2025 - 14:30 20/07/2025"
   - Calendar icon (lucide/calendar-days)
   - Same container styling

##### 2.3 Search and Actions Section
- **Container**:
  - Background: `#FFFFFF`
  - Border: `#E7EDF0` (1px)
  - Border radius: 12px
  - Shadow: `shadow-sm`
  - Padding: 12px
  - Gap: 12px (vertical)

**Search Container**:
- **Layout**: Horizontal flex
- **Search Input Container**:
  - Width: 320px
  - Background: `#FFFFFF`
  - Border: `#D9F0FF` (1px)
  - Border radius: 8px (left side)
  - Padding: 12px
  - Search icon (lucide/search)
  - Placeholder: "Search Mobile Numbers"
    - Font: Helvetica Neue, Regular (400)
    - Size: 12px
    - Color: `#919CAB`
- **Filter Container** (Mobile Number):
  - Background: `#E5F5FF`
  - Border: `#D9F0FF` (2px left)
  - Padding: 8px 12px
  - Label: "Mobile Number"
    - Font: Helvetica Neue, Medium (500)
    - Size: 12px
    - Color: `#0F3340`
  - Chevron-up icon

**Icons Container**:
- **Create Consent Button**:
  - Background: `#0F3340`
  - Border: `#021D27` (1px top/left/right, 4px bottom)
  - Border radius: 8px
  - Padding: 12px
  - Height: 48px
  - Icon: add_circle
  - Label: "Create Consent"
    - Font: Helvetica Neue, Medium (500)
    - Size: 16px
    - Color: `#E7EDF0`
- **Download Icon Container**:
  - Background: `#FFFFFF`
  - Border: `#D9F0FF` (1px)
  - Border radius: 8px
  - Padding: 4px
  - Size: 48x48px
  - Download icon

##### 2.4 Data Table

**Table Container**:
- Border: `#D9F0FF` (1px)
- Border radius: 12px (0px top-right, 8px other corners)
- Shadow: `0px 1px 2px rgba(0,0,0,0.05)`
- Overflow: Horizontal and vertical scroll
- Width: Full container width

**Table Header**:
- Background: Linear gradient (180deg, `#F8FEFF` 0%, `#F0F9FF` 100%)
- Border: Bottom `#D9F0FF` (1px)
- Height: 56px
- Padding: 16px 12px (vertical, horizontal)
- Text:
  - Font: Helvetica Neue, Medium (500)
  - Size: 14px
  - Line height: 1.22em
  - Letter spacing: 5%
  - Text transform: UPPERCASE
  - Color: `#01090D`

**Column Headers** (28 columns total):
1. FI DATA
2. DATA REQUEST MODE
3. Data Status
4. Mobile Number
5. VUA
6. Consent STATUS
7. Account ID
8. Consent HANDLE
9. Consent ID
10. Consent Template ID
11. Consent VALIDITY
12. Consent Mode
13. Consent Type
14. Fetch Type
15. FI Data Range
16. Data Life
17. FI Types
18. Frequency
19. Purpose Code
20. Purpose Text
21. Accounts Linked
22. AA ID
23. Consent Created By
24. Consent Created AT
25. Consent ACTED On
26. Download (action column)
27. Request Data (action column)
28. MORE (action column, in separate right-side panel)

**Table Rows**:
- Background: Alternating `#FAFAFA` and `#FFFFFF`
- Border: Right border `#E7EDF0` (1px) between columns
- Padding: 12px per cell
- Text:
  - Font: Helvetica Neue, Regular (400)
  - Size: 14px
  - Line height: 1.19em
  - Color: `#0F1012`

**Status Badges** (in Data Status column):
- **AVAILABLE**: 
  - Background: `#E6F4EC`
  - Color: `#2D8659`
- **UNAVAILABLE**: 
  - Background: `#FAEDED`
  - Color: `#A22F2F`
- **PURGED**: 
  - Background: `#F9ECF3`
  - Color: `#7C3A60`
- **AVAILABLE** (green variant): Same as first
- **ACTIVE**: 
  - Background: `#E6F4EC`
  - Color: `#2D8659`
- **PENDING**: 
  - Background: `#E0F5FF`
  - Color: `#0074A5`
- **REJECTED**: 
  - Background: `#FCF0EE`
  - Color: `#CA7373`
- **REVOKED**: 
  - Background: `#F9ECF3`
  - Color: `#7C3A60`
- **PAUSED**: 
  - Background: `#FFF1DF`
  - Color: `#AC732B`
- **FAILED**: 
  - Background: `#FAEDED`
  - Color: `#A22F2F`

**Badge Styling**:
- Border radius: 6px
- Padding: 4px 6px
- Font: Helvetica Neue, Medium (500)
- Size: 14px
- Line height: 1.22em
- Letter spacing: 5%
- Text transform: UPPERCASE

**Action Columns**:

1. **Download Column**:
   - Button container:
     - Background: `#FFFFFF`
     - Border: `#D9F0FF` (1px)
     - Border radius: 8px
     - Width: 173.96px
     - Height: 32px
     - Padding: 0px 8px
   - Icon: lucide/download
   - Label: "Download"
     - Font: Helvetica Neue, Medium (500)
     - Size: 12px
     - Color: `#0F3340`
   - Dropdown: "PDF"
     - Background: `#F0F9FF`
     - Border: `#C1E4FB` (2px left)
     - Padding: 0px 12px
     - Chevron-up icon

2. **Request Data Column**:
   - Button container:
     - Background: `#FFFFFF`
     - Border: `#D9F0FF` (1px)
     - Border radius: 8px
     - Padding: 12px 16px
   - Icon: lucide/git-pull-request-arrow
   - Label: "Request Data"
     - Font: Helvetica Neue, Medium (500)
     - Size: 12px
     - Color: `#0F3340`
   - Disabled state: 20% opacity

3. **MORE Column** (Right-side panel):
   - Header: "MORE"
     - Background: Gradient (180deg, `#F8FEFF` 0%, `#F0F9FF` 100%)
     - Border: `#C1E4FB` (1px left)
     - Border radius: 0px 8px 0px 0px
     - Padding: 16px
     - Font: Helvetica Neue, Medium (500)
     - Size: 14px
     - Text transform: UPPERCASE
     - Color: `#01090D`
   - Action items: 8 icon buttons
     - Height: 64px
     - Padding: 12px
     - Alternating backgrounds: `#FFFFFF` and `#FAFAFA`

**Special Cell Types**:

- **UUID/ID Cells** (with copy/download):
  - Border: Right `#D9F0FF` (1px)
  - Padding: 12px
  - Layout: Row with gap: 8px
  - Download icon container:
    - Background: `#FFFFFF`
    - Border: `#D9F0FF` (1px)
    - Border radius: 4px
    - Size: 24x24px
    - Padding: 4px

- **Date Range Cells**:
  - Width: 176px
  - Multi-line text
  - Font: Helvetica Neue, Regular (400)
  - Size: 14px
  - Line height: 1.43em
  - Format: "HH:MM:SS, DD MMM YYYY - HH:MM:SS, DD MMM YYYY"

- **Multi-value Cells** (e.g., FI Types, Purpose Text):
  - Layout: Row wrap
  - Gap: 8px
  - Padding: 12px

**Scroll Indicators**:
- Right side vertical scroll indicator (gradient)
- Bottom horizontal scroll indicator (gradient)
- Position: Absolute overlays

##### 2.5 Table Footer

**Footer Container**:
- Background: Linear gradient (180deg, `#F0F9FF` 0%, `#F8FEFF` 100%)
- Border: Top `#C1E4FB` (1px)
- Border radius: 0px 0px 8px 8px
- Padding: 20px 16px
- Layout: Horizontal flex with space-between

**Left Section - Shortcut Info**:
- Layout: Row with gap: 6px
- Elements:
  - Shortcut Key: "Shift"
    - Background: `#FFFFFF`
    - Border: `#E7EDF0` (0.58px)
    - Border radius: 3.45px
    - Padding: 4.61px
    - Box shadow: inset 0px 0px 4.5px rgba(186, 208, 229, 1)
    - Font: Inter, Semi-bold (600)
    - Size: 8px
    - Color: `#919CAB`
  - Text: "Shift +"
    - Font: Inter, Regular (400)
    - Size: 12px
    - Color: `#919CAB`
  - Mouse Icon: 12.67x19px rounded rectangle
  - Text: "Scroll to view all columns"
    - Font: Inter, Regular (400)
    - Size: 12px
    - Color: `#919CAB`
  - Separator: Vertical line `#919CAB` (3x6px)

**Center Section - Rows Info**:
- Label: "Rows per page"
  - Font: Helvetica Neue, Medium (500)
  - Size: 14px
  - Color: `#01090D`
- Dropdown: "10"
  - Layout: Row with gap: 2px
  - Font: Helvetica Neue, Medium (500)
  - Size: 14px
  - Color: `#0F1012`
  - Chevron-down icon

**Right Section - Pagination**:
- Layout: Row with gap: 12px
- Elements:
  - Previous page controls (icon)
  - Page numbers:
    - Active page: "1"
      - Background: `#FFFFFF`
      - Border: `#C1E4FB` (1px top/left/right, 2px bottom)
      - Border radius: 8px
      - Size: 24x24px
      - Font: Helvetica Neue, Medium (500)
      - Size: 12px
      - Color: `#0F3340`
    - Inactive pages: "2", "3"
      - Border: `#E7EDF0` (1px top/left/right, 2px bottom)
      - Font color: `#666D78`
    - Ellipsis: "..."
      - Font color: `#3B3F45`
  - Next page controls (icon)

**Rightmost Section - Edit Columns**:
- Layout: Row with gap: 8px
- Settings icon container:
  - Background: `#FFFFFF`
  - Border: `#D9F0FF` (1px)
  - Border radius: 8px
  - Size: 24x24px
  - Padding: 4px
- Text: "Edit Columns"
  - Font: Helvetica Neue, Medium (500)
  - Size: 12px
  - Color: `#0F3340`

### Component Requirements

#### Required Components

1. **Navbar** (already implemented)
   - Collapsed state support
   - Tooltip on hover for collapsed items

2. **PageHeader**
   - Title with optional refresh timestamp
   - Subtitle
   - User info card with avatar, name, role

3. **FilterSection**
   - Container with filter header
   - Multiple filter dropdowns
   - Date range picker
   - Responsive horizontal layout

4. **SearchBar**
   - Input with search icon
   - Active filter badge
   - Integrated actions (Create button, Download button)

5. **DataTable**
   - Scrollable container (horizontal and vertical)
   - Fixed header row
   - Alternating row backgrounds
   - 28 columns with various data types
   - Action columns (Download, Request Data, MORE)
   - Status badges
   - UUID cells with copy/download

6. **TableFooter**
   - Pagination controls
   - Rows per page selector
   - Keyboard shortcut hints
   - Edit columns button

7. **StatusBadge**
   - Multiple variants (AVAILABLE, UNAVAILABLE, PURGED, ACTIVE, PENDING, REJECTED, REVOKED, PAUSED, FAILED)
   - Consistent styling with color coding

8. **ActionButton** (Download, Request Data)
   - Icon + label
   - Dropdown support (for Download)
   - Disabled state support

### Data Model

#### Consent Record Type
```typescript
interface ConsentRecord {
  fiData: string;
  dataRequestMode: 'AUTOMATIC' | 'MANUAL';
  dataStatus: 'AVAILABLE' | 'UNAVAILABLE' | 'PURGED';
  mobileNumber: string;
  vua: string; // Format: "{mobileNumber}@onemoney"
  consentStatus: 'ACTIVE' | 'PENDING' | 'REJECTED' | 'REVOKED' | 'PAUSED' | 'FAILED';
  accountId: string;
  consentHandle: string;
  consentId: string;
  consentTemplateId: string;
  consentValidity: {
    start: string; // ISO date
    end: string; // ISO date
  };
  consentMode: 'View' | 'Store';
  consentType: string;
  fetchType: 'Onetime' | 'Periodic';
  fiDataRange: {
    start: string; // ISO datetime
    end: string; // ISO datetime
  };
  dataLife: string; // e.g., "5 Months", "5 Days", "5 Years"
  fiTypes: string[]; // e.g., ["Deposit", "Mutual Fund"]
  frequency: string; // e.g., "1x per day", "3x per day"
  purposeCode: string; // e.g., "103", "204", "405"
  purposeText: string; // e.g., "Aggregated statement", "Application log"
  accountsLinked: number;
  aaId: string; // Account Aggregator ID
  consentCreatedBy: string;
  consentCreatedAt: string; // ISO datetime
  consentActedOn: string; // ISO datetime
}
```

### Interactions & Behavior

#### Filter Section
- **Collapsible**: Header can expand/collapse filter options
- **Dropdowns**: Each filter opens a dropdown menu on click
- **Date Range Picker**: Opens calendar widget for date selection
- **State Management**: Selected filters should be visually indicated
- **Reset**: Option to clear all filters

#### Search Bar
- **Real-time Search**: Filter table as user types
- **Filter Badge**: Shows active filter type (e.g., "Mobile Number")
- **Filter Toggle**: Click badge to change filter type or clear
- **Create Button**: Opens consent creation modal/form
- **Download Button**: Opens download options dropdown

#### Data Table
- **Horizontal Scroll**: Table scrolls horizontally to show all columns
- **Vertical Scroll**: Table scrolls vertically for long data sets
- **Column Resizing**: Optional feature for column width adjustment
- **Sorting**: Click column headers to sort (ascending/descending)
- **Row Selection**: Optional checkbox column for bulk actions
- **Row Hover**: Highlight row on hover
- **Action Buttons**:
  - Download: Opens dropdown with format options (PDF, CSV, etc.)
  - Request Data: Triggers data request action (disabled when unavailable)
  - MORE: Opens right-side panel with additional actions

#### Table Footer
- **Pagination**: Navigate between pages
- **Rows Per Page**: Change pagination size (10, 25, 50, 100)
- **Keyboard Shortcuts**: 
  - Shift + Scroll: Horizontal scroll hint
  - Arrow keys: Navigate table cells
  - Enter: Activate row/action
- **Edit Columns**: Opens column visibility/sorting modal

### Accessibility Requirements

#### ARIA Labels
- Table: `aria-label="Consent Management Data Table"`
- Filter section: `aria-label="Filter Consent Records"`
- Search input: `aria-label="Search consent records"`
- Action buttons: Descriptive labels
- Status badges: `aria-label` with status description

#### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Shift+Tab**: Navigate backwards
- **Enter/Space**: Activate buttons, open dropdowns
- **Arrow Keys**: Navigate table cells when focused
- **Escape**: Close dropdowns/modals
- **Home/End**: Jump to first/last row
- **Page Up/Down**: Scroll table

#### Screen Reader Support
- Table headers announced when navigating rows
- Status changes announced
- Filter selections announced
- Pagination state announced
- Loading states announced

#### Focus Management
- Visible focus indicators on all interactive elements
- Focus trap in modals/dropdowns
- Focus returns to trigger after closing dropdowns
- Skip links for main content

#### Color Contrast
- All text meets WCAG 2.1 AA standards
- Status badges have sufficient contrast
- Interactive elements have visible focus states

### Responsive Behavior

#### Desktop (1280px+)
- Full table with all columns visible
- Horizontal scroll for overflow
- Filter section in horizontal layout
- Side-by-side layout for header elements

#### Tablet (768px - 1279px)
- Reduced column visibility (essential columns only)
- Stacked filter layout
- Compact table rows
- Touch-friendly action buttons

#### Mobile (< 768px)
- Card-based layout for table rows
- Vertical filter stacking
- Collapsible sections
- Bottom sheet for actions
- Simplified pagination

### Performance Considerations

#### Virtualization
- Implement virtual scrolling for large datasets (1000+ rows)
- Only render visible rows + buffer
- Lazy load table data as user scrolls

#### Optimization
- Debounce search input (300ms)
- Memoize filter calculations
- Use React.memo for table rows
- Optimize re-renders with useMemo/useCallback

#### Loading States
- Skeleton loaders for table
- Loading indicators for actions
- Progressive data loading

### API Specifications

#### Component APIs

**PageHeader**
```typescript
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  refreshTime?: Date;
  onRefresh?: () => void;
  user?: {
    name: string;
    role: string;
    avatar?: string;
    avatarInitial?: string;
  };
}
```

**FilterSection**
```typescript
interface FilterSectionProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (filters: Record<string, any>) => void;
  onReset?: () => void;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

interface FilterConfig {
  id: string;
  label: string;
  type: 'dropdown' | 'daterange' | 'text';
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
}
```

**SearchBar**
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  filterType?: string;
  onFilterTypeChange?: (type: string) => void;
  onCreateClick?: () => void;
  onDownloadClick?: () => void;
  createButtonLabel?: string;
}
```

**DataTable**
```typescript
interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  sorting?: {
    column: string;
    direction: 'asc' | 'desc';
    onSort: (column: string, direction: 'asc' | 'desc') => void;
  };
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

interface ColumnDef<T> {
  id: string;
  header: string;
  accessor: (row: T) => any;
  cell?: (value: any, row: T) => React.ReactNode;
  width?: number | string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}
```

**StatusBadge**
```typescript
interface StatusBadgeProps {
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'PURGED' | 'ACTIVE' | 'PENDING' | 'REJECTED' | 'REVOKED' | 'PAUSED' | 'FAILED';
  label?: string; // Optional override
  className?: string;
}
```

### File Structure

```
src/components/consent-management/
  ├── ConsentManagementPage.tsx       # Main page component
  ├── PageHeader.tsx                  # Header with title, user info
  ├── FilterSection.tsx               # Filter controls
  ├── SearchBar.tsx                   # Search input and actions
  ├── DataTable/
  │   ├── DataTable.tsx               # Main table component
  │   ├── TableHeader.tsx             # Fixed header row
  │   ├── TableRow.tsx                # Table row component
  │   ├── TableCell.tsx                # Table cell component
  │   ├── ActionColumn.tsx            # Action buttons column
  │   └── MorePanel.tsx                # Right-side MORE panel
  ├── TableFooter.tsx                  # Pagination and controls
  ├── StatusBadge.tsx                 # Status badge component
  ├── ActionButton.tsx                # Download/Request buttons
  └── index.ts                         # Exports
```

### Stories

1. **ConsentManagement/Default**: Full page with sample data
2. **ConsentManagement/EmptyState**: Empty table with message
3. **ConsentManagement/Loading**: Loading skeleton state
4. **ConsentManagement/Filtered**: Table with active filters
5. **ConsentManagement/Sorted**: Table with sorted columns
6. **ConsentManagement/Pagination**: Multiple pages of data
7. **ConsentManagement/StatusVariants**: All status badge variants
8. **ConsentManagement/Responsive**: Mobile/tablet breakpoints

### Tests

#### Unit Tests
- Filter section state management
- Search input debouncing
- Table sorting logic
- Pagination calculations
- Status badge rendering

#### Integration Tests
- Filter + search interaction
- Table pagination + sorting
- Action button clicks
- Download dropdown behavior

#### Accessibility Tests
- Keyboard navigation through table
- Screen reader announcements
- Focus management
- ARIA attributes
- Color contrast ratios

#### Visual Regression Tests
- Table layout at different widths
- Status badge variants
- Filter section states
- Pagination controls

### Implementation Notes

1. **Table Performance**: Use `react-window` or `@tanstack/react-virtual` for virtualization
2. **Date Formatting**: Use `date-fns` or `dayjs` for consistent date formatting
3. **Icons**: Use `lucide-react` for all icons
4. **Animations**: Use CSS transitions, respect `prefers-reduced-motion`
5. **State Management**: Consider using `@tanstack/react-table` for complex table logic
6. **URL State**: Sync filters/pagination/sorting with URL query params for shareable links

---

## Component 01: Sidebar

### Purpose
A responsive, collapsible navigation sidebar supporting nested groups, icons, and badges. Desktop-focused with full width and rail (collapsed) modes; no mobile drawer. Fully accessible and keyboard-navigable.

### Composition API
- `SidebarProvider` (context state)
- `Sidebar` (container, structural nav)
- `SidebarHeader`
- `SidebarContent`
- `SidebarFooter`
- `SidebarGroup` (collapsible section)
- `SidebarGroupLabel`
- `SidebarGroupContent`
- `SidebarMenu`
- `SidebarMenuItem`
- `SidebarMenuButton`
- `SidebarMenuBadge`
- `SidebarSeparator`
- `SidebarRail` (collapsed state hover/tooltip rail)
- `SidebarTrigger` (button to toggle; usable in/out of `Sidebar` via context)

### Behavioral Requirements
- Collapsible:
  - Desktop: full width → rail (icon-only) with tooltips
- Controlled/uncontrolled:
  - Accept `open` and `onOpenChange` for controlled mode
  - `defaultOpen` for uncontrolled
- Keyboard support:
  - `Tab`/`Shift+Tab` traversal
  - `Enter`/`Space` activates buttons
  - Arrow keys navigate within a group (optional roving tabindex)
- ARIA & roles:
  - `nav` landmark with `aria-label`
  - Collapsible groups expose `aria-expanded` and `aria-controls`
  - Active item has `aria-current="page"` when appropriate
- Focus management:
  - Return focus to trigger on close
- Motion:
  - Reduced-motion respect via `@media (prefers-reduced-motion)`

### Visual/Styling Requirements
- Widths:
  - Expanded: 16rem (tailwind `w-64`)
  - Rail: 3.5rem (`w-14`)
- Colors: use semantic tokens (`bg`, `fg`, `muted`, `accent`)
- Borders: subtle separators (`border-border`)
- Radius: tokenized via `--radius`
- States: hover, focus-visible, active, selected; high-contrast outlines via `ring`

### API (props)
- `SidebarProvider`
  - `defaultOpen?: boolean` (default: true)
  - `open?: boolean` (controlled)
  - `onOpenChange?: (open: boolean) => void`
  - `breakpoint?: 'sm' | 'md' | 'lg'` (default: 'md')
  - `side?: 'left' | 'right'` (default: 'left')
- `Sidebar`
  - `className?: string`
  - `variant?: 'floating' | 'inset'` (visual style only)
  - `aria-label?: string` (default: 'Primary')
- `SidebarGroup`
  - `defaultOpen?: boolean`
  - `open?: boolean`
  - `onOpenChange?: (open: boolean) => void`
  - `collapsible?: boolean` (default: true)
- `SidebarMenuItem`
  - `active?: boolean`
  - `disabled?: boolean`
  - `href?: string` (if provided, renders anchor semantics)
  - `onSelect?: () => void`
- `SidebarMenuButton`
  - Forward ref to `button` or `a`
  - Supports `icon` and `endAdornment` slots
  - `label?: string` used for rail tooltips when collapsed; inferred from text children if absent
  - `href?: string` link support, sets `aria-current="page"` when `active`
  - `active?: boolean`, `disabled?: boolean`
- `SidebarTrigger`
  - `className?: string`
  - `srLabel?: string` (default: 'Toggle sidebar')

### Data Model
- Consumers compose items declaratively:
  ```tsx
  <SidebarProvider defaultOpen>
    <Sidebar aria-label="Primary">
      <SidebarHeader>Brand</SidebarHeader>
      <SidebarContent>
        <SidebarGroup defaultOpen>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem active>
                <SidebarMenuButton icon={<Home />}>Home</SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton icon={<Search />} endAdornment={<SidebarMenuBadge>3</SidebarMenuBadge>}>
                  Search
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Profile</SidebarFooter>
    </Sidebar>
    <SidebarTrigger />
  </SidebarProvider>
  ```

### Accessibility Checklist
- Landmark `nav` present and labeled
- Focus trap on mobile drawer
- `aria-expanded` and `aria-controls` for collapsible groups
- `aria-current` on active items
- All buttons reachable via keyboard, visible focus ring
- Meets WCAG 2.1 AA color contrast

### Dependencies for Sidebar
- Radix primitives: `@radix-ui/react-collapsible`, `@radix-ui/react-tooltip`, `@radix-ui/react-visually-hidden`
- Optional: `framer-motion` (peer) for springy animations; otherwise CSS transitions only

### Stories
- `Sidebar/Default`: desktop expanded
- `Sidebar/Rail`: collapsed rail with tooltips
- `Sidebar/Groups`: multiple groups, deep nesting (2 levels only)
- `Sidebar/States`: active, disabled, long labels, with/without icons, with badges
- `Sidebar/RightSide`: right-anchored variant

### Tests
- Unit
  - Open/close transitions update ARIA states correctly
  - Controlled vs. uncontrolled behavior
  - Focus restoration to trigger on close
- A11y
  - Axe violations: none
  - Keyboard navigation across items and groups
- Visual (optional, Playwright)
  - Snapshots for desktop expanded and rail

### Performance
- Avoid layout thrash; use CSS for transitions
- Avoid offscreen heavy trees; lazy tooltip content
- No re-render cascades on hover; memoize menu items

### File Plan (initial)
- `src/components/sidebar/SidebarProvider.tsx`
- `src/components/sidebar/Sidebar.tsx`
- `src/components/sidebar/SidebarHeader.tsx`
- `src/components/sidebar/SidebarContent.tsx`
- `src/components/sidebar/SidebarFooter.tsx`
- `src/components/sidebar/SidebarGroup.tsx`
- `src/components/sidebar/SidebarMenu.tsx` (Item, Button, Badge, Separator)
- `src/components/sidebar/index.ts`
- `src/styles/theme.css` (tokens)
- `src/lib/cn.ts`

### Implementation Notes
- Use compound component pattern with React context for open state and breakpoint.
- Only `SidebarProvider`, `Sidebar`, and `SidebarTrigger` are client components; structural ones remain server-compatible if they don't use state.
- Keep `Sidebar` unopinionated about routing; support `asChild` pattern for `a/Link` when necessary.
- Expose `data-state="open|closed"` and `data-variant` attributes for advanced styling.

---

## Work Plan (MVP)
1) Scaffolding
   - TypeScript, tsup, eslint/prettier, vitest, storybook
   - Add `src/styles/theme.css`, tokens
   - Export Tailwind preset (`src/tailwind-preset.ts`)
2) Utilities
   - `cn`
3) Sidebar (non-animated)
   - Provider, container, trigger, rail
   - Header/Content/Footer
   - Group + Menu primitives
   - Desktop collapse (no mobile drawer)
4) A11y + tests
5) Stories + docs
6) Polish (reduced motion, right-side, variants)

### Non-Goals (for MVP)
- Deep tree navigation with roving tabindex beyond 2 levels
- Persisting open state to storage (can be added later)

---

## Design Tokens Pipeline (design-tokens-sync)

Leverage `design-tokens-sync` to automate syncing tokens from Figma Token Studio and generate outputs the library can consume and ship. Outputs include CSS variables, a Tailwind preset, TypeScript definitions, and a shadcn-compatible theme sheet with dark mode. Reference: [design-tokens-sync on npm](https://www.npmjs.com/package/design-tokens-sync).

### Install
- Dev dependency in this repo: `npm i -D design-tokens-sync`

### Files & Outputs
- Input: `tokens.json` (checked into the repo; exported from Figma Token Studio)
- Generated by the tool (not committed):
  - `src/styles/shadcn-theme.css` (shadcn-ready theme with dark mode)
  - `src/data/tokens.js` and `src/data/tokens.cjs` (runtime tokens)
  - `src/types/tokens.d.ts` (TypeScript typings)
  - `src/styles/_tokens.scss` (optional SCSS)

### Configuration
Create `design-tokens.config.js` at repo root:

```js
export default {
  tokens: {
    input: 'tokens.json',
    validation: {
      required: ['colors'],
      optional: ['spacing', 'typography', 'borderRadius'],
    },
  },
  output: {
    css: 'src/styles/tokens.css',
    shadcnThemeCss: 'src/styles/shadcn-theme.css',
    tailwindPresetEsm: 'tokens.tailwind.preset.js',
    tailwindPresetCjs: 'tokens.tailwind.preset.cjs',
    javascript: 'src/data/tokens.js',
    tokensCjs: 'src/data/tokens.cjs',
    typescript: 'src/types/tokens.d.ts',
    scss: 'src/styles/_tokens.scss',
  },
  css: { includeUtilities: false },
  shadcn: { enable: true, hsl: true, mapping: {} },
  init: { scaffoldRootTailwindConfig: true },
  git: {
    enabled: true,
    autoCommit: true,
    autoPush: false,
    commitMessage: '🎨 Update design tokens',
  },
  analytics: { enabled: true, autoCollect: true },
  watch: { enabled: true, ignore: ['node_modules', '.git', 'dist', 'build'] },
}
```

### NPM Scripts
Add to `package.json`:

```json
{
  "scripts": {
    "tokens:init": "design-tokens-sync init",
    "tokens:sync": "design-tokens-sync sync",
    "tokens:watch": "design-tokens-sync watch",
    "tokens:validate": "design-tokens-sync validate",
    "tokens:analytics": "design-tokens-sync analytics report --format html"
  }
}
```

### How We Integrate in This Library
- We ship `theme.css` to consumers by copying `src/styles/shadcn-theme.css` during build.
- Our Tailwind preset (`@equal-ds/ui/tailwind-preset`) reads CSS variables; no token preset files are needed in the repo.
- Components must use semantic CSS variables, e.g., `bg-[hsl(var(--background))]`, so token updates propagate without code changes.

### Consumer-facing Impact
- Consumers continue to:
  - `import '@equal-ds/ui/theme.css'` once
  - Add `presets: [equalPreset]` (our preset)
- Optional: Consumers running `design-tokens-sync` in their apps can stack their preset before ours to override tokens.

### Tailwind Config (Library Dev and Docs App)
Use the library preset directly during local development:

```ts
// tailwind.config.ts
import preset from './src/tailwind-preset'
export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}'],
  darkMode: ['class'],
}
```

### Usage Examples
- Theme CSS (global import once):
  ```ts
  import '@equal-ds/ui/theme.css'
  // or, locally during library development
  import './src/styles/shadcn-theme.css'
  ```
- In components, rely on CSS variables:
  ```tsx
  <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]" />
  ```
- Programmatic access (internal dev):
  ```ts
  import tokens, { colors, spacing } from './src/data/tokens'
  ```

### CLI Workflow
- One-time init: `npx design-tokens-sync init`
- Manual sync: `npm run tokens:sync`
- Watch during dev: `npm run tokens:watch`
- Validate: `npm run tokens:validate`
- Analytics report: `npm run tokens:analytics`

### CI Automation (optional)
Run on token changes and commit outputs:

```yaml
name: Design Tokens Sync
on:
  push:
    paths: ['tokens.json']
jobs:
  sync-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx design-tokens-sync sync
      - run: git add . && git commit -m "🎨 Update design tokens" || echo "No changes"
      - run: git push || echo "No push on PRs"
```

### Troubleshooting
- Cannot find `tokens.json`: check `design-tokens.config.js` `tokens.input` path
- TypeScript errors: include generated types in `tsconfig.json` via `"types": ["./src/types/tokens.d.ts"]`
- Watch not triggering: exclude heavy dirs (`dist`, `.next`, etc.) in `watch.ignore`
- Tailwind utilities duplication: keep `css.includeUtilities: false`

---

## Consumer Docs (to be written in README after implementation)
- Install peers and library
- Import `theme.css`
- Extend Tailwind with preset; ensure content includes the package
- Usage examples for Sidebar
- Theming guide and token overrides


---

## Implementation Status

- Step 1: Scaffolding initialized
  - Added `package.json`, `tsconfig.json`, `tsup.config.ts`
  - Created `src/index.ts`, `src/styles/theme.css`, `src/tailwind-preset.ts`
  - Build script emits `dist` and copies `theme.css` as an asset
- Step 2: Utilities
  - Added `src/lib/cn.ts` with `clsx` + `tailwind-merge`
  - Exported `cn` from `src/index.ts`
  - Adjusted dependencies: added `clsx` and dev `tailwindcss` for type resolution
- Step 3: Sidebar scaffolding
  - Created `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarMenu` primitives
  - Wired exports via `src/components/sidebar/index.ts` and `src/index.ts`
  - Components render basic structure and data-state attributes; no animations yet
- Step 4: Preview setup
  - Added Storybook (Vite) with Tailwind and theme CSS
  - Created `stories/Sidebar.stories.tsx` for a basic preview
- Step 5: Interaction primitives
  - Added `SidebarTrigger` with `toggle` wired via context
  - Added `SidebarRail` placeholder and updated story to include trigger
- Step 6: Groups & rail behavior
  - Added `SidebarGroupTrigger`; `SidebarMenuButton` shows tooltip labels when collapsed using Radix Tooltip
- Step 7: States & right-side
  - `SidebarMenuButton` now supports `active`, `disabled`, `href` with `aria-current`
  - `Sidebar` adapts border based on side; added RightSide story
- Step 8: Stories expansion
  - Added Rail, States, and Groups stories; installed `@storybook/addon-essentials`
- Step 9: Tests & tokens scaffolding
  - Added Vitest + RTL + jest-axe; basic a11y test passes
  - Added `design-tokens.config.js`, `tokens.json`, and npm scripts for sync
- Step 10: Token sync complete
  - Updated `tokens.json` with complete Token Studio format
  - Generated CSS, Tailwind preset, TypeScript definitions, and shadcn theme
- Next: wire generated theme into build; add build verification and README.
