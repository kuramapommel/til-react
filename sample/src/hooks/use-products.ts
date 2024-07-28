import { create, StateCreator } from 'zustand'
import {
  fetchAll,
  save,
  create as createProduct,
  deleteBy,
} from '../reducks/products/operations'
import { Product, ProductStore } from '../reducks/products/types'

const ProductSlice: StateCreator<ProductStore> = (set) => ({
  products: [],
  remove: deleteBy((deletedId: number) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== deletedId),
    })),
  ),
  append: createProduct((product: Product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  ),
  update: save((product: Product) =>
    set((state) => ({
      products: state.products.map((prevProduct) =>
        prevProduct.id === product.id ? product : prevProduct,
      ),
    })),
  ),
  refresh: fetchAll((all: Product[]) =>
    set(() => ({
      products: [...all],
    })),
  ),
})

export const useProducts = create<ProductStore>((...a) => ({
  ...ProductSlice(...a),
}))
