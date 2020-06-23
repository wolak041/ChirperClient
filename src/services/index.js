import {
  getLoggedUser,
  loginUser,
  registerUser,
  isNicknameAvailable,
  isEmailAvailable,
  changeEmail,
  changePassword,
  refreshAccessToken,
} from './user';
import {
  getMainFeed,
  getUserFeed,
  saveNewPost,
  likePostFetch,
  dislikePostFetch,
} from './feed';

export {
  getLoggedUser,
  loginUser,
  registerUser,
  isNicknameAvailable,
  isEmailAvailable,
  getMainFeed,
  getUserFeed,
  saveNewPost,
  changeEmail,
  changePassword,
  likePostFetch,
  dislikePostFetch,
  refreshAccessToken,
};
