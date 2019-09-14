import axios from 'axios';
import { DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '../constants/languages.constants';
// import { getLanguageLocaleCode, setLanguageLocaleCode } from '../helpers/Language/Language';
import { AsyncStorage as localStorage } from 'react-native';

export const getExtraData = () => {
  const extraData =
    typeof window.askMeExtraData === 'string'
      ? JSON.parse(window.askMeExtraData)
      : window.askMeExtraData;
  return extraData || {};
};

export const isSubdomain = () => {
  const host = window.location.host.replace('www.', '');
  const { noProtocolUrl } = window.askMe.config;
  return !!host.replace(noProtocolUrl, '');
};

export const getParamURL = code => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  return url.searchParams.get(code);
};

export const getSubdomain = () => {
  const { host } = window.location;
  const { noProtocolUrl } = window.askMe.config;
  return host.replace(noProtocolUrl, '').replace('.', '');
};

// export const getCountryCode = async () => {
//   try {
//     if (getLanguageLocaleCode()) return null;
//     const data = await axios.get(window.askMe.config.urlDetectLanguage);
//     const code = data && data.data ? data.data.country_code : '';
//     return code || DEFAULT_LOCALE;
//   } catch (e) {
//     return e;
//   }
// };

// export const getLanguageCode = (countryCode = DEFAULT_LOCALE) => {
//   try {
//     const result =
//       SUPPORTED_LANGUAGES.find(e => e.countryCode.indexOf(countryCode) !== -1) ||
//       SUPPORTED_LANGUAGES[1];
//     setLanguageLocaleCode(result.code);
//     return result.code;
//   } catch (e) {
//     return e;
//   }
// };

export const handleLoginWithFB = () => {
  const { appId, fbLoginCallbackUrl } = window.askMe.config;
  FB.getLoginStatus(async function(response) {
    if (response.status === 'connected') {
      const { accessToken } = response.authResponse ? response.authResponse : {};
      if (!accessToken) return;
      window.location.href = `${fbLoginCallbackUrl}?token=${accessToken}`;
      return;
    }
    window.location.href = `https://www.facebook.com/dialog/oauth?client_id=${appId}&redirect_uri=${fbLoginCallbackUrl}&scope=public_profile,email`;
  });
};

export const Storage = {
  get: async key => await localStorage.getItem(key),
  set: (key, value) => {
    localStorage.setItem(key, value);
  },
  remove: key => {
    localStorage.removeItem(key);
  }
};

export const isJSON = text =>
  text
    ? /^[\],:{}\s]*$/.test(
        text
          .replace(/\\["\\\/bfnrtu]/g, '@')
          .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
          .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
      )
    : false;
