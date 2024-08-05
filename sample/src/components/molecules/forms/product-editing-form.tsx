import React from 'react'
import { useProducts } from '@/hooks/use-products'
import { getUpdate } from '@/reducks/products/selectors'
import { useProductForm } from '@/hooks/use-product-form'
import { Product } from '@/reducks/products/types'

type ProductEditingFormProps = {
  initialCurrentProduct: Product
  handleCancel: () => void
  afterSubmit: () => void
}
const ProductEditingForm: React.FC<ProductEditingFormProps> = React.memo(
  function ProductEditingForm(props: ProductEditingFormProps) {
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useProductForm(props.initialCurrentProduct)
    const update = useProducts(getUpdate)

    const handleSaveProduct = (product: Product) =>
      update(product).then(() => props.afterSubmit())

    return (
      <form onSubmit={handleSubmit(handleSaveProduct)}>
        <h2>編集モーダル</h2>
        <label htmlFor="name">
          商品名:
          <input
            type="text"
            id="name"
            {...register('name')}
            aria-label="商品名"
          />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
        <label>
          商品単価:
          <input
            type="number"
            id="price"
            {...register('price', { valueAsNumber: true })}
            aria-label="商品単価"
          />
        </label>
        {errors.price && <p>{errors.price.message}</p>}
        <label>
          詳細:
          <input
            type="text"
            id="description"
            {...register('description')}
            aria-label="詳細"
          />
        </label>
        {errors.description && <p>{errors.description.message}</p>}
        <label>
          イメージURL:
          <input
            type="text"
            id="image"
            {...register('image')}
            aria-label="イメージURL"
          />
        </label>
        {errors.image && <p>{errors.image.message}</p>}
        <button type="submit" disabled={!isValid}>
          保存
        </button>
        <button type="button" onClick={props.handleCancel}>
          キャンセル
        </button>
      </form>
    )
  },
)

export default ProductEditingForm
