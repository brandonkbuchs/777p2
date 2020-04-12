import React from 'react';
import {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Octicons';
import {withStore} from '../utils/store';

const db = firestore().collection('issues');
const markerIcon = <Icon name="issue-opened" size={23} color="#F02D3A" />;
var markers = [];
class Issues extends React.Component {
  componentDidMount() {
    this.props.store.set('issuesStatus', false);
  }
  render() {
    db.get().then((snapshot) => {
      snapshot.forEach((marker) => {
        var marker = {
          issue: marker.data().issue,
          coordinates: marker.data().coordinates,
          comment: marker.data().comment,
        };
        markers = [...markers, marker];
      });
    });
    if (this.props.store.issuesStatus) {
      return (
        <>
          {markers.map(
            (marker, i) => (
              console.log(marker),
              (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: marker.coordinates[0],
                    longitude: marker.coordinates[1],
                  }}
                  title={marker.issue}
                  description={marker.comment}>
                  {markerIcon}
                </Marker>
              )
            ),
          )}
        </>
      );
    } else {
      return null;
    }
  }
}

export default withStore(Issues);
