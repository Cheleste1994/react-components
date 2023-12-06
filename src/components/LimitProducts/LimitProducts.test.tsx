import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LimitProducts from './LimitProducts';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import mockRouter from 'next-router-mock';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

test('should select limit products correct', () => {
  render(<LimitProducts />, {
    wrapper: MemoryRouterProvider,
  });

  expect(mockRouter.query).not.toMatchObject({
    ...mockRouter.query,
    limit: '20',
  });

  const select = screen.getByTestId('limit-products');

  fireEvent.change(select, {
    target: {
      value: '20',
    },
  });

  expect(mockRouter.query).toMatchObject({
    ...mockRouter.query,
    limit: '20',
  });
});
