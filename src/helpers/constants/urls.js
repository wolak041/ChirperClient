const API_URL = process.env.API_URL;

export const apiUrls = {
  LOGIN: `${API_URL}/api/login`,
  REGISTER: `${API_URL}/api/register`,
  GET_LOGGED_USER: `${API_URL}/api/user/getLogged`,
  LOGOUT: `${API_URL}/api/logout`,
  CHANGE_EMAIL: `${API_URL}/api/account/changeEmail`,
  CHANGE_PASSWORD: `${API_URL}/api/account/changePassword`,
  GET_MAIN_FEED: `${API_URL}/api/feed/main`,
  GET_USER_FEED: `${API_URL}/api/feed/user`,
  SAVE_POST: `${API_URL}/api/feed/save`,
  LIKE_POST: `${API_URL}/api/feed/like`,
  DISLIKE_POST: `${API_URL}/api/feed/dislike`,
  NICKNAME_AVAILABILITY: `${API_URL}/api/availability/nickname`,
  EMAIL_AVAILABILITY: `${API_URL}/api/availability/email`,
};

export const clientUrls = {
  MAIN: '/',
  ENTRY: '/entry',
  USER: '/user',
  ACCOUNT: '/account',
};
