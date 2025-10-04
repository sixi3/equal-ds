import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TabSwitcher, type TabItem } from '../src'

expect.extend(toHaveNoViolations)

// Sample test data
const horizontalTabs: TabItem[] = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
]

const cardTabs: TabItem[] = [
  { id: 'session1', label: 'SESSION', status: 'active', metadata: 'abc123' },
  { id: 'session2', label: 'SESSION', status: 'failed', metadata: 'def456' },
]

describe('TabSwitcher', () => {
  describe('Horizontal Tabs', () => {
    it('renders horizontal tabs correctly', () => {
      render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab1"
          onTabChange={() => {}}
          variant="horizontal"
        />
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getByText('Tab 1')).toBeInTheDocument()
      expect(screen.getByText('Tab 2')).toBeInTheDocument()
      expect(screen.getByText('Tab 3')).toBeInTheDocument()
    })

    it('shows active tab styling', () => {
      render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab2"
          onTabChange={() => {}}
          variant="horizontal"
        />
      )

      const activeTab = screen.getByText('Tab 2')
      expect(activeTab).toHaveAttribute('aria-selected', 'true')
      expect(activeTab).toHaveAttribute('tabindex', '0')
    })

    it('calls onTabChange when tab is clicked', async () => {
      const user = userEvent.setup()
      const mockOnChange = vi.fn()

      render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab1"
          onTabChange={mockOnChange}
          variant="horizontal"
        />
      )

      await user.click(screen.getByText('Tab 2'))

      expect(mockOnChange).toHaveBeenCalledWith('tab2')
      expect(mockOnChange).toHaveBeenCalledTimes(1)
    })

    it('supports keyboard focus management', () => {
      render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab2"
          onTabChange={() => {}}
          variant="horizontal"
        />
      )

      // Active tab should have tabindex 0
      const activeTab = screen.getByText('Tab 2')
      expect(activeTab).toHaveAttribute('tabindex', '0')

      // Inactive tabs should have tabindex -1
      const inactiveTabs = screen.getAllByRole('tab', { selected: false })
      inactiveTabs.forEach(tab => {
        expect(tab).toHaveAttribute('tabindex', '-1')
      })
    })
  })

  describe('Card Tabs', () => {
    it('renders card tabs correctly', () => {
      render(
        <TabSwitcher
          tabs={cardTabs}
          activeTab="session1"
          onTabChange={() => {}}
          variant="cards"
        />
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getByText('Active')).toBeInTheDocument()
      expect(screen.getByText('Failed')).toBeInTheDocument()
      expect(screen.getByText('abc123')).toBeInTheDocument()
      expect(screen.getByText('def456')).toBeInTheDocument()
    })

    it('displays status badges correctly', () => {
      render(
        <TabSwitcher
          tabs={cardTabs}
          activeTab="session1"
          onTabChange={() => {}}
          variant="cards"
        />
      )

      expect(screen.getByText('Active')).toBeInTheDocument()
      expect(screen.getByText('Failed')).toBeInTheDocument()
    })

    it('displays metadata correctly', () => {
      render(
        <TabSwitcher
          tabs={cardTabs}
          activeTab="session1"
          onTabChange={() => {}}
          variant="cards"
        />
      )

      expect(screen.getByText('abc123')).toBeInTheDocument()
      expect(screen.getByText('def456')).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('prevents tab changes when component is disabled', async () => {
      const user = userEvent.setup()
      const mockOnChange = vi.fn()

      render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab1"
          onTabChange={mockOnChange}
          disabled={true}
          variant="horizontal"
        />
      )

      await user.click(screen.getByText('Tab 2'))

      expect(mockOnChange).not.toHaveBeenCalled()
    })

    it('prevents tab changes for disabled individual tabs', async () => {
      const user = userEvent.setup()
      const mockOnChange = vi.fn()
      const tabsWithDisabled = [
        ...horizontalTabs,
        { id: 'disabled-tab', label: 'Disabled', disabled: true },
      ]

      render(
        <TabSwitcher
          tabs={tabsWithDisabled}
          activeTab="tab1"
          onTabChange={mockOnChange}
          variant="horizontal"
        />
      )

      await user.click(screen.getByText('Disabled'))

      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab1"
          onTabChange={() => {}}
          variant="horizontal"
        />
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('sets correct ARIA attributes', () => {
      render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab2"
          onTabChange={() => {}}
          variant="horizontal"
        />
      )

      const tablist = screen.getByRole('tablist')
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')

      const activeTab = screen.getByRole('tab', { selected: true })
      expect(activeTab).toHaveAttribute('aria-selected', 'true')

      const inactiveTabs = screen.getAllByRole('tab', { selected: false })
      inactiveTabs.forEach(tab => {
        expect(tab).toHaveAttribute('aria-selected', 'false')
      })
    })

    it('sets correct tabindex values', () => {
      render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab2"
          onTabChange={() => {}}
          variant="horizontal"
        />
      )

      const activeTab = screen.getByText('Tab 2')
      expect(activeTab).toHaveAttribute('tabindex', '0')

      const inactiveTabs = screen.getAllByRole('tab', { selected: false })
      inactiveTabs.forEach(tab => {
        expect(tab).toHaveAttribute('tabindex', '-1')
      })
    })
  })

  describe('Custom Render Function', () => {
    it('uses custom renderTab when provided', () => {
      const customRenderTab = vi.fn((tab, isActive, onClick) => (
        <button key={tab.id} onClick={onClick} data-testid={`custom-${tab.id}`}>
          Custom {tab.label}
        </button>
      ))

      render(
        <TabSwitcher
          tabs={horizontalTabs}
          activeTab="tab1"
          onTabChange={() => {}}
          variant="horizontal"
          renderTab={customRenderTab}
        />
      )

      expect(screen.getByTestId('custom-tab1')).toBeInTheDocument()
      expect(screen.getByTestId('custom-tab2')).toBeInTheDocument()
      expect(screen.getByTestId('custom-tab3')).toBeInTheDocument()
      expect(customRenderTab).toHaveBeenCalledTimes(3)
    })
  })
})
