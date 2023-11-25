import { render, screen } from '@testing-library/react';
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  PreviewData,
} from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import { ApiResponseState } from '../../types/interface';
import HomePage, { getServerSideProps } from '../index';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('HomePage', () => {
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

  test('renders LimitProducts component', () => {
    render(<HomePage products={{ dataResponse: null, isLoading: true }} />);
    expect(screen.getByTestId('limit-products')).toBeInTheDocument();
  });

  test('does not render Paginations component when total is less than or equal to products length', () => {
    render(<HomePage products={{ dataResponse: null, isLoading: true }} />);
    expect(screen.queryByTestId('paginations')).toBeNull();
  });

  test('should paginations correct', () => {
    render(
      <HomePage
        products={{ dataResponse: dataSearch.dataResponse, isLoading: false }}
      />
    );
    expect(screen.queryByTestId('paginations')).toBeInTheDocument();
  });
});

describe('getServerSideProps', () => {
  const products = {
    dataResponse: null,
    isLoading: false,
  };

  test('getStaticProps', async () => {
    const context = {
      query: {
        search: 'example',
        limit: 10,
        skip: 0,
      },
    } as unknown as GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;

    const result = getServerSideProps;

    const { props } = (await result(context)) as {
      props: InferGetServerSidePropsType<typeof getServerSideProps>;
    };

    expect(props.products).toMatchObject(products);
  });

  test('should not search params in getStaticProps', async () => {
    const context = {
      query: {
        limit: 10,
        skip: 0,
      },
    } as unknown as GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;

    const result = getServerSideProps;

    const { props } = (await result(context)) as {
      props: InferGetServerSidePropsType<typeof getServerSideProps>;
    };

    expect(props.products).toMatchObject(products);
  });
});
