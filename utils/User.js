// import Cookies from '~/utils/Cookie';
// import Resources from '~/constants/Resources';
// import { isJSON } from '~/utils/Common';
import {Storage as Cookies} from '../utils/Common';

const PREFIX = 'askme_stg_u_';
const getCrossDomain = () => `.${window.askMe.config.noProtocolUrl}`;
const userAttributes = ['userId', 'name', 'email', 'token', 'photo', 'username', 'alias'];

/*
 * Getters & Setters
 */
const setToken = token => Cookies.set(`${PREFIX}__token`, token, 365, getCrossDomain());
const getToken = () => Cookies.get(`${PREFIX}__token`);
const getUserId = () => Cookies.get(`${PREFIX}__userId`);
const getUsername = () => {
  const username = Cookies.get(`${PREFIX}__username`);
  if (isJSON(username) && username !== 'null') {
    return JSON.parse(username);
  }

  return username === 'null' ? null : username;
};

const setLocationState = state =>
  Cookies.set(`${PREFIX}__locationState`, JSON.stringify(state), 365, getCrossDomain());
const getLocationState = () => {
  const state = Cookies.get(`${PREFIX}__locationState`);
  return state ? JSON.parse(state) : null;
};
const removeLocationState = () => Cookies.remove(`${PREFIX}__locationState`);

/**
 *
 * @param userId
 * @param name
 * @param photo
 * @param email
 * @param token
 * @param username
 */
const setUser = ({
  userId,
  name,
  photo = Resources.defaultAvatar,
  email,
  token,
  username,
  alias
}) => {
  const user = { userId, name, photo, email, username, alias };

  for (const attr in user) {
    Cookies.set(`${PREFIX}__${attr}`, user[attr], 365, getCrossDomain());
  }

  if (token) {
    setToken(token);
  }
};

const getUser = () => {
  if (!getToken()) {
    return null;
  }

  const user = {};
  userAttributes.forEach(attribute => {
    const value = Cookies.get(`${PREFIX}__${attribute}`);
    Object.assign(user, { [attribute]: value });
  });

  return user;
};

/**
 * Remove all user data, logging out
 */
const remove = () => {
  userAttributes.forEach(attribute => {
    Cookies.remove(`${PREFIX}__${attribute}`);
  });
};

const isLoggedIn = () => !!getToken();

const UserUtils = {
  setToken,
  getToken,
  getUserId,
  getUsername,
  setUser,
  getUser,
  remove,
  setLocationState,
  getLocationState,
  removeLocationState,
  isLoggedIn
};

export default UserUtils;
