// Shared token resolution utilities for Storybook code generation
// - resolveControlValue: returns a concrete hex/px value (fallback when needed)
// - resolveControlCssVar: returns a CSS variable reference like `rgb(var(--text-primary))` when available

export function resolveControlValue(friendlyName: string | undefined): string {
  if (!friendlyName) return ''
  if (friendlyName.includes('--color-')) {
    const match = friendlyName.match(/\(([^)]+)\)$/)
    if (match) {
      const name = match[1]
      const colorMap: Record<string, string> = {
        'Default Border': '#E7EDF0',
        'Hover Border': '#C1E4FB',
        'Focus Border': '#0F3340',
        'Gray 600': '#909BAA',
        'Gray 700': '#757575',
        'Gray 800': '#708497',
        'Black': '#000000',
        'Pure White': '#FFFFFF',
        'Primary 50': '#F8FEFF',
        'Gray 100': '#F6FCFF',
        'Gray 200': '#F3F8FC',
        'Gray 300': '#F0F6FA',
        'Gray 400': '#FAFDFF',
        // Text token labels
        'Primary Text': '#0F3340',
        'Secondary Text': '#757575',
        'Tertiary Text': '#909BAA',
        'Muted Text': '#708497',
        'Black Text': '#000000',
        'White Text': '#FFFFFF',
        // Primary token
        'Primary': '#0F3340',
      }
      return colorMap[name] || friendlyName
    }
  } else if (friendlyName.includes('--spacing-')) {
    const match = friendlyName.match(/\([^-]+-\s*(\d+px)\)/)
    if (match) return match[1]
  } else if (friendlyName.includes('--border-radius-')) {
    const match = friendlyName.match(/\([^-]+-\s*(\d+px)\)/)
    if (match) return match[1]
  }
  return friendlyName
}

export function resolveControlCssVar(friendlyName: string | undefined): string | undefined {
  if (!friendlyName) return undefined
  // If a direct color value is provided, return it as-is
  const trimmed = friendlyName.trim()
  // First, handle labeled options like "--color-gray-100 (Gray 100)" by mapping the label
  const labelMatch = trimmed.match(/\(([^)]+)\)$/)
  const label = labelMatch ? labelMatch[1] : undefined

  const labelToVar: Record<string, string> = {
    // Borders
    'Default Border': '--border-default',
    'Hover Border': '--border-hover',
    'Focus Border': '--border-focus',
    // Background grayscale and primary tints
    'Pure White': '--gray-50',
    'Gray 100': '--gray-100',
    'Gray 200': '--gray-200',
    'Gray 300': '--gray-300',
    'Gray 400': '--gray-400',
    'Gray 500': '--gray-500',
    'Gray 600': '--gray-600',
    'Gray 700': '--gray-700',
    'Gray 800': '--gray-800',
    'Black': '--gray-900',
    'Primary 50': '--primary-50',
    // Text tokens
    'Primary Text': '--text-primary',
    'Secondary Text': '--text-secondary',
    'Tertiary Text': '--text-tertiary',
    'Muted Text': '--text-muted',
    'Black Text': '--gray-900',
    'White Text': '--gray-50',
    // Generic primary
    'Primary': '--primary-500',
  }

  const varName = label ? labelToVar[label] : undefined
  if (varName) {
    return `rgb(var(${varName}))`
  }
  // Handle direct values and raw CSS variables
  if (trimmed.startsWith('#') || trimmed.startsWith('rgb(') || trimmed.startsWith('hsl(')) {
    return trimmed
  }
  // If a raw CSS variable name is given, normalize to rgb(var(--...)) when possible
  if (trimmed.startsWith('--')) {
    return `rgb(var(${trimmed}))`
  }
  if (trimmed.startsWith('var(')) {
    // Ensure we wrap with rgb(var(--...)) only once
    const varWrapped = trimmed.replace(/^var\((.*)\)$/, '$1')
    return `rgb(var(${varWrapped}))`
  }
  return undefined
}
