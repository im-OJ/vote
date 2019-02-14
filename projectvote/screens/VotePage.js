import React from 'react';
import { StyleSheet, Text, View,TextInput, Button} from 'react-native';


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
        <Text>Vote Page</Text>
      </View>
    )
  }
}
