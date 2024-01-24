import React from "react";
import { View, FlatList } from "react-native";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";

function Friends(props) {
  const friends = [{}];
  return (
    <View>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <ListItem title={item.name} image={item.profile} />
        )}
        ItemSeparatorComponent={() => ListItemSeparator()}
      />
    </View>
  );
}

export default Friends;
