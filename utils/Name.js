import { randomInt } from '~/utils/Number';
import { getLanguageLocaleCode } from '~/helpers/Language/Language';

const getFirstName = (fullName = '') => {
  const parts = fullName.split(' ');
  const languageCode = getLanguageLocaleCode();
  switch (languageCode) {
    case 'vi':
      return parts[parts.length - 1];
    case 'en':
      return parts[0];
    default:
      return parts[0];
  }
};

const toUsername = (name = '') => {
  const cleanName = name.replace(/[^A-Za-z0-9]/g, '');
  return `${cleanName}${randomInt(100, 1000)}`.toLowerCase();
};

const NameUtils = {
  getFirstName,
  toUsername
};
export default NameUtils;
