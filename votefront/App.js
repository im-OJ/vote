import React, { Component } from 'react';
import { AppRegistry, View, TextInput, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';
import { AsyncStorage } from "react-native"

var server_address = 'http://178.128.168.118';

var is_user = 0;
const styles = StyleSheet.create({

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
  },
});

const submit = (name) =>{
  console.log(server_address + '/?name=' + name)

  fetch(server_address + '/create_user.php?name=' + name)
  .then((response) => {
    console.log(response)
    result = response.json
    response_text = response._bodyText
    if(!response_text.startsWith("error")){
      store_user(response_text)
    }
  })

    .catch((error) => {
      console.log("err")
      console.error(error);
    });


}

const store_user = (code) =>{
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('user_code', code);
      console.log("data stored")
    } catch (error) {
      console.log('error storing')
    }

  }
  _storeData();
  _retrieveData();
}
//check if user code exists
_retrieveData = async () => {
  console.log("checking for user code")
  try {
    const value = await AsyncStorage.getItem('user_code');
    if (value !== null) {
      // We have data!!
      console.log('user code found: ' + value);
      is_user = 1;
    }else{
      console.log('user code not found');
      is_user = 0;
    }
   } catch (error) {
     console.log(error)
   }
}

_retrieveData();

export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'what shall we call you?' };
  }

  render() {
    if(is_user == 0){
    return (
      <View  style={styles.center}>
      <TextInput
        textAlign={'center'}
        placeholder={this.state.text}
        onFocus={() => {this.setState({text : ''})}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        onSubmitEditing={
          () => {submit(this.state.text)}}


      />
      </View>
    );}else{
      return (
      <View  style={styles.center}>
      <Text>Hello user</Text>
      </View>
    );
    }

  }


}
