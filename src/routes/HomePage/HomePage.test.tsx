import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import { Context } from '../../components/Context/Context';
import { ApiResponseState } from '../../types/interface';

const dataSearch: ApiResponseState = {
  isLoading: false,
  dataResponse: {
    total: 100,
    skip: 0,
    limit: 10,
    products: [
      {
        id: 1,
        title: 'Product 1',
        brand: 'Brand 1',
        category: 'Category 1',
      },
      {
        id: 2,
        title: 'Product 2',
        brand: 'Brand 2',
        category: 'Category 2',
      },
    ],
  },
};

describe('Home page', () => {
  const renderComponent = (url: string) =>
    render(
      <MemoryRouter initialEntries={[url]}>
        <Context.Provider value={{ dataSearch }}>
          <HomePage />
        </Context.Provider>
      </MemoryRouter>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display the limit from the url', async () => {
    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
      .mockReturnValue(() => {});

    jest
      .spyOn(require('../../redux/api/productsApi'), 'useGetProductsQuery')
      .mockReturnValue(dataSearch);

    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppSelector')
      .mockReturnValue({ dataSearch });

    renderComponent('/?limit=20');
    expect(screen.getByTestId('limit-products')).toContainHTML('20');
    cleanup();
    renderComponent('/?limit=10');
    expect(screen.getByTestId('limit-products')).toContainHTML('10');
  });

  it('should display the selected value', async () => {
    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
      .mockReturnValue(() => {});

    jest
      .spyOn(require('../../redux/api/productsApi'), 'useGetProductsQuery')
      .mockReturnValue(dataSearch);

    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppSelector')
      .mockReturnValue({ dataSearch });

    renderComponent('/?limit=20');

    const limitProducts = screen.getByTestId('limit-products');

    expect(limitProducts).toContainHTML('20');

    fireEvent.change(limitProducts, '10');

    expect(limitProducts).toContainHTML('10');
  });

  it('should loading correct', async () => {
    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
      .mockReturnValue(() => {});

    jest
      .spyOn(require('../../redux/api/productsApi'), 'useGetProductsQuery')
      .mockReturnValue({ isLoading: true, data: undefined });

    renderComponent('/?search=Test');

    const limitProducts = screen.queryByTestId('limit-products');
    const paginations = screen.queryByTestId('paginations');

    expect(limitProducts).not.toBeInTheDocument();
    expect(paginations).not.toBeInTheDocument();
  });

  it('should paginations correct', async () => {
    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
      .mockReturnValue(() => {});

    jest
      .spyOn(require('../../redux/api/productsApi'), 'useGetProductsQuery')
      .mockReturnValue({
        isLoading: true,
        data: {
          total: 1,
          skip: 0,
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
      });

    renderComponent('/?search=Test');

    const paginations = screen.queryByTestId('paginations');

    expect(paginations).not.toBeInTheDocument();
  });
});
