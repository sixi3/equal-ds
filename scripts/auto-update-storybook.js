#!/usr/bin/env node

/**
 * Automatically updates Storybook stories with latest generated controls
 * This eliminates the need for manual copy-paste when tokens change
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the generated controls
const controlsPath = path.join(__dirname, '../src/storybook-controls.ts');
const storyPath = path.join(__dirname, '../stories/Dropdown.stories.tsx');

// Read the generated controls
const controlsContent = fs.readFileSync(controlsPath, 'utf8');
const storyContent = fs.readFileSync(storyPath, 'utf8');

// Extract the controls object
const controlsMatch = controlsContent.match(/export const STORYBOOK_CONTROLS = ({[\s\S]*?});/);
if (!controlsMatch) {
  console.error('❌ Could not find STORYBOOK_CONTROLS in generated file');
  process.exit(1);
}

const controlsObject = controlsMatch[1];

// Create the updated story content
const updatedStoryContent = `import './tailwind.css'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '../src'
import { ChevronDown, Settings, User, LogOut, CreditCard } from 'lucide-react'

// Auto-generated controls - DO NOT EDIT MANUALLY
// Run 'npm run auto:update' to regenerate
const AUTO_GENERATED_CONTROLS = ${controlsObject};

// Design token mappings for better control labels
const TOKEN_MAPPINGS = {
  borderColors: {
    '#E7EDF0': '--color-border-default (Default)',
    '#C1E4FB': '--color-border-hover (Hover)',
    '#0F3340': '--color-border-focus (Focus)',
    '#909BAA': '--color-gray-600',
    '#757575': '--color-gray-700',
  },
  backgroundColors: {
    '#FFFFFF': '--color-gray-50 (White)',
    '#F8FEFF': '--color-primary-50',
    '#F6FCFF': '--color-gray-100',
    '#F3F8FC': '--color-gray-200',
    '#F0F6FA': '--color-gray-300',
  },
  textColors: {
    '#0F3340': '--color-text-primary (Primary)',
    '#757575': '--color-text-secondary (Secondary)',
    '#909BAA': '--color-text-tertiary (Tertiary)',
    '#708497': '--color-text-muted (Muted)',
    '#000000': '--color-gray-900 (Black)',
  },
  spacing: {
    '0.25rem': '--spacing-1 (XS - 4px)',
    '0.5rem': '--spacing-2 (S - 8px)',
    '0.75rem': '--spacing-3 (M - 12px)',
    '1rem': '--spacing-4 (L - 16px)',
    '1.5rem': '--spacing-6 (XL - 24px)',
    '2rem': '--spacing-8 (2XL - 32px)',
  },
  borderRadius: {
    '0': '--border-radius-none (None)',
    '0.125rem': '--border-radius-sm (Small)',
    '0.25rem': '--border-radius-base (Base)',
    '0.375rem': '--border-radius-md (Medium)',
    '0.5rem': '--border-radius-lg (Large)',
    '0.75rem': '--border-radius-xl (XL)',
    '1rem': '--border-radius-2xl (2XL)',
  },
}

// Helper function to get token label
const getTokenLabel = (value: string, category: keyof typeof TOKEN_MAPPINGS) => {
  return TOKEN_MAPPINGS[category][value] || value
}

// Enhanced descriptions with token information
const getEnhancedDescription = (value: string, category: keyof typeof TOKEN_MAPPINGS) => {
  const tokenLabel = getTokenLabel(value, category)
  return \`\${tokenLabel} - Use this value in your CSS: \${value}\`
}

const meta = {
  title: 'Actions/Dropdown',
  parameters: { 
    layout: 'padded',
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: AUTO_GENERATED_CONTROLS, // Use auto-generated controls
} satisfies Meta

export default meta
type Story = StoryObj

function ExampleDropdown({ 
  label, 
  borderColor = '#E7EDF0',
  backgroundColor = '#FFFFFF',
  textColor = '#0F3340',
  padding = '1rem',
  borderRadius = '0.375rem',
  triggerVariant = 'default',
  contentAlignment = 'start',
  sideOffset = 6,
}: { 
  label: string
  borderColor?: string
  backgroundColor?: string
  textColor?: string
  padding?: string
  borderRadius?: string
  triggerVariant?: string
  contentAlignment?: 'start' | 'center' | 'end'
  sideOffset?: number
}) {
  const getTriggerClasses = () => {
    const baseClasses = 'inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50'
    
    switch (triggerVariant) {
      case 'outline':
        return \`\${baseClasses} bg-transparent border-2\`
      case 'ghost':
        return \`\${baseClasses} border-transparent bg-transparent hover:bg-accent/20\`
      case 'destructive':
        return \`\${baseClasses} border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90\`
      default:
        return \`\${baseClasses} bg-background text-foreground\`
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger 
        className={getTriggerClasses()}
        style={{
          borderColor,
          backgroundColor: triggerVariant === 'default' ? backgroundColor : undefined,
          color: textColor,
          padding,
          borderRadius,
        }}
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4 opacity-70" />
      </DropdownTrigger>
      <DropdownContent 
        align={contentAlignment}
        sideOffset={sideOffset}
        style={{
          borderColor,
          backgroundColor,
          borderRadius,
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
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownItem>
        <DropdownItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown label="User Menu" {...args} />
    </div>
  ),
  args: {
    borderColor: '#E7EDF0',
    backgroundColor: '#FFFFFF',
    textColor: '#0F3340',
    padding: '1rem',
    borderRadius: '0.375rem',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
  },
}

export const MultipleDropdowns: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown label="User Menu" {...args} />
      <ExampleDropdown label="Settings" {...args} />
      <ExampleDropdown label="Actions" {...args} />
      <ExampleDropdown label="More" {...args} />
    </div>
  ),
  args: {
    borderColor: '#E7EDF0',
    backgroundColor: '#FFFFFF',
    textColor: '#0F3340',
    padding: '1rem',
    borderRadius: '0.375rem',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
  },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown label="Default" {...args} triggerVariant="default" />
      <ExampleDropdown label="Outline" {...args} triggerVariant="outline" />
      <ExampleDropdown label="Ghost" {...args} triggerVariant="ghost" />
      <ExampleDropdown label="Destructive" {...args} triggerVariant="destructive" />
    </div>
  ),
  args: {
    borderColor: '#E7EDF0',
    backgroundColor: '#FFFFFF',
    textColor: '#0F3340',
    padding: '1rem',
    borderRadius: '0.375rem',
    contentAlignment: 'start',
    sideOffset: 6,
  },
}

export const CustomColors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4 p-8">
      <ExampleDropdown 
        label="Primary Theme" 
        {...args} 
        borderColor="#0F3340"
        backgroundColor="#F8FEFF"
        textColor="#0F3340"
      />
      <ExampleDropdown 
        label="Gray Theme" 
        {...args} 
        borderColor="#909BAA"
        backgroundColor="#F3F8FC"
        textColor="#757575"
      />
      <ExampleDropdown 
        label="Accent Theme" 
        {...args} 
        borderColor="#C1E4FB"
        backgroundColor="#F0F6FA"
        textColor="#0074A5"
      />
    </div>
  ),
  args: {
    padding: '1rem',
    borderRadius: '0.375rem',
    triggerVariant: 'default',
    contentAlignment: 'start',
    sideOffset: 6,
  },
}

export const DesignTokens: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Available Design Tokens</h3>
        <p className="text-sm text-muted-foreground mb-6">
          These are the design tokens you can use in the controls above. Each token has a CSS variable name and a hex value.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Border Colors */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Border Colors</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.borderColors).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div 
                    className="w-4 h-4 rounded border-2" 
                    style={{ borderColor: value, backgroundColor: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Background Colors */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Background Colors</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.backgroundColors).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text Colors */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Text Colors</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.textColors).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Spacing Scale</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.spacing).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded bg-primary" />
                    <div className="text-xs text-muted-foreground">•</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Border Radius</h4>
            <div className="space-y-2">
              {Object.entries(TOKEN_MAPPINGS.borderRadius).map(([value, label]) => (
                <div key={value} className="flex items-center gap-3 p-2 rounded border bg-background">
                  <div 
                    className="w-4 h-4 border-2 border-primary" 
                    style={{ borderRadius: value }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-foreground">{value}</div>
                    <div className="text-xs text-muted-foreground truncate">{String(label)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }, // Disable controls for this story
  },
}
`;

// Write the updated story file
fs.writeFileSync(storyPath, updatedStoryContent);

console.log('✅ Storybook story automatically updated with latest controls!');
console.log('📁 Updated: stories/Dropdown.stories.tsx');
console.log('🔄 All controls are now in sync with your design tokens');
console.log('\n💡 Tip: Run this after updating tokens with "npm run tokens:sync"');
