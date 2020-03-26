import "react-native-gesture-handler";

import React, {Component} from "react";

import {NavigationContainer} from "@react-navigation/native";

import MyStack from "./routes/Stack";

export default class Covid19 extends Component {
  render(){
    return(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    )
  }
}