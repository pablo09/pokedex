export function apiErrorHandler(response: Response) {
  if (response.ok) {
    return Promise.resolve(response);
  }

  return response.json().then((payload) => {
    return Promise.reject(payload.message);
  });
}
