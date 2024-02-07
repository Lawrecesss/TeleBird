import React from "react";
import { FlatList, View, Text } from "react-native";
import FriendRequest from "../components/FriendRequest";
import ListItemSeparator from "../components/list/ListItemSeparator";

function FriendRequetScreen(props) {
  const { user, friendRequest, l } = props.route.params;

  return (
    <>
      {friendRequest.length !== 0 && (
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
      )}
      {friendRequest.length === 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "400" }}>
            You don't have any friend request at the moment.
          </Text>
        </View>
      )}
    </>
  );
}

export default FriendRequetScreen;
