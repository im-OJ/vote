import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Icon } from 'react-native';
import  MyButton from './MyButton';
import './global.js';
import Vote from './myscreens/Vote';
import Profile from './myscreens/Profile';
import Upload from './myscreens/Upload';
import Popular from './myscreens/Popular'
import FAB from 'react-native-fab'

export default class MainScreen extends React.Component {
  render() {
    return (
      <View>
      <ScrollView contentContainerStyle={styles.container}>

        <MyButton text="VOTE" color="blue" component= {<Vote/>}/>
        <MyButton text="POPULAR" color="blue" component= {<Popular/>}/>
        <MyButton text="UPLOAD" component= {<Upload/>} />
        <MyButton text="PROFILE" component= {<Profile/>}/>

      </ScrollView>

      </View>
    );
  }
  //TODO: make frefresh fab with FAB
  refresh(){
    this.setState({});
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,

    backgroundColor: 'red',

  },
});
