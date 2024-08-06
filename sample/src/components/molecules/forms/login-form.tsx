/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormInputs, validationSchema } from '@/reducks/logins/types'
import SubmitButton from '@/components/atoms/buttons/submit-button'

const formStyle = css`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: gray;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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

const LoginForm: React.FC = React.memo(function LoginForm() {
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
      <SubmitButton disabled={!isValid} className="mt-3 ml-auto">
        ログイン
      </SubmitButton>
    </form>
  )
})

export default LoginForm
