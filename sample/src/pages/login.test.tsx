import { render, fireEvent, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from './login'
import { describe, it, expect, vi } from 'vitest'

describe('Login Component', () => {
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

  it('submits the form with valid data', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<div />} />
        </Routes>
      </MemoryRouter>,
    )
    fireEvent.change(screen.getByPlaceholderText('ユーザー名'), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByPlaceholderText('パスワード'), {
      target: { value: 'password' },
    })
    console.log = vi.fn()
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }))

    expect(console.log).toHaveBeenCalledWith('Username:', 'testuser')
    expect(console.log).toHaveBeenCalledWith('Password:', 'password')
  })

  it('shows validation error with empty fields', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }))
    expect(screen.getByPlaceholderText('ユーザー名')).toBeInvalid()
    expect(screen.getByPlaceholderText('パスワード')).toBeInvalid()
  })
})
