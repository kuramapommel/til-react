import React from 'react'
import { useProducts } from '../../../hooks/use-products'
import { getAppend } from '../../../reducks/products/selectors'
import { Product } from '../../../reducks/products/types'
import { useProductForm } from '../../../hooks/use-product-form'

type ProductAdditionFormProps = {
  afterSubmit: () => void
}

const ProductAdditionForm: React.FC<ProductAdditionFormProps> = (
  props: ProductAdditionFormProps,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useProductForm()
  const append = useProducts(getAppend)

  const handleAddProduct = (product: Product) =>
    append(product).then(() => props.afterSubmit())

  return (
    <form onSubmit={handleSubmit(handleAddProduct)}>
      <h2>新規作成モーダル</h2>
      <label>
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
        作成
      </button>
    </form>
  )
}

export default React.memo(ProductAdditionForm)
