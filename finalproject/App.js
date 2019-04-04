//TODO: fix padding for status bar

import React from 'react';
import { Platform, StatusBar} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import  MainScreen from './components/MainScreen';
import  CreateAccountScreen from './components/CreateAccountScreen';

export default class App extends React.Component {
  constructor(){
    super();
    this.refresh = this.refresh.bind(this);

    this.accountCheck();
    this.state = {
      userHasAccount: false,
    }
  }

  render() {
    let component = "";

    if(this.state.userHasAccount == true){
      component = <MainScreen />
    }else{
      console.log("create account screen")
      component = <CreateAccountScreen refreshAction={this.refresh()}/>
    }

    return (
      <View style={styles.container}>
        {component}
      </View>
    );


  }

  refresh(){
    console.log("refreshing App.js");
    this.accountCheck();
  }

  accountCheck = async() => {
    let result = await this.hasAccount();
    console.log("result: " + result)
    this.setState({
      userHasAccount: result,
    })
    console.log("has account: " + this.state.userHasAccount);
  }

  hasAccount = async() => {
    global.name = await global.retreiveItem("name");
    global.code = await global.retreiveItem("code");

    console.log("code: " + global.code)

    if(global.code == ""){ return false; }
      let confirmUserData = await global.getData("confirm_user.php?code=" + global.code);
      let success = confirmUserData.success;
      if(success > 0){
        return true;
      }
      return false;
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
});
