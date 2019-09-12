import Cookies from '~/utils/Cookie';

const PREFIX = 'askme_stg_g_language_code';

export const getLanguageLocaleCode = () => Cookies.get(`${PREFIX}`);

export const setLanguageLocaleCode = value => {
  Cookies.set(`${PREFIX}`, value, 365);
};
