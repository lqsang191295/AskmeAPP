export const AUTHENTICATE_STATUS_SUCCESS = 'SUCCESS';
export const AUTHENTICATE_STATUS_REQUESTING = 'REQUESTING';
export const AUTHENTICATE_STATUS_FAILED = 'FAILED';
export const AuthenticationMethods = {
  OAUTH: 'oauth',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter'
};

export const AuthenticationErrorCode = {
  USER_EXISTED: 'USER_EXISTED',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  PASSWORDS_NOT_MATCH: 'PASSWORDS_NOT_MATCH',
  LOGIN_FB_FAILED: 'LOGIN_FB_FAILED'
};
