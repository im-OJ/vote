import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TextInput, Text } from 'react-native';
import { AsyncStorage } from "react-native";
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import DialogManager, { ScaleAnimation, DialogContent } from 'react-native-dialog-component';

var server_address = 'http://178.128.168.118';
var var_user_code = 'local_code'
var user_code = '0'
//TODO: confirm user with server, reload after creating user
//////////////////////////////////////////////////////////////////////
//FIRST THINGS FIRST
//Check phone for user code
user_exists = () => {
  console.log("checking for user code")

    const value = user_code;
    if (value !== null) {
      // We have data!!
      console.log('user code found: ' + value);
      if(confirm_user(value)){
        console.log("User code confirmed")
        return true;
      }else{
        console.log("err:User not confirmed with server")
        return false;
      }
    }else{
      console.log('user code not found');
      return false;
    }

}

confirm_user = (code) =>{
  return true;
}
var is_user = false;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isLoadingVar: true,
    text: 'what shall we call you?'
  };

  async componentDidMount() {
    await this.init()

    // you might want to do the I18N setup here
    this.setState({
      isLoadingVar: false
    })
  }
  render() {
    if (this.state.isLoadingVar) {
      return <View><Text>Loading...</Text></View>;
    }
    console.log("render");
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      //////////////////////////////////////////////////////////////////////
      //Is User new?

      if(is_user == false){ //TODO: Why is this boolean the opposite of what it should be?
        console.log("No user found, showing welcome  screen");
        return (
          //Welcome page
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
        );

        //////////////////////////////////////////////////////////////////////
      }else{
        console.log("User found, Showing home screen")
        //if user is not new, show normal screens.
        return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        );
      }
      console.log("done");
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
//completes before render
  async init(){

    user_code = await AsyncStorage.getItem(var_user_code);
    console.log("init " + user_exists().toString());
    is_user = user_exists();

    this.setState({isLoadingVar: false})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
  },
});
//////////////////////////////////////////////////////////////////////
//Submit username to server
const submit = (name) =>{

  fetch(server_address + '/create_user.php?name=' + name)
  .then((response) => {
    console.log(response)
    result = response.json
    response_text = response._bodyText
    var response_object = JSON.parse(response._bodyText)
    console.log(response_object.success);
    if (response_object.success == 1){
      //show_dialog("Welcome", "Welcome to project vote");
      store_user(response_object.code)
    }else{
      show_dialog("Uh Oh", response_object.error);
    }

  })

    .catch((error) => {
      console.log("err")
      console.error(error);
    });

}
//Show dialog box
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
//On user created, store code to phone
const store_user = (code) =>{
  console.log("storing code: " + code);
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


}


//////////////////////////////////////////////////////////////////////
