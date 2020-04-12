import React from 'react';
import {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withStore} from '../utils/store';

const db = firestore().collection('restrooms');
const markerIcon = <Icon name="restroom" size={23} color="#440D0F" />;
var markers = [];

class Restrooms extends React.Component {
  componentDidMount() {
    this.props.store.set('restroomsStatus', false);
    db.get().then((snapshot) => {
      snapshot.forEach((marker) => {
        var marker = {
          oid: marker.data().oid,
          coordinates: marker.data().coordinates,
        };
        markers = [...markers, marker];
      });
    });
  }

  render() {
    if (this.props.store.restroomsStatus) {
      return (
        <>
          {markers.map((marker, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: marker.coordinates[1],
                longitude: marker.coordinates[0],
              }}
              title={'Restroom ' + marker.oid}>
              {markerIcon}
            </Marker>
          ))}
        </>
      );
    } else {
      return null;
    }
  }
}

export default withStore(Restrooms);
