import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from '@/pages/login'
import ProductList from '@/pages/product-list'
import App from '@/App'
import { enableMocking } from '@/testing/mocks'
import Tenant from './pages/tenant'

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/tenant/*" element={<Tenant />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  ),
)
