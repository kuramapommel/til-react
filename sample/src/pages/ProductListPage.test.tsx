import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
  describe,
  it,
  vi,
  expect,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest'
import { setupServer } from 'msw/node'
import Login from './LoginPage'
import ProductList from './ProductListPage'
import { handlers, resetProducts } from '../mocks/handlers'

vi.mock('./api', () => ({
  login: vi.fn().mockResolvedValue({ success: true }),
}))

// モックサーバーを設定
const server = setupServer(...handlers)

// モックサーバーを起動および停止
beforeAll(() => server.listen())
afterEach(() => {
  resetProducts()
  server.resetHandlers()
})
afterAll(() => server.close())

describe('LoginPage', () => {
  it('should navigate to product list after login', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByPlaceholderText('ユーザー名'), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }))

    // Wait for navigation
    expect(await screen.findByText(/product list/i)).toBeInTheDocument()
  })

  it('should display a list of products with their properties', async () => {
    render(<ProductList />)

    expect(await screen.findByText('Product 1')).toBeInTheDocument()
    expect(await screen.findByText('Product 2')).toBeInTheDocument()
    expect(await screen.findByText('価格: 1,000円')).toBeInTheDocument()
    expect(await screen.findByText('価格: 2,000円')).toBeInTheDocument()
  })

  it('should open modal when clicking on "新規作成ボタン" and add a new product', async () => {
    render(<ProductList />)

    fireEvent.click(screen.getByRole('button', { name: '新規作成' }))

    expect(await screen.findByLabelText('商品名')).toBeInTheDocument()
    expect(await screen.findByLabelText('商品単価')).toBeInTheDocument()
    expect(await screen.findByLabelText('詳細')).toBeInTheDocument()
    expect(await screen.findByLabelText('イメージURL')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('商品名'), {
      target: { value: 'Product 3' },
    })
    fireEvent.change(screen.getByLabelText('商品単価'), {
      target: { value: 3000 },
    })
    fireEvent.change(screen.getByLabelText('詳細'), {
      target: { value: 'Description for product 3' },
    })
    fireEvent.change(screen.getByLabelText('イメージURL'), {
      target: { value: 'https://example.com/product3.jpg' },
    })
    fireEvent.click(screen.getByRole('button', { name: '作成' }))

    expect(await screen.findByText('Product 3')).toBeInTheDocument()
    expect(await screen.findByText('価格: 3,000円')).toBeInTheDocument()
  })

  it('should open edit modal when clicking on "編集ボタン" and save changes', async () => {
    render(<ProductList />)
    const editButtons = await screen.findAllByText('編集')
    fireEvent.click(editButtons[0])

    expect(await screen.findByLabelText('商品名')).toBeInTheDocument()
    expect(await screen.findByLabelText('商品単価')).toBeInTheDocument()
    expect(await screen.findByLabelText('詳細')).toBeInTheDocument()
    expect(await screen.findByLabelText('イメージURL')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('商品名'), {
      target: { value: 'Updated Product 1' },
    })
    fireEvent.change(screen.getByLabelText('商品単価'), {
      target: { value: 1500 },
    })
    fireEvent.change(screen.getByLabelText('詳細'), {
      target: { value: 'Updated Description for product 1' },
    })
    fireEvent.change(screen.getByLabelText('イメージURL'), {
      target: { value: 'https://placehold.jp/111111/777777/150x150.png' },
    })
    fireEvent.click(screen.getByRole('button', { name: '保存' }))

    expect(await screen.findByText('Updated Product 1')).toBeInTheDocument()
    expect(await screen.findByText('価格: 1,500円')).toBeInTheDocument()
    expect(
      await screen.findByText('Updated Description for product 1'),
    ).toBeInTheDocument()
  })

  it('should open delete confirmation dialog when clicking on "削除ボタン" and delete the product', async () => {
    render(<ProductList />)
    const deleteButtons = await screen.findAllByText('削除')
    fireEvent.click(deleteButtons[0])

    expect(
      await screen.findByText('Product 1を本当に削除しますか？'),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '削除する' }))

    expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
  })

  it('should not delete the product when clicking on "キャンセルボタン" in the delete confirmation dialog', async () => {
    render(<ProductList />)
    const deleteButtons = await screen.findAllByText('削除')
    fireEvent.click(deleteButtons[0])

    expect(
      await screen.findByText('Product 1を本当に削除しますか？'),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'キャンセル' }))

    expect(screen.queryByText('Product 1')).toBeInTheDocument()
  })
})
