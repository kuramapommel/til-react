import { Product } from '@/reducks/products/types'

const fetchAll = (dispach: (products: Product[]) => void) => async () => {
  const res = await fetch('/api/products')
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error fetching products:', error)
      return []
    })

  dispach(res)
}

const save =
  (dispach: (product: Product) => void) => async (product: Product) => {
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

    dispach({ ...product, id })
  }

const create =
  (dispach: (product: Product) => void) => async (product: Product) => {
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
    dispach({ ...product, id })
  }

const deleteBy = (dispach: (id: number) => void) => async (id: number) => {
  const deletedId = await fetch(`/api/product/${id.toString()}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((id) => id)
    .catch((error) => console.error('Error deleting product:', error))

  dispach(deletedId)
}

export { fetchAll, save, create, deleteBy }
