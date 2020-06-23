import { apiUrls } from '../constants';
import {
  handleAuthRequest,
  handleNonAuthRequest,
  saveAccessToken,
} from '../utils';

const handleAuthentication = async (url, credentials) => {
  const response = await handleNonAuthRequest(url, 'POST', credentials);
  saveAccessToken(response.accessToken);

  return response;
};

export const loginUser = async credentials =>
  await handleAuthentication(apiUrls.LOGIN, credentials);

export const registerUser = async credentials =>
  await handleAuthentication(apiUrls.REGISTER, credentials);

export const refreshToken = async () =>
  await handleNonAuthRequest(apiUrls.REFRESH_TOKENS, 'POST');

export const getLoggedUser = async () =>
  await handleAuthRequest(apiUrls.GET_LOGGED_USER, 'POST');

const checkAvailability = async (url, body) =>
  (await handleAuthRequest(url, 'POST', body)).isAvailable;

export const isNicknameAvailable = async nickname =>
  checkAvailability(apiUrls.NICKNAME_AVAILABILITY, { nickname });

export const isEmailAvailable = async email =>
  checkAvailability(apiUrls.EMAIL_AVAILABILITY, { email });

export const changeEmail = async newEmail =>
  await handleAuthRequest(apiUrls.CHANGE_EMAIL, 'POST', { newEmail });

export const changePassword = async newPassword =>
  await handleAuthRequest(apiUrls.CHANGE_PASSWORD, 'POST', { newPassword });

export const refreshAccessToken = async () => {
  const { accessToken } = await handleNonAuthRequest(
    apiUrls.REFRESH_TOKENS,
    'POST',
  );
  saveAccessToken(accessToken);
};
