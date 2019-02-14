import React from 'react';
import { StyleSheet, Text, View,TextInput, Button, Image, ScrollView, FlatList} from 'react-native';


export default class ProfilePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
      imageComponents: [],

    }

    //this.displayImages(images);
  }
  render(){
    return(

      <View>
      {this.state.imageComponents}
      <Text>
      </Text>

      </View>

    )
  }

  componentDidMount(){
    this.loadImages();

  }
  //gets images from server
  async loadImages(){
    response = await getData(SERVER_ADDRESS + "/get_profile.php?code=" + code);
    console.log(response[0].URL);

    let temp = await this.displayImages(response);
    this.setState({imageComponents: temp},()=>{console.log("images loaded [profile]")});

  }

async imageExists(image_url){
    return true;
}

  async displayImages(dataArray){

    if(typeof dataArray !== "undefined"){
      console.log("displayImages called: " + dataArray[1].URL);
      let attempts = 0;
      let fails = 0;
      let output = [];

      for(let i = 0; i < dataArray.length; i++){
        if(await this.imageExists(dataArray[i].URL)){
          console.log("attempting: " + dataArray[i].URL );
          address = SERVER_ADDRESS + "/p/" + dataArray[i].URL;
          attempts = attempts + 1;
          output.push(<Image
            style={{flex: 1, width:200}}
            source={{uri: address}}
            key={dataArray[i].idpost}
            onError={ () => {console.log("an image failed to load:" + fails); fails = fails+1;}}
            />);
        }
      }

      console.log("attempts: " + attempts + ", fails:" + fails);
      return output;
    }else{
      console.log(dataArray)
      return(<Text>No Images</Text>)
    }

  }

  createURLOnlyArray(dataArray){
    dataArray.forEach(element=>{})
  }
}
