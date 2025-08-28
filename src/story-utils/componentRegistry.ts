export interface ComponentConfig {
  name: string
  snippetGenerator: (args: any) => string
  importPattern: RegExp
  storyPattern: RegExp
  defaultArgs?: Record<string, any>
  requiredImports?: string[]
}

import { DropdownSnippetGenerator } from './snippets/dropdownSnippetGenerator'

export const COMPONENT_REGISTRY: Record<string, ComponentConfig> = {
  'Dropdown': {
    name: 'Dropdown',
    snippetGenerator: new DropdownSnippetGenerator().generate.bind(new DropdownSnippetGenerator()),
    importPattern: /Dropdown/,
    storyPattern: /dropdown/i,
    requiredImports: ['Dropdown', 'DropdownTrigger', 'DropdownContent', 'DropdownItem', 'DropdownSeparator'],
    defaultArgs: {
      label: 'User Menu',
      showLabel: true,
      triggerVariant: 'default'
    }
  },
  'Sidebar': {
    name: 'Sidebar',
    snippetGenerator: () => '', // Placeholder - we'll implement this in Phase 3
    importPattern: /Sidebar/,
    storyPattern: /sidebar/i,
    requiredImports: ['Sidebar', 'SidebarContent', 'SidebarHeader', 'SidebarFooter'],
    defaultArgs: {
      // Sidebar defaults will be added later
    }
  }
  // More components will be added as we implement them
}
