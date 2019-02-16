import React from 'react';
import { StyleSheet, Text, View,TextInput, Button} from 'react-native';


export default class ImageStats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
    }
  }
  render(){
    return(
      <Button
        color={colours.mainButton}
        title={this.props.title}
        onPress={this.props.onPress}
      />
    )
  }
}
