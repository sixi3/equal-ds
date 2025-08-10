"use client"
import React, { createContext, useContext, useCallback, useMemo, useState } from 'react'

export type SidebarBreakpoint = 'sm' | 'md' | 'lg'
export type SidebarSide = 'left' | 'right'

export interface SidebarOpenContextValue {
  open: boolean
  setOpen?: (open: boolean) => void
  toggle?: () => void
  isControlled: boolean
  breakpoint: SidebarBreakpoint
  side: SidebarSide
}

export interface SidebarActiveItemContextValue {
  activeItem?: string | null
  setActiveItem?: (itemId: string | null) => void
}

const SidebarOpenContext = createContext<SidebarOpenContextValue | null>(null)
const SidebarActiveItemContext = createContext<SidebarActiveItemContextValue | null>(null)

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

// Back-compat: combined hook (will re-render on either slice change)
export function useSidebarContext(): SidebarOpenContextValue & SidebarActiveItemContextValue {
  const openCtx = useContext(SidebarOpenContext)
  const activeCtx = useContext(SidebarActiveItemContext)
  if (!openCtx || !activeCtx) {
    throw new Error('useSidebarContext must be used within <SidebarProvider>')
  }
  return { ...openCtx, ...activeCtx }
}

export function useSidebarOpenContext(): SidebarOpenContextValue {
  const ctx = useContext(SidebarOpenContext)
  if (!ctx) throw new Error('useSidebarOpenContext must be used within <SidebarProvider>')
  return ctx
}

export function useSidebarActiveItemContext(): SidebarActiveItemContextValue {
  const ctx = useContext(SidebarActiveItemContext)
  if (!ctx) throw new Error('useSidebarActiveItemContext must be used within <SidebarProvider>')
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

  const openValue: SidebarOpenContextValue = useMemo(
    () => ({
      open: isControlled ? Boolean(open) : internalOpen,
      setOpen: set,
      toggle,
      isControlled,
      breakpoint,
      side,
    }),
    [isControlled, open, internalOpen, set, toggle, breakpoint, side],
  )

  const activeValue: SidebarActiveItemContextValue = useMemo(
    () => ({
      activeItem: isActiveControlled ? activeItem ?? null : internalActiveItem,
      setActiveItem: setActive,
    }),
    [isActiveControlled, activeItem, internalActiveItem, setActive],
  )

  return (
    <SidebarOpenContext.Provider value={openValue}>
      <SidebarActiveItemContext.Provider value={activeValue}>{children}</SidebarActiveItemContext.Provider>
    </SidebarOpenContext.Provider>
  )
}


