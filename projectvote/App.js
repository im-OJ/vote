import React from 'react';
import { StyleSheet, Text, View,TextInput, Button, AsyncStorage} from 'react-native';
import CreateAccountForm from './components/CreateAccountForm';
import MainView from './screens/MainView';

global.SERVER_ADDRESS = "http://178.128.168.118";
global.CREATE_USER_PAGE = "create_user.php";
global.getData = async(URL)  => {
  let data = await fetch(URL);
  data = await data.json()
  return data;
}

global.storeItem = async (name, value) =>{
  try {
    await AsyncStorage.setItem('@MyStore:' + name, value);
  } catch (error) {
    // Error saving data
  }
}

global.retreiveItem = async(name)=>{
  const myItem = await AsyncStorage.getItem('@MyStore:' + name);
  return myItem
}

global.colours = {
  mainBackground: '#61E294',
  mainText: 'black',
  mainButton: '#7BCDBA'
}

global.name = "";
global.code = "";

const mainApp = <MainView />
const accountForm = <CreateAccountForm/>
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      screen: null,
      text: null
    }
  }



  render() {
    return (
      <View style={styles.container}>
         {this.state.screen}
       </View>

    );
  }


  componentDidMount(){
    this.checkUser()
  }

  async checkUser(){
    //get items from storage
    name = await retreiveItem("name");
    code = await retreiveItem("code");

    console.log("this device: name:" + name + ", code:" + code);

    //display temporaray component
    this.displayComponent(<Text>Loading</Text>);


    if(this.isUserNew() == true){
      console.log("User is new")
      this.displayComponent(accountForm);
    }else{
      this.displayComponent(mainApp);
    }
  }

  isUserNew(){
    if(name == null){
      return true;
    }else{
      return false;
    }
    //TODO finish this
  }

  submitPressed(){
    console.log("submit pressed, name:" + this.state.text);

  }
  displayComponent(comp){
    this.setState({
      screen:comp
    });
  }
  toComponent(compString){
    return(compString);
  }



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.mainBackground,
    color: 'black',

  },
});
