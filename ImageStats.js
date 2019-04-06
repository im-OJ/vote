import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import  MyButton from './MyButton';
import './global.js';
import Vote from './myscreens/Vote';
import Profile from './myscreens/Profile';
import Upload from './myscreens/Upload';

export default class MainScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,

    backgroundColor: 'red',

  },
});
