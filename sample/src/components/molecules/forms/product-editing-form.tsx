import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const validationSchema = z.object({
  id: z.number(),
  name: z.string().min(1, '商品名は必須です'),
  image: z.string().min(1, '商品画像は必須です'),
  price: z
    .number()
    .min(1, '価格は必須です')
    .positive('価格は正の値で入力してください'),
  description: z.string(),
})
type Product = z.infer<typeof validationSchema>

type ProductEditingFormProps = {
  initialCurrentProduct: Product
  handleResponse: (newProduct: Product) => void
  handleCancel: () => void
  afterSubmit: () => void
}
const ProductEditingForm: React.FC<ProductEditingFormProps> = (
  props: ProductEditingFormProps,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Product>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
    defaultValues: props.initialCurrentProduct,
  })

  const handleSaveProduct = (product: Product) => {
    fetch(`/api/product/${product.id.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((id) => props.handleResponse({ ...product, id }))
      .catch((error) => console.error('Error adding product:', error))
    props.afterSubmit()
  }

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
}

export default React.memo(ProductEditingForm)
