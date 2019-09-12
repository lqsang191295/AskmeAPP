import React from 'react';
import { Route, Router, Switch } from 'react-router-native';
import history from '../routers/history';
import PrivateRoute from '../routers/PrivateRoute';
// import { Loading } from '../components/Common/Loading';
// import publicRoutes from '../routers/publicRoutes';
import DefaultLayout from '../components/DefaultLayout';
// import ProfileLayout from '../components/ProfileLayout';
import UserUtils from '../utils/User';
import ErrorBoundary from '../components/ErrorBoundary';
import { Loading } from "../components/Common/Loading";

// window.askMeExtraData = window.askMeExtraData || { profileInfo: null, profileNotFound: false };

// export const isUserLoggedIn = () => UserUtils.getToken();
export const isUserLoggedIn = () => true;

// const isProfileAccess = () => {
//   const extraData =
//     typeof window.askMeExtraData === 'string'
//       ? JSON.parse(window.askMeExtraData)
//       : window.askMeExtraData;
//
//   return !!extraData.profileInfo || !!extraData.profileNotFound;
// };

// const ProfileRoute = ({ route = {} }) => (
//   <Route
//     path={route.path || '/'}
//     exact={route.exact || true}
//     name={route.name || 'Profile'}
//     key={`${route.name}`}
//     render={props => <ProfileLayout {...props} />}
//   />
// );

const AppRouter = () => (
  <ErrorBoundary>
    <Router history={history}>
      <React.Suspense fallback={Loading()}>
        <Switch>
          {/*{!isUserLoggedIn() && isProfileAccess() && <ProfileRoute />}*/}
          {/*{publicRoutes.map(route => {*/}
          {/*  // if (route.withProfileLayout && !isUserLoggedIn()) {*/}
          {/*  //   return <ProfileRoute path={route.path} key={route.name} route={route} />;*/}
          {/*  // }*/}
          
          {/*  return route.component && !route.withProfileLayout ? (*/}
          {/*    <Route*/}
          {/*      key={`${route.name}`}*/}
          {/*      path={route.path}*/}
          {/*      exact={route.exact}*/}
          {/*      name={route.name}*/}
          {/*      render={props => <route.component {...props} name={route.name} />}*/}
          {/*    />*/}
          {/*  ) : null;*/}
          {/*})}*/}

          <PrivateRoute path="/" component={DefaultLayout} />
        </Switch>
      </React.Suspense>
    </Router>
  </ErrorBoundary>
);

export default AppRouter;
