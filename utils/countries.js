export const Countries = {
  US: 'United State',
  VN: 'Vietnam'
};

export const getCountryCode = locale => {
  const defaultCountry = 'US';
  const parts = locale ? locale.split('_') : [];
  return parts.length > 0 ? parts[1] : defaultCountry;
};

export const getCountry = locale => {
  return Countries[getCountryCode(locale)];
};
