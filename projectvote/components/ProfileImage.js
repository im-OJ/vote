import React from 'react';
import { StyleSheet, Text, View,TextInput, Button, Image, TouchableHighlight, Dimensions} from 'react-native';
const win = Dimensions.get('window');
const styles = StyleSheet.create({
  image: {
    flex:1,
    height: 100,
  },
  expanded: {
    flex: 1,
    width: win.width,
    height: 300,
  }
});
export default class ProfileImage extends React.Component {
  expanded = (<View><TouchableHighlight
    onPress={() => {this._onPress(this.props.key)} }
    >
    <Image
      title={this.props.title}

      style={styles.expanded}
      resizeMode={'contain'}
      source={this.props.source}
    />
    </TouchableHighlight>
    <View><Text>Stats will appear here!</Text></View>
    </View>
    )
  normal =  (<TouchableHighlight
    onPress={() => {this._onPress(this.props.key_ID)} }
    >
    <Image
      title={this.props.title}
      key={this.props.key_ID}
      style={styles.image}
      source={this.props.source}
    />
    </TouchableHighlight>)
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
      expanded: false,
      components: this.normal,
    }
  }
  render(){
    return(
      <View>{this.state.components}</View>
    )
  }
  _onPress(){
    let newcomp = <Image/>;
    if(this.state.expanded == true){
      newcomp = this.normal;
    }else{
      newcomp = this.expanded;
    }
    console.log("profile image pressed");
    this.setState({
      components:newcomp,
      expanded:!this.state.expanded,
    });
  }


}
