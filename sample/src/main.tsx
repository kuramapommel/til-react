import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/login'
import ProductList from './pages/product-list'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./testing/mocks/browser')
  worker.start()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
