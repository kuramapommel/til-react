import React from 'react'
import { useState } from 'react'

type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}

type ProductEditingFormProps = {
  initialCurrentProduct: Product
  handleResponse: (newProduct: Product) => void
  handleCancel: () => void
  afterSubmit: () => void
}
const ProductEditingForm: React.FC<ProductEditingFormProps> = (
  props: ProductEditingFormProps,
) => {
  const [currentProduct, setCurrentProduct] = useState<Product>(
    props.initialCurrentProduct,
  )
  const handleEditProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentProduct({
      ...currentProduct,
      [name]: name === 'price' ? Number(value) : value,
    })
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    fetch(`/api/product/${currentProduct.id.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentProduct),
    })
      .then((response) => response.json())
      .then((id) => props.handleResponse({ ...currentProduct, id }))
      .catch((error) => console.error('Error adding product:', error))
    props.afterSubmit()
    setCurrentProduct(currentProduct)
  }

  return (
    <form onSubmit={handleSaveProduct}>
      <h2>編集モーダル</h2>
      <label>
        商品名:
        <input
          type="text"
          name="name"
          value={currentProduct.name}
          onChange={handleEditProductChange}
          aria-label="商品名"
        />
      </label>
      <label>
        商品単価:
        <input
          type="number"
          name="price"
          value={currentProduct.price}
          onChange={handleEditProductChange}
          aria-label="商品単価"
        />
      </label>
      <label>
        詳細:
        <input
          type="text"
          name="description"
          value={currentProduct.description}
          onChange={handleEditProductChange}
          aria-label="詳細"
        />
      </label>
      <label>
        イメージURL:
        <input
          type="text"
          name="image"
          value={currentProduct.image}
          onChange={handleEditProductChange}
          aria-label="イメージURL"
        />
      </label>
      <button type="submit">保存</button>
      <button type="button" onClick={props.handleCancel}>
        キャンセル
      </button>
    </form>
  )
}

export default React.memo(ProductEditingForm)
