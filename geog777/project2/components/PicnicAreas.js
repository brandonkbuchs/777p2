import React from 'react';
import {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Entypo';
import {withStore} from '../utils/store';

const db = firestore().collection('picnicAreas');
const markerIcon = <Icon name="shopping-basket" size={23} color="#2F1847" />;
var markers = [];
class PicnicAreas extends React.Component {
  componentDidMount() {
    this.props.store.set('picnicAreasStatus', false);
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
    if (this.props.store.picnicAreasStatus) {
      return (
        <>
          {markers.map((marker, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: marker.coordinates[1],
                longitude: marker.coordinates[0],
              }}
              title={'Picnic Area ' + marker.oid}>
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
export default withStore(PicnicAreas);
