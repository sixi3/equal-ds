import type { Preview } from '@storybook/react'
import '../src/styles/shadcn-theme.css'
import '../stories/tailwind.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color|border|text)$/i,
        date: /Date$/,
      },
      // Enhanced controls display
      expanded: true,
      sort: 'requiredFirst',
    },
  },
}

export default preview


