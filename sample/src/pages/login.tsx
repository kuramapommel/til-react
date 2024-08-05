/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import LoginForm from '@/components/molecules/forms/login-form'

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-gray-900 border-b border-gray-200">
        <div className="container flex mx-auto p-5 flex-col md:flex-row items-center">
          <Link to="/" className="font-medium mb-4 md:mb-0">
            <span className="text-xl ml-3">ぽめモール</span>
          </Link>
          <nav className="md:ml-auto text-base">
            <Link to="/" className="hover:text-green-600 duration-300 mr-5">
              ログイン
            </Link>
            <Link to="/login" className="hover:text-green-600 duration-300">
              事業者の方はこちら
            </Link>
          </nav>
        </div>
      </header>

      <main className="text-gray-900 border-b border-gray-200 flex-grow">
        <div className="container flex mx-auto p-5 flex-col items-center">
          <LoginForm />{' '}
        </div>
      </main>

      <footer className="min-h-12">
        <div className="container mx-auto">
          <p className="text-base text-center my-3">©2022-2024 kuramapommel</p>
        </div>
      </footer>
    </div>
  )
}

export default Login
