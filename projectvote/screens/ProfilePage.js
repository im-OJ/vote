import React from 'react';
import { Header, TouchableHighlight, StyleSheet, Text, View,TextInput, Button, Image, ScrollView, FlatList, RefreshControl} from 'react-native';
import ProfileImage from '../components/ProfileImage';

const styles = StyleSheet.create({
  image: {
    flex:1,
    height: 250,
  },
  imageContainer: {
    flex:1,
    backgroundColor: 'red',
    justifyContent: 'flex-start'
  }
});

export default class ProfilePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
      imageComponents: [],
      refreshing: false,
      imageData: [],
    }

    //this.displayImages(images);
  }
  render(){
    return(

      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => {this.refresh()}}
            refreshing={this.state.refreshing}
           />
        }
      style={{
        flex:1,

      }}
      >
      <View style={{width:600, height:40, backgroundColor:'black', flex:1}}></View>
      <Text style={{fontSize: 50}}>{this.props.name}</Text>
      <View style={{width:600, height:100, backgroundColor:'green', flex:1}}></View>
      <View style={styles.imageContainer}>
      {this.state.imageComponents}
      </View>


      </ScrollView>

    )
  }
  //gets images from server


  componentDidMount(){
    this.loadImages();

  }


  async loadImages(){
    response = await getData(SERVER_ADDRESS + "/get_profile.php?code=" + this.props.code);
    console.log(response[0].URL);
    let temp = await this.displayImages(response);

    this.setState({imageComponents: temp,imageData: response},()=>{console.log("images loaded [profile]")});
  }
  async refresh(){
    console.log(code);
    console.log("refreshing");
    await this.loadImages();
    this.setState({refreshing:false})
  }
  async imageExists(image_url){
    return typeof image_url !== "undefined";
}

  async displayImages(dataArray){

    if(typeof dataArray !== "undefined"){

      let attempts = 0;
      let fails = 0;
      let output = [];
      dataArray = dataArray.reverse();
      for(let i = 0; i < dataArray.length; i++){
        if(await this.imageExists(dataArray[i].URL)){
          console.log("attempting: " + dataArray[i].URL );
          address = SERVER_ADDRESS + "/p/" + dataArray[i].URL;
          attempts = attempts + 1;
          output.push(
          <ProfileImage
              style={styles.image}
              source={{uri: address}}
              key_ID={dataArray[i].idpost}
              key={dataArray[i].idpost}
            />
          );
        }
      }

      console.log("attempts: " + attempts + ", fails:" + fails);
      return output;
    }else{
      console.log(dataArray)
      return(<Text>No Images</Text>)
    }

  }

  async showImageStats(id){
    //this.getImageStats(id)

  }


  imagePressed(id){
    console.log(id + 'pressed');
  }

  createURLOnlyArray(dataArray){
    dataArray.forEach(element=>{})
  }
}
