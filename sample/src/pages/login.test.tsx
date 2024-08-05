import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from '@/pages/login'
import { describe, it, expect, vi } from 'vitest'

describe('Login', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByPlaceholderText('ユーザー名')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
  })

  it('submits the form with valid data', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<div />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.input(screen.getByPlaceholderText('ユーザー名'), {
      target: { value: 'testuser' },
    })
    fireEvent.input(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password' },
    })
    console.log = vi.fn()
    const loginButton = await screen.findByRole('button', { name: 'ログイン' })
    expect(loginButton).toBeEnabled()
    fireEvent.submit(loginButton)

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Username:', 'testuser')
      expect(console.log).toHaveBeenCalledWith('Password:', 'password')
    })
  })

  it('shows validation error with empty fields', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>,
    )
    const loginButton = await screen.findByRole('button', { name: 'ログイン' })
    expect(loginButton).toBeDisabled()
  })
})
