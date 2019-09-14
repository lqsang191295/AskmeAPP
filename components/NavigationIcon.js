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
    unfocused: require('../assets/images/app/default-avatar.png'),
    focused: require('../assets/images/app/default-avatar.png')
  }
};

export default function NavigationIcon({ name, focused, rounded = false }) {
  const status = focused ? 'focused' : 'unfocused';
  const borderRadius = rounded ? styles.rounded : {}
  const style = {...styles.navigationIcon, ...borderRadius };
  return <Image source={Images[name][status]} style={style} />;
}

const styles = StyleSheet.create({
  navigationIcon: {
    width: 24,
    height: 24
  },
  rounded: {
    borderRadius: 24/2
  }
});
