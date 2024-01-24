import React from "react";
import { FlatList } from "react-native";
import FriendRequest from "../components/FriendRequest";
import ListItemSeparator from "../components/list/ListItemSeparator";

function FriendRequetScreen({ navigation }) {
  const messages = [
    {
      title: "Alex",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      title: "David",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  ];
  return (
    <>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <FriendRequest name={item.title} profile={item.image} />
        )}
        ItemSeparatorComponent={() => ListItemSeparator()}
      />
    </>
  );
}

export default FriendRequetScreen;
