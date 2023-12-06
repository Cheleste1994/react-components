import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Product, ProductList } from '../../types/interface';

const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

export const {
  useGetProductsQuery,
  useGetProductDetailQuery,
  util: { getRunningQueriesThunk },
} = productsApi;
export const { getProductDetail, getProducts } = productsApi.endpoints;

export default productsApi;
