import React, { Component } from 'react';
import { AppRegistry, View, TextInput, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';
import { AsyncStorage } from "react-native"
import DialogManager, { ScaleAnimation, DialogContent } from 'react-native-dialog-component';
// import user from './classes/user.js'; TODO

//// TODO: Fix user class, confirm user with server, check dialogs, store username on phone (?), submit image.

var server_address = 'http://178.128.168.118';
var var_user_code = 'local_code'
var is_user = 0;
//var this_user = user;

const styles = StyleSheet.create({

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
  },
});


///////////////////USER CREATION & CONFIRMATION///////////////////
//submit username to server
const submit = (name) =>{
  console.log(server_address + '/?name=' + name)

  fetch(server_address + '/create_user.php?name=' + name)
  .then((response) => {
    console.log(response)
    result = response.json
    response_text = response._bodyText

    if(response_text.startsWith("error") || response_text.length < 3){
        show_dialog("ERROR","Name must be unique, 4-20 characters,alphanumeric")
    }else{
      //ERROR CREATING user
      console.log("response text = " + response_text.length)
      store_user(response_text)

    }

    console.log("error" + response_text)
  })

    .catch((error) => {
      console.log("err")
      console.error(error);
    });


}

//store user code on phone
const store_user = (code) =>{
  _storeData = async () => {
    try {
      await AsyncStorage.setItem(var_user_code, code);
      console.log("data stored")
      show_dialog("SUCCESS", "Welcome")

    } catch (error) {
      console.log('error storing')
    }

  }
  _storeData();
  check_user_code();
}

//check if user code exists on phone
check_user_code = async () => {
  console.log("checking for user code")
  try {
    const value = await AsyncStorage.getItem(var_user_code);
    if (value !== null) {
      // We have data!!
      console.log('user code found: ' + value);
      confirm_user(value)
    }else{
      console.log('user code not found');
      is_user = 0;
    }
   } catch (error) {
     console.log(error)
   }
}

//confirms user with server (todo): is_user=1
const confirm_user = (code) =>{
  console.log("confirming user with server")

  is_user = 1;
}

check_user_code();

///////////////////GENERAL USE FUNCTIONS///////////////////
const show_dialog = (title,content) =>{
  console.log("showing dialog: " + title + "//" + content)
  DialogManager.show({
    title: title,
    titleAlign: 'center',
    animationDuration: 200,
    ScaleAnimation: new ScaleAnimation(),
    children: (
      <DialogContent>
      <View>
      <Text>
      {content}
      </Text>
      </View>
      </DialogContent>
    ),
  }, () => {
    console.log('callback - show');
  });
}

export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'what shall we call you?' };
  }

  render() {

    //////// CREATE USER SCREEN
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
      //////////// USER FOUND
      return (
      <View  style={styles.center}>
      <Text>Hello user</Text>
      </View>
    );
    }

  }


}
