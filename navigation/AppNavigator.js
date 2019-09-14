import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AppStackNavigator from '~/navigation/MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: LoginScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStackNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
