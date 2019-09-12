import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Resources from '../../constants/Resources';

export const Loading = props => (
  <View style={styles.loading}>
    <Image source={Resources.spinIcon}/>
  </View>
);

const styles = {
  loading: {}
};
