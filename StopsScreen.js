'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

class StopsScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Stops:</Text>
        <TouchableHighlight
            onPress={() => this.props.navigator.push({name: 'bus_times', stop_id: 1337})}>
                <Text>Stop 1337</Text>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => this.props.navigator.push({name: 'bus_times', stop_id: 1338})}>
                <Text>Stop 1338</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default StopsScreen
