import Login from '@/pages/login'
import ProductList from '@/pages/product-list'
import { handlers, resetProducts } from '@/testing/mocks/handlers'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

// モックサーバーを設定
const server = setupServer(...handlers)

// モックサーバーを起動および停止
beforeAll(() => {
  server.listen()
  HTMLDialogElement.prototype.show = vi.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = true
  })

  HTMLDialogElement.prototype.showModal = vi.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = true
  })

  HTMLDialogElement.prototype.close = vi.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = false
  })
})
afterEach(() => {
  resetProducts()
  server.resetHandlers()
})
afterAll(() => server.close())

describe('Login', () => {
  it('should navigate to product list after login', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.input(screen.getByPlaceholderText('ユーザー名'), {
      target: { value: 'testuser' },
    })
    fireEvent.input(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password' },
    })
    const loginButton = await screen.findByRole('button', { name: 'ログイン' })
    expect(loginButton).toBeEnabled()
    fireEvent.submit(loginButton)

    // Wait for navigation
    expect(await screen.findByText('Product List')).toBeInTheDocument()
  })
})

describe('ProductList', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </MemoryRouter>,
    )
  })

  it('should display a list of products with their properties', async () => {
    expect(await screen.findByText('Product 1')).toBeInTheDocument()
    expect(await screen.findByText('Product 2')).toBeInTheDocument()
    expect(await screen.findByText('Product 3')).toBeInTheDocument()
    expect(await screen.findByText('Product 4')).toBeInTheDocument()
    expect(await screen.findByText('Product 5')).toBeInTheDocument()
    expect(await screen.findByText('価格: 1,000円')).toBeInTheDocument()
    expect(await screen.findByText('価格: 2,000円')).toBeInTheDocument()
    expect(await screen.findByText('価格: 2,500円')).toBeInTheDocument()
    expect(await screen.findByText('価格: 3,000円')).toBeInTheDocument()
    expect(await screen.findByText('価格: 10,000円')).toBeInTheDocument()
  })

  it('should open modal when clicking on "新規作成ボタン" and add a new product', async () => {
    fireEvent.click(screen.getByRole('button', { name: '新規作成' }))

    expect(await screen.findByLabelText('商品名')).toBeInTheDocument()
    expect(await screen.findByLabelText('商品単価')).toBeInTheDocument()
    expect(await screen.findByLabelText('詳細')).toBeInTheDocument()
    expect(await screen.findByLabelText('イメージURL')).toBeInTheDocument()
    const submitButton = await screen.findByRole('button', { name: '作成' })
    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      fireEvent.input(screen.getByLabelText('商品名'), {
        target: { value: 'Product 100' },
      })
      fireEvent.input(screen.getByLabelText('商品単価'), {
        target: { value: 100 },
      })
      fireEvent.input(screen.getByLabelText('詳細'), {
        target: { value: 'Description for product 3' },
      })
      fireEvent.input(screen.getByLabelText('イメージURL'), {
        target: { value: 'https://example.com/product3.jpg' },
      })
    })
    expect(submitButton).toBeEnabled()
    fireEvent.submit(submitButton)

    expect(await screen.findByText('Product 100')).toBeInTheDocument()
    expect(await screen.findByText('価格: 100円')).toBeInTheDocument()
    expect(
      await screen.findByText('Description for product 3'),
    ).toBeInTheDocument()
  })

  it('should open edit modal when clicking on "編集ボタン" and save changes', async () => {
    const editButtons = await screen.findAllByText('編集')
    fireEvent.click(editButtons[0])

    expect(await screen.findByLabelText('商品名')).toBeInTheDocument()
    expect(await screen.findByLabelText('商品単価')).toBeInTheDocument()
    expect(await screen.findByLabelText('詳細')).toBeInTheDocument()
    expect(await screen.findByLabelText('イメージURL')).toBeInTheDocument()

    fireEvent.input(screen.getByLabelText('商品名'), {
      target: { value: 'Updated Product 1' },
    })
    fireEvent.input(screen.getByLabelText('商品単価'), {
      target: { value: 1500 },
    })
    fireEvent.input(screen.getByLabelText('詳細'), {
      target: { value: 'Updated Description for product 1' },
    })
    fireEvent.input(screen.getByLabelText('イメージURL'), {
      target: { value: 'https://placehold.jp/111111/777777/150x150.png' },
    })
    const submitButton = await screen.findByRole('button', { name: '保存' })
    expect(submitButton).toBeEnabled()
    fireEvent.submit(submitButton)

    expect(await screen.findByText('Updated Product 1')).toBeInTheDocument()
    expect(await screen.findByText('価格: 1,500円')).toBeInTheDocument()
    expect(
      await screen.findByText('Updated Description for product 1'),
    ).toBeInTheDocument()
  })

  it('should not edit the product when clicking on "キャンセルボタン" in the edit modal', async () => {
    const editButtons = await screen.findAllByText('編集')
    fireEvent.click(editButtons[0])

    fireEvent.click(screen.getByRole('button', { name: 'キャンセル' }))

    expect(await screen.findByText('Product 1')).toBeInTheDocument()
  })

  it('should open delete confirmation dialog when clicking on "削除ボタン" and delete the product', async () => {
    const deleteButtons = await screen.findAllByText('削除')
    fireEvent.click(deleteButtons[0])

    expect(
      await screen.findByText('Product 1を本当に削除しますか？'),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '削除する' }))

    expect(await screen.findByText('Product 1')).not.toBeInTheDocument()
  })

  it('should not delete the product when clicking on "キャンセルボタン" in the delete confirmation dialog', async () => {
    const deleteButtons = await screen.findAllByText('削除')
    fireEvent.click(deleteButtons[0])

    expect(
      await screen.findByText('Product 1を本当に削除しますか？'),
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'キャンセル' }))

    expect(await screen.findByText('Product 1')).toBeInTheDocument()
  })
})
