import React from "react";
import Screen from "../components/screens/Screen";
import Headers from "../components/Headers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FriendRequetScreen from "./FriendRequetScreen";
import Friends from "./Friends";

function FriendScreen({ navigation }) {
  const FStack = createMaterialTopTabNavigator();
  return (
    <Screen>
      <Headers
        name={"Friends"}
        btnTitle={"Edit"}
        rightBtnTitle={"account-search"}
      />
      <FStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Requests"
      >
        <FStack.Screen name="Friend Requests" component={FriendRequetScreen} />
        <FStack.Screen name="Your Friends" component={Friends} />
      </FStack.Navigator>
    </Screen>
  );
}

export default FriendScreen;
