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
  remove: (id: number) => Promise<void>
  pop: (product: Product) => Promise<void>
  put: (newProduct: Product) => Promise<void>
  refresh: () => Promise<void>
}

export const useProducts = create<ProductStore>()((set) => ({
  products: [],
  remove: async (id: number) => {
    const deletedId = await fetch(`/api/product/${id.toString()}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((id) => id)
      .catch((error) => console.error('Error deleting product:', error))
    set((state) => ({
      products: state.products.filter((product) => product.id !== deletedId),
    }))
  },
  pop: async (product: Product) => {
    const id = await fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((id) => id)
      .catch((error) => {
        console.error('Error adding product:', error)
        return 0
      })
    set((state) => ({
      products: [...state.products, { ...product, id }],
    }))
  },
  put: async (product: Product) => {
    const id = await fetch(`/api/product/${product.id.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((id) => id)
      .catch((error) => {
        console.error('Error adding product:', error)
        return 0
      })

    set((state) => ({
      products: state.products.map((prevProduct) =>
        prevProduct.id === id ? product : prevProduct,
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
