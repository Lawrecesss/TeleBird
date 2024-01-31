import React, { useEffect, useState } from "react";
import Screen from "../components/screens/Screen";
import Headers from "../components/Headers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FriendRequetScreen from "./FriendRequetScreen";
import Friends from "./Friends";
import { getDoc, doc } from "firebase/firestore";
import { database } from "../configs/firebase";
import { useNavigation } from "@react-navigation/native";

function FriendScreen(props) {
  const navigation = useNavigation();
  const { id } = props.route.params;
  const friendData = [];
  const friendRequest = [];
  const l = [];
  const FStack = createMaterialTopTabNavigator();
  const GetUserData = async () => {
    await getDoc(doc(database, "users", id)).then((docSnap) => {
      if (docSnap.exists()) {
        if (docSnap.data().requests) {
          if (docSnap.data().requests.length !== 0) {
            docSnap.data().requests.map(
              async (friendId) =>
                await getDoc(doc(database, "users", friendId)).then(
                  (docSnap) => {
                    if (docSnap.exists()) {
                      friendRequest.push(docSnap.data());
                    }
                  }
                )
            );
          }
        }
        if (docSnap.data().friends) {
          if (docSnap.data().friends.length !== 0) {
            docSnap.data().friends.map(
              async (friendId) =>
                await getDoc(doc(database, "users", friendId)).then(
                  (docSnap) => {
                    if (docSnap.exists()) {
                      l.push(docSnap.id);
                      friendData.push(docSnap.data());
                    }
                  }
                )
            );
          }
        }
      }
    });
  };

  useEffect(() => {
    GetUserData().catch((error) => console.log("Error! ", error));
  }, []);
  return (
    <Screen>
      <Headers
        name={"Friends"}
        btnTitle={"Edit"}
        rightBtnTitle={"account-search"}
        rightOnPress={() => {
          navigation.navigate("Search", { user: id });
        }}
      />
      <FStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Requests"
      >
        <FStack.Screen
          name="Friend Requests"
          component={FriendRequetScreen}
          initialParams={{
            l: l,
            user: id,
            friendRequest: friendRequest,
          }}
        />
        <FStack.Screen
          name="Your Friends"
          component={Friends}
          initialParams={{ user: id, friendData: friendData }}
        />
      </FStack.Navigator>
    </Screen>
  );
}

export default FriendScreen;
