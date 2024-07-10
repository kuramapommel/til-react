import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, vi, expect } from 'vitest'
import Login from './LoginPage'
import ProductList from './ProductListPage'

vi.mock('./api', () => ({
  login: vi.fn().mockResolvedValue({ success: true }),
}))

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
})
