import { renderHook } from '@testing-library/react';
import React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useGetProductsQuery } from '../api/productsApi';
import { store } from '../store';

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

const data = {};

beforeAll(() => {
  fetchMock.mockOnceIf('https://dummyjson.com/products/', () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify({ data }),
    })
  );
});

describe('Api', () => {
  it('useGetProductsQuery', () => {
    renderHook(() => useGetProductsQuery('search?q=Test'), {
      wrapper: Wrapper,
    });
  });
});
