import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Paginations from './Paginations';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

test('Paginations updates URL query parameter when page changes', () => {
  render(<Paginations />);

  fireEvent.click(screen.getByTestId('next-page'));

  expect(screen.getByTestId('page-display').innerHTML).toBe('2');
});

test('Paginations updates URL query parameter when page changes', () => {
  render(
    <MemoryRouterProvider url="/?page=2">
      <Paginations />
    </MemoryRouterProvider>
  );

  fireEvent.click(screen.getByTestId('prev-page'));

  expect(screen.getByTestId('page-display').innerHTML).toBe('1');
});
