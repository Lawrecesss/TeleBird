import React, { useEffect, useState } from "react";
import { View, FlatList, Alert, Text } from "react-native";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { database } from "../configs/firebase";
import ListItem from "../components/list/ListItem";
import ListItemDeleteAction from "../components/list/ListItemDeleteAction";
import ListItemSeparator from "../components/list/ListItemSeparator";
import { useNavigation } from "@react-navigation/native";

function YourChannel(props) {
  const { user } = props.route.params;
  const navigation = useNavigation();
  const collectionRef = collection(database, "channels");
  const [channels, setChannels] = useState([]);
  const getData = async () => {
    const allYourChannel = await getDocs(
      query(collectionRef, where("admin", "==", user))
    );
    const allChannelData = allYourChannel.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data(),
      };
    });
    setChannels(allChannelData);
  };
  const deleteChannel = async (id) => {
    Alert.alert(
      "Delete?",
      "Are you sure to delete this channel? This action cannot be undo.",
      [
        {
          text: "Cancel",
          onPress: () => navigation.goBack(),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => await deleteDoc(doc(database, "channels", id)),
        },
      ]
    );
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {channels.length !== 0 && (
        <FlatList
          data={channels}
          renderItem={({ item }) => (
            <ListItem
              style={{ backgroundColor: "white" }}
              title={item.data.channelName}
              image={item.data.channelProfile}
              onPress={() =>
                navigation.navigate("InChannelChat", {
                  user: user,
                  id: item.id,
                  name: item.data.channelName,
                  channelProfile: item.data.channelProfile,
                  admin: item.data.admin,
                })
              }
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => deleteChannel(item.id)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      )}
      {channels.length === 0 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            You don't have any channel to manage.
          </Text>
        </View>
      )}
    </View>
  );
}

export default YourChannel;
