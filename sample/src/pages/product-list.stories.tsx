import ProductList from '@/pages/product-list'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
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
 * デフォルト表示
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

/** ---- オブジェクト削除のストーリー ---- */
export const DeleteProduct: Story = {
  render: () => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </MemoryRouter>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    expect(await canvas.findByText('Product 1')).toBeInTheDocument()

    const deleteButton = (
      await canvas.findAllByRole('button', { name: '削除' })
    )[0]
    await userEvent.click(deleteButton)

    const confirmButton = (
      await canvas.findAllByRole('button', { name: '削除する' })
    )[0]

    await userEvent.click(confirmButton)

    await waitFor(() => {
      expect(canvas.queryByText('Product 1')).not.toBeInTheDocument()
    })
  },
}

/** ---- オブジェクト追加のストーリー ---- */
export const CreateProduct: Story = {
  render: () => {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </MemoryRouter>
    )
  },
  play: async ({ canvasElement }) => {
    // モーダル内で `createPortal` を使用しており、body 直下に展開されてしまっているため
    // parentElement でハックしなければモーダルの要素が取得できない
    const canvas = within(canvasElement.parentElement!)

    await userEvent.click(
      await canvas.findByRole('button', { name: '新規作成' }),
    )

    await userEvent.type(await canvas.findByLabelText('商品名'), 'Product 100')
    await userEvent.type(canvas.getByLabelText('商品単価'), '100')
    await userEvent.type(
      canvas.getByLabelText('詳細'),
      'Description for product 3',
    )
    await userEvent.type(
      canvas.getByLabelText('イメージURL'),
      'https://placehold.jp/123456/abcdef/150x150.png',
    )
    await userEvent.click(await canvas.findByRole('button', { name: '作成' }))

    await waitFor(() => {
      expect(canvas.queryByText('新規作成モーダル')).not.toBeInTheDocument()
    })

    expect(await canvas.findByText('Product 100')).toBeInTheDocument()
    expect(await canvas.findByText('価格: 100円')).toBeInTheDocument()
    expect(
      await canvas.findByText('Description for product 3'),
    ).toBeInTheDocument()
  },
}
