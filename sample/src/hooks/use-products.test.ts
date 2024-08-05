import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import { useProducts } from '@/hooks/use-products'
import { renderHook, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { handlers, resetProducts } from '@/testing/mocks/handlers'
import { HttpResponse, http } from 'msw'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  resetProducts()
  server.resetHandlers()
})
afterAll(() => server.close())

test('should fetch and store products correctly', async () => {
  const { result } = renderHook(() => useProducts())

  expect(result.current.products).toEqual([])
  result.current.refresh()

  await waitFor(() => {
    expect(result.current.products).toEqual([
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
    ])
  })
})

test('should handle errors correctly', async () => {
  server.use(
    http.get(
      '/api/products',
      () =>
        new HttpResponse(null, {
          status: 500,
        }),
    ),
  )

  const { result } = renderHook(() => useProducts())

  console.error = vi.fn()
  result.current.refresh()

  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching products:',
      expect.any(Error),
    )
    expect(result.current.products).toEqual([])
  })
})
