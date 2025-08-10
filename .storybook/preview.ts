import type { Preview } from '@storybook/react'
import '../src/styles/shadcn-theme.css'
import '../stories/tailwind.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
}

export default preview


