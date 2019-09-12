import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Images = {
  home: {
    unfocused: require('../assets/images/app/nav-home-icon.png'),
    focused: require('../assets/images/app/nav-home-icon-active.png')
  },
  questions: {
    unfocused: require('../assets/images/app/nav-questions-icon.png'),
    focused: require('../assets/images/app/nav-questions-icon-active.png')
  },
  follow: {
    unfocused: require('../assets/images/app/nav-friends-icon.png'),
    focused: require('../assets/images/app/nav-friends-icon-active.png')
  },
  profile: {
    unfocused: require('../assets/images/app/nav-home-icon.png'),
    focused: require('../assets/images/app/nav-home-icon-active.png')
  }
};

export default function NavigationIcon({ name, focused }) {
  const status = focused ? 'focused' : 'unfocused';
  return <Image source={Images[name][status]} style={styles.navigationIcon} />;
}

const styles = StyleSheet.create({
  navigationIcon: {
    width: 24,
    height: 24
  }
});
