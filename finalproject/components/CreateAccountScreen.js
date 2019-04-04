import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';

export default class CreateAccountScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      userText : "",
      placeholder: "TYPE YOUR DESIRED USERNAME",
      feedbackText: "\n",
    }
  }

  render() {

    return (
      <View style={styles.container}>

      <TextInput
      textAlign={'center'}
      placeholder={this.state.placeholder}
      style = {styles.textInput}
      onChangeText={(text) => this.setState({userText: text})}
      onFocus={() => this.setState({placeholder: ''})}
      value={this.state.userText}

      />
      <Button style={{width: 250}}
      color = {global.colourThird }
      onPress={this.submitPressed}
      title="Submit"
      />
      <Text>{this.state.feedbackText}</Text>
      </View>
    );

  }
  submitPressed = async() =>{
    console.log("button pressed")
    let name = this.state.userText
    if(this.isNameValid(name)){
      let response = await this.createUserWithServer(name)
      console.log("create nane response: " + response)
      if(response.success == 1){
        let code = response.code;
        global.setCode(code)
        console.log("User created with code: " + code)
        this.props.refreshAction;
      }else{
        this.setState({
          feedbackText: "Error, try again"
        })
      }
    }
  }

//Local validity check
isNameValid = (name) => {
//Check for banned characters
  var bannedChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if(bannedChars.test(name)){
    this.setState({
      feedbackText: "INVALID CHARACTERS"
    })
    return false;
  }

  //Check length
  if(name.length < 5){
    this.setState({
      feedbackText: "TOO SHORT"
    })
  }

  return true;
}

  createUserWithServer = async(name) =>{
    let URL = "create_user.php" + "?name=" + name;
    response = await global.getData(URL);
    console.log(response);
    return response;

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
  textInput: {
    height: 40,
    paddingLeft: 6,
  },
  block: {
    height: 150,
    backgroundColor: global.colourThird,
    width: Dimensions.get('window').width,
  }
});
