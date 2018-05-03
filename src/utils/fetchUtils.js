import fetch from 'node-fetch';

const defaultHeaders = {
  'Content-Type': 'application/json'
};

export default function fetchUtils(url, method, body, extraHeaders) {
  const options = {
    headers: extraHeaders ? Object.assign(defaultHeaders, extraHeaders) : defaultHeaders,
    method,
    body
  };

  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    });
}
