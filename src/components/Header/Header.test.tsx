import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

  const inputValueTest = 'Test';

  jest
    .spyOn(require('../../redux/hooks/hooks'), 'useAppSelector')
    .mockReturnValue({
      dataSearch: '',
      searchValue: inputValueTest,
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clicking the Search button saves the entered value to the local storage', async () => {
    const dispatch = jest.fn();

    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
      .mockReturnValue(dispatch);

    renderComponent();

    const input = screen.getByTestId('input-search');
    await waitFor(() => {
      fireEvent.input(input, {
        target: { value: inputValueTest },
      });
      fireEvent.click(screen.getByTestId('btn-search'));
    });

    expect(localStorage.getItem('inputValue')).toBe(inputValueTest);
    expect(dispatch).toHaveBeenCalled();
  });

  it('enter the Search saves the entered value to the local storage', async () => {
    const dispatch = jest.fn();

    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
      .mockReturnValue(dispatch);

    renderComponent();

    const input = screen.getByTestId('input-search');
    await waitFor(() => {
      fireEvent.input(input, {
        target: { value: inputValueTest },
      });
      fireEvent.keyDown(input, { code: 'Enter' });
    });

    expect(localStorage.getItem('inputValue')).toBe(inputValueTest);
    expect(dispatch).toHaveBeenCalled();
  });

  it(' component retrieves the value from the local storage upon mounting', () => {
    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
      .mockReturnValue(() => {});

    localStorage.setItem('inputValue', inputValueTest);

    renderComponent();

    expect(screen.getByTestId('input-search')).toContainHTML(inputValueTest);
  });

  it(' component retrieves the value from the local storage upon mounting', () => {
    jest
      .spyOn(require('../../redux/hooks/hooks'), 'useAppDispatch')
      .mockReturnValue(() => {});

    localStorage.setItem('inputValue', '123');

    renderComponent();

    const input = screen.getByTestId('input-search');
    fireEvent.change(input, {
      target: { value: inputValueTest },
    });

    expect(screen.getByTestId('input-search')).toContainHTML(inputValueTest);
  });
});
