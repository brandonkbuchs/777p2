import React from 'react';
import {Geojson} from 'react-native-maps';
import {withStore} from '../utils/store';
import TrailsJson from './Trails.json';

class Trails extends React.Component {
  componentDidMount() {
    this.props.store.set('trailsStatus', false);
  }
  render() {
    if (this.props.store.trailsStatus) {
      return (
        <Geojson
          geojson={TrailsJson}
          strokeColor="#2A4747"
          fillColor="#2A4747"
          strokeWidth={2}
        />
      );
    } else {
      return null;
    }
  }
}
export default withStore(Trails);
