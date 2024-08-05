import { useForm } from 'react-hook-form'
import { Product, validationSchema } from '@/reducks/products/types'
import { zodResolver } from '@hookform/resolvers/zod'

export const useProductForm = (defaultValues?: Product) => {
  return useForm<Product>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues || { id: 0 },
  })
}
