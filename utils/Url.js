const getQueryVariable = (variable, search) => {
  const query = search.substring(1);
  const vars = query.split('&');

  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return null;
};

const addQueryVariable = (url, query) => {
  const hasQuery = url.indexOf('?') !== -1;
  const hasMoreQuery = url.indexOf('&') !== -1;
  const pair = query.split('=');
  const search = url.split('?');
  const value = getQueryVariable(pair[0], `/${search}`);
  if (value) {
    url = url.replace(`${pair[0]}=${value}`, '');
  }

  if (hasQuery) {
    return `${url}&${query}`;
  }

  return `${url}?${query}`;
};

const UrlUtils = {
  getQueryVariable,
  addQueryVariable
};

export default UrlUtils;
