"use client"
import React, { createContext, useContext, useCallback, useMemo, useState } from 'react'

export type DrawerSide = 'left' | 'right'

export interface DrawerOpenContextValue {
  open: boolean
  fullyOpen: boolean
  setOpen?: (open: boolean) => void
  toggle?: () => void
  isControlled: boolean
  side: DrawerSide
}

const DrawerOpenContext = createContext<DrawerOpenContextValue | null>(null)

export interface DrawerProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  side?: DrawerSide
}

export function useDrawerContext(): DrawerOpenContextValue {
  const ctx = useContext(DrawerOpenContext)
  if (!ctx) throw new Error('useDrawerContext must be used within <DrawerProvider>')
  return ctx
}

export function DrawerProvider(props: DrawerProviderProps): JSX.Element {
  const {
    children,
    defaultOpen = false,
    open,
    onOpenChange,
    side = 'right',
  } = props

  const isControlled = typeof open === 'boolean'
  const [internalOpen, setInternalOpen] = useState<boolean>(Boolean(defaultOpen))
  const [fullyOpen, setFullyOpen] = useState<boolean>(Boolean(defaultOpen))
  const previousOverflowRef = React.useRef<string | undefined>(undefined)

  React.useEffect(() => {
    const currentOpen = isControlled ? Boolean(open) : internalOpen
    if (typeof document === 'undefined') return

    if (currentOpen) {
      previousOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else if (previousOverflowRef.current !== undefined) {
      document.body.style.overflow = previousOverflowRef.current
    }

    return () => {
      if (typeof document === 'undefined') return
      if (previousOverflowRef.current !== undefined) {
        document.body.style.overflow = previousOverflowRef.current
      }
    }
  }, [isControlled, open, internalOpen])

  // Manage fullyOpen state based on open state and animation timing
  React.useEffect(() => {
    const currentOpen = isControlled ? Boolean(open) : internalOpen
    if (currentOpen) {
      // When opening, set fullyOpen after animation completes (300ms)
      const timer = setTimeout(() => setFullyOpen(true), 300)
      return () => clearTimeout(timer)
    } else {
      // When closing, immediately set fullyOpen to false
      setFullyOpen(false)
    }
  }, [isControlled, open, internalOpen])

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

  const value: DrawerOpenContextValue = useMemo(
    () => ({
      open: isControlled ? Boolean(open) : internalOpen,
      fullyOpen,
      setOpen: set,
      toggle,
      isControlled,
      side,
    }),
    [isControlled, open, internalOpen, fullyOpen, set, toggle, side],
  )

  return (
    <DrawerOpenContext.Provider value={value}>
      {children}
    </DrawerOpenContext.Provider>
  )
}
