"use client"
import React, { createContext, useContext, useCallback, useMemo, useState } from 'react'

export type SidebarBreakpoint = 'sm' | 'md' | 'lg'
export type SidebarSide = 'left' | 'right'

export interface SidebarContextValue {
  open: boolean
  setOpen?: (open: boolean) => void
  toggle?: () => void
  isControlled: boolean
  breakpoint: SidebarBreakpoint
  side: SidebarSide
  activeItem?: string | null
  setActiveItem?: (itemId: string | null) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  breakpoint?: SidebarBreakpoint
  side?: SidebarSide
  defaultActiveItem?: string | null
  activeItem?: string | null
  onActiveItemChange?: (itemId: string | null) => void
}

export function useSidebarContext(): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('useSidebarContext must be used within <SidebarProvider>')
  }
  return ctx
}

export function SidebarProvider(props: SidebarProviderProps): JSX.Element {
  const {
    children,
    defaultOpen = true,
    open,
    onOpenChange,
    breakpoint = 'md',
    side = 'left',
    defaultActiveItem = null,
    activeItem,
    onActiveItemChange,
  } = props

  const isControlled = typeof open === 'boolean'
  const [internalOpen, setInternalOpen] = useState<boolean>(Boolean(defaultOpen))
  const isActiveControlled = typeof activeItem !== 'undefined'
  const [internalActiveItem, setInternalActiveItem] = useState<string | null>(defaultActiveItem)

  const set = useCallback(
    (next: boolean) => {
      if (isControlled) {
        onOpenChange?.(next)
      } else {
        setInternalOpen(next)
      }
    },
    [isControlled, onOpenChange],
  )

  const toggle = useCallback(() => {
    set(!(isControlled ? Boolean(open) : internalOpen))
  }, [isControlled, open, internalOpen, set])

  const setActive = useCallback(
    (next: string | null) => {
      if (isActiveControlled) {
        onActiveItemChange?.(next)
      } else {
        setInternalActiveItem(next)
      }
    },
    [isActiveControlled, onActiveItemChange],
  )

  const value: SidebarContextValue = useMemo(
    () => ({
      open: isControlled ? Boolean(open) : internalOpen,
      setOpen: set,
      toggle,
      isControlled,
      breakpoint,
      side,
      activeItem: isActiveControlled ? activeItem ?? null : internalActiveItem,
      setActiveItem: setActive,
    }),
    [isControlled, open, internalOpen, set, toggle, breakpoint, side, isActiveControlled, activeItem, internalActiveItem, setActive],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}


