async function makeRequest<T>(
  method: string,
  url: string
): Promise<{ data: T; header: string | null }> {
  const response = await fetch(`${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    const header = response.headers.get('X-Total-Count');
    return { data, header };
  }
  throw new Error(`${response.status}`);
}

export default makeRequest;
