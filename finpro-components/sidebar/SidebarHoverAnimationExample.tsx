import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownContentMultiselect } from '../../src'
import { createTriggerStyles, getDropdownContentStyles } from './finpro-sidebar-utils'
import './finpro-sidebar-styles.css'

/**
 * Example demonstrating hover animations for dropdown triggers
 * This shows how the trigger styles change on hover and click
 */
export const HoverAnimationExample: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const triggerStyles = createTriggerStyles(isHovered, isClicked)
  const dropdownStyles = getDropdownContentStyles()

  const options = [
    { value: 'option-1', label: 'Option One' },
    { value: 'option-2', label: 'Option Two' },
    { value: 'option-3', label: 'Option Three' },
    { value: 'option-4', label: 'Option Four' },
    { value: 'option-5', label: 'Option Five' },
  ]

  const [selectedValues, setSelectedValues] = useState<string[]>(
    options.map(option => option.value)
  )

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Hover Animation Demo
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interactive Dropdown
            </label>

            <Dropdown>
              <DropdownTrigger
                variant="default"
                className="w-full finpro-sidebar-trigger-hover"
                style={triggerStyles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={() => setIsClicked(true)}
                onMouseUp={() => setIsClicked(false)}
              >
                <span className="flex-1 text-left">
                  {selectedValues.length === options.length
                    ? 'All Options Selected'
                    : selectedValues.length === 0
                    ? 'None Selected'
                    : `${selectedValues.length} selected`
                  }
                </span>
              </DropdownTrigger>

              <DropdownContentMultiselect
                options={options}
                selectedValues={selectedValues}
                onSelectionChange={setSelectedValues}
                enableSelectAll={true}
                selectAllLabel="All Options"
                enableSearch={true}
                searchPlaceholder="Search options"
                maxHeight="200px"
                style={dropdownStyles}
              />
            </Dropdown>
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Hovered:</span>
              <span className={isHovered ? 'text-green-600 font-semibold' : 'text-gray-400'}>
                {isHovered ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Clicked:</span>
              <span className={isClicked ? 'text-blue-600 font-semibold' : 'text-gray-400'}>
                {isClicked ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
            <p className="font-medium mb-2">Animation Features:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Transform: translateY(-1px) on hover</li>
              <li>Smooth transition with 0.2s ease-in-out</li>
              <li>Background color changes on hover</li>
              <li>Border color and shadow effects</li>
              <li>Click state feedback</li>
            </ul>
          </div>
        </div>

        {/* Multiple triggers example */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Multiple Hover Triggers
          </h3>

          <div className="space-y-4">
            {['Template', 'Status', 'Priority'].map((label, index) => (
              <HoverTriggerDemo
                key={label}
                label={label}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Individual hover trigger demo component
 */
interface HoverTriggerDemoProps {
  label: string
  delay?: number
}

const HoverTriggerDemo: React.FC<HoverTriggerDemoProps> = ({ label, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const triggerStyles = createTriggerStyles(isHovered, isClicked)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} Filter
      </label>

      <Dropdown>
        <DropdownTrigger
          variant="default"
          className="w-full finpro-sidebar-trigger-hover"
          style={{
            ...triggerStyles,
            transitionDelay: `${delay}ms`
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
        >
          <span className="flex-1 text-left text-gray-500">
            Select {label.toLowerCase()}...
          </span>
        </DropdownTrigger>

        <DropdownContentMultiselect
          options={[
            { value: `${label.toLowerCase()}-1`, label: `${label} One` },
            { value: `${label.toLowerCase()}-2`, label: `${label} Two` },
            { value: `${label.toLowerCase()}-3`, label: `${label} Three` },
          ]}
          selectedValues={[]}
          onSelectionChange={() => {}}
          enableSelectAll={true}
          selectAllLabel={`All ${label}s`}
          maxHeight="150px"
          style={getDropdownContentStyles()}
        />
      </Dropdown>
    </div>
  )
}

/**
 * Advanced hover animation example with CSS animations
 */
export const AdvancedHoverExample: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Advanced Hover Animations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Smooth transform example */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Smooth Transform
            </h3>
            <HoverTriggerDemo label="Smooth" />
            <p className="text-sm text-gray-600 mt-3">
              Gentle upward movement with smooth transitions
            </p>
          </div>

          {/* Delayed animation example */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Staggered Animation
            </h3>
            <div className="space-y-3">
              {['First', 'Second', 'Third'].map((label, index) => (
                <HoverTriggerDemo
                  key={label}
                  label={label}
                  delay={index * 150}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Each trigger animates with a slight delay
            </p>
          </div>
        </div>

        {/* Interactive state display */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Animation States
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StateIndicator label="Default" color="bg-gray-100" />
            <StateIndicator label="Hover" color="bg-blue-100" />
            <StateIndicator label="Active" color="bg-green-100" />
            <StateIndicator label="Focus" color="bg-purple-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * State indicator component for animation demo
 */
interface StateIndicatorProps {
  label: string
  color: string
}

const StateIndicator: React.FC<StateIndicatorProps> = ({ label, color }) => {
  return (
    <div className={`p-4 rounded-lg ${color} text-center`}>
      <div className="text-sm font-medium text-gray-800">{label}</div>
      <div className="text-xs text-gray-600 mt-1">State</div>
    </div>
  )
}

export default HoverAnimationExample
