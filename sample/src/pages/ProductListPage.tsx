// ProductList.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

const styles = {
  container: css`
    padding: 20px;
  `,
}

type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data || []))
      .catch((error) => console.error('Error fetching products:', error))
  }, [])
  return (
    <div css={styles.container}>
      <h2>Product List</h2>
      {products.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>価格: {product.price.toLocaleString()}円</p>
          <p>{product.description}</p>
        </li>
      ))}
    </div>
  )
}

export default ProductList
