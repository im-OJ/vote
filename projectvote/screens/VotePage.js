import React from 'react';
import { StyleSheet, Text, View,TextInput, Button} from 'react-native';
import VoteImage from '../components/VoteImage'

export default class VotePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
    }
  }
  render(){
    return(
      <View>
        <VoteImage />
        <VoteImage />
      </View>
    )
  }
}
