import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import IdCard, { getServerSideProps } from '../../../pages/[id]';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  PreviewData,
} from 'next/types';
import { ParsedUrlQuery } from 'querystring';

const mockData = {
  isLoading: false,
  dataId: {
    id: 1,
    title: 'Product 1',
    brand: 'Brand 1',
    category: 'Category 1',
    description: 'Description 1',
    price: 100,
  },
  isOpen: true,
};

describe('Products details', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(<IdCard detailProduct={mockData} />, {
      wrapper: MemoryRouterProvider,
    });

  it('triggers an additional API call to fetch detailed information', async () => {
    renderComponent();

    expect(screen.getByTestId('card-details')).toBeInTheDocument();
  });

  it('clicking the close button hides the component', async () => {
    mockRouter.push('/1');
    renderComponent();

    expect(mockRouter.asPath).toBe('/1');

    fireEvent.click(screen.getByTestId('closed-details'));

    expect(mockRouter.asPath).toBe('/');
  });

  it('clicking the close popup hides the component', async () => {
    const backMock = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
      back: backMock,
    });

    renderComponent();

    fireEvent.click(screen.getByTestId('popup-closed'));

    expect(backMock).toHaveBeenCalled();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(mockData.dataId.title)).toBeInTheDocument();
      expect(screen.getByText(mockData.dataId.brand)).toBeInTheDocument();
      expect(screen.getByText(mockData.dataId.category)).toBeInTheDocument();
      expect(screen.getByText(mockData.dataId.description)).toBeInTheDocument();
      expect(screen.getByText(`${mockData.dataId.price}$`)).toBeInTheDocument();
    });
  });

  it('should not found if not data', async () => {
    render(
      <IdCard
        detailProduct={{
          dataId: null,
          isLoading: true,
          isOpen: true,
        }}
      />
    );

    expect(screen.getByText('Not found!')).toBeInTheDocument();
  });
});

describe('getServerSideProps', () => {
  const detailProducts = {
    dataId: null,
    isLoading: false,
    isOpen: true,
  };

  test('getStaticProps', async () => {
    const context = {
      params: {
        id: 1,
      },
    } as unknown as GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;

    const result = getServerSideProps;

    const { props } = (await result(context)) as {
      props: InferGetServerSidePropsType<typeof getServerSideProps>;
    };

    expect(props.detailProduct).toMatchObject(detailProducts);
  });
});
