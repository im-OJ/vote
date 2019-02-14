import React from 'react';
import { StyleSheet, Text, View,TextInput, Button} from 'react-native';


export default class ProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
    }
  }
  render(){
    return(
      <View>
        <Text>Profile Page</Text>
      </View>
    )
  }
}
