'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class BusTimesScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Bus Times for stop: {this.props.stop_id}</Text>
      </View>
    );
  }
}

export default BusTimesScreen
