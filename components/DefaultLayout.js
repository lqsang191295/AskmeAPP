import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Redirect, Route, Switch } from 'react-router-native';
import HomeScreen from "../screens/HomeScreen";
import Stack from 'react-router-native-stack'

class DefaultLayout extends React.Component {
  
  loading = () => <View>Loading...</View>;
  
  render() {
    return (
        <>
            <Stack>
              <Route
                key="Home"
                path="/"
                exact
                name="Home"
                render={props => <HomeScreen {...props} name="Home" />}
              />
              <Redirect from="/" to="/404" />
            </Stack>
        </>
    );
  }
}

const mapStateToProps = state => ({
  navigation: 'HOME'
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
