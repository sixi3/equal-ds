import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export interface DropdownProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Root> {
  /**
   * Callback when dropdown open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Default open state
   */
  defaultOpen?: boolean
}

export const DropdownContext = React.createContext<{
  isOpen: boolean
  setIsOpen?: (open: boolean) => void
}>({
  isOpen: false
})

export function Dropdown({
  onOpenChange,
  defaultOpen = false,
  children,
  ...props
}: DropdownProps): JSX.Element {
  const [internalIsOpen, setInternalIsOpen] = React.useState(defaultOpen)
  const [isControlled, setIsControlled] = React.useState(false)

  // Determine if the component is controlled or uncontrolled
  React.useEffect(() => {
    if (onOpenChange !== undefined) {
      setIsControlled(true)
    }
  }, [onOpenChange])

  const handleOpenChange = React.useCallback((open: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(open)
    }
    onOpenChange?.(open)
  }, [isControlled, onOpenChange])

  const currentIsOpen = isControlled ? (props.open ?? false) : internalIsOpen

  return (
    <DropdownContext.Provider value={{ isOpen: currentIsOpen, setIsOpen: isControlled ? undefined : setInternalIsOpen }}>
      <DropdownMenu.Root onOpenChange={handleOpenChange} {...props}>
        {children}
      </DropdownMenu.Root>
    </DropdownContext.Provider>
  )
}

export const DropdownPortal = DropdownMenu.Portal
export const DropdownSub = DropdownMenu.Sub
export const DropdownRadioGroup = DropdownMenu.RadioGroup


