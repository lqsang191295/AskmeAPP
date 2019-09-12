import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FollowScreen from '../screens/FollowScreen';
import NavigationIcon from '../components/NavigationIcon';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <NavigationIcon focused={focused} name="home" />
};

HomeStack.path = '';

// ---------------

const QuestionsStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
);

QuestionsStack.navigationOptions = {
  tabBarLabel: 'Questions',
  tabBarIcon: ({ focused }) => <NavigationIcon focused={focused} name="questions" />
};

QuestionsStack.path = '';

// ----------------

const ProfileStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => <NavigationIcon focused={focused} name="home" />
};

ProfileStack.path = '';

const FollowStack = createStackNavigator(
  {
    Follow: FollowScreen
  },
  config
);

FollowStack.navigationOptions = {
  tabBarLabel: 'Following',
  tabBarIcon: ({ focused }) => <NavigationIcon focused={focused} name="follow" />
};

FollowStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  QuestionsStack,
  FollowStack,
  ProfileStack
});

tabNavigator.path = '';

export default tabNavigator;
