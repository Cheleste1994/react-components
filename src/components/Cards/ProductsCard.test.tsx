import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ApiResponseState } from '../../types/interface';
import { Context } from '../Context/Context';
import ProductsCard from './ProductsCard';

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
describe('Products', () => {
  it('renders the specified number of cards', () => {
    render(
      <MemoryRouter>
        <Context.Provider value={{ dataSearch }}>
          <ProductsCard />
        </Context.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('card-product').length).toBe(2);
  });

  it('card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Context.Provider value={{ dataSearch }}>
          <ProductsCard />
        </Context.Provider>
      </MemoryRouter>
    );

    dataSearch.dataResponse?.products.forEach((product) => {
      const titleElement = screen.getByText(product.title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('appropriate message is displayed if no cards are present', () => {
    const dataSearch: ApiResponseState = {
      isLoading: true,
      dataResponse: null,
    };

    render(
      <MemoryRouter>
        <Context.Provider value={{ dataSearch }}>
          <ProductsCard />
        </Context.Provider>
      </MemoryRouter>
    );

    const logoLoadComponent = screen.getByTestId('logo-load');

    expect(logoLoadComponent).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', () => {
    const mockNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <Context.Provider value={{ dataSearch }}>
          <ProductsCard />
        </Context.Provider>
      </MemoryRouter>
    );

    const cardProducts = screen.getAllByTestId('card-product');

    cardProducts.forEach(async (product, index) => {
      await userEvent.click(product);
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          `/${dataSearch.dataResponse?.products[index].id}`
        );
      });
    });
  });

  it('opens detailed card component on card click and renders the correct outlet', async () => {
    const mockNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Context.Provider value={{ dataSearch }}>
          <Routes>
            <Route path={'/'} element={<ProductsCard />} />
            <Route
              path={'/:id'}
              element={<div data-testid="test-outlet">Test Outlet</div>}
            />
          </Routes>
        </Context.Provider>
      </MemoryRouter>
    );

    const cardProducts = screen.getAllByTestId('card-product');

    await userEvent.click(cardProducts[0]);

    expect(screen.getByTestId('test-outlet')).toBeInTheDocument();
  });
});
