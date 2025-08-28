import { CapturedState } from './stateCapture'

export type { CapturedState }

export interface SnippetGenerator {
  generate(args: CapturedState): string
  getRequiredImports(): string[]
  getDefaultArgs(): Record<string, any>
}

export abstract class BaseSnippetGenerator implements SnippetGenerator {
  abstract generate(args: CapturedState): string
  abstract getRequiredImports(): string[]
  abstract getDefaultArgs(): Record<string, any>
  
  /**
   * Generate import statements
   */
  protected generateImports(args: CapturedState): string {
    const imports = this.getRequiredImports()
    return `import React, { useState } from 'react'
import { ${imports.join(', ')} } from 'equal-ds-ui'
import { ChevronDown, Settings, User, LogOut } from 'lucide-react'`
  }
  
  /**
   * Generate component function signature
   */
  protected generateFunctionSignature(args: CapturedState): string {
    const defaultArgs = this.getDefaultArgs()
    const allArgs = { ...defaultArgs, ...(args.controls || {}) }
    
    const paramList = Object.entries(allArgs)
      .map(([key, value]) => `${key} = ${JSON.stringify(value)}`)
      .join(', ')
    
    return `export function Example${this.getComponentName()}({ ${paramList} })`
  }
  
  /**
   * Get component name
   */
  protected getComponentName(): string {
    // Extract component name from class name
    const className = this.constructor.name
    if (className.includes('Dropdown')) return 'Dropdown'
    if (className.includes('Sidebar')) return 'Sidebar'
    // Default fallback
    return className.replace('SnippetGenerator', '')
  }
}
