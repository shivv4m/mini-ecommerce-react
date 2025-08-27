
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: { rate: number, count: number }
}

export const api = createApi({
  reducerPath: 'fakestoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  tagTypes: ['Products','Product','Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `products`,
      providesTags: (result) =>
        result ? [
          ...result.map(({ id }) => ({ type: 'Product' as const, id })),
          { type: 'Products', id: 'LIST' },
        ] : [{ type: 'Products', id: 'LIST' }],
    }),
    getCategories: builder.query<string[], void>({
      query: () => `products/categories`,
      providesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
    getProductById: builder.query<Product, string | number>({
      query: (id) => `products/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Product', id }]
    }),
  })
})

export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductByIdQuery } = api
