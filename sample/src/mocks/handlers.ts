import { http, HttpResponse } from 'msw'

type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://placehold.jp/150x150.png',
    price: 1000,
    description: 'Description for product 1',
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://placehold.jp/3d4070/ffffff/150x150.png',
    price: 2000,
    description: 'Description for product 2',
  },
]

export const handlers = [
  http.get<{}, {}, Product[], '/api/products'>('/api/products', () => {
    return HttpResponse.json(products, {
      status: 202,
      statusText: 'Mocked status',
    })
  }),
  http.post<{}, Product, number, '/api/product'>(
    '/api/product',
    async ({ request }) => {
      const newProduct: Product = await request.json()
      products.push(newProduct)

      return HttpResponse.json(newProduct.id, {
        status: 202,
        statusText: 'Mocked status',
      })
    },
  ),
]
