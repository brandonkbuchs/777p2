import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {createStore} from './utils/store';
import MapPage from './components/MapPage';
import Login from './components/Login';
import Review from './components/Review';
import Report from './components/Report';
import LayerControl from './components/LayerControl';
import UserIssues from './components/UserIssues';

class IssuesScreen extends React.Component {
  render() {
    return <UserIssues />;
  }
}

class LayerScreen extends React.Component {
  render() {
    return <LayerControl />;
  }
}

class MapScreen extends React.Component {
  render() {
    return <MapPage />;
  }
}

class ReviewScreen extends React.Component {
  render() {
    return <Review />;
  }
}

class LoginScreen extends React.Component {
  render() {
    return <Login />;
  }
}

class ReportScreen extends React.Component {
  render() {
    return <Report />;
  }
}

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'map'} />
          </View>
        ),
      },
    },
    Layer: {
      screen: LayerScreen,
      navigationOptions: {
        tabBarLabel: 'Layers',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'layers'} />
          </View>
        ),
      },
    },
    Review: {
      screen: ReviewScreen,
      navigationOptions: {
        tabBarLabel: 'Write a Review',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'star'} />
          </View>
        ),
        activeColor: '#D7D9CE',
        inactiveColor: '#040404',
        barStyle: {backgroundColor: '#274944'},
      },
    },
    Report: {
      screen: ReportScreen,
      navigationOptions: {
        tabBarLabel: 'View Reviews',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'file-text'} />
          </View>
        ),
        activeColor: '#D7D9CE',
        inactiveColor: '#040404',
        barStyle: {backgroundColor: '#274944'},
      },
    },
    Issue: {
      screen: IssuesScreen,
      navigationOptions: {
        tabBarLabel: 'Report Issue',
        tabBarIcon: ({tintColor}) => (
          <View>
          <Icon style={[{color: tintColor}]} size={25} name={'zap'} />
        </View>
        )
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        tabBarLabel: 'Login',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'log-in'} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Map',
    activeColor: '#D7D9CE',
    inactiveColor: '#040404',
    barStyle: {backgroundColor: '#274944'},
  },
);

const App = createAppContainer(TabNavigator);

export default createStore(App);
