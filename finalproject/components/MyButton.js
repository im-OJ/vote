import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

export default class MyButton extends React.Component {

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
    console.log("comp: " + this.props.component)
    if(this.state.showingComponent){
      if(typeof this.props.component !== 'undefined'){
        return (
          <View>
          <TouchableOpacity style= {styles.minimized} onPress = {this.buttonClick}>
            <Text  style={styles.text}>{this.props.text}</Text>
          </TouchableOpacity>
          {this.props.component}
          </View>

        )
      }
      return (<Text style={{backgroundColor: "pink", width: Dimensions.get('window').width, height:Dimensions.get('window').height, flex:1}}>Screen not assigned</Text>);
    }
    console.log("not rendering compoent")
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
    minHeight: Dimensions.get('window').height/3,
    alignItems: 'center',
    justifyContent: 'center',


  },
  text: {
    color: 'black',
  },
  minimized: {
    width: Dimensions.get('window').width,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: global.colourSecond,

  }
});
