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

        <MyButton title="Gallery" onPress ={() => {this.openGallery()}} />
        <MyButton title="Camera" onPress ={() => {this.openCamera()}}/>
        <MyButton title="Submit" onPress ={() => {this.submitImage()}}/>
          <Text>{this.state.alertText}</Text>
      </View>
    )
  }

  refreshPage(){
    this.setState({
      image: null,
      data :null,
      alertText: "",
    });
  }

  async submitImage(){
    this.alertUser("uploading");
    let uri = this.state.image;
    console.log(uri);
    if(this.state.image != null){
      let apiUrl = SERVER_ADDRESS + '/create_post.php';
      let re = /(?:\.([^.]+))?$/;
      fileType = re.exec(uri)[1];
      console.log(fileType);
      let formData = new FormData();
      formData.append('userfile', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
        base64: this.state.data,
      });
      formData.append('code',code);

      let options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      let response = await fetch(apiUrl, options);
      response = await response.json();

      console.log(response)
      if(response.success == 0){
        this.alertUser(response.error);

      }else{
        this.refreshPage();
        this.alertUser("upload succesfull")
      }


    }else{
      this.alertUser("select an image");
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
