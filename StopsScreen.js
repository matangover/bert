'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import stopsData from './assets/stops.json'

class StopsScreen extends Component {
  render() {
    var stops = this.getStops();
    var children = stops.map(stop => (
        <TouchableHighlight
            key={stop.stop_code}
            onPress={() => this.props.navigator.push({name: 'bus_times', stop_id: stop.stop_code})}>
                <Text>Stop {stop.stop_code}</Text>
        </TouchableHighlight>
    ));
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Stops:</Text>
        {children}
      </View>
    );
  }

  getStops() {
      return stopsData.splice(0, 10);
  }
}

export default StopsScreen
