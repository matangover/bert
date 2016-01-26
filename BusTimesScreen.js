'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';

import stopTimes from './assets/stop_times_trimmed3.json'
import trips from './assets/trips_trimmed3.json'
import calendar from './assets/calendar.json'
import routes from './assets/routes.json'



class BusTimesScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Bus Times for stop: {this.props.stop_id}</Text>
        {
          this.state.arrivalTimes.map(stopTime =>
            <Text key={stopTime.departure_time}>
              {stopTime.departure_time} -- {stopTime.routeName}
            </Text>)
        }
      </View>
    );
  }

  componentWillMount() {
    this.setState({arrivalTimes: this.getArrivalTimes()});
  }

  getArrivalTimes() {
    var currentTime = moment();
    //var currentTime = moment('2016-01-26 20:30:00');
    //var halfHourFromNow = currentTime.clone().add(30, 'minutes');
    var currentTimeString = currentTime.format('HH:mm:ss');
    //var halfHourFromNowString = halfHourFromNow.format('HH:mm:ss');
    var times = stopTimes.filter(stopTime =>
      stopTime.stop_id == this.props.stop_id &&
      stopTime.departure_time >= currentTimeString &&
      //stopTime.departure_time <= halfHourFromNowString &&
      this.isTripToday(stopTime.trip_id, currentTime));

    return _.sortBy(times, stopTime => stopTime.departure_time).splice(0, 5)
      .map(stopTime => Object.assign(stopTime, {routeName: this.getRouteName(stopTime.trip_id)}));
  }

  isTripToday(tripId, currentTime) {
    var trip = trips.find(trip => trip.trip_id == tripId);
    var currentDateString = currentTime.format('YYYYMMDD');
    var currentDayOfWeekString = currentTime.format('dddd').toLowerCase();

    var calendarIndex = calendar.findIndex(calendarEntry =>
      calendarEntry.start_date <= currentDateString &&
      calendarEntry.end_date >= currentDateString &&
      calendarEntry.service_id == trip.service_id &&
      calendarEntry[currentDayOfWeekString] == 1);

    return calendarIndex != -1;
  }

  getRouteName(tripId) {
    var trip = trips.find(trip => trip.trip_id == tripId);
    var route = routes.find(route => route.route_id == trip.route_id);
    return route.route_short_name;
  }
}

export default BusTimesScreen
