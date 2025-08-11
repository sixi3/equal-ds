"use client"
import React from 'react'

export interface DndKitListeners { [key: string]: any }

export interface SortableGroupContextValue {
  active: boolean
  attributes?: Record<string, unknown>
  listeners?: any
  setNodeRef?: (node: HTMLElement | null) => void
  transform?: { x: number; y: number; scaleX?: number; scaleY?: number } | null
  transition?: string | null
  isDragging?: boolean
  onHandlePress?: () => void
  id?: string
  isOver?: boolean
  dragging?: boolean
  isActive?: boolean
  // Structured, more strongly typed groupings (back-compat: keep flat fields above)
  dragState?: {
    isActive: boolean
    isDragging: boolean
    isOver: boolean
  }
  dndKit?: {
    attributes?: Record<string, unknown>
    listeners?: DndKitListeners
    setNodeRef?: (node: HTMLElement | null) => void
  }
  handlers?: {
    onHandlePress?: () => void
  }
}

export const SortableGroupContext = React.createContext<SortableGroupContextValue>({
  active: false,
  // Safe no-op defaults so consumers can render outside DnD context
  attributes: undefined,
  listeners: undefined,
  setNodeRef: undefined,
  transform: null,
  transition: null,
  isDragging: false,
  id: undefined,
  isOver: false,
  dragging: false,
  isActive: false,
})


