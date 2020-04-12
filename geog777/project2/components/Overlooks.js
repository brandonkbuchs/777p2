import React from 'react';
import {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {withStore} from '../utils/store';

const db = firestore().collection('overlooks');
const markerIcon = <Icon name="binoculars" size={23} color="#F02D3A" />;
var markers = [];
class Overlooks extends React.Component {
  componentDidMount() {
    this.props.store.set('overlooksStatus', false);
    db.get().then((snapshot) => {
      snapshot.forEach((marker) => {
        var marker = {
          oid: marker.data().oid,
          coordinates: marker.data().coordinates,
          poiname: marker.data().poiname,
        };
        markers = [...markers, marker];
      });
    });
  }
  render() {
    if (this.props.store.overlooksStatus) {
      return (
        <>
          {markers.map((marker, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: marker.coordinates[1],
                longitude: marker.coordinates[0],
              }}
              title={'Overlook ' + marker.oid}
              description={marker.poiname}>
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

export default withStore(Overlooks);
