import { useState } from 'react'
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

type ProductAdditionFormProps = {
  handleResponse: (newProduct: Product) => void
  afterSubmit: () => void
}

const ProductAdditionForm: React.FC<ProductAdditionFormProps> = (
  props: ProductAdditionFormProps,
) => {
  const [newProduct, setNewProduct] = useState<Product>(initialState)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' ? Number(value) : value,
    }))
  }

  const handleAddProduct = (e: React.FormEvent) => {
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
        console.log('response:', id)
        props.handleResponse({ ...newProduct, id })
      })
      .catch((error) => console.error('Error adding product:', error))

    props.afterSubmit()
    setNewProduct(initialState)
  }

  return (
    <form onSubmit={handleAddProduct}>
      <h2>新規作成モーダル</h2>
      <label>
        商品名:
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          aria-label="商品名"
        />
      </label>
      <label>
        商品単価:
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          aria-label="商品単価"
        />
      </label>
      <label>
        詳細:
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          aria-label="詳細"
        />
      </label>
      <label>
        イメージURL:
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
          aria-label="イメージURL"
        />
      </label>
      <button type="submit">作成</button>
    </form>
  )
}

export default ProductAdditionForm
