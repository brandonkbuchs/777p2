/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Issues from './Issues';
import Overlooks from './Overlooks';
import PicnicAreas from './PicnicAreas';
import Restrooms from './Restrooms';
import Trails from './Trails';
import mapStyle from './mapStyle';
import {withStore} from '../utils/store';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = 0.04 * (screenWidth / screenHeight);

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLatitude: null,
      lastLongitude: null,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      statusBarHeight: 0,
    };
  }
  /**
   * 1. Request permission for accessing user's location
   * 2. Obtain current location, setState
   * 3. Setup map on page
   * 4. Add Markers for each collection in database
   */
  componentDidMount() {
    this.props.store.set('poiName', '');
    PermissionsAndroid.request(
      //1
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted) => {
      console.log('User locations granted');
    });
    Geolocation.getCurrentPosition(
      //2
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({mapRegion: region});
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView //3
          style={styles.map}
          customMapStyle={mapStyle}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followsUserLocation={true}
          userLocationUpdateInverval={10000}
          showsMyLocationButton={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          showsCompass={true}>
          <Issues />
          <Overlooks />
          <PicnicAreas />
          <Restrooms />
          <Trails />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
  },
  map: {
    flex: 1,
    height: screenHeight - 20,
    width: screenWidth,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default withStore(MapPage);
