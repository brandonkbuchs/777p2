import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-paper';
import {withNavigation} from 'react-navigation';

const db = firestore().collection('issues');
const options = [
  {key: 'Hazard', value: 'Hazard'},
  {key: 'Damage', value: 'Damage'},
];

class UserIssues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: null,
      lname: null,
      coordinates: {},
      issues: null,
      comment: null,
    };
  }
  publishIssue = () => {
    db.doc()
      .set({
        fname: this.state.fname,
        lname: this.state.lname,
        issue: this.state.issue,
        comment: this.state.comment,
        coordinates: this.state.coordinates,
      })
      .then(function () {
        console.log('Document successfully written');
      })
      .catch(function (error) {
        console.error('Error: ', error);
      });
  };

  render() {
    Geolocation.getCurrentPosition(
      (position) => {
        let coordinates = [position.coords.latitude, position.coords.longitude];
        this.setState({
          coordinates: coordinates,
        });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center', fontSize: 25, marginBottom: 8}}>
          File an Issue At BCNP
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          value={this.state.fname}
          onChangeText={(fname) => this.setState({fname})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          value={this.state.lname}
          onChangeText={(lname) => this.setState({lname})}
        />
        {options.map((item) => {
          return (
            <View key={item.key} style={styles.buttonContainer}>
              <Text>{item.value}</Text>
              <TouchableOpacity
                style={styles.circle}
                onPress={() => this.setState({issue: item.key})}>
                {this.state.issue === item.key && (
                  <View style={styles.checkedCircle} />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
        <TextInput
          style={styles.textInput}
          placeholder="Add Remark"
          value={this.state.comment}
          onChangeText={(comment) => this.setState({comment})}
        />
        <Button
          style={styles.buttons}
          title="Submit Issue"
          onPress={() => {
            this.publishIssue();
            this.props.navigation.navigate('Map');
          }}
        />
        <Button
          style={styles.button}
          title="Clear Fields"
          onPress={() => {
            () => this.setState({fname: null, lname: null, comment: null});
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    margin: 5,
    width: 200,
  },
  textInput: {
    fontSize: 18,
    margin: 5,
    width: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#794F9B',
  },
});

export default withNavigation(UserIssues);
