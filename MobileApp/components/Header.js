import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const Header = () => {
  return ( 
    <View style={styles.header}>
      <Text style={styles.text}>Bryce Canyon Natl Park App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 20,
    marginBottom: 40,
  },
  text: {
      fontSize: 22,
      textAlign: 'center',
      justifyContent: 'center',
      color: '#3D3B30',
  },
});

export default Header;
