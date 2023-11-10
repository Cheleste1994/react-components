import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import React from 'react';
import { MemoryRouter } from 'react-router';
import ProductsCard from './ProductsCard';

describe('<ProductsCard />', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <ProductsCard />
      </MemoryRouter>
    );
  });
});
