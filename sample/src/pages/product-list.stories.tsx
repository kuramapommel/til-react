import ProductList from '@/pages/product-list'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const meta: Meta<typeof ProductList> = {
  title: 'pages/product-list',
  component: ProductList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProductList>

/**
 *
 */
export const Default: Story = {
  render: () => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </MemoryRouter>
    )
  },
}
