import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import  MyButton from './MyButton';
import Vote from './myscreens/Vote';
import Profile from './myscreens/Profile';
import Upload from './myscreens/Upload';

export default class PostStats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageID: null,
      rank: null,
      wins: null,
      losses: null,
      time: null,
    }
    this.getStats();
  }
  render() {
    return (
      <View contentContainerStyle={styles.container}>
        <Text>RANK: {this.state.rank} </Text>
        <Text>WINS: {this.state.wins} </Text>
        <Text>LOSSES: {this.state.losses} </Text>
        <Text>TIME POSTED: {this.state.time} </Text>
      </View>
    );
  }

  async getStats(){
    let result = await global.getData("get_stats.php?code=" + global.code + "&imageid=" + this.props.id);

    this.setState({
      rank: result.rank,
      wins: result.wins,
      losses: result.losses,
      time: result.datetime
    });
    console.log("state set " + this.state.rank);
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor: global.colourMain,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',

  },
});
