/**
 * Simple Code Generator
 * Generate code snippets from Storybook props
 */

import React from 'react'
import { friendlyNameToCssVariable } from './tokenRegistry'

export interface CodeGeneratorProps {
  // Colors
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string

  // Typography
  fontSize?: string
  fontWeight?: string
  lineHeight?: string

  // Spacing
  padding?: string
  margin?: string
  gap?: string

  // Borders
  borderRadius?: string
  borderWidth?: string
  borderStyle?: string

  // Shadows
  boxShadow?: string
  hoverBoxShadow?: string

  // Component specific
  variant?: string
  size?: string
  disabled?: boolean
  showLabel?: boolean

  // Additional props
  [key: string]: any
}

/**
 * Generate style object from props
 */
function generateStyles(props: CodeGeneratorProps): Record<string, any> {
  const styles: Record<string, any> = {}

  // Colors
  if (props.backgroundColor) styles.backgroundColor = props.backgroundColor
  if (props.textColor) styles.color = props.textColor
  if (props.borderColor) styles.borderColor = props.borderColor

  // Typography
  if (props.fontSize) styles.fontSize = props.fontSize
  if (props.fontWeight) styles.fontWeight = props.fontWeight
  if (props.lineHeight) styles.lineHeight = props.lineHeight

  // Spacing
  if (props.padding) styles.padding = props.padding
  if (props.margin) styles.margin = props.margin
  if (props.gap) styles.gap = props.gap

  // Borders
  if (props.borderRadius) styles.borderRadius = props.borderRadius
  if (props.borderWidth) styles.borderWidth = props.borderWidth
  if (props.borderStyle) styles.borderStyle = props.borderStyle

  // Shadows
  if (props.boxShadow) styles.boxShadow = props.boxShadow

  // Remove undefined values
  Object.keys(styles).forEach(key => {
    if (styles[key] === undefined || styles[key] === null) {
      delete styles[key]
    }
  })

  return styles
}

/**
 * Generate style object for hover states
 */
function generateHoverStyles(props: CodeGeneratorProps): Record<string, any> {
  const styles: Record<string, any> = {}

  // Hover colors
  if (props.hoverBackgroundColor) styles.backgroundColor = props.hoverBackgroundColor
  if (props.hoverTextColor) styles.color = props.hoverTextColor
  if (props.hoverBorderColor) styles.borderColor = props.hoverBorderColor

  // Hover shadows
  if (props.hoverBoxShadow) styles.boxShadow = props.hoverBoxShadow

  // Remove undefined values
  Object.keys(styles).forEach(key => {
    if (styles[key] === undefined || styles[key] === null) {
      delete styles[key]
    }
  })

  return styles
}

/**
 * Convert style object to CSS string
 */
function stylesToCssString(styles: Record<string, any>): string {
  return Object.entries(styles)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
}

/**
 * Generate Dropdown component code
 */
export function generateDropdownCode(props: CodeGeneratorProps, label: string = "Dropdown"): string {
  const styles = generateStyles(props)
  const hoverStyles = generateHoverStyles(props)

  let code = `<Dropdown>
  <DropdownTrigger
    variant="${props.variant || 'default'}"`

  if (props.disabled) {
    code += `\n    disabled={${props.disabled}}`
  }

  if (Object.keys(styles).length > 0) {
    code += `\n    style={{\n${stylesToCssString(styles)}\n    }}`
  }

  code += `>
    ${label}
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownSeparator />
    <DropdownItem>Logout</DropdownItem>
  </DropdownContent>
</Dropdown>`

  // Add hover styles as CSS if present
  if (Object.keys(hoverStyles).length > 0) {
    code += `\n\n/* Hover styles */\n.dropdown-trigger:hover {\n${stylesToCssString(hoverStyles)}\n}`
  }

  return code
}

/**
 * Generate Button component code
 */
