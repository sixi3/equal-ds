import { useCallback, useState } from 'react'

export interface UseControllableStateProps<T> {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableProp<T>(prop: T | undefined, state: T): [boolean, T] {
  const isControlled = prop !== undefined
  return [isControlled, isControlled ? (prop as T) : state]
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, (next: T) => void] {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState<T>(defaultValue)

  const current = isControlled ? (value as T) : internal

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternal(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [current, setValue]
}
