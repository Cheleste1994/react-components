import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import {
  useGetProductDetailQuery,
  useGetProductsQuery,
} from '../api/productsApi';
import { store } from '../store';

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
  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('should "useGetProductsQuery" return result correct', async () => {
    const { result } = renderHook(() => useGetProductsQuery('search?q=Test'), {
      wrapper: Wrapper,
    });
    await act(async () => {
      expect(result.current).toMatchObject({
        status: 'pending',
        endpointName: 'getProducts',
        isLoading: true,
        isSuccess: false,
        isError: false,
        isFetching: true,
      });
    });
  });

  it('should "useGetProductsQuery" return result correct', async () => {
    const { result } = renderHook(() => useGetProductDetailQuery('1'), {
      wrapper: Wrapper,
    });
    await act(async () => {
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
});
