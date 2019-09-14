import React from 'react';
import { Route } from 'react-router-native';
import { Loading } from '../components/Common/Loading';
import UserUtils from "../utils/User";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (UserUtils.isLoggedIn()) {
        return <Component {...props} />;
      }
    
      return <Loading />;
    }}
  />
);

export default PrivateRoute;
