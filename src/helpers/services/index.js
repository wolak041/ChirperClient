import {
  getLoggedUser,
  loginUser,
  registerUser,
  logoutUser,
  isNicknameAvailable,
  isEmailAvailable,
} from './user';
import { getMainFeed, getUserFeed, extractPostIds, saveNewPost } from './feed';

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
};
