import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, Button, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ImagePicker, Permissions } from 'expo';
import RNFetchBlob from 'rn-fetch-blob';


export default class LinksScreen extends React.Component<Props> {

  state = {
    image: null,
    data: null
  }

  static navigationOptions = {
    title: 'Upload',
  };

  render() {
    let { image } = this.state;
    return (
      <ScrollView style={styles.container}>
      {/* Go ahead and delete ExpoLinksView and replace it with your
        * content, we just wanted to provide you with some helpful links */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title="Gallery"
        onPress={this._pickImage}
        />
        <Button
        title="Camera"
        onPress={this._openCamera}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          <Button
          title="Upload"
          onPress={this.upload}
          />
          </View>
          </ScrollView>
        );
      }

      upload = () => {
        RNFetchBlob.fetch('POST', 'http://192.168.1.233/vote/vote/back/create_post.php', {
          Authorization : "Bearer access-token",
          otherHeader : "foo",
          'Content-Type' : 'multipart/form-data',
        }, [

          { name : 'image', filename : 'image.png', type:'image/png', data: this.state.data},

          // elements without property `filename` will be sent as plain text
          { name : 'code', data : "global.code"},
          ,
        ]).then((resp) => {
          // ...
        }).catch((err) => {
          // ...
        })
      }

      _pickImage= async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          mediaTypes:"Images",
          base64: true,

        });
        console.log(result);
        if (!result.cancelled) {
          this.setState({
            image: result.uri,
            data: result.base64
          });

        }

      }

      _openCamera = async() =>{
        const { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          mediaTypes:"Images",

        });
        console.log(result);
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
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
      },
    });
