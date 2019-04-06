import {AsyncStorage} from 'react-native';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

global.colourMain = "#EFE9F4"
global.colourSecond = "#86B4B1"
global.colourThird = "#5863F8"
global.colourText = "171D1C"

global.SERVER_ADDRESS = "http://178.128.35.226";

global.numMenuOptions = 3;

global.name = "";
global.code = "";

global.getData = async(URL)  => {
  URL = global.SERVER_ADDRESS + "/" + URL
  console.log("getting data: " + URL)
  let data = await fetch(URL);
  data = await data.json()
  return data;
}

global.getRawData = async(URL) =>{
  URL = global.SERVER_ADDRESS + "/" + URL
  console.log("getting data: " + URL)
  let data = await fetch(URL);
  return data;
}


//TODO: fix
global.postData = async(URL, parram, value) =>{
  URL = global.SERVER_ADDRESS + "/" + URL
  let data = await fetch(URL, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    parram: value,
  }),
  });

  console.log("data: " + data.error)
  return data;
  }

global.storeItem = async (name, value) =>{
  try {
    await AsyncStorage.setItem('@MyStore:' + name, value);
  } catch (error) {
    // Error saving data
  }
}

global.retreiveItem = async(name) => {
  const myItem = await AsyncStorage.getItem('@MyStore:' + name);
  return myItem
}

global.setCode = (code) => {
  global.code = code
  global.storeItem("code", code)
}

//Global props

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: global.colourText,
  }
};

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  }
};
