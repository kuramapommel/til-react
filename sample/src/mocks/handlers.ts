import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(
      [
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
      ],
      {
        status: 202,
        statusText: 'Mocked status',
      },
    )
  }),
]
