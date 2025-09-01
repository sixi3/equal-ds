#!/usr/bin/env node

/**
 * Sync Storybook Controls with Design System
 * This script reads the current design tokens and updates the Storybook controls registry
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const tokensJsonPath = path.join(projectRoot, 'tokens.json')
const tokensCssPath = path.join(projectRoot, 'src', 'styles', 'tokens.css')
const typographyCssPath = path.join(projectRoot, 'src', 'styles', 'typography.css')
const tokenRegistryPath = path.join(projectRoot, 'src', 'story-utils', 'tokenRegistry.ts')

/**
 * Parse CSS custom properties from CSS content
 */
function parseCssVariables(cssContent) {
  const variables = {}

  // Split CSS into lines to process more carefully
  const lines = cssContent.split('\n')

  for (const line of lines) {
    // Look for lines that contain custom properties
    const trimmedLine = line.trim()

    // Skip comments and empty lines
    if (trimmedLine.startsWith('/*') || trimmedLine.startsWith('*') || trimmedLine === '' || trimmedLine === '}') {
      continue
    }

    // Match custom property declarations
    const varMatch = trimmedLine.match(/^--([^:]+):\s*([^;]+);$/)
    if (varMatch) {
      const [, name, value] = varMatch
      const cleanName = name.trim()
      const cleanValue = value.trim()

      // Skip if name contains invalid characters or is too complex
      if (cleanName.includes(')') || cleanName.includes('(') || cleanName.includes('\n') ||
          cleanValue.includes('\n') || cleanValue.length > 100) {
        continue
      }

      // Skip if it's referencing other variables in a complex way
      if (cleanValue.includes('var(--') && cleanValue.includes(',')) {
        continue
      }

      variables[cleanName] = cleanValue
    }
  }

  return variables
}

/**
 * Categorize token based on its name
 */
function categorizeToken(name, value) {
  // Color tokens
  if (name.includes('color-')) {
    if (name.includes('text-')) return 'text'
    if (name.includes('background-')) return 'background'
    if (name.includes('border-')) return 'border'
    if (name.includes('primary')) return 'primary'
    if (name.includes('gray')) return 'gray'
    if (name.includes('success')) return 'success'
    if (name.includes('warning')) return 'warning'
    if (name.includes('error')) return 'error'
    if (name.includes('info')) return 'info'
    if (name.includes('neutral')) return 'neutral'
    return 'color'
  }

  // Typography tokens
  if (name.includes('typography-fontSize') || name.includes('font-size')) return 'font-size'
  if (name.includes('typography-fontWeight') || name.includes('font-weight')) return 'font-weight'
  if (name.includes('typography-lineHeight') || name.includes('line-height')) return 'line-height'
  if (name.includes('typography-letterSpacing') || name.includes('letter-spacing')) return 'letter-spacing'
  if (name.includes('typography-fontFamily') || name.includes('font-family')) return 'font-family'

  // Spacing tokens
  if (name.includes('spacing-')) return 'spacing'

  // Border tokens
  if (name.includes('border-radius')) return 'border-radius'

  // Shadow tokens
  if (name.includes('shadow')) return 'shadow'

  return 'other'
}

/**
 * Generate friendly name for token
 */
