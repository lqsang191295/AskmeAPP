import Resources from '../constants/Resources';

class Profile {
  constructor({
    userId = '',
    name,
    photo,
    username,
    alias,
    bio,
    settings = {},
    locale = 'en_US',
    email,
    gender,
    token
  }) {
    this._userId = userId.toString();
    this._name = name;
    this._photo = photo;
    this._username = username;
    this._alias = alias;
    this._bio = bio;
    this._settings = settings;
    this._locale = locale;
    this._email = email;
    this._gender = gender;
    this._token = token;
  }

  getUserId() {
    return this._userId;
  }

  setUserId(userId = '') {
    this._userId = userId.toString();
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  getPhoto() {
    return this._photo || Resources.defaultAvatar;
  }

  setPhoto(photo) {
    this._photo = photo;
  }

  getUsername() {
    return this._username;
  }

  setUsername(username) {
    this._username = username;
  }

  getAlias() {
    return this._alias;
  }

  setAlias(alias) {
    this._alias = alias;
  }

  getBio() {
    return this._bio;
  }

  setBio(bio) {
    this._bio = bio;
  }

  getSettings() {
    return this._settings;
  }

  setSettings(settings = {}) {
    this._settings = settings;
  }

  getLocale() {
    return this._locale;
  }

  setLocale(locale = 'en_US') {
    this._locale = locale;
  }

  getEmail() {
    return this._email;
  }

  setEmail(email) {
    this._email = email;
  }

  getGender() {
    return this._gender;
  }

  setGender(gender) {
    this._gender = gender;
  }

  getToken() {
    return this._token;
  }

  setToken(token) {
    this._token = token;
  }

  getProfile() {
    return {
      userId: this.getUserId(),
      name: this.getName(),
      photo: this.getPhoto(),
      username: this.getUsername(),
      alias: this.getAlias(),
      bio: this.getBio(),
      settings: this.getSettings(),
      locale: this.getLocale(),
      email: this.getEmail(),
      gender: this.getGender(),
      token: this.getToken()
    };
  }
}

export default Profile;
