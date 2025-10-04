"use client"
import React from 'react'
import type { DraggableAttributes } from '@dnd-kit/core'

export interface SortableGroupContextValue {
  enabled: boolean
  forceClosed?: boolean
  id?: string
  attributes?: DraggableAttributes
  listeners?: any
  setNodeRef?: (node: HTMLElement | null) => void
  isDragging?: boolean
}

export const SortableGroupContext = React.createContext<SortableGroupContextValue>({ enabled: false })


