import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog';

let pairsSeen = [];
let pairList = [];
let first = null;
let second = null;
export default class Vote extends React.Component {
  constructor(){
    super();
    this.getImages();
    this.state = {
      image1: "",
      image2: "",
      image1ID: null,
      image2ID: null,
      reportvisible: false,
      reportimage: 0,
    }
    this.getImages();

  }

  render() {

    return (
      <View style={styles.container}>
      <Text>Choose your favourite</Text>
        <TouchableOpacity  style={styles.image} onLongPress = {() => {this.longPress(1)}} onPress = {() => {this.imagePressed(1)}}><Image source={{uri:this.state.image1}} style={styles.image} /></TouchableOpacity>
        <TouchableOpacity   style={styles.image} onLongPress = {() => {this.longPress(1)}} onPress = {() => {this.imagePressed(2)}}><Image source={{uri:this.state.image2}} style={styles.image} /></TouchableOpacity>
        <Dialog
        footer={
      <DialogFooter>
        <DialogButton
          text="CANCEL"
        onPress={() => {this.hideReportDialog()}}
        />
        <DialogButton
          text="OK"
            onPress={() => {this.reportImage(this.state.reportimage)}}

        />
      </DialogFooter>
    }
         visible={this.state.reportvisible}
         dialogTitle={<DialogTitle title="Report Image?" />}
       >
         <DialogContent>
          <Text> Are you sure you would like to report this image? </Text>
         </DialogContent>
       </Dialog>
      </View>
    );
  }


async imagePressed(num){
  this.updateImage();
  await this.sendVote(num);
}

async reportImage(num){
  this.hideReportDialog();
  let response = await global.getData("report.php?id=" + this.state.reportimage);
  console.log(response)

}

showReportDialog(){
  this.setState({
    reportvisible: true,
  })
}

hideReportDialog(){
  this.setState({
    reportvisible: false,
  })
}

async longPress(num){
  let imageID = "";
  if(num == 1){
    imageID = this.state.image1ID;
  }else{
    imageID = this.state.image1ID;
  }
  this.setState({
    reportimage: imageID
  })
  console.log("long press");
  this.showReportDialog();
}

sendVote = async(num) =>{
  let winnerID = "";
  let loserID = "";

  if(num == 1){
    winnerID =  this.state.image1ID;
    loserID = this.state.image2ID;
  }
  if(num == 2){
    winnerID = this.state.image2ID;
    loserID = this.state.image1ID;
  }
  let response = global.getData("create_vote.php?code=" + global.code +  "&winnerID=" + winnerID + "&loserID=" + loserID);
  console.log("request: " + "create_vote.php?code=" + global.code +  "&winnerID=" + winnerID + "&loserID=" + loserID);
  console.log("submitted votes: " + response.success);
}

  getImages = async() =>{
    let response = await global.getData("get_images.php");

    pairList = response;
    this.setState({
    // image1: global.SERVER_ADDRESS + "/p/" + response[0][0].URL,
    // image2: global.SERVER_ADDRESS + "/p/" + response[0][1].URL});
  });
    this.updateImage();
  }

  //TODO: this, add current images to pairsSeen and display them, onclick call this and assign a pair that is not in seen. use state image1ID/object and image2ID to keep track of images
  updateImage = () => {
    console.log("updating, pairs left: " + pairList.length - pairsSeen.length)
    for(let i = 0; i < pairList.length; i++){
        if(!pairsSeen.includes(pairList[i])){
          first = pairList[i][0];
          second = pairList[i][1];
          pairsSeen.push(pairList[i]);

          this.setState({
            image1: global.SERVER_ADDRESS + "/p/" + first.URL,
            image2: global.SERVER_ADDRESS + "/p/" + second.URL,
            image1ID: first.idpost,
            image2ID: second.idpost,
          })


          return;
        }
    }
        Alert.alert(
      'No more images :(',
      'Come back later',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
    this.setState({
      image1: null,
      image2: null,
    })

    console.log("no new images")
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
    backgroundColor: "white",
    flex:1,
    width: 400,

  }
});
