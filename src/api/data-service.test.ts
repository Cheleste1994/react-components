import fetchMock from 'jest-fetch-mock';
import makeRequest from './data-service';

fetchMock.enableMocks();

describe('Fetch response', () => {
  beforeEach(() => {
    // Очищаем состояние мока перед каждым тестом
    fetchMock.resetMocks();
  });

  it('should make a successful GET request', async () => {
    const responseData = { key: 'value' };
    const totalCountHeader = '10';

    fetchMock.mockResponseOnce(JSON.stringify(responseData), {
      headers: { 'X-Total-Count': totalCountHeader },
    });

    const url = 'https://example.com/api/data';
    const { data, header } = await makeRequest('GET', url);

    expect(data).toEqual(responseData);
    expect(header).toEqual(totalCountHeader);

    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('should handle an error response', async () => {
    const errorCode = 404;

    fetchMock.mockResponseOnce('', { status: errorCode });

    const url = 'https://example.com/api/data';

    await expect(makeRequest('GET', url)).rejects.toThrow(`${errorCode}`);

    expect(fetchMock).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  });
});
