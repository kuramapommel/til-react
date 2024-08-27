import { Route, Routes as RrdRoutes } from 'react-router-dom'
import App from './App'
import { useDataProvider } from './hooks/use-data-provider'
import Login from './pages/login'
import ProductList from './pages/product-list'
import Tenant from './pages/tenant'
import NotFoundPage from './pages/404'

const Routes = () => {
  const dataProvider = useDataProvider()

  return (
    <RrdRoutes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductList />} />
      <Route
        path="/tenant/*"
        element={<Tenant dataProvider={dataProvider} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </RrdRoutes>
  )
}

export default Routes
