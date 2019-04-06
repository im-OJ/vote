import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import MyButton from '../MyButton';
import PostStats from '../PostStats';

import ExpandableImage from '../ExpandableImage';

export default class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      imageComponents: null,
      imageData: null,
    }

    this.loadImages();
  }
  render() {

    return (
      <View style={styles.container}>
        <ScrollView >
          {this.state.imageComponents}
        </ScrollView>
      </View>
    );
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
          <MyButton
              style={styles.image}
              image={address}
              key={dataArray[i].idpost}
              component = <PostStats id={dataArray[i].idpost}/>
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


  async loadImages(){
      response = await getData("get_profile.php?code=" + global.code);
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


}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,


  },
  image: {
    height: Dimensions.get('window').height/2,
  }
});
