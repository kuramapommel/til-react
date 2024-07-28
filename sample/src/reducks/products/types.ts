import { z } from 'zod'

export const validationSchema = z.object({
  id: z.number(),
  name: z.string().min(1, '商品名は必須です'),
  image: z.string().min(1, '商品画像は必須です'),
  price: z
    .number()
    .min(1, '価格は必須です')
    .positive('価格は正の値で入力してください'),
  description: z.string(),
})
export type Product = z.infer<typeof validationSchema>

export type ProductStore = {
  products: Product[]
  remove: (id: number) => Promise<void>
  append: (product: Product) => Promise<void>
  update: (newProduct: Product) => Promise<void>
  refresh: () => Promise<void>
}