function generateFriendlyName(name, value) {
  try {
    // Extract the meaningful part of the name
    const parts = name.split('-')
    const category = parts[0]
    const subcategory = parts.slice(1).join('-') || ''

    // Handle different token types
    if (name.includes('color-')) {
      if (name.includes('primary-')) {
        return `Primary ${subcategory.toUpperCase()}`
      }
      if (name.includes('gray-')) {
        return `Gray ${subcategory.toUpperCase()}`
      }
      if (name.includes('text-')) {
        const textType = subcategory.replace('text-', '') || subcategory
        return `${textType.charAt(0).toUpperCase() + textType.slice(1)} Text`
      }
      if (name.includes('background-')) {
        const bgType = subcategory.replace('background-', '') || subcategory
        return `${bgType.charAt(0).toUpperCase() + bgType.slice(1)} Background`
      }
      if (name.includes('border-')) {
        const borderType = subcategory.replace('border-', '') || subcategory
        return `${borderType.charAt(0).toUpperCase() + borderType.slice(1)} Border`
      }
      return subcategory ? `${subcategory.replace('-', ' ').toUpperCase()}` : name.toUpperCase()
    }

    if (name.includes('font-size')) {
      const sizeParts = subcategory.split('-')
      const size = sizeParts[1] || sizeParts[0] || 'default'
      return `${size.toUpperCase()} (${value})`
    }

    if (name.includes('font-weight')) {
      const weightParts = subcategory.split('-')
      const weight = weightParts[1] || weightParts[0] || 'default'
      return `${weight.charAt(0).toUpperCase() + weight.slice(1)} (${value})`
    }

    if (name.includes('line-height')) {
      const heightParts = subcategory.split('-')
      const height = heightParts[1] || heightParts[0] || 'default'
      return `${height.charAt(0).toUpperCase() + height.slice(1)} (${value})`
    }

    if (name.includes('spacing-')) {
      const spacingParts = subcategory.split('-')
      const spacing = spacingParts[1] || spacingParts[0] || 'default'
      return `${spacing.toUpperCase()} (${value})`
    }

    if (name.includes('border-radius')) {
      const radiusParts = subcategory.split('-')
      const radius = radiusParts[1] || radiusParts[0] || 'default'
      return `${radius.charAt(0).toUpperCase() + radius.slice(1)} (${value})`
    }

    if (name.includes('shadow')) {
      const shadowParts = subcategory.split('-')
      const shadowType = shadowParts[1] || shadowParts[0] || 'default'
      return `${shadowType.charAt(0).toUpperCase() + shadowType.slice(1)}`
    }

    return name.replace(/-/g, ' ').toUpperCase()
  } catch (error) {
    console.warn(`⚠️ Error generating friendly name for ${name}:`, error.message)
    return name.replace(/-/g, ' ').toUpperCase()
  }
}

/**
 * Read tokens from tokens.json (primary source)
 */
function readTokensFromJson() {
  console.log('📖 Reading tokens from tokens.json...')

  if (!fs.existsSync(tokensJsonPath)) {
    console.warn('⚠️ tokens.json not found, falling back to CSS parsing')
    return {}
  }

  try {
    const tokensJson = JSON.parse(fs.readFileSync(tokensJsonPath, 'utf8'))
    const variables = {}

    // Extract tokens from the structured JSON
    function extractTokensFromObject(obj, prefix = '') {
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && 'value' in value && 'type' in value) {
          // This is a token definition
          const tokenName = prefix ? `${prefix}-${key}` : key
          if (typeof value.value === 'string') {
            variables[tokenName] = value.value
          }
        } else if (value && typeof value === 'object' && !('value' in value)) {
          // This is a nested object, recurse
          const newPrefix = prefix ? `${prefix}-${key}` : key
          extractTokensFromObject(value, newPrefix)
        }
      }
    }

    // Extract from core tokens
    if (tokensJson.core) {
      extractTokensFromObject(tokensJson.core, 'core')
    }

    // Extract from semantic tokens
    if (tokensJson.semantic) {
      extractTokensFromObject(tokensJson.semantic, 'semantic')
    }

    // Extract from component tokens
    if (tokensJson.component) {
      extractTokensFromObject(tokensJson.component, 'component')
    }

    console.log(`📊 JSON parsing complete: ${Object.keys(variables).length} tokens extracted`)
    const typographyCount = Object.keys(variables).filter(key => key.includes('font')).length
    console.log(`📝 Typography tokens in JSON: ${typographyCount}`)

    return variables
  } catch (error) {
    console.warn('⚠️ Error parsing tokens.json:', error.message)
    return {}
  }
}

/**
 * Read tokens from CSS files (fallback source)
 */
function readTokensFromCss() {
  console.log('📖 Reading tokens from CSS files...')

  let allVariables = {}

  // Read main tokens CSS
  if (fs.existsSync(tokensCssPath)) {
    const tokensCss = fs.readFileSync(tokensCssPath, 'utf8')
    allVariables = { ...allVariables, ...parseCssVariables(tokensCss) }
  }

  // Read typography CSS
  if (fs.existsSync(typographyCssPath)) {
    const typographyCss = fs.readFileSync(typographyCssPath, 'utf8')
    allVariables = { ...allVariables, ...parseCssVariables(typographyCss) }
  }

  return allVariables
}

/**
 * Read tokens from all sources
 */
function readAllTokens() {
  const jsonTokens = readTokensFromJson()
  const cssTokens = readTokensFromCss()

  // Merge tokens, with JSON tokens taking precedence
  return { ...cssTokens, ...jsonTokens }
}

/**
 * Generate the token registry TypeScript file
 */
