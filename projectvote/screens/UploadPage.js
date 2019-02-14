import React from 'react';
import { StyleSheet, Text, View,TextInput, Button, Image} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import MyButton from '../components/MyButton';
import futch from '../api';

export default class UploadPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
      image: null,
      data :null,
      alertText: "",
    }
  }
  render(){
    let {image}= this.state
    return(
      <View>
      {image &&
        <Image source={{ uri: image }} style={{ width: 400, height: 300}} />}
                <Text>{this.state.alertText}</Text>
        <MyButton title="Gallery" onPress ={() => {this.openGallery()}} />
        <MyButton title="Camera" onPress ={() => {this.openCamera()}}/>
        <MyButton title="Submit" onPress ={() => {this.submitImage()}}/>
      </View>
    )
  }

  async submitImage(){
    this.alertUser("");
    if(this.state.image != null){
    let url = SERVER_ADDRESS + "/create_post.php";
    //COMMENT THIS showsButtons
    url = "http://192.168.1.233/vote/vote/back/create_post.php";
    console.log("Attempting upload");
      const data = new FormData();
      data.append('code','HJsTpLMK7I4O95qlmPs25pe7bNmjZt'); //change this for code variable TODO
      data.append('photo',{
        uri: this.state.image,
        type: 'image/jpeg',
        name: 'testPhotoName'
      })
      response = await fetch(url, {
        method: 'post',
        body: data
      })
      //response = await response.json()
      console.log(response);
    }else{
      this.alertUser("please select an image");
    }
  }
  alertUser(text){
    this.setState({alertText: text});
  }
  async openCamera(){
    const { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes:"Images",

    });
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        data: result.base64
      });

    }
  }

  async openGallery(){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes:"Images",
      base64: true,

    });
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        data: result.base64
      });

    }
  }
}
