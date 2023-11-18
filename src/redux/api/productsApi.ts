import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductList } from '../../types/interface';

const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/products/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductList, string>({
      query: (params) => `/${params}`,
    }),
    getProductDetail: builder.query<Product, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productsApi;

export default productsApi;
