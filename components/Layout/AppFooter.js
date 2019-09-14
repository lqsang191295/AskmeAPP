import React, { PureComponent } from 'react';
// import Navigation from '../../components/Layout/Navigation';
import { connect } from 'react-redux';
import {View} from "react-native";
// import { isHideFooter } from '~/selectors/app.selectors';

class AppFooter extends PureComponent {
  render() {
    return (
      <View>
        {/*<Navigation />*/}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  hideFooter: false
});
export default connect(
  mapStateToProps,
  {}
)(AppFooter);
