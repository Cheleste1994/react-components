import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import React from 'react';
import { ApiResponseState } from '../../types/interface';
import ProductsList from './ProductsList';

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(<ProductsList dataResponse={dataSearch.dataResponse} />, {
      wrapper: MemoryRouterProvider,
    });

  it('renders the specified number of cards', () => {
    renderComponent();

    expect(screen.getAllByTestId('card-product').length).toBe(2);
  });

  it('card component renders the relevant card data', () => {
    renderComponent();

    dataSearch.dataResponse?.products.forEach((product) => {
      const titleElement = screen.getByText(product.title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('appropriate message is displayed if no cards are present', () => {
    render(<ProductsList dataResponse={null} />, {
      wrapper: MemoryRouterProvider,
    });

    const logoLoadComponent = screen.getByTestId('logo-load');

    expect(logoLoadComponent).toBeInTheDocument();
  });

  it('clicking on a card opens a detailed card component', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
      push: mockNavigate,
    });
    renderComponent();

    const cardProducts = screen.getAllByTestId('card-product');

    cardProducts.forEach(async (product, index) => {
      fireEvent.click(product);
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          `/${dataSearch.dataResponse?.products[index].id}`
        );
      });
    });
  });
});
