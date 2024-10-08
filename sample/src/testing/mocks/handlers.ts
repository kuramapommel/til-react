import { http, HttpResponse } from 'msw'

type Product = {
  id: number
  name: string
  image: string
  price: number
  description: string
}

const initialProducts: Product[] = [
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
  {
    id: 3,
    name: 'Product 3',
    image: 'https://placehold.jp/3d4070/ffffff/150x150.png',
    price: 2500,
    description: 'Description for product 2',
  },
  {
    id: 4,
    name: 'Product 4',
    image: 'https://placehold.jp/3d4070/ffffff/150x150.png',
    price: 3000,
    description: 'Description for product 2',
  },
  {
    id: 5,
    name: 'Product 5',
    image: 'https://placehold.jp/3d4070/ffffff/150x150.png',
    price: 10000,
    description: 'Description for product 2',
  },
]

let products: Product[] = [...initialProducts]
export function resetProducts() {
  products = [...initialProducts]
}

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
      products = [...products, { ...newProduct, id: products.length + 1 }]

      return HttpResponse.json(newProduct.id, {
        status: 202,
        statusText: 'Mocked status',
      })
    },
  ),
  http.post<{ id: string }, Product, number, '/api/product/:id'>(
    '/api/product/:id',
    async ({ params, request }) => {
      const newProduct: Product = await request.json().then((data) => ({
        ...data,
        id: Number(params.id),
      }))
      products = products.map((product) =>
        product.id === newProduct.id ? newProduct : product,
      )

      return HttpResponse.json(newProduct.id, {
        status: 202,
        statusText: 'Mocked status',
      })
    },
  ),
  http.delete<{ id: string }, {}, number, '/api/product/:id'>(
    '/api/product/:id',
    async ({ params }) => {
      const id = Number(params.id)
      products = products.filter((product) => product.id !== id)

      return HttpResponse.json(id, {
        status: 202,
        statusText: 'Mocked status',
      })
    },
  ),
]
