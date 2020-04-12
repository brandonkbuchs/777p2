import React, {Component} from 'react';
import {View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {withStore} from '../utils/store';
import 'react-native-vector-icons/MaterialIcons';

class LayerControl extends Component {
  render() {
    const overlooksStatus = this.props.store.overlooksStatus;
    const picnicAreasStatus = this.props.store.picnicAreasStatus;
    const restroomsStatus = this.props.store.restroomsStatus;
    const trailsStatus = this.props.store.trailsStatus;
    const issuesStatus = this.props.store.issuesStatus;
    return (
      <View>
        <CheckBox
          title="Overlooks"
          iconLeft
          checkedColor="#022F40"
          uncheckedColor="#BABABA"
          checked={overlooksStatus}
          onPress={() =>
            this.props.store.set('overlooksStatus', !overlooksStatus)
          }
        />
        <CheckBox
          title="Picnic Areas"
          iconLeft
          checkedColor="#022F40"
          uncheckedColor="#BABABA"
          checked={picnicAreasStatus}
          onPress={() =>
            this.props.store.set('picnicAreasStatus', !picnicAreasStatus)
          }
        />
        <CheckBox
          title="Restrooms"
          iconLeft
          checkedColor="#022F40"
          uncheckedColor="#BABABA"
          checked={restroomsStatus}
          onPress={() =>
            this.props.store.set('restroomsStatus', !restroomsStatus)
          }
        />
        <CheckBox
          title="Trails"
          iconLeft
          checkedColor="#022F40"
          uncheckedColor="#BABABA"
          checked={trailsStatus}
          onPress={() => this.props.store.set('trailsStatus', !trailsStatus)}
        />
        <CheckBox
          title="User Issues"
          iconLeft
          checkedColor="#022F40"
          uncheckedColor="#BABABA"
          checked={issuesStatus}
          onPress={() => this.props.store.set('issuesStatus', !issuesStatus)}
        />
      </View>
    );
  }
}

export default withStore(LayerControl);
