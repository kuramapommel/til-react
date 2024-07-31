import React from 'react'
import { useProducts } from '../../../hooks/use-products'
import { getRemove } from '../../../reducks/products/selectors'
import { Product } from '../../../reducks/products/types'

type ProductDeletionFormProps = {
  selectedProduct: Product
  handleCancel: () => void
  afterSubmit: () => void
}

const ProductDeletionForm: React.FC<ProductDeletionFormProps> = React.memo(
  function ProductDeletionForm(props: ProductDeletionFormProps) {
    const remove = useProducts(getRemove)

    const handleDeleteProduct = async (e: React.FormEvent) => {
      e.preventDefault()
      await remove(props.selectedProduct.id)
      return props.afterSubmit()
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
  },
)

export default ProductDeletionForm
