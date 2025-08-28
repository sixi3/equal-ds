import React, { useState, useEffect } from 'react'
import { SmartComponentDetector } from './smartDetector'
import { ComponentStateCapture } from './stateCapture'

interface SmartCopyCodeButtonProps {
  fallbackGenerator?: (args: any) => string
  fallbackArgs?: any
  className?: string
  children?: React.ReactNode
  currentArgs?: any // Pass current story args as props
}

export function SmartCopyCodeButton({
  fallbackGenerator,
  fallbackArgs,
  currentArgs,
  className = '',
  children = 'Copy Code'
}: SmartCopyCodeButtonProps) {
  const [isCopying, setIsCopying] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  // Debug logging
  console.log('SmartCopyCodeButton rendered with:', { fallbackGenerator, fallbackArgs, currentArgs })
  
  useEffect(() => {
    console.log('SmartCopyCodeButton mounted')
  }, [])
  
  const handleCopy = async () => {
    console.log('SmartCopyCodeButton clicked!')
    setIsCopying(true)
    setCopyStatus('idle')
    
    try {
      console.log('Starting smart copy logic...')
      
      // Get story context from URL and passed args
      const storyContext = getStoryContextFromURL(currentArgs)
      
      if (storyContext) {
        console.log('Story context detected:', storyContext)
        
        try {
          // Detect component
          const detector = new SmartComponentDetector()
          const componentConfig = detector.detectFromStory(storyContext)
          
          console.log('Component detection result:', componentConfig)
        
        if (componentConfig) {
          console.log('Using smart component generator for:', componentConfig.name)
          
          // Capture full state
          const stateCapture = new ComponentStateCapture()
          const fullState = stateCapture.captureFullState(storyContext, componentConfig)
          
          console.log('Captured state:', fullState)
          
          // Generate code
          const code = componentConfig.snippetGenerator(fullState)
          
          console.log('Generated code length:', code.length)
          
          // Copy to clipboard
          await navigator.clipboard.writeText(code)
          setCopyStatus('success')
          
          // Reset status after delay
          setTimeout(() => setCopyStatus('idle'), 2000)
        } else if (fallbackGenerator && fallbackArgs) {
          // Use fallback generator
          const code = fallbackGenerator(fallbackArgs)
          await navigator.clipboard.writeText(code)
          setCopyStatus('success')
          setTimeout(() => setCopyStatus('idle'), 2000)
        } else {
          throw new Error('No component detected and no fallback provided')
        }
        } catch (componentError) {
          console.error('Component detection failed:', componentError)
          // Fallback to provided generator
          if (fallbackGenerator && fallbackArgs) {
            const code = fallbackGenerator(fallbackArgs)
            await navigator.clipboard.writeText(code)
            setCopyStatus('success')
            setTimeout(() => setCopyStatus('idle'), 2000)
          } else {
            throw new Error('Component detection failed and no fallback provided')
          }
        }
      } else if (fallbackGenerator && fallbackArgs) {
        // Use fallback generator
        const code = fallbackGenerator(fallbackArgs)
        await navigator.clipboard.writeText(code)
        setCopyStatus('success')
        setTimeout(() => setCopyStatus('idle'), 2000)
      } else {
        throw new Error('No story context available and no fallback provided')
      }
    } catch (error) {
      console.error('Failed to copy code:', error)
      setCopyStatus('error')
      setTimeout(() => setCopyStatus('idle'), 3000)
    } finally {
      setIsCopying(false)
    }
  }
  
  const getButtonContent = () => {
    if (isCopying) return 'Copying...'
    if (copyStatus === 'success') return 'Copied!'
    if (copyStatus === 'error') return 'Copy Failed'
    return children
  }
  
  const getButtonClasses = () => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200'
    
    if (copyStatus === 'success') {
      return `${baseClasses} bg-green-100 text-green-800 border border-green-200`
    }
    
    if (copyStatus === 'error') {
      return `${baseClasses} bg-red-100 text-red-800 border border-red-200`
    }
    
    return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200`
  }
  
  return (
    <button
      onClick={handleCopy}
      disabled={isCopying}
      className={`${getButtonClasses()} ${className}`}
    >
      {getButtonContent()}
    </button>
  )
}

// Function to get story context from URL and passed args
function getStoryContextFromURL(currentArgs?: any): any {
  // Extract story info from URL - handle both pathname and query params
  const path = window.location.pathname
  const searchParams = new URLSearchParams(window.location.search)
  const pathParam = searchParams.get('path')
  
  console.log('URL analysis:', { path, pathParam, fullUrl: window.location.href })
  
  // Try to extract from path parameter first (Storybook 8+ format)
  if (pathParam && pathParam.startsWith('/story/')) {
    const pathMatch = pathParam.match(/\/story\/([^--]+)--([^?]+)/)
    if (pathMatch) {
      const [, title, storyName] = pathMatch
      const context = {
        title: title.replace(/-/g, '/'),
        name: storyName.replace(/-/g, ' '),
        args: currentArgs || {}
      }
      console.log('Story context from path param:', context)
      return context
    }
  }
  
  // Try to extract from iframe URL format (Storybook iframe)
  const idParam = searchParams.get('id')
  if (idParam && idParam.includes('--')) {
    const idMatch = idParam.match(/([^--]+)--([^?]+)/)
    if (idMatch) {
      const [, title, storyName] = idMatch
      const context = {
        title: title.replace(/-/g, '/'),
        name: storyName.replace(/-/g, ' '),
        args: currentArgs || {}
      }
      console.log('Story context from iframe id param:', context)
      return context
    }
  }
  
  // Try to extract from pathname (older Storybook format)
  const pathMatch = path.match(/\/story\/([^--]+)--([^?]+)/)
  if (pathMatch) {
    const [, title, storyName] = pathMatch
    const context = {
      title: title.replace(/-/g, '/'),
      name: storyName.replace(/-/g, ' '),
      args: currentArgs || {}
    }
    console.log('Story context from pathname:', context)
    return context
  }
  
  // Fallback to URL-based detection
  if (path.includes('dropdown') || pathParam?.includes('dropdown')) {
    const context = {
      title: 'Actions/Dropdown',
      name: 'Default',
      args: currentArgs || {}
    }
    console.log('Story context from dropdown fallback:', context)
    return context
  }
  
  if (path.includes('sidebar') || pathParam?.includes('sidebar')) {
    const context = {
      title: 'Navigation/Sidebar',
      name: 'Default',
      args: currentArgs || {}
    }
    console.log('Story context from sidebar fallback:', context)
    return context
  }
  
  console.log('No story context detected, returning null')
  return null
}
