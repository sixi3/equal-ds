import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../src'

expect.extend(toHaveNoViolations)

describe('Sidebar a11y', () => {
  it('has no basic accessibility violations', async () => {
    const { container } = render(
      <SidebarProvider defaultOpen>
        <Sidebar aria-label="Primary">
          <SidebarHeader>Brand</SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Home</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})


