import { configureStore } from '@reduxjs/toolkit';
import productsApi from './api/productsApi';
import productSlice from './slice/products.slice';
import detailSlice from './slice/detail.slice';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    productSlice,
    detailSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const makeStore = () => store;

export const wrapper = createWrapper(makeStore, { debug: true });
