import React from 'react'
import { useProducts } from '../../../hooks/use-products'

type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}

type ProductDeletionFormProps = {
  selectedProduct: Product
  handleCancel: () => void
  afterSubmit: () => void
}

const ProductDeletionForm: React.FC<ProductDeletionFormProps> = (
  props: ProductDeletionFormProps,
) => {
  const remove = useProducts((state) => state.remove)

  const handleDeleteProduct = (e: React.FormEvent) => {
    e.preventDefault()
    return remove(props.selectedProduct.id).then(() => props.afterSubmit())
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
