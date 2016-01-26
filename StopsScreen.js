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
  constructor(props) {
    super(props);
    this.state = {position: null};
  }

  render() {
    if (!this.state.position) {
      var children = <Text>Loading...</Text>;
    } else {
      var stops = this.getStops();
      var children = stops.map(stop => (
        <TouchableHighlight
          key={stop.stop_code}
          onPress={() => this.props.navigator.push({name: 'bus_times', stop_id: stop.stop_code})}>
            <Text>Stop {stop.stop_code}</Text>
        </TouchableHighlight>
      ));
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Stops:</Text>
        {children}
      </View>
    );
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  getStops() {
    return stopsData.splice(0, 10);
  }
}

export default StopsScreen
