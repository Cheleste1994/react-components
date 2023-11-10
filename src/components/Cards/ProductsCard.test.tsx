import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ApiResponseState } from '../../types/interface';
import { Context } from '../Context/Context';
import ProductsCard from './ProductsCard';

it('renders the specified number of cards and displays appropriate message if no cards are present', () => {
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

  render(
    <MemoryRouter>
      <Context.Provider value={{ dataSearch }}>
        <ProductsCard />
      </Context.Provider>
    </MemoryRouter>
  );

  const logoLoadComponent = screen.queryByTestId('logo-load');
  expect(logoLoadComponent).toBeNull();

  dataSearch.dataResponse?.products.forEach((product) => {
    const titleElement = screen.getByText(product.title);
    expect(titleElement).toBeInTheDocument();
  });
});

it('renders LogoLoad when products array is empty', () => {
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

  screen.debug();

  const cardProducts = screen.getAllByTestId('card-product');

  cardProducts.forEach(async (product, index) => {
    await userEvent.click(product);
    expect(mockNavigate).toHaveBeenCalledWith(
      `/${dataSearch.dataResponse?.products[index].id}`
    );
  });
});
