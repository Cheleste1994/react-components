import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ApiResponseState } from '../../types/interface';
import { Context } from '../Context/Context';
import ProductsCard from './ProductsCard';

test('renders the specified number of cards', () => {
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

  dataSearch.dataResponse?.products.forEach((product) => {
    const titleElement = screen.getByText(product.title);
    expect(titleElement).toBeInTheDocument();
  });
});
