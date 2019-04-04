import React from 'react';
import { StyleSheet, Text, View, Dimensions,Button, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

export default class Upload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
      image: null,
      data :null,
      alertText: "",
    }
  }
  render() {

    let image = this.state.image;
          //TODO: replace with custom buttons
    return (
      <View style={styles.container}>
      <Image source={{ uri: image }} style={{ width: 400, height: 300}} />
      <View style={{flexDirection: 'row'}}>
      <Button title="Gallery" containerViewStyle={styles.button}  onPress ={() => {this.openGallery()}} />
      <Button title="Camera" containerViewStyle={styles.button} onPress ={() => {this.openCamera()}}/>
      </View>
      <Button title="Submit" containerViewStyle={styles.button} onPress ={() => {this.submitImage()}}/>
      <Text>{this.state.alertText}</Text>
      </View>
    );
  }

  refreshPage(){
    this.setState({image:null, data:null, alertText:"done"});
  }

  async submitImage(){
    this.alertUser("uploading: " + global.code);
    let uri = this.state.image;
    console.log("iri: " + uri);
    if(this.state.image != null){
      let apiUrl = global.SERVER_ADDRESS + '/create_post.php';
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

      formData.append('code',global.code);

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
    console.log("alert: " + text);
    this.setState({
      alertText: text
    })
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

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
    flex: 1,
    backgroundColor: global.colourSecond,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttton: {
    width: 3000,
    color: global.colourThird,
    padding: 10
  }
});
