import Cookies from '~/utils/Cookie';

const PREFIX = 'askme_stg_g_';
const getCrossDomain = () => `.${window.askMe.config.noProtocolUrl}`;

export const getGuide = (name = '') => Cookies.get(`${PREFIX}${name}`);

export const setGuide = (name, value) => {
  Cookies.set(`${PREFIX}${name}`, value, 365);
};
