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
  remove: (id: number) => void
  pop: (product: Product) => void
  put: (newProduct: Product) => void
  refresh: () => Promise<void>
}

export const useProducts = create<ProductStore>()((set) => ({
  products: [],
  remove: (id: number) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }))
  },
  pop: (product: Product) => {
    set((state) => ({
      products: [...state.products, product],
    }))
  },
  put: (newProduct: Product) => {
    set((state) => ({
      products: state.products.map((prevProduct) =>
        prevProduct.id === newProduct.id ? newProduct : prevProduct,
      ),
    }))
  },
  refresh: async () => {
    const res = await fetch('/api/products')
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Error fetching products:', error)
        return []
      })

    set(() => ({
      products: [...res],
    }))
  },
}))