export function generateButtonCode(props: CodeGeneratorProps, label: string = "Button"): string {
  const styles = generateStyles(props)
  const hoverStyles = generateHoverStyles(props)

  let code = `<Button`

  if (props.variant && props.variant !== 'default') {
    code += `\n  variant="${props.variant}"`
  }

  if (props.size && props.size !== 'md') {
    code += `\n  size="${props.size}"`
  }

  if (props.disabled) {
    code += `\n  disabled={${props.disabled}}`
  }

  if (Object.keys(styles).length > 0) {
    code += `\n  style={{\n${stylesToCssString(styles)}\n  }}`
  }

  code += `>
  ${label}
</Button>`

  // Add hover styles as CSS if present
  if (Object.keys(hoverStyles).length > 0) {
    code += `\n\n/* Hover styles */\n.button:hover {\n${stylesToCssString(hoverStyles)}\n}`
  }

  return code
}

/**
 * Generate Input component code
 */
export function generateInputCode(props: CodeGeneratorProps, placeholder: string = "Enter text..."): string {
  const styles = generateStyles(props)
  const hoverStyles = generateHoverStyles(props)

  let code = `<Input`

  if (props.disabled) {
    code += `\n  disabled={${props.disabled}}`
  }

  if (Object.keys(styles).length > 0) {
    code += `\n  style={{\n${stylesToCssString(styles)}\n  }}`
  }

  code += `\n  placeholder="${placeholder}"\n/>`

  // Add hover styles as CSS if present
  if (Object.keys(hoverStyles).length > 0) {
    code += `\n\n/* Hover styles */\n.input:hover {\n${stylesToCssString(hoverStyles)}\n}`
  }

  return code
}

/**
 * Generate generic component code
 */
export function generateGenericCode(componentName: string, props: CodeGeneratorProps, children?: string): string {
  const styles = generateStyles(props)
  const hoverStyles = generateHoverStyles(props)

  let code = `<${componentName}`

  // Add component-specific props
  if (props.variant && props.variant !== 'default') {
    code += `\n  variant="${props.variant}"`
  }

  if (props.size && props.size !== 'md') {
    code += `\n  size="${props.size}"`
  }

  if (props.disabled) {
    code += `\n  disabled={${props.disabled}}`
  }

  if (Object.keys(styles).length > 0) {
    code += `\n  style={{\n${stylesToCssString(styles)}\n  }}`
  }

  code += `>`

  if (children) {
    code += `\n  ${children}\n`
  }

  code += `</${componentName}>`

  // Add hover styles as CSS if present
  if (Object.keys(hoverStyles).length > 0) {
    code += `\n\n/* Hover styles */\n.${componentName.toLowerCase()}:hover {\n${stylesToCssString(hoverStyles)}\n}`
  }

  return code
}

/**
 * Main code generation function
 */
export function generateCode(
  componentType: 'dropdown' | 'button' | 'input' | 'generic',
  props: CodeGeneratorProps,
  options: {
    label?: string
    placeholder?: string
    componentName?: string
    children?: string
  } = {}
): string {
  // Convert any friendly names to CSS variables
  const processedProps = { ...props }

  // Process all string props that might be token names
  Object.keys(processedProps).forEach(key => {
    const value = processedProps[key]
    if (typeof value === 'string' && value.startsWith('--')) {
      // Already a CSS variable
      return
    } else if (typeof value === 'string') {
      // Try to convert friendly name to CSS variable
      const cssVar = friendlyNameToCssVariable(value)
      if (cssVar !== value) {
        processedProps[key] = cssVar
      }
    }
  })

  switch (componentType) {
    case 'dropdown':
      return generateDropdownCode(processedProps, options.label)
    case 'button':
      return generateButtonCode(processedProps, options.label)
    case 'input':
      return generateInputCode(processedProps, options.placeholder)
    case 'generic':
      return generateGenericCode(
        options.componentName || 'Component',
        processedProps,
        options.children
      )
    default:
      return generateGenericCode('Component', processedProps)
  }
}

/**
 * Simple Copy Code Button Component
 */
export const SimpleCopyCodeButton: React.FC<{
  componentType: 'dropdown' | 'button' | 'input' | 'generic'
  props: CodeGeneratorProps
  options?: {
    label?: string
    placeholder?: string
    componentName?: string
    children?: string
  }
  className?: string
  children?: React.ReactNode
}> = ({
  componentType,
  props,
  options = {},
  className = '',
  children = 'Copy Code'
}) => {
  const handleCopy = async () => {
    const code = generateCode(componentType, props, options)
    await navigator.clipboard.writeText(code)
  }

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  )
}
