import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import  MyButton from './MyButton';
import './global.js';
import Vote from './myscreens/Vote';
import Profile from './myscreens/Profile';
import Upload from './myscreens/Upload';

export default class MainScreen extends React.Component {
  render() {
    console.log("rendering mainscreeen");
    console.log("A: " + typeof(global.ID_VOTE));
    return (
      <ScrollView contentContainerStyle={styles.container}>

        <MyButton text="VOTE" color="blue" component= {<Vote/>}/>
        <MyButton text="UPLOAD" component= {<Upload/>} />
        <MyButton text="PROFILE" component= {<Profile/>}/>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,

    backgroundColor: 'red',

  },
});
