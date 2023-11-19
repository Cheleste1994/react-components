import { renderHook } from '@testing-library/react';
import React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import {
  useGetProductDetailQuery,
  useGetProductsQuery,
} from '../api/productsApi';
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
  it('should "useGetProductsQuery" return result correct', () => {
    const { result } = renderHook(() => useGetProductsQuery('search?q=Test'), {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getProducts',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });
  });

  it('should "useGetProductsQuery" return result correct', () => {
    const { result } = renderHook(() => useGetProductDetailQuery('1'), {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName: 'getProductDetail',
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });
  });
});
