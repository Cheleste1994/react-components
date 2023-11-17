import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ApiResponseState } from '../../types/interface';
import { Context } from '../Context/Context';
import Paginations from './Paginations';
import ProductsCard from '../Cards/ProductsCard';

const dataSearch: ApiResponseState = {
  isLoading: false,
  dataResponse: {
    total: 100,
    skip: 1,
    limit: 1,
    products: [
      {
        id: 1,
        title: 'Product 1',
        brand: 'Brand 1',
        category: 'Category 1',
      },
    ],
  },
};

jest
  .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
  .mockReturnValue(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

test('Paginations updates URL query parameter when page changes', () => {
  jest
    .spyOn(require('../../redux/hooks/hooks'), 'useAppSelector')
    .mockReturnValue({
      dataSearch: dataSearch,
      page: 2,
    });

  render(
    <MemoryRouter initialEntries={['/?skip=0&page=1&limit=1']}>
      <Context.Provider value={{ dataSearch }}>
        <ProductsCard />
        <Paginations />
      </Context.Provider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTestId('next-page'));

  expect(screen.getByTestId('page-display').innerHTML).toBe('2');
});

test('Paginations updates URL query parameter when page changes', () => {
  jest
    .spyOn(require('../../redux/hooks/hooks'), 'useAppSelector')
    .mockReturnValue({
      dataSearch: dataSearch,
      page: 1,
    });

  render(
    <MemoryRouter initialEntries={['/?skip=1&page=2&limit=1']}>
      <Context.Provider value={{ dataSearch }}>
        <ProductsCard />
        <Paginations />
      </Context.Provider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTestId('prev-page'));

  expect(screen.getByTestId('page-display').innerHTML).toBe('1');
});
