import { render, fireEvent, screen } from '@testing-library/react'
import Login from './Login'
import { describe, it, expect, vi } from 'vitest'

describe('Login Component', () => {
  it('renders login form', () => {
    render(<Login />)
    expect(screen.getByPlaceholderText('ユーザー名')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('パスワード')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
  })

  it('submits the form with valid data', () => {
    render(<Login />)
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
    render(<Login />)
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }))
    expect(screen.getByPlaceholderText('ユーザー名')).toBeInvalid()
    expect(screen.getByPlaceholderText('パスワード')).toBeInvalid()
  })
})
