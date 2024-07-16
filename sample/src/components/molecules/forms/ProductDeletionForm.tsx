import React from 'react'

type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}

type ProductDeletionFormProps = {
  selectedProduct: Product
  handleResponse: (id: number) => void
  handleCancel: () => void
  afterSubmit: () => void
}

const ProductDeletionForm: React.FC<ProductDeletionFormProps> = (
  props: ProductDeletionFormProps,
) => {
  const handleDeleteProduct = (e: React.FormEvent) => {
    e.preventDefault()
    fetch(`/api/product/${props.selectedProduct.id.toString()}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(props.handleResponse)
      .catch((error) => console.error('Error deleting product:', error))
    props.afterSubmit()
  }
  return (
    <form onSubmit={handleDeleteProduct}>
      <p>{props.selectedProduct.name}を本当に削除しますか？</p>
      <button type="submit">削除する</button>
      <button type="button" onClick={props.handleCancel}>
        キャンセル
      </button>
    </form>
  )
}

export default React.memo(ProductDeletionForm)
