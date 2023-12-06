import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './layout';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
jest.mock('./Header/Header');

test('should layout return childrens', () => {
  render(
    <Layout>
      <div>Test layout!</div>
    </Layout>
  );

  expect(screen.getByText('Test layout!')).toBeInTheDocument();
});
