import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import FollowScreen from '../screens/FollowScreen';
import NavigationIcon from '../components/NavigationIcon';
import QuestionsScreen from "~/screens/QuestionsScreen";
import ProfileScreen from "~/screens/ProfileScreen";

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
    Questions: QuestionsScreen
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
    Profile: ProfileScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <NavigationIcon focused={focused} name="profile" rounded />
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
