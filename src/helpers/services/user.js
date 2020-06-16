import { apiUrls } from '../constants';

const handleRequest = async request => {
  const response = await request.json();

  if (request.ok) return response;
  else throw new Error(response.error);
};

const entryRequestOptions = body => ({
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const getLoggedUser = async () =>
  handleRequest(await fetch(apiUrls.GET_LOGGED_USER, { method: 'POST' }));

export const loginUser = async credentials =>
  handleRequest(await fetch(apiUrls.LOGIN, entryRequestOptions(credentials)));

export const registerUser = async credentials =>
  handleRequest(
    await fetch(apiUrls.REGISTER, entryRequestOptions(credentials)),
  );

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

export const changeEmail = async newEmail =>
  handleRequest(
    await fetch(apiUrls.CHANGE_EMAIL, entryRequestOptions({ newEmail })),
  );

export const changePassword = async newPassword =>
  handleRequest(
    await fetch(apiUrls.CHANGE_PASSWORD, entryRequestOptions({ newPassword })),
  );
