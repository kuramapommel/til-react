import { ProductStore } from '@/reducks/products/types'

export const getProductsAndRefresh = (state: ProductStore) => {
  return {
    products: state.products,
    refresh: state.refresh,
  }
}
export const getUpdate = (state: ProductStore) => state.update
export const getRemove = (state: ProductStore) => state.remove
export const getAppend = (state: ProductStore) => state.append
