import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/index.css'
import { handlers } from '../src/testing/mocks/handlers'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: [...handlers],
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
}

// Initialize MSW
initialize()

export default preview
