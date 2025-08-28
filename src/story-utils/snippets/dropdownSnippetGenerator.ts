import { BaseSnippetGenerator } from '../snippetGenerator'
import { CapturedState } from '../snippetGenerator'

export class DropdownSnippetGenerator extends BaseSnippetGenerator {
  // Required methods from BaseSnippetGenerator
  generate(args: CapturedState): string {
    // For now, return a simple string since we can't use async in sync context
    // In a real implementation, you might want to make the base class async
    return this.generateSnippetSync(args)
  }

  private generateSnippetSync(args: CapturedState): string {
    const { controls, codeModifications, metadata } = args
    
    // Extract labels from story context - look for hardcoded labels in the FinPro story
    const storyLabels = this.extractStoryLabels(metadata)
    const primaryLabel = storyLabels[0] || "Dropdown"
    
    // Helper function to generate props dynamically from controls
    const generateProps = (controls: any): string => {
      // Filter out props that are already defined or shouldn't be included
      const excludeProps = new Set([
        'showLabel', 'triggerVariant', 'contentAlignment', 'sideOffset',
        'labelTypography', 'labelKerning', 'dropdownTextKerning',
        'textColor', 'hoverTextColor', 'margin', 'gap', 'borderWidth', 'borderStyle'
      ])
      
      return Object.entries(controls)
        .filter(([key, value]) => value !== undefined && value !== null && !excludeProps.has(key))
        .map(([key, value]) => {
          if (typeof value === 'boolean') {
            return `${key} = ${value}`
          } else if (typeof value === 'number') {
            return `${key} = ${value}`
          } else if (typeof value === 'string') {
            return `${key} = "${value}"`
          } else {
            return `${key} = "${value}"`
          }
        })
        .join(',\n  ')
    }
    
    // Helper function to extract clean token names from friendly names
    const extractTokenName = (value: string): string => {
      if (!value) return ''
      
      // If it's already a clean token name, return as is
      if (value.startsWith('--') && !value.includes('(')) {
        return value
      }
      
      // If it's a friendly name like "--color-gray-100 (Gray 100)", extract the token
      if (value.includes('(') && value.includes(')')) {
        // Extract everything before the first opening parenthesis
        const match = value.match(/^([^(]+)/)
        if (match) {
          return match[1].trim()
        }
      }
      
      // If it's a hex color, convert to appropriate design token
      if (value.startsWith('#')) {
        // Map common hex values to design tokens
        const hexToToken: Record<string, string> = {
          '#FFFFFF': '--color-gray-50',
          '#0F3340': '--color-text-primary',
          '#E7EDF0': '--color-border-default',
          '#F8FEFF': '--color-primary-50',
          '#909BAA': '--color-gray-600',
          '#757575': '--color-text-secondary'
        }
        return hexToToken[value] || value
      }
      
      // Return as is for other values
      return value
    }

    // Helper function to build style object with token names
    const buildStyles = () => {
      const styles: Record<string, any> = {}
      
      // Border styles
      if (controls.borderColor) styles.borderColor = extractTokenName(controls.borderColor)
      if (controls.borderRadius) styles.borderRadius = extractTokenName(controls.borderRadius)
      styles.borderStyle = 'solid'
      
      // Individual border widths
      styles.borderTopWidth = controls.borderTopWidth || '1px'
      styles.borderRightWidth = controls.borderRightWidth || '1px'
      styles.borderBottomWidth = controls.borderBottomWidth || '3px'
      styles.borderLeftWidth = controls.borderLeftWidth || '1px'
      
      // Background and text colors (use separate dropdown text color)
      if (controls.backgroundColor) styles.backgroundColor = extractTokenName(controls.backgroundColor)
      if (controls.dropdownTextColor) styles.color = extractTokenName(controls.dropdownTextColor)
      
      // Spacing
      if (controls.padding) styles.padding = extractTokenName(controls.padding)
      
      // Typography for dropdown trigger text
      if (controls.dropdownFontSize) styles.fontSize = extractTokenName(controls.dropdownFontSize)
      if (controls.dropdownFontWeight) styles.fontWeight = extractTokenName(controls.dropdownFontWeight)
      if (controls.dropdownLineHeight) styles.lineHeight = extractTokenName(controls.dropdownLineHeight)
      
      // Shadows
      if (controls.boxShadow) styles.boxShadow = extractTokenName(controls.boxShadow)
      if (controls.shadowDisplacementX !== undefined || controls.shadowDisplacementY !== undefined) {
        const x = controls.shadowDisplacementX || 0
        const y = controls.shadowDisplacementY || -2
        const opacity = controls.shadowOpacity || 1
        // Use design token for shadow if available, otherwise generate custom
        if (controls.boxShadow) {
          styles.boxShadow = extractTokenName(controls.boxShadow)
        } else {
          styles.boxShadow = `${x}px ${y}px 4px rgba(0, 0, 0, ${opacity})`
        }
      }
      
      return styles
    }

    // Helper function to build hover styles with token names
    const buildHoverStyles = () => {
      const hoverStyles: Record<string, any> = {}
      
      if (controls.hoverBackgroundColor) hoverStyles.backgroundColor = extractTokenName(controls.hoverBackgroundColor)
      if (controls.hoverDropdownTextColor) hoverStyles.color = extractTokenName(controls.hoverDropdownTextColor)
      if (controls.hoverBorderColor) hoverStyles.borderColor = extractTokenName(controls.hoverBorderColor)
      if (controls.hoverBorderRadius) hoverStyles.borderRadius = extractTokenName(controls.hoverBorderRadius)
      
      // Individual hover border widths
      if (controls.hoverBorderTopWidth) hoverStyles.borderTopWidth = controls.hoverBorderTopWidth
      if (controls.hoverBorderRightWidth) hoverStyles.borderRightWidth = controls.hoverBorderRightWidth
      if (controls.hoverBorderBottomWidth) hoverStyles.borderBottomWidth = controls.hoverBorderBottomWidth
      if (controls.hoverBorderLeftWidth) hoverStyles.borderLeftWidth = controls.hoverBorderLeftWidth
      
      return hoverStyles
    }

    const styles = buildStyles()
    const hoverStyles = buildHoverStyles()
    
    // Build className for label
    const labelClassName = [
      controls.labelTypography || 'text-ui-label',
      controls.labelKerning || 'tracking-normal'
    ].filter(Boolean).join(' ')
    
    // Build className for dropdown text
    const dropdownTextClassName = [
      'flex-1 text-left',
      controls.dropdownTextKerning || 'tracking-normal'
    ].filter(Boolean).join(' ')

    return `import React, { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from 'equal-ds-ui'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'

export function ExampleDropdown({ 
  // Basic props
  label = "${primaryLabel}",
  showLabel = true,
  triggerVariant = "default",
  contentAlignment = "start",
  sideOffset = 6,
  
  // Styling props that are always needed
  labelTypography = "text-ui-label",
  labelKerning = "tracking-normal",
  dropdownTextKerning = "tracking-normal",
  
  // Dynamic props from controls
  ${generateProps(controls)}
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Use CSS custom properties directly from your design system
  const getTokenValue = (tokenName) => {
    if (!tokenName) return undefined
    return \`var(\${tokenName})\`
  }

  // Dynamic styles based on state
  const getTriggerStyles = () => {
    const baseStyles = {
      borderStyle: 'solid',
      transform: isHovered ? 'translateY(-2px)' : isClicked ? 'translateY(0)' : 'translateY(0)',
      transition: 'all 0.2s ease-in-out',
    }

    // Border widths - individual controls for each side
    if (isHovered) {
      baseStyles.borderTopWidth = hoverBorderTopWidth || borderTopWidth || '1px'
      baseStyles.borderRightWidth = hoverBorderRightWidth || borderRightWidth || '1px'
      baseStyles.borderBottomWidth = hoverBorderBottomWidth || borderBottomWidth || '1px'
      baseStyles.borderLeftWidth = hoverBorderLeftWidth || borderLeftWidth || '1px'
    } else {
      baseStyles.borderTopWidth = borderTopWidth || '1px'
      baseStyles.borderRightWidth = borderRightWidth || '1px'
      baseStyles.borderBottomWidth = borderBottomWidth || '1px'
      baseStyles.borderLeftWidth = borderLeftWidth || '1px'
    }

    // Apply styles using the actual props
    if (borderColor) baseStyles.borderColor = isHovered ? (hoverBorderColor ? getTokenValue(hoverBorderColor) : getTokenValue(borderColor)) : getTokenValue(borderColor)
    if (backgroundColor) baseStyles.backgroundColor = isHovered ? (hoverBackgroundColor ? getTokenValue(hoverBackgroundColor) : getTokenValue(backgroundColor)) : getTokenValue(backgroundColor)
    if (dropdownTextColor) baseStyles.color = isHovered ? (hoverDropdownTextColor ? getTokenValue(hoverDropdownTextColor) : getTokenValue(dropdownTextColor)) : getTokenValue(dropdownTextColor)
    if (padding) baseStyles.padding = getTokenValue(padding)
    if (borderRadius) baseStyles.borderRadius = getTokenValue(borderRadius)
    
    // Typography for dropdown trigger text
    if (dropdownFontSize) baseStyles.fontSize = getTokenValue(dropdownFontSize)
    if (dropdownFontWeight) baseStyles.fontWeight = getTokenValue(dropdownFontWeight)
    if (dropdownLineHeight) baseStyles.lineHeight = getTokenValue(dropdownLineHeight)
    
    // Shadows - handle hover shadow
    if (boxShadow) baseStyles.boxShadow = isHovered ? (hoverBoxShadow ? getTokenValue(hoverBoxShadow) : getTokenValue(boxShadow)) : getTokenValue(boxShadow)
    
    // Handle special cases
    if (shadowDisplacementX !== undefined || shadowDisplacementY !== undefined) {
      const x = shadowDisplacementX || 0
      const y = shadowDisplacementY || -2
      const opacity = shadowOpacity || 1
      if (boxShadow) {
        baseStyles.boxShadow = isHovered ? (hoverBoxShadow ? getTokenValue(hoverBoxShadow) : getTokenValue(boxShadow)) : getTokenValue(boxShadow)
      } else {
        baseStyles.boxShadow = \`\${x}px \${y}px 4px rgba(0, 0, 0, \${opacity})\`
      }
    }

    return baseStyles
  }

  return (
    <div className="space-y-1 w-full">
      {showLabel && (
        <label className={\`\${labelTypography || 'text-ui-label'} \${labelKerning || ''}\`}
          style={{ 
            color: isHovered ? (hoverLabelTextColor ? getTokenValue(hoverLabelTextColor) : getTokenValue(labelTextColor)) : getTokenValue(labelTextColor),
            fontSize: labelFontSize ? getTokenValue(labelFontSize) : undefined,
            fontWeight: labelFontWeight ? getTokenValue(labelFontWeight) : undefined,
            lineHeight: labelLineHeight ? getTokenValue(labelLineHeight) : undefined,
            letterSpacing: labelLetterSpacing ? getTokenValue(labelLetterSpacing) : undefined
          }}
        >
          {label}
        </label>
      )}
      <Dropdown>
        <DropdownTrigger 
          variant={triggerVariant}
          className="w-full"
          style={getTriggerStyles()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
        >
          <span 
            className={\`flex-1 text-left \${dropdownTextKerning}\`}
            style={{
              letterSpacing: dropdownLetterSpacing ? getTokenValue(dropdownLetterSpacing) : undefined
            }}
          >
            {label}
          </span>
          <ChevronDown className="h-4 w-4 opacity-70 flex-shrink-0" />
        </DropdownTrigger>
        <DropdownContent 
          align={contentAlignment}
          sideOffset={sideOffset}
          style={{
            borderTopWidth: borderTopWidth,
            borderRightWidth: borderRightWidth,
            borderBottomWidth: borderBottomWidth,
            borderLeftWidth: borderLeftWidth,
            borderStyle: 'solid',
            ...(borderColor && { borderColor: getTokenValue(borderColor) }),
            ...(backgroundColor && { backgroundColor: getTokenValue(backgroundColor) }),
            ...(borderRadius && { borderRadius: getTokenValue(borderRadius) }),
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

// Usage Examples:
${storyLabels.map(label => `// <ExampleDropdown label="${label}" />`).join('\n')}`
  }

  getComponentName(): string {
    return 'Dropdown'
  }

  getRequiredImports(): string[] {
    return ['Dropdown', 'DropdownTrigger', 'DropdownContent', 'DropdownItem', 'DropdownSeparator']
  }

  getDefaultArgs(): Record<string, any> {
    return {
      label: 'User Menu',
      showLabel: true,
      triggerVariant: 'default'
    }
  }

  private extractStoryLabels(metadata: any): string[] {
    // For FinPro story, we know the labels are hardcoded
    // In the future, this could be enhanced to parse story JSX dynamically
    const knownLabels = [
      "Consent Template",
      "Purpose Code", 
      "Consent Status",
      "Account Aggregator"
    ]
    
    // Check if this is the FinPro story
    if (metadata?.storyName?.toLowerCase().includes('fin pro') || 
        metadata?.storyTitle?.toLowerCase().includes('dropdown')) {
      return knownLabels
    }
    
    // For other stories, return a generic label
    return ["User Menu"]
  }
}
