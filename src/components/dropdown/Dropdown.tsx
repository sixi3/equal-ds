import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export interface DropdownProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu.Root> {}

export function Dropdown(props: DropdownProps): JSX.Element {
  return <DropdownMenu.Root {...props} />
}

export const DropdownPortal = DropdownMenu.Portal
export const DropdownSub = DropdownMenu.Sub
export const DropdownRadioGroup = DropdownMenu.RadioGroup


