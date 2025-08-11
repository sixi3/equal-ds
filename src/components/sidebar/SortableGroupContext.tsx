"use client"
import React from 'react'
import type { DraggableAttributes } from '@dnd-kit/core'

export interface DndKitListeners { [key: string]: any }

export interface SortableGroupContextValue {
  active: boolean
  attributes?: DraggableAttributes
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
    attributes?: DraggableAttributes
    listeners?: DndKitListeners
    setNodeRef?: (node: HTMLElement | null) => void
  }
  handlers?: {
    onHandlePress?: () => void
  }
}

export const SortableGroupContext = React.createContext<SortableGroupContextValue>({ active: false })


