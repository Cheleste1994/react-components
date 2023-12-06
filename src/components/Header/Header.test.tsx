import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from './Header';
import { store } from '../../redux/store';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Header Component', () => {
  const renderComponent = () =>
    render(<Header initialState={store.getState()} />, {
      wrapper: MemoryRouterProvider,
    });

  const inputValueTest = 'Test';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should input value correct', () => {
    renderComponent();

    const input = screen.getByTestId('input-search');
    fireEvent.change(input, {
      target: { value: inputValueTest },
    });

    expect(input).toHaveValue(inputValueTest);
  });

  it('should router open details ', () => {
    const pushMock = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
      push: pushMock,
      query: { limit: '10' },
    });
    renderComponent();

    const input = screen.getByTestId('input-search');
    fireEvent.change(input, {
      target: { value: inputValueTest },
    });

    const form = screen.getByTestId('form-search');
    fireEvent.submit(form);

    expect(pushMock).toHaveBeenCalled();
  });

  it('should flags open details card correct', () => {
    render(
      <Header
        initialState={{
          ...store.getState(),
          detailSlice: {
            ...store.getState().detailSlice,
            isOpen: true,
          },
        }}
      />
    );

    const input = screen.getByTestId('input-search') as HTMLInputElement;

    expect(input.placeholder).toBe('Loading...');
  });

  it('should flags isLoading products correct', () => {
    render(
      <Header
        initialState={{
          ...store.getState(),
          productSlice: {
            ...store.getState().productSlice,
            dataSearch: {
              ...store.getState().productSlice.dataSearch,
              isLoading: false,
            },
          },
        }}
      />
    );

    const input = screen.getByTestId('input-search') as HTMLInputElement;

    expect(input.placeholder).toBe('');
  });
});
