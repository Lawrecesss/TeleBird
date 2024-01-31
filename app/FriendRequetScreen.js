import React from "react";
import { FlatList } from "react-native";
import FriendRequest from "../components/FriendRequest";
import ListItemSeparator from "../components/list/ListItemSeparator";

function FriendRequetScreen(props) {
  const { user, friendRequest, l } = props.route.params;

  return (
    <>
      <FlatList
        data={friendRequest}
        renderItem={({ item }) => (
          <FriendRequest
            name={item.username}
            profile={item.profilePic}
            userID={user}
            requestID={item._id}
            friendList={l}
          />
        )}
        ItemSeparatorComponent={() => ListItemSeparator()}
      />
    </>
  );
}

export default FriendRequetScreen;
