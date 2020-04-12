import React from 'react';
import {Text, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {withStore} from '../utils/store';

const db = firestore();

class ReviewsList extends React.Component {
  render() {
    if (this.props.returnResult) {
      return (
        <FlatList
          data={this.props.data}
          renderItem={({item}) => (
            <>
              <Text>{item.parkFeature}</Text>
              <ListItem title={item.comments} />
              <Text>
                {item.fname} {item.lname} e-mail: {item.email}
              </Text>
            </>
          )}
          keyExtractor={(item, index) => index}
        />
      );
    } else {
      return <Text>{`No Reviews found for ${this.props.store.poiName}`}</Text>;
    }
  }
}

export default withStore(ReviewsList);
