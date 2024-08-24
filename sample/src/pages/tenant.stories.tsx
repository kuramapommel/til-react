import { useDataProvider } from '@/hooks/use-data-provider'
import Tenant from '@/pages/tenant'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const meta: Meta<typeof Tenant> = {
  title: 'pages/tenant',
  component: Tenant,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Tenant>

/**
 * [react-admin](https://marmelab.com/react-admin/) を利用しています
 */
export const Default: Story = {
  render: () => {
    const dataProvider = useDataProvider()
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Tenant dataProvider={dataProvider} />} />
        </Routes>
      </MemoryRouter>
    )
  },
}
