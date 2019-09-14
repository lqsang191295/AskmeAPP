import React from 'react';
import history from '../routers/history';
import PrivateRoute from '../routers/PrivateRoute';
import DefaultLayout from '../components/DefaultLayout';
import ErrorBoundary from '../components/ErrorBoundary';
import { Loading } from "../components/Common/Loading";
import { Route, NativeRouter, Switch } from 'react-router-native';
import Stack from 'react-router-native-stack';

const AppRouter = () => (
    <NativeRouter>
      <Stack>
          <PrivateRoute path="/" component={DefaultLayout} />
      </Stack>
    </NativeRouter>
);

export default AppRouter;
