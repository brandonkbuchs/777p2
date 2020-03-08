import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import MyButton from './components/Button';
import UserTextInput from './components/TextInput';

const App = () => {
  return (
    <View style={styles.main}>
      <Image
        style={styles.image} 
        source={require('./assets/BryceWelcome.jpg')}
      />
      <Text style={styles.text}>Explore Bryce Canyon</Text>      
      <View style={styles.textInput}>
        <UserTextInput placeholder="Username" />
        <UserTextInput placeholder="Password" />
      </View>
      <View style={styles.button}>
        <MyButton name="Login" />
        <MyButton name="Register" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingTop: 35,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
  },
  image: {
    borderRadius: 100 / 1.76,
    height: 180,
    width: 180,
  },
  main: {
    marginTop: 45,
    alignContent: 'center',
    alignItems: 'center',    
  },
  text: {
    marginTop: 23,
    fontSize: 25,
    color: '#442B10',
    fontWeight: 'bold'
  }

});

export default App;
