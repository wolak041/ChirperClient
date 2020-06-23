import { getAccessToken } from '.';
import { refreshAccessToken } from '../services';
import store from '../redux/store';
import { userLogout } from '../redux/actions/user';


export const authRequest = async (url, method, body) =>
  await fetch(url, {
    method,
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    }),
    body: JSON.stringify(body),
  });

export const nonAuthRequest = async (url, method, body) =>
  await fetch(url, {
    method,
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  });

export const handleAuthRequest = async (url, method, body) => {
  const request = await authRequest(url, method, body);
  const response = await request.json();

  if (request.ok) return response;
  else {
    if (request.status === 401) {
      try {
        await refreshAccessToken();
        handleAuthRequest()
      } catch(error) {
        store.dispatch(userLogout());
      }
    } else throw new Error(response.error);
  }
};

export const handleNonAuthRequest = async (url, method, body) => {
  const request = await nonAuthRequest(url, method, body);
  const response = await request.json();

  if (request.ok) return response;
  else throw new Error(response.error);
};
