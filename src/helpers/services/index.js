import {
  getLoggedUser,
  loginUser,
  registerUser,
  logoutUser,
  isNicknameAvailable,
  isEmailAvailable,
  changeEmail,
  changePassword,
} from './user';
import {
  getMainFeed,
  getUserFeed,
  extractPostIds,
  saveNewPost,
  likePostFetch,
  dislikePostFetch,
  likePostToggle
} from './feed';

export {
  getLoggedUser,
  loginUser,
  registerUser,
  logoutUser,
  isNicknameAvailable,
  isEmailAvailable,
  getMainFeed,
  getUserFeed,
  extractPostIds,
  saveNewPost,
  changeEmail,
  changePassword,
  likePostFetch,
  dislikePostFetch,
  likePostToggle
};
