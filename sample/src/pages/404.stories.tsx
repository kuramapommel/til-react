import NotFoundPage from '@/pages/404'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const meta: Meta<typeof NotFoundPage> = {
  title: 'pages/404',
  component: NotFoundPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NotFoundPage>

/**
 * 標準フッター
 */
export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  ),
}
