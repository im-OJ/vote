import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';

export default class ExpandableImage extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showingComponent: false
    }
  }

  render() {
    let component = this.renderComponenet()

    return (
      <View style={styles.container}>

        {component}

      </View>
    );
  }

  buttonClick = () => {
    console.log("opening page ");
    if(this.state.showingComponent){
      this.setState({
        showingComponent: false,
      });
    }else{
      this.setState({
        showingComponent: true,
      });
    }

  }

  renderComponenet = () => {

    let minimized =
      <TouchableOpacity style= {styles.minimized} onPress = {this.buttonClick}>
        <Text  style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>

    if(typeof(this.props.image) !== "undefined"){
      minimized =
        <TouchableOpacity style= {styles.imageContainer} onPress = {this.buttonClick}>
          <Image style={styles.image} source={{uri: this.props.image}} />
        </TouchableOpacity>
      ;
    }

    if(this.state.showingComponent){
      if(typeof this.props.component !== 'undefined'){
        return (
          <View>
          {minimized}
          {this.props.component}
          </View>

        )
      }
      return (<View>{minimized}<Text style={{backgroundColor: "pink", width: Dimensions.get('window').width, height:Dimensions.get('window').height, flex:1}}>Screen not assigned</Text></View>);
    }


    if(typeof this.props.image !== 'undefined'){
      return (<TouchableOpacity style= {styles.imageContainer} onPress = {this.buttonClick}>
                <Image style={styles.image}  source={{uri: this.props.image}}></Image>
      </TouchableOpacity>
    )
      }
    //Button
    return (
      <TouchableOpacity style= {styles.container} onPress = {this.buttonClick}>
        <Text  style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );

  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "white",
    width: Dimensions.get('window').width,
    flex: 1,
    minHeight: Dimensions.get('window').height/4,
    alignItems: 'center',
    justifyContent: 'center',


  },
  text: {
    color: 'black',
  },
  minimized: {
    width: Dimensions.get('window').width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: global.colourSecond,

  },
  image:{
    backgroundColor: "red",
    flex: 1,
    height:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    minHeight: Dimensions.get('window').height/3,
    height: Dimensions.get('window').height/2,
    width: Dimensions.get('window').width,
    flex: 1,
    backgroundColor:"teal",
  }
});
