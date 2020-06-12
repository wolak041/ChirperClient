import { apiUrls } from '../constants';

const entryOptions = body => ({
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const handleRequest = async request => {
  const response = await request.json();

  if (request.ok) return response;
  else throw new Error(response.error);
};

export const getUser = async () =>
  handleRequest(await fetch(apiUrls.GET_USER, { method: 'POST' }));

export const loginUser = async credentials =>
  handleRequest(await fetch(apiUrls.LOGIN, entryOptions(credentials)));

export const registerUser = async credentials =>
  handleRequest(await fetch(apiUrls.REGISTER, entryOptions(credentials)));

export const logoutUser = async () =>
  handleRequest(await fetch(apiUrls.LOGOUT, { method: 'POST' }));

const checkAvailability = async (url, body) =>
  (
    await handleRequest(
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),
    )
  ).isAvailable;

export const isNicknameAvailable = async nickname =>
  checkAvailability(apiUrls.NICKNAME_AVAILABILITY, { nickname });

export const isEmailAvailable = async email =>
  checkAvailability(apiUrls.EMAIL_AVAILABILITY, { email });
