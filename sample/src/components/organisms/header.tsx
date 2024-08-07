import React from 'react'
import { Link } from 'react-router-dom'

const Header = React.memo(function header() {
  return (
    <header className="text-gray-900 border-b border-gray-200">
      <div className="container flex mx-auto p-5 flex-col md:flex-row items-center">
        <Link to="/" className="font-medium mb-4 md:mb-0">
          <span className="text-xl ml-3">ぽめモール</span>
        </Link>
        <nav className="md:ml-auto text-base">
          <Link to="/" className="hover:text-green-600 duration-300">
            ログアウト
          </Link>
        </nav>
      </div>
    </header>
  )
})

export default Header
