import Resources from '../constants/Resources';

class User {
  defaultUser = {
    name: 'User',
    photo: Resources.defaultAvatar
  };

  constructor({
    _id,
    name,
    photo,
    username,
    alias,
    email,
    locale,
    gender,
    settings = {},
    bio,
    fbUserId,
    token
  }) {
    this._userId = _id;
    this._name = name || this.defaultUser.name;
    this._photo = photo || this.defaultUser.photo;
    this._username = username;
    this._alias = alias;
    this._email = email;
    this._locale = locale;
    this._gender = gender;
    this._settings = settings;
    this._bio = bio;
    this._fbUserId = fbUserId;
    this._token = token;
  }

  getUserId() {
    return this._userId ? this._userId.toString() : null;
  }

  getName() {
    return this._name;
  }

  getPhoto() {
    return this._photo;
  }

  getUsername() {
    return this._username;
  }

  getAlias() {
    return this._alias;
  }

  getEmail() {
    return this._email || null;
  }

  getLocale() {
    return this._locale;
  }

  getGender() {
    return this._gender;
  }

  getSettings() {
    return this._settings || {};
  }

  getBio() {
    return this._bio;
  }

  getFbUserId() {
    return this._fbUserId ? this._fbUserId.toString() : null;
  }

  getToken() {
    return this._token ? this._token : null;
  }

  getUser() {
    return {
      userId: this.getUserId(),
      name: this.getName(),
      photo: this.getPhoto(),
      username: this.getUsername(),
      alias: this.getAlias(),
      email: this.getEmail(),
      locale: this.getLocale(),
      gender: this.getGender(),
      settings: this.getSettings(),
      bio: this.getBio(),
      fbUserId: this.getFbUserId(),
      token: this.getToken()
    };
  }
}

export default User;
