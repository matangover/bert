/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

import StopsScreen from './StopsScreen';
import BusTimesScreen from './BusTimesScreen';

class bert extends Component {
  render() {
    return (
      <Navigator
          style={styles.container}
          initialRoute={{name: 'stops'}}
          renderScene={this.renderScene} />
    );
  }

  renderScene(route, navigator) {
      if (route.name === 'stops') {
          return (
              <StopsScreen navigator={navigator} />
          );
      } else if (route.name === 'bus_times') {
          return (
              <BusTimesScreen navigator={navigator} stop_id={route.stop_id}/>
          );
      }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('bert', () => bert);