function generateTokenRegistry(variables) {
  console.log('🔧 Generating token registry...')

  const tokens = {
    colors: [],
    typography: [],
    spacing: [],
    borders: [],
    shadows: []
  }

  // Process each variable
  Object.entries(variables).forEach(([name, value]) => {
    const category = categorizeToken(name, value)
    const friendlyName = generateFriendlyName(name, value)

    const token = {
      name: name.replace(/-/g, ''),
      value,
      cssVariable: `--${name}`,
      category,
      friendlyName
    }

    // Debug typography tokens
    if (name.includes('typography') || name.includes('font')) {
      console.log(`🔤 Typography token: ${name} -> category: ${category}`)
    }

    // Add to appropriate category
    if (category === 'color' || category === 'primary' || category === 'gray' || category === 'text' || category === 'background' || category === 'border' || category === 'success' || category === 'warning' || category === 'error' || category === 'info' || category === 'neutral') {
      tokens.colors.push(token)
    } else if (['font-size', 'font-weight', 'line-height', 'letter-spacing', 'font-family'].includes(category)) {
      tokens.typography.push(token)
    } else if (category === 'spacing') {
      tokens.spacing.push(token)
    } else if (category === 'border-radius') {
      tokens.borders.push(token)
    } else if (category === 'shadow') {
      tokens.shadows.push(token)
    }
  })

  // Generate TypeScript code
  const code = `/**
 * Design Token Registry
 * Auto-generated from design system tokens
 * DO NOT EDIT MANUALLY - This file is auto-generated
 */

export interface DesignToken {
  name: string
  value: string
  cssVariable: string
  category: string
  friendlyName: string
}

export interface TokenCategories {
  colors: DesignToken[]
  typography: DesignToken[]
  spacing: DesignToken[]
  borders: DesignToken[]
  shadows: DesignToken[]
}

// Auto-generated token definitions from design system
export const TOKEN_REGISTRY: TokenCategories = ${JSON.stringify(tokens, null, 2)}

// Helper functions to get tokens by category
export function getColorTokens(): DesignToken[] {
  return TOKEN_REGISTRY.colors
}

export function getTypographyTokens(): DesignToken[] {
  return TOKEN_REGISTRY.typography
}

export function getSpacingTokens(): DesignToken[] {
  return TOKEN_REGISTRY.spacing
}

export function getBorderTokens(): DesignToken[] {
  return TOKEN_REGISTRY.borders
}

export function getShadowTokens(): DesignToken[] {
  return TOKEN_REGISTRY.shadows
}

export function getAllTokens(): DesignToken[] {
  return [
    ...TOKEN_REGISTRY.colors,
    ...TOKEN_REGISTRY.typography,
    ...TOKEN_REGISTRY.spacing,
    ...TOKEN_REGISTRY.borders,
    ...TOKEN_REGISTRY.shadows
  ]
}

// Helper to find token by CSS variable name
export function findTokenByCssVariable(cssVariable: string): DesignToken | undefined {
  return getAllTokens().find(token => token.cssVariable === cssVariable)
}

// Helper to convert friendly name back to CSS variable
export function friendlyNameToCssVariable(friendlyName: string): string {
  const token = getAllTokens().find(t => t.friendlyName === friendlyName)
  return token?.cssVariable || friendlyName
}
`

  return code
}

/**
 * Main sync function
 */
function syncStorybookTokens() {
  try {
    console.log('🚀 Starting Storybook token sync...')

    // Read current tokens from all sources
    const variables = readAllTokens()

    console.log(`📊 Found ${Object.keys(variables).length} tokens`)

    // Debug: Check what typography tokens we found
    const typographyTokens = Object.keys(variables).filter(key => key.includes('font') || key.includes('typography'))
    console.log(`🔍 Typography tokens found: ${typographyTokens.length}`)
    if (typographyTokens.length > 0) {
      console.log('Sample typography tokens:', typographyTokens.slice(0, 5))
    }

    // Generate token registry
    const registryCode = generateTokenRegistry(variables)

    // Write to file
    fs.writeFileSync(tokenRegistryPath, registryCode, 'utf8')

    console.log('✅ Storybook token registry updated successfully!')
    console.log(`📁 Generated: ${tokenRegistryPath}`)
    console.log(`🎨 Colors: ${Object.keys(variables).filter(k => k.includes('color')).length}`)
    console.log(`📝 Typography: ${Object.keys(variables).filter(k => k.includes('font') || k.includes('letter')).length}`)
    console.log(`📐 Spacing: ${Object.keys(variables).filter(k => k.includes('spacing')).length}`)
    console.log(`🔲 Borders: ${Object.keys(variables).filter(k => k.includes('border')).length}`)
    console.log(`🌟 Shadows: ${Object.keys(variables).filter(k => k.includes('shadow')).length}`)

  } catch (error) {
    console.error('❌ Error syncing Storybook tokens:', error)
    process.exit(1)
  }
}

// Run the sync
syncStorybookTokens()
