import UserUtils from '~/utils/User';
import { handleLoginWithFB } from '~/utils/Common';

const handleLocationState = props => {
  const { location } = props;
  const isOriginalHost = window.location.host === window.askMe.config.noProtocolUrl;
  let isPublicProfile = false;
  if (!isOriginalHost) {
    location.pathname = `${window.location.href}`;
    isPublicProfile = true;
  }

  const state = {
    from: location,
    prevParams: { ...(props.match ? props.match.params : {}), isPublicProfile },
    showCustomShare: props.state ? !!props.state.showCustomShare : false
  };

  UserUtils.setLocationState(state);
};

const redirectToLoginPage = (props, method = 'auth') => {
  if (props) {
    handleLocationState(props);
  }
  if (method === 'facebook') {
    handleLoginWithFB();
  } else {
    window.location.href = `${window.askMe.config.url}${redirectToLoginPage.methods[method]}`;
  }
};

const redirectToSignUpPage = props => {
  handleLocationState(props);
  window.location.href = `${window.askMe.config.url}/account`;
};

redirectToLoginPage.methods = {
  auth: '/login',
  facebook: '/login?isIgnoreClick=true',
  oauth: '/auth',
  logout: '/logout'
};

const routeHelpers = {
  redirectToLoginPage,
  redirectToSignUpPage
};

export default routeHelpers;
