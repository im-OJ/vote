import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';

export default class Vote extends React.Component {
  constructor(){
    super();
    this.getImages();
    this.state = {
      image1: "",
      image2: "",
    }
  }

  render() {
    console.log("rendering: " + this.state.image2);
    return (
      <View style={styles.container}>
      <Text>Choose your favourite</Text>
        <Image source={{uri:this.state.image1}} style={styles.image}/>
        <Image source={{uri:this.state.image2}} style={styles.image}/>
      </View>
    );
  }

  let pairsSeen = [];
  let pairList = []
  getImages = async() =>{
    let response = await global.getData("get_images.php");

    console.log(response[0]);
    console.log("==============")
    console.log("got an image :" + response[0][0].URL)
    pairList = response;
    this.setState({
    // image1: global.SERVER_ADDRESS + "/p/" + response[0][0].URL,
    // image2: global.SERVER_ADDRESS + "/p/" + response[0][1].URL});
  });

  }

  //TODO: this, add current images to pairsSeen and display them, onclick call this and assign a pair that is not in seen. use state image1ID/object and image2ID to keep track of images
  updateImage = () = {
    for(let i = 0; i < pairList.size(); i++){

    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    backgroundColor: "white", flex:1, width:Dimensions.get('window').width
  }
});
