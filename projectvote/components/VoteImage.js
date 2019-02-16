import React from 'react';
import { StyleSheet, Text, View,TextInput, Button} from 'react-native';


export default class VoteImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
    }
  }
  render(){
    return(
      <View>
        <Image source={{uri:this.props.src}}>
      </View>
    )
  }
}
