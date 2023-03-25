export const httpRequest = (path: string, method: string, body?: any) => {
  return fetch(path, {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
};
