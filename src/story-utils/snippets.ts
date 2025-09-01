import { resolveControlCssVar, resolveControlValue } from './designTokens'

// Test function to verify snippet generation with exact FinPro story args
export function testSnippetGeneration() {
  const finProArgs = {
    backgroundColor: '--color-background-secondary',
    textColor: '--color-text-primary',
    borderColor: '--color-border-hover',
    fontSize: '--typography-fontSize-base',
    fontWeight: '--typography-fontWeight-medium',
    letterSpacing: '0.025em',
    padding: '--spacing-2',
    borderRadius: '--border-radius-lg',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomWidth: '4px',
    hoverBorderBottomWidth: '3px',
    showLabel: true,
    hoverBackgroundColor: '--color-background-primary',
    hoverTextColor: '--color-text-primary',
    hoverBorderColor: '--color-border-hover',
    hoverBoxShadow: '--shadow-md',
    labelFontSize: '--typography-fontSize-sm',
    labelFontWeight: '--typography-fontWeight-medium',
    labelLetterSpacing: '0.05em',
    labelTextColor: '--color-text-secondary',
    boxShadow: '--component-card-shadow'
  }

  console.log('Testing with exact FinPro story args:', finProArgs)
  const definedProps = extractDefinedProps(finProArgs)
  console.log('Extracted defined props:', definedProps)

  const result = generateFinProSnippet(finProArgs)
  console.log('Generated code preview (first 500 chars):', result.substring(0, 500))
  return result
}

/**
 * Utility to ensure copied code exactly reflects the story
 * This function generates a complete, working code snippet from story args
 */
export function generateExactStoryCode(
  componentName: string,
  storyArgs: any,
  componentImports: string[] = [],
  additionalImports: string[] = [],
  wrapperComponent?: string
): string {
  const definedProps = extractDefinedProps(storyArgs)

  // Build imports
  const allImports = [
    "import React, { useState } from 'react'",
    ...componentImports.map(imp => `import { ${imp} } from 'equal-ds-ui'`),
    ...additionalImports
  ].join('\n')

  // Build prop string
  const propString = Object.entries(definedProps)
    .map(([key, value]) => `  ${key}={${value}}`)
    .join('\n')

  // Generate the component code
  const componentCode = wrapperComponent ?
    `${wrapperComponent}({ ...args })` :
    `<${componentName}\n${propString}\n/>`

  return `${allImports}

${componentCode}`
}

export function generateDropdownSnippet(a: any): string {
  const varBorderColor = resolveControlCssVar(a.borderColor) || 'rgb(var(--border-default))'
  const varBackgroundColor = resolveControlCssVar(a.backgroundColor) || 'rgb(var(--gray-50))'
  const varTextColor = resolveControlCssVar(a.textColor) || 'rgb(var(--text-primary))'
  const varLabelTextColor = resolveControlCssVar(a.labelTextColor) || 'rgb(var(--text-primary))'
  const varHeaderTextColor = resolveControlCssVar(a.headerTextColor) || 'rgb(var(--text-primary))'
  const varHoverBackgroundColor = resolveControlCssVar(a.hoverBackgroundColor) || 'rgb(var(--gray-100))'
  const varHoverBorderColor = resolveControlCssVar(a.hoverBorderColor) || 'rgb(var(--border-hover))'
  const varHoverTextColor = resolveControlCssVar(a.hoverTextColor) || 'rgb(var(--text-primary))'

  const borderTopWidth = a.borderTopWidth || '1px'
  const borderRightWidth = a.borderRightWidth || '1px'
  const borderBottomWidth = a.borderBottomWidth || '1px'
  const borderLeftWidth = a.borderLeftWidth || '1px'
  const sideOffset = a.sideOffset ?? 6
  const contentAlignment = a.contentAlignment || 'start'
  const triggerVariant = a.triggerVariant || 'default'
  const labelSpacing = a.labelSpacing || 'space-y-1'

  return `import React, { useState } from 'react'
// Make sure your app imports the DS theme and typography once (e.g. in your root):
// import 'equal-ds-ui/shadcn-theme.css'
// import 'equal-ds-ui/typography.css'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from 'equal-ds-ui'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'

export function ExampleDropdown({ label = 'User Menu', showLabel = true }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className="${labelSpacing} w-full">
      {showLabel ? (
        <label className="${a.labelTypography || 'text-ui-label'} ${a.labelKerning || ''}"
          style={{ color: '${varLabelTextColor}' }}
        >
          {label}
        </label>
      ) : null}
      <Dropdown>
        <DropdownTrigger
          variant="${triggerVariant}"
          className="transition-all duration-200 w-full"
          style={{
            borderColor: isHovered ? '${varHoverBorderColor}' : '${varBorderColor}',
            backgroundColor: isHovered ? '${varHoverBackgroundColor}' : '${varBackgroundColor}',
            color: '${varTextColor}',
            padding: 'var(--spacing-2)',
            borderRadius: 'var(--radius)',
            borderTopWidth: '${borderTopWidth}',
            borderRightWidth: '${borderRightWidth}',
            borderBottomWidth: isHovered ? '${a.hoverBorderBottomWidth || '2px'}' : '${borderBottomWidth}',
            borderLeftWidth: '${borderLeftWidth}',
            borderStyle: 'solid',
            transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
        >
          <span className="flex-1 text-left ${a.dropdownTextKerning || ''}">{label}</span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent align="${contentAlignment}" sideOffset={${sideOffset}} style={{
          borderColor: '${varBorderColor}',
          backgroundColor: '${varBackgroundColor}',
          borderRadius: 'var(--radius)',
          borderTopWidth: '${borderTopWidth}',
          borderRightWidth: '${borderRightWidth}',
          borderBottomWidth: '${borderBottomWidth}',
          borderLeftWidth: '${borderLeftWidth}',
          borderStyle: 'solid',
        }}>
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}`
}

