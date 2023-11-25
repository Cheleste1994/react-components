import React from 'react';
import { act, render } from '@testing-library/react';
import HomePage from '../../pages';
import { useRouter } from 'next/router';

describe('404 page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('404 page is displayed when navigating to an invalid route', async () => {
    const pushMock = jest.fn();
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
      push: pushMock,
      query: { limit: '10' },
    });

    render(<HomePage products={{ isLoading: false, dataResponse: null }} />);

    act(() => {
      useRouter().push('/test/route');
    });

    expect(pushMock).toHaveBeenCalledWith('/test/route');
  });
});
