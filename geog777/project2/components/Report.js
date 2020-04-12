import React from 'react';
import {View, FlatList, StyleSheet, Picker, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import TrailsJson from './Trails.json';
import {withStore} from '../utils/store';
import ReviewsList from './ReviewsList';

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

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      returnResult: false,
    };
  }
  componentDidMount() {
    this.props.store.set('poiName', '');
  }
  pickerList = () => {
    return poiNames.map((value, key) => {
      return <Picker.Item label={value} key={key} value={value} />;
    });
  };
  ReturnReviews(value) {
    this.setState({reviews: []})
    this.props.store.set('poiName', value);
    const ref = db.collection('reviews');
    ref
      .where('parkFeature', '==', value)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log('No Matching Documents');
          this.setState({returnResult: false});
          this.setState({reviews: []});
          return null;
        }
        snapshot.forEach((doc) => {
          this.setState((prevState, props) => ({
            returnResult: !prevState.returnResult,
          }));
          let i = 0;
          var review = {
            id: doc.data(),
            parkFeature: doc.data().parkFeature,
            fname: doc.data().fname,
            lname: doc.data().lname,
            email: doc.data().email,
            comments: doc.data().comments,
          };
          this.setState((prevState) => ({
            reviews: [...prevState.reviews, review],
          }));
          i += 1;
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
    console.log(this.state.reviews);
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.props.store.poiName}
          onValueChange={(value) => {
            this.ReturnReviews(value);
          }}>
          {this.pickerList()}
        </Picker>
        <ReviewsList
          data={this.state.reviews}
          returnResult={this.state.returnResult}
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

export default withStore(Report);
