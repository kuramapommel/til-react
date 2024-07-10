/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react'
import { z } from 'zod'

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7fafc;
`

const formStyle = css`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const inputStyle = css`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
`

const buttonStyle = css`
  width: 100%;
  padding: 0.75rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #2c5282;
  }
`

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const schema = z.object({
    username: z.string().min(1, 'ユーザー名は必須です'),
    password: z.string().min(1, 'パスワードは必須です'),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const result = schema.safeParse({ username, password })

    if (!result.success) {
      setError(result.error.errors.map((err) => err.message).join(', '))
      return
    }

    // ログイン処理
    console.log('Username:', username)
    console.log('Password:', password)
  }

  return (
    <div css={containerStyle}>
      <form onSubmit={handleSubmit} css={formStyle}>
        <h2>ログイン</h2>
        {error && <p css={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          css={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          css={inputStyle}
          required
        />
        <button type="submit" css={buttonStyle}>
          ログイン
        </button>
      </form>
    </div>
  )
}

export default Login
