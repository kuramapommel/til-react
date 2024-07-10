import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './pages/LoginPage'
import ProductList from './pages/ProductListPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
