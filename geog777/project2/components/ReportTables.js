import React, {useState, useEffect} from 'react';
import Marker from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import {FlatList, View, TextInput, Text} from 'react-native';
import Overlooks from './Overlooks';

const db = firestore().collection('overlooks');

export default function ReportTables() {
  return (
    <View>
      <Overlooks />
    </View>
  );
}

ReportTables.navigationOptions = ({navigation}) => ({
  title: 'Login to BCNP App',
  headerShown: false,
});