/**
 * Extracts non-undefined props from the story args to generate accurate code
 */
function extractDefinedProps(args: any): Record<string, any> {
  const definedProps: Record<string, any> = {
    showLabel: true,
    variant: "default",
    disabled: false
  }

  // Only include props that are actually defined (not undefined/null)
  const styleProps = [
    'headerGap', 'dropdownGap', // Layout props
    'backgroundColor', 'textColor', 'borderColor', 'hoverBackgroundColor',
    'hoverTextColor', 'hoverBorderColor', 'fontSize', 'fontWeight',
    'lineHeight', 'letterSpacing', 'padding', 'borderRadius',
    'borderWidth', 'borderStyle', 'borderBottomWidth', 'hoverBorderBottomWidth',
    'boxShadow', 'hoverBoxShadow', 'labelFontSize', 'labelFontWeight',
    'labelLetterSpacing', 'labelTextColor'
  ]

  styleProps.forEach(prop => {
    if (args[prop] !== undefined && args[prop] !== null && args[prop] !== '') {
      const value = args[prop]
      if (typeof value === 'boolean') {
        definedProps[prop] = value
      } else {
        definedProps[prop] = `${value}`
      }
    }
  })

  return definedProps
}

export function generateFinProSnippet(a: any): string {
  // Handle both direct args and CapturedState format
  let storyArgs = a
  if (a && typeof a === 'object' && a.controls) {
    // This is a CapturedState object from SmartCopyCodeButton
    storyArgs = a.controls
  }

  // Extract only the props that are actually defined in the story
  const definedProps = extractDefinedProps(storyArgs)

  // Get the layout values for the template
  const headerGap = storyArgs.headerGap || 'mb-3'
  const dropdownGap = storyArgs.dropdownGap || 'gap-4'

  // Create the actual prop values for the dropdowns (not just the template)
  // Exclude layout props that don't belong on individual dropdown components
  const dropdownProps = Object.entries(definedProps)
    .filter(([key]) => key !== 'label' && key !== 'showLabel' && key !== 'headerGap' && key !== 'dropdownGap') // These are handled separately or are layout props
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return `      ${key}={${value}}`
      } else if (typeof value === 'string' && value.startsWith('--')) {
        // CSS custom properties should be quoted
        return `      ${key}="${value}"`
      } else if (typeof value === 'string' && (value === 'default' || value === 'outline' || value === 'ghost' || value === 'primary' || value === 'destructive')) {
        // Variant values should be quoted
        return `      ${key}="${value}"`
      } else {
        return `      ${key}="${value}"`
      }
    })
    .join('\n')

  return `import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from 'equal-ds-ui'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'

export function ExampleDropdown({
  label,
  showLabel = true,
  variant = 'default',
  disabled = false,
  // Style props from simple controls
  backgroundColor,
  textColor,
  borderColor,
  hoverBackgroundColor,
  hoverTextColor,
  hoverBorderColor,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  padding,
  borderRadius,
  borderWidth,
  borderStyle,
  borderBottomWidth,
  hoverBorderBottomWidth,
  boxShadow,
  hoverBoxShadow,
  // Label typography props
  labelFontSize,
  labelFontWeight,
  labelLetterSpacing,
  labelTextColor
}: {
  label: string
  showLabel?: boolean
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'destructive'
  disabled?: boolean
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
  padding?: string
  borderRadius?: string
  borderWidth?: string
  borderStyle?: string
  borderBottomWidth?: string
  hoverBorderBottomWidth?: string
  boxShadow?: string
  hoverBoxShadow?: string
  // Label typography props
  labelFontSize?: string
  labelFontWeight?: string
  labelLetterSpacing?: string
  labelTextColor?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Simple style generation
  const getTriggerStyles = () => {
    const baseStyles: any = {
      transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
      transition: 'all 0.2s ease-in-out',
    }

    // Apply base styles or hover styles based on hover state
    const bgColor = isHovered && hoverBackgroundColor ? hoverBackgroundColor : backgroundColor
    const txtColor = isHovered && hoverTextColor ? hoverTextColor : textColor
    const brdColor = isHovered && hoverBorderColor ? hoverBorderColor : borderColor
    const shadow = isHovered && hoverBoxShadow ? hoverBoxShadow : boxShadow
    const borderBottomWidthValue = isHovered && hoverBorderBottomWidth ? hoverBorderBottomWidth : borderBottomWidth || '1px'

    // Apply CSS variables directly (they'll be resolved by CSS)
    if (bgColor) baseStyles.backgroundColor = \`var(\${bgColor})\`
    if (txtColor) baseStyles.color = \`var(\${txtColor})\`
    if (brdColor) baseStyles.borderColor = \`var(\${brdColor})\`
    if (fontSize) baseStyles.fontSize = \`var(\${fontSize})\`
    if (fontWeight) baseStyles.fontWeight = \`var(\${fontWeight})\`
    if (lineHeight) baseStyles.lineHeight = \`var(\${lineHeight})\`
    if (letterSpacing) {
      baseStyles.letterSpacing = letterSpacing.startsWith('--') ? \`var(\${letterSpacing})\` : letterSpacing
    }
    if (padding) baseStyles.padding = \`var(\${padding})\`
    if (borderRadius) baseStyles.borderRadius = \`var(\${borderRadius})\`
    if (borderWidth) baseStyles.borderWidth = borderWidth
    if (borderStyle) baseStyles.borderStyle = borderStyle
    if (borderBottomWidthValue) baseStyles.borderBottomWidth = borderBottomWidthValue
    if (shadow) baseStyles.boxShadow = \`var(\${shadow})\`

    return baseStyles
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  const handleMouseDown = () => setIsClicked(true)
  const handleMouseUp = () => setIsClicked(false)

  return (
    <div className="w-full">
      {showLabel && (
        <label
          className="mb-1 block"
          style={{
            fontSize: labelFontSize ? \`var(\${labelFontSize})\` : undefined,
            fontWeight: labelFontWeight ? \`var(\${labelFontWeight})\` : undefined,
            letterSpacing: labelLetterSpacing
              ? (labelLetterSpacing.startsWith('--') ? \`var(\${labelLetterSpacing})\` : labelLetterSpacing)
              : undefined,
            color: labelTextColor ? \`var(\${labelTextColor})\` : undefined,
          }}
        >
          {label}
        </label>
      )}
      <Dropdown>
        <DropdownTrigger
          variant={variant}
          disabled={disabled}
          className="w-full"
          style={getTriggerStyles()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <span className="flex-1 text-left">
            {label}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent
          style={{
            borderColor: borderColor ? \`var(\${borderColor})\` : undefined,
            backgroundColor: backgroundColor ? \`var(\${backgroundColor})\` : undefined,
            borderRadius: borderRadius ? \`var(\${borderRadius})\` : undefined,
          }}
        >
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

export function FinProFilterSection() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white border border-border-default rounded-xl p-3 shadow-md">
        <div className={"flex justify-between items-center " + headerGap}>
          <h3 className="text-lg font-medium text-gray-900">FinPro Filter Section</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-md font-medium transition-colors duration-200 bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200">
              Copy Code
            </button>
          </div>
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 " + dropdownGap + " w-full"}>
          <ExampleDropdown
            label="Consent Template"
            showLabel={true}
${dropdownProps}
          />
          <ExampleDropdown
            label="Purpose Code"
            showLabel={true}
${dropdownProps}
          />
          <ExampleDropdown
            label="Consent Status"
            showLabel={true}
${dropdownProps}
          />
          <ExampleDropdown
            label="Account Aggregator"
            showLabel={true}
${dropdownProps}
          />
          <ExampleDropdown
            label="Consent Created On"
            showLabel={true}
${dropdownProps}
          />
        </div>
      </div>
    </div>
  )
}`
}
