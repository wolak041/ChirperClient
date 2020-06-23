const API_URL = process.env.API_URL;

export const apiUrls = {
  LOGIN: `${API_URL}/api/login`,
  REGISTER: `${API_URL}/api/register`,
  GET_LOGGED_USER: `${API_URL}/api/user/get_logged`,
  CHANGE_EMAIL: `${API_URL}/api/account/change_email`,
  CHANGE_PASSWORD: `${API_URL}/api/account/change_password`,
  GET_MAIN_FEED: `${API_URL}/api/feed/main`,
  GET_USER_FEED: `${API_URL}/api/feed/user`,
  SAVE_POST: `${API_URL}/api/feed/save`,
  LIKE_POST: `${API_URL}/api/feed/like`,
  DISLIKE_POST: `${API_URL}/api/feed/dislike`,
  NICKNAME_AVAILABILITY: `${API_URL}/api/availability/nickname`,
  EMAIL_AVAILABILITY: `${API_URL}/api/availability/email`,
  REFRESH_TOKENS: `${API_URL}/api/refresh_tokens`,
};

export const clientUrls = {
  MAIN: '/',
  ENTRY: '/entry',
  USER: '/user',
  ACCOUNT: '/account',
};
