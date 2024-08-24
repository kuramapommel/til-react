import TenantsTemplate from '@/components/templates/tenants-template'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const meta: Meta<typeof TenantsTemplate> = {
  title: 'templates/tenants-template',
  component: TenantsTemplate,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof TenantsTemplate>

/**
 * ログイン後の画面のため、ヘッダーはログアウトボタンが表示されています
 */
export const Default: Story = {
  render: () => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <TenantsTemplate>
                <h1>メインコンテンツはここに表示されます</h1>
              </TenantsTemplate>
            }
          />
        </Routes>
      </MemoryRouter>
    )
  },
}
