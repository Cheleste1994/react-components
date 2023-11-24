import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import IdCard from '../../components/Cards/idCard/IdCard';
import PageError from './PageError';
import { ApiResponseState } from '../../types/interface';

describe('404 page', () => {
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

  const renderComponent = (url: string) =>
    render(
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="*" element={<PageError />} />
          <Route path=":id" element={<IdCard />} />
        </Routes>
      </MemoryRouter>
    );

  jest
    .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
    .mockReturnValue(() => {});

  jest
    .spyOn(require('../../redux/api/productsApi'), 'useGetProductsQuery')
    .mockReturnValue(dataSearch);

  jest
    .spyOn(require('../../redux/hooks/hooks'), 'useAppSelector')
    .mockReturnValue({ dataSearch });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('404 page is displayed when navigating to an invalid route', async () => {
    renderComponent('/');
    expect(screen.queryByTestId('page-404')).not.toBeInTheDocument();
    expect(screen.queryByTestId('page-home')).toBeInTheDocument();

    cleanup();

    renderComponent('/test/page/404');

    expect(screen.queryByTestId('page-404')).toBeInTheDocument();
    expect(screen.queryByTestId('page-home')).not.toBeInTheDocument();
  });
});
