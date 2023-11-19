// import React, { PropsWithChildren } from 'react';
// import { render } from '@testing-library/react';
// import type { RenderOptions } from '@testing-library/react';
// import { configureStore } from '@reduxjs/toolkit';
// import type { PreloadedState } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';

// import type { RootState } from './store';
// // As a basic setup, import your same slice reducers
// import productsApi from './api/productsApi';
// import productSlice from './slice/products.slice';
// import detailSlice from './slice/detail.slice';

// // This type interface extends the default options for render from RTL, as well
// // as allows the user to specify other things such as initialState, store.
// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: PreloadedState<RootState>;
//   store?: ReturnType<typeof configureStore>;
// }

// export function renderWithProviders(
//   ui: React.ReactElement,
//   {
//     preloadedState = {
//       productsApi: {
//         queries: {},
//         mutations: {},
//         provided: {
//           Products: {},
//         },
//         subscriptions: {},
//         config: {
//           refetchOnMountOrArgChange: number | boolean;
//           refetchOnReconnect: boolean;
//           refetchOnFocus: boolean;
//           reducerPath: "productsApi";
//           online: boolean;
//           focused: boolean;
//           middlewareRegistered: boolean | "conflict";
//           keepUnusedDataFor: number;
//       }
//       },
//       productSlice: {
//         dataSearch: {
//           isLoading: true,
//           dataResponse: undefined,
//         },
//         searchValue: localStorage.getItem('inputValue') || '',
//         page: 1,
//       },
//       detailSlice: {
//         isLoading: true,
//         dataId: undefined,
//         isOpen: false,
//       },
//     },
//     store = configureStore({
//       reducer: {
//         [productsApi.reducerPath]: productsApi.reducer,
//         productSlice,
//         detailSlice,
//       },
//       preloadedState,
//     }),
//     ...renderOptions
//   }: ExtendedRenderOptions = {}
// ) {
//   function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
//     return <Provider store={store}>{children}</Provider>;
//   }

//   // Return an object with the store and all of RTL's query functions
//   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
// }
