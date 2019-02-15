import React from 'react';
import { StyleSheet, Text, View,TextInput, Button, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import VotePage from './VotePage';
import UploadPage from './UploadPage';
import ProfilePage from './ProfilePage';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:this.props.title,
    }
  }
  render(){
    return(
      // <View style={{width: 400, height:400, backgroundColor: "red", flex:1}}>
      // <ProfilePage />
      // </View>
      <Swiper style={styles.wrapper} showsButtons={true}>
       <View style={styles.slide1}>
         <VotePage />
       </View>
       <View style={styles.slide2}>
         <UploadPage />
       </View>
       <View style={styles.slide3}>
         <ProfilePage name={name} code={code}/>
       </View>
     </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 10
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
