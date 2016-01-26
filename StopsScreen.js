'use strict';
import React, {
  AppRegistry,
  Component,
  MapView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import geolib from 'geolib';
import _ from 'lodash';

import stopsData from './assets/stops.json'

//var STOPS_URL = 'http://ernie-server.herokuapp.com/stops';
var STOPS_URL = 'http://localhost:5000/stops';

class StopsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {position: null, stops: null};
  }

  render() {
    if (!this.state.position) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading position...</Text>
        </View>
      );
    } else if (!this.state.stops) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading stops...</Text>
        </View>
      );
    } else {
      var annotations = this.state.stops.map(stop => ({
          latitude: stop.stop_lat,
          longitude: stop.stop_lon,
          title: stop.stop_name,
          rightCalloutView:
            <TouchableHighlight
              onPress={() => {
                this.props.navigator.push({name: 'bus_times', stop_id: stop.stop_id})
              }}>
              <Text>Arrivals ></Text>
            </TouchableHighlight>
        }));
      return (
        <MapView
          style={{flex: 1}}
          region={this.state.position.coords}
          showsUserLocation={true}
          annotations={annotations} />
      );
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        this.loadStops(position.coords)
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  loadStops(coords) {
    console.log(`${STOPS_URL}?lat=${coords.latitude}&long=${coords.longitude}`);
    fetch(`${STOPS_URL}?lat=${coords.latitude}&long=${coords.longitude}`)
      .then(response => response.json())
      .then(responseJson => this.setState({stops: responseJson}));
  }

  getStopDistance(stop) {
    return geolib.getDistance(
      this.state.position.coords,
      {latitude: stop.stop_lat, longitude: stop.stop_lon});
  }
}

export default StopsScreen
