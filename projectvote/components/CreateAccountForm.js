import React from 'react';
import { StyleSheet, Text, View,TextInput, Button, AsyncStorage} from 'react-native';
import MyButton from './MyButton';

let MainFormComponents = () => <Text>Hello</Text>

export default class CreateAccountForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: null,
      userText: null,
      placeholder: "What's your name?",
      alertText: "",
      form: null
    }
    MainFormComponents = () => (
      <View>
      <TextInput
        style={{height: 40, width:200}}
        textAlign={'center'}
        placeholder={this.state.placeholder}
        onChangeText={(text) => this.setState({text})}
        onFocus={() => this.setState({placeholder: ''})}
        value={this.state.userText}
        placeholderTextColor = {colours.mainText}
      />
      <MyButton
        onPress={async () => {this.submitPressed()}}
        title="Submit"
      />
      <Text style={{color: 'red', alignItems: 'center', justifyContent: 'center'}}>{this.state.alertText}</Text>
      </View>
    )


  }

  render(){
    return(
      <View style={styles.container}>
      {this.state.form}
      </View>

    );
  }

  componentDidMount(){
    this.setState({form:<MainFormComponents />});
  }

  async submitPressed(){
    this.alertUser("");
    console.log("submit pressed: " + this.state.text);
    name = this.state.text;
    nameValid = this.isNameValid(name);
    if(nameValid == true){
      userCreated = await this.createUserWithServer(name)
      if(userCreated.success == 1){
        console.log("success");
        code = userCreated.code;
        await storeItem("code",userCreated.code);
        await storeItem("name",name);
        console.log("success, user:" + retreiveItem("name"));
        this.showSuccessPage(code, name);
      }else{
        this.alertUser(userCreated.error);
      }
    }else{
      this.alertUser(nameValid);
    }
  }

  isNameValid(name){
    //TODO this
    return true;
  }

  alertUser(message){
    console.log(message);
    this.setState({
      alertText: message,
    })
  }

  showSuccessPage(code, name){
      SuccessPage = () => (
        <View><Text>Welcome {name}</Text>
        <MyButton
        title="Continue"
        onPress={() => {this.continuePressed()}}
        />
        </View>
      )
      this.setState({form:<SuccessPage />});
  }

  continuePressed(){
    console.log("continuePressed");
  }

  async createUserWithServer(name){
    let URL = SERVER_ADDRESS + "/" + CREATE_USER_PAGE + "?name=" + name;
    response = await getData(URL);
    console.log(response);
    return response;

  }

  storeUserLocally(name,code){

  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
