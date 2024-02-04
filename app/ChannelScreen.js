import React from "react";
import Screen from "../components/screens/Screen";
import Headers from "../components/Headers";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";
import ListItemDeleteAction from "../components/list/ListItemDeleteAction";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import YourChannel from "./YourChannel";
import Channels from "./Channels";

function ChannelScreen(props) {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const FStack = createMaterialTopTabNavigator();

  return (
    <Screen>
      <Headers
        name={"Channels"}
        btnTitle={"Edit"}
        rightBtnTitle={"pencil-plus"}
        rightOnPress={() => navigation.navigate("CreateChannel", { id: id })}
      />
      <FStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Channels"
      >
        <FStack.Screen
          name="Followed Channels"
          component={Channels}
          initialParams={{
            user: id,
          }}
        />
        <FStack.Screen
          name="Your Channels"
          component={YourChannel}
          initialParams={{ user: id }}
        />
      </FStack.Navigator>
    </Screen>
  );
}
const styles = StyleSheet.create({
  itemContainer: { flex: 1 },
});

export default ChannelScreen;
