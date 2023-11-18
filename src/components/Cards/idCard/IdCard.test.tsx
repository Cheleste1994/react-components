import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import IdCard from './IdCard';
import makeRequest from '../../../api/data-service';

jest.mock('../../../api/data-service');

const mockData = {
  id: 1,
  title: 'Product 1',
  brand: 'Brand 1',
  category: 'Category 1',
  description: 'Description 1',
  price: 100,
};

jest
  .spyOn(require('../../../redux/hooks/hooks'), 'useAppDispatch')
  .mockReturnValue(() => {});

beforeEach(() => {
  jest.clearAllMocks();
  (makeRequest as jest.Mock).mockImplementation(async () => ({
    data: mockData,
  }));
});

describe('Products details', () => {
  it('triggers an additional API call to fetch detailed information', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: { pathname: '/1' },
    }));

    jest
      .spyOn(
        require('../../../redux/api/productsApi'),
        'useGetProductDetailQuery'
      )
      .mockReturnValue({
        data: mockData,
        isLoading: false,
        isError: undefined,
      });

    render(
      <MemoryRouter initialEntries={['/']}>
        <IdCard />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByTestId('card-details')).toBeInTheDocument()
    );
  });

  it('clicking the close button hides the component', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: { pathname: '/1' },
    }));

    jest
      .spyOn(
        require('../../../redux/api/productsApi'),
        'useGetProductDetailQuery'
      )
      .mockReturnValue({
        data: mockData,
        isLoading: false,
        isError: undefined,
      });

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route
            path={'/'}
            element={<div data-testid="test-closed">Test closed</div>}
          />
          <Route path={'/:id'} element={<IdCard />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByTestId('card-details')).toBeInTheDocument()
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('closed-details'));
    });

    expect(screen.getByTestId('test-closed')).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: { pathname: '/1' },
    }));

    jest
      .spyOn(
        require('../../../redux/api/productsApi'),
        'useGetProductDetailQuery'
      )
      .mockReturnValue({
        data: mockData,
        isLoading: false,
        isError: undefined,
      });

    render(
      <MemoryRouter initialEntries={['/']}>
        <IdCard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockData.title)).toBeInTheDocument();
      expect(screen.getByText(mockData.brand)).toBeInTheDocument();
      expect(screen.getByText(mockData.category)).toBeInTheDocument();
      expect(screen.getByText(mockData.description)).toBeInTheDocument();
      expect(screen.getByText(`${mockData.price}$`)).toBeInTheDocument();
    });
  });

  it('Check that a loading indicator is displayed while fetching data', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useLocation: { pathname: '' },
    }));

    jest
      .spyOn(
        require('../../../redux/api/productsApi'),
        'useGetProductDetailQuery'
      )
      .mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: undefined,
      });

    render(
      <MemoryRouter initialEntries={['/']}>
        <IdCard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('logo-load')).toBeInTheDocument();
    });
  });
});
