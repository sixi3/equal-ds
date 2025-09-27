export interface ButtonDropdownOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'disabled'

  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Whether to show a dropdown attached to the button
   * @default false
   */
  withDropdown?: boolean

  /**
   * Dropdown options when withDropdown is true
   */
  dropdownOptions?: ButtonDropdownOption[]

  /**
   * Currently selected dropdown option
   */
  selectedDropdownOption?: string

  /**
   * Callback when dropdown option changes
   */
  onDropdownChange?: (value: string) => void

  /**
   * Custom className for the dropdown content
   */
  dropdownClassName?: string

  /**
   * Whether to show a header in the dropdown
   * @default false
   */
  showDropdownHeader?: boolean

  /**
   * Text to display in the dropdown header
   * @default 'Select Option'
   */
  dropdownHeaderText?: string

  /**
   * Custom className for the dropdown header
   */
  dropdownHeaderClassName?: string

  /**
   * Children to render inside the button
   */
  children: React.ReactNode
}
