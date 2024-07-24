/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formStyle = css`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: gray;
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

const validationSchema = z.object({
  username: z
    .string()
    .min(1, 'ユーザー名は必須です')
    .min(4, 'ユーザー名は4文字以上で入力してください'),
  password: z
    .string()
    .min(1, 'パスワードは必須です')
    .min(8, 'ユーザー名は8文字以上で入力してください'),
})

type LoginFormInputs = z.infer<typeof validationSchema>

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
  })
  const navigate = useNavigate()

  const onSubmit = ({ username, password }: LoginFormInputs) => {
    // ログイン処理
    console.log('Username:', username)
    console.log('Password:', password)
    // ここで認証処理を行います
    navigate('/products')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} css={formStyle}>
      <h2>ログイン</h2>
      <label htmlFor="username">名前</label>
      <input
        type="text"
        placeholder="ユーザー名"
        id="username"
        {...register('username')}
        css={inputStyle}
      />
      {errors.username && <p>{errors.username.message}</p>}
      <label htmlFor="password">パスワード</label>
      <input
        type="password"
        placeholder="パスワード"
        {...register('password')}
        css={inputStyle}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit" disabled={!isValid} css={buttonStyle}>
        ログイン
      </button>
    </form>
  )
}

export default React.memo(LoginForm)
