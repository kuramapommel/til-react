import { create } from 'zustand'

export type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}

type ProductStore = {
  products: Product[]
  refresh: () => Promise<void>
}

export const useProducts = create<ProductStore>()((set) => ({
  products: [],
  refresh: async () => {
    const res = await fetch('/api/products')
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Error fetching products:', error)
        return []
      })

    set(() => ({
      products: res,
    }))
  },
}))
