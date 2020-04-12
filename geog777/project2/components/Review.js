import React from 'react';
import {View, Text, TextInput, Button, StyleSheet, Picker} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TrailsJson from './Trails.json';
import {withNavigation} from 'react-navigation';

const db = firestore();
var poiNames = [];
db.collection('overlooks')
  .get()
  .then((snapshot) => {
    snapshot.forEach((overlook) => {
      var overlook = overlook.data().poiname;
      poiNames = [...poiNames, overlook];
    });
  });

db.collection('restrooms')
  .get()
  .then((snapshot) => {
    snapshot.forEach((restroom) => {
      var restroom = restroom.data().poiname;
      poiNames = [...poiNames, restroom];
    });
  });

db.collection('picnicAreas')
  .get()
  .then((snapshot) => {
    snapshot.forEach((picnicArea) => {
      var picnicArea = picnicArea.data().poiname;
      poiNames = [...poiNames, picnicArea];
    });
  });

for (var feature in TrailsJson.features) {
  poiNames = [...poiNames, TrailsJson.features[feature].properties.TRLLABEL];
}
class Review extends React.Component {
  constructor(props) {
    super(props);
    this.featureData = poiNames;
    this.state = {
      email: 'email',
      fname: 'first name',
      lname: 'last name',
      parkFeature: '',
      comments: 'add comments',
    };
  }
  publishReview = () => {
    db.collection('reviews')
      .doc()
      .set({
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        parkFeature: this.state.parkFeature,
        comments: this.state.comments,
      })
      .then(function () {
        console.log('Document successfully Written');
      })
      .catch(function (error) {
        console.error('Error: ', error);
      });
  };
  pickerList = () => {
    return this.featureData.map((value, key) => {
      return <Picker.Item label={value} key={key} value={value} />;
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center', fontSize: 25, marginBottom: 8}}>
          Write a Review
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="first name"
          value={this.state.fname}
          onChangeText={(value) => this.setState({fname: value})}
        />
        <TextInput
          style={styles.textInput}
          palceholder="last name"
          value={this.state.lname}
          onChangeText={(value) => this.setState({lname: value})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="email"
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <Picker
          selectedValue={this.state.parkFeature}
          onValueChange={(value) => this.setState({parkFeature: value})}>
          {this.pickerList()}
        </Picker>
        <TextInput
          style={styles.textInput}
          placeholder="make your review"
          value={this.state.comments}
          onChangeText={(comments) => this.setState({comments: comments})}
        />
        <Button
          style={styles.buttons}
          title="Submit Review"
          onPress={() => {
            this.publishReview();
            this.props.navigation.navigate('Map');
          }}
        />
        <Button
          style={styles.buttons}
          title="Clear Fields"
          onPress={() => {
            () => this.setState({email: '', parkFeature: '', comments: ''});
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
});

export default withNavigation(Review);
