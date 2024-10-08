import { useEffect, useState } from 'react'
import { useProducts } from '@/hooks/use-products'
import { Link } from 'react-router-dom'

import { getProductsAndRefresh } from '@/reducks/products/selectors'

function App() {
  const { products, refresh } = useProducts(getProductsAndRefresh)
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [productName, setProductName] = useState('')

  useEffect(() => {
    refresh()
  }, [refresh])

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

      <main
        className={`text-gray-900 flex-grow flex relative ${isSideOpen ? 'translate-x-[-300px]' : ''}`}
      >
        <div className="flex w-screen ">
          <div className="container flex mx-auto p-5 flex-col items-center">
            <h1 className="text-3xl md:text-5xl">商品一覧</h1>
            <div>
              <ul className="flex flex-col md:flex-row">
                {products.map((product) => (
                  <li key={product.id} className="mx-5 mt-5 w-[200px]">
                    <h2
                      className="text-center text-lg md:text-xl"
                      onClick={() => {
                        setIsSideOpen(true)
                        setProductName(product.name)
                      }}
                    >
                      {product.name}
                    </h2>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mx-auto mt-2"
                    />
                    <p className="text-center text-base mt-2">
                      価格: {product.price.toLocaleString()}円
                    </p>
                    <p className="text-base mt-1">{product.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside
          className={`w-[300px] border-l-2 border-gray-200 min-h-full fixed right-[-300px]`}
          onClick={() => setIsSideOpen(false)}
        >
          <h3 className="text-center mt-4 text-2xl ">{productName}</h3>
        </aside>
      </main>

      <footer className="min-h-12 border-t border-gray-200">
        <div className="container mx-auto">
          <p className="text-base text-center my-3">©2022-2024 kuramapommel</p>
        </div>
      </footer>
    </div>
  )
}

export default App
