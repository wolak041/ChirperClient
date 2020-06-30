const API_URL = process.env.API_URL;

export const apiUrls = {
  LOGIN: `${API_URL}/login`,
  REGISTER: `${API_URL}/register`,
  GET_LOGGED_USER: `${API_URL}/logged-user`,
  CHANGE_EMAIL: `${API_URL}/user/change-email`,
  CHANGE_PASSWORD: `${API_URL}/user/change-password`,
  GET_MAIN_FEED: `${API_URL}/feed/main`,
  GET_USER_FEED: `${API_URL}/feed/user`,
  SAVE_POST: `${API_URL}/feed/save`,
  LIKE_POST: `${API_URL}/feed/like`,
  DISLIKE_POST: `${API_URL}/feed/dislike`,
  NICKNAME_AVAILABILITY: `${API_URL}/availability/nickname`,
  EMAIL_AVAILABILITY: `${API_URL}/availability/email`,
  REFRESH_TOKENS: `${API_URL}/refreshed-tokens`,
};

export const clientUrls = {
  MAIN: '/',
  ENTRY: '/entry',
  USER: '/user',
  ACCOUNT: '/account',
};
