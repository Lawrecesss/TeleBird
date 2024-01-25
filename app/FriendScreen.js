import React, { useEffect } from "react";
import Screen from "../components/screens/Screen";
import Headers from "../components/Headers";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FriendRequetScreen from "./FriendRequetScreen";
import Friends from "./Friends";
import { getDoc, doc } from "firebase/firestore";
import { database } from "../configs/firebase";

function FriendScreen(props) {
  const { id } = props.route.params;
  const friendData = [];
  const FStack = createMaterialTopTabNavigator();
  const GetUserData = async () => {
    await getDoc(doc(database, "users", id)).then((docSnap) => {
      if (docSnap.exists()) {
        if (docSnap.data().friends.length !== 0) {
          docSnap.data().friends.map(async (friendId) =>
            getDoc(doc(database, "users", friendId)).then((docSnap) => {
              if (docSnap.exists()) {
                friendData.push(docSnap.data());
              }
            })
          );
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
      />
      <FStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Requests"
      >
        <FStack.Screen
          name="Friend Requests"
          component={FriendRequetScreen}
          initialParams={[]}
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
