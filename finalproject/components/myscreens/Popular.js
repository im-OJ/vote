import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';

export default class PostStats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      images: null,
    }
    this.getPosts();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.images}
      </View>
    );
  }

  async getPosts(){
    let result = await global.getData("get_top.php");
    let output = [];
    for(var r in result){
      let URL = global.SERVER_ADDRESS + "/p/" + result[r].URL;
      output.push(<Image key={result[r].idpost} style={styles.image} source={{uri:URL}} />);
    
    }
    this.setState({
      images: output,
    })

  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    minHeight: Dimensions.get('window').height-120,
    flex: 1,
    backgroundColor: global.colourMain,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',

  },
  image: {
    width: Dimensions.get('window').width-20,
    height: 300
  }
});
