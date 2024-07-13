// ProductList.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

const styles = {
  container: css`
    padding: 20px;
  `,
  button: css`
    margin-bottom: 20px;
  `,
  modal: css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  `,
  overlay: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `,
}

type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}
const initialState = {
  id: 0,
  name: '',
  image: '',
  price: 0,
  description: '',
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Product>(initialState)

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data || []))
      .catch((error) => console.error('Error fetching products:', error))
  }, [])

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((id) => {
        setProducts((prevProducts) => [...prevProducts, { ...newProduct, id }])
        setIsModalOpen(false)
        setNewProduct(initialState)
      })
      .catch((error) => console.error('Error adding product:', error))
  }

  return (
    <div css={styles.container}>
      <h2>Product List</h2>
      <button css={styles.button} onClick={() => setIsModalOpen(true)}>
        新規作成
      </button>
      {isModalOpen && (
        <>
          <div css={styles.overlay} onClick={() => setIsModalOpen(false)} />
          <div css={styles.modal}>
            <form onSubmit={handleSubmit}>
              <h2>新規作成モーダル</h2>
              <label>
                商品名:
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleNewProductChange}
                  aria-label="商品名"
                />
              </label>
              <label>
                商品単価:
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleNewProductChange}
                  aria-label="商品単価"
                />
              </label>
              <label>
                詳細:
                <input
                  type="text"
                  name="description"
                  value={newProduct.description}
                  onChange={handleNewProductChange}
                  aria-label="詳細"
                />
              </label>
              <label>
                イメージURL:
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleNewProductChange}
                  aria-label="イメージURL"
                />
              </label>
              <button onClick={handleSubmit}>作成</button>
            </form>
          </div>
        </>
      )}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>価格: {product.price.toLocaleString()}円</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
