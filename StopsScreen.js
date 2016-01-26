'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import geolib from 'geolib';
import _ from 'lodash';

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
          onPress={() => this.props.navigator.push({name: 'bus_times', stop_id: stop.stop_id})}>
            <Text>{stop.stop_name} ({stop.stop_code}) [{stop.stop_id}]</Text>
        </TouchableHighlight>
      ));
    }

    var location = this.state.position &&
      <Text>
        Location: ({this.state.position.coords.latitude}, {this.state.position.coords.longitude})
      </Text>;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Stops:</Text>
        {children}
        {location}
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
    var stopWithDistance = stopsData.map(stop => ({stop, distance: this.getStopDistance(stop)}));
    return _.sortBy(stopWithDistance, stop => stop.distance).splice(0, 10).map(stop => stop.stop);
  }

  getStopDistance(stop) {
    return geolib.getDistance(
      this.state.position.coords,
      {latitude: stop.stop_lat, longitude: stop.stop_lon});
  }
}

export default StopsScreen
