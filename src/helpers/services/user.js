import { apiUrls } from '../constants';

const getUser = async () => {
  const request = await fetch(apiUrls.GET_USER, {
    method: 'POST',
  });
  const response = await request.json();

  if (request.ok) return response;
  else throw new Error(response.error);
};

const entryOptions = (body) => ({
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
  handleRequest(await fetch(apiUrls.LOGIN, entryOptions(credentials)));

const registerUser = async (credentials) =>
  handleRequest(await fetch(apiUrls.REGISTER, entryOptions(credentials)));

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

const isNicknameAvailable = async (nickname) =>
  checkAvailability(apiUrls.NICKNAME_AVAILABILITY, { nickname });

const isEmailAvailable = async (email) => checkAvailability(apiUrls.EMAIL_AVAILABILITY, { email });

export { getUser, loginUser, registerUser, isNicknameAvailable, isEmailAvailable };
