import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MyButton from '../MyButton'
export default class Profile extends React.Component {
  render() {
    console.log("rendering mainscreeen");
    console.log("A: " + typeof(global.ID_VOTE));
    return (
      <View style={styles.container}>
        <MyButton image="tesa;flihjasofhaousfofut.jpg"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
    flex: 1,
    backgroundColor: global.colourMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
