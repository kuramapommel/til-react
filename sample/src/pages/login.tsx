import { css } from 'twin.macro'
import LoginForm from '../components/molecules/forms/login-form'

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7fafc;
`

const Login = () => {
  return (
    <div css={containerStyle}>
      <LoginForm />
    </div>
  )
}

export default Login
