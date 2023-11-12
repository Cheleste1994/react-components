import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import IdCard from '../../components/Cards/idCard/IdCard';
import PageError from './PageError';

describe('404 page', () => {
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
