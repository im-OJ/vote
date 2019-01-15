import React, { Component } from "react";
import { StackNavigator } from 'react-navigation';
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";


export default MyNewProject = StackNavigator({
  Home: {
   screen: Home
  },
  Profile: {
   screen: Profile
  }
});
