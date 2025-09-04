import * as React from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from './index'
import { useHoverAnimation, HoverIndicator } from '../ui/HoverIndicator'

/**
 * Example component demonstrating the reusable hover animation system
 * This shows how to use the hover animation in a custom dropdown implementation
 */
export function HoverAnimationExample() {
  const { indicator, handleMouseMove, handleMouseLeave, setContainerRef } = useHoverAnimation({
    itemSelector: '[data-custom-item]',
    duration: 200
  })

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Built-in Dropdown with Hover Animation (Fixed)</h2>
        <Dropdown>
          <DropdownTrigger>Open Menu</DropdownTrigger>
          <DropdownContent hoverVariant="primary">
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Billing</DropdownItem>
            <DropdownSeparator />
            <DropdownItem>Sign out</DropdownItem>
          </DropdownContent>
        </Dropdown>
        <p className="text-xs text-text-muted mt-2">
          Smooth hover animation without flickering - matches sidebar behavior
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Custom Implementation with Hover Animation (Anti-Flicker)</h2>
        <div
          ref={setContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-64 p-2 bg-background-secondary border border-border-default rounded-lg shadow-lg space-y-1"
        >
          <HoverIndicator indicator={indicator} variant="accent" duration={150} />
          
          <div data-custom-item className="px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-primary-300/10 transition-colors">
            Custom Item 1
          </div>
          <div data-custom-item className="px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-primary-300/10 transition-colors">
            Custom Item 2
          </div>
          <div data-custom-item className="px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-primary-300/10 transition-colors">
            Custom Item 3
          </div>
          <div data-custom-item className="px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-primary-300/10 transition-colors">
            Custom Item 4
          </div>
        </div>
        <p className="text-xs text-text-muted mt-2">
          Try moving quickly between items - the animation should be smooth without flickering
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Dropdown with Hover Backgrounds (May Flicker)</h2>
        <Dropdown>
          <DropdownTrigger>With Backgrounds</DropdownTrigger>
          <DropdownContent hoverVariant="subtle">
            <DropdownItem enableHoverBackground>Item 1</DropdownItem>
            <DropdownItem enableHoverBackground>Item 2</DropdownItem>
            <DropdownItem enableHoverBackground>Item 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
        <p className="text-xs text-text-muted mt-2">
          Hover backgrounds may interfere with smooth animation
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Dropdown with Disabled Hover Animation</h2>
        <Dropdown>
          <DropdownTrigger>No Animation</DropdownTrigger>
          <DropdownContent enableHoverAnimation={false}>
            <DropdownItem enableHoverBackground>Item 1</DropdownItem>
            <DropdownItem enableHoverBackground>Item 2</DropdownItem>
            <DropdownItem enableHoverBackground>Item 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  )
}
