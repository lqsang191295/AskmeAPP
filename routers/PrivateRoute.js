import React from 'react';
import { Route } from 'react-router-native';
import { Loading } from '../components/Common/Loading';
import { isUserLoggedIn } from '../routers/AppRouter';
// import routeHelpers from '~/routers/helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isUserLoggedIn()) {
        return <Component {...props} />;
      }
    
      // routeHelpers.redirectToLoginPage(props);
      return <Loading />;
    }}
  />
);

export default PrivateRoute;
