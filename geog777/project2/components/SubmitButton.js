import React from 'react';
import {Button} from 'react-native';

function SubmitButton({navigation}) {
  return (
    <Button
      style={styles.buttons}
      title="Submit Review"
      onPress={() => {
        this.publishReview();
        navigation.navigate('Map');
      }}
    />
  );
}

export default SubmitButton;
