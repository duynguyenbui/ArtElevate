const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function get(url: string) {
  const requestOptions = {
    method: 'GET',
    headers: {},
  };

  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
}

export

async function handleResponse(response: Response) {
  const text = await response.text();

  const data = text && JSON.parse(text);

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: response.statusText,
    };

    return error;
  }
}
