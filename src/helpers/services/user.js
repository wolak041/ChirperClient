import { apiUrls } from '../constants';

const getUser = async () => {
  const request = await fetch(apiUrls.GET_USER, {
    method: 'POST',
  });
  const response = await request.json();

  if (request.ok) return response;
  else throw new Error(response.error);
};

const requestOptions = (body) => ({
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const handleRequest = async (request) => {
  const response = await request.json();

  if (request.ok) return response;
  else throw new Error(response.error);
};

const loginUser = async (credentials) =>
  handleRequest(await fetch(apiUrls.LOGIN, requestOptions(credentials)));

const registerUser = async (credentials) =>
  handleRequest(await fetch(apiUrls.REGISTER, requestOptions(credentials)));

export { getUser, loginUser, registerUser };
