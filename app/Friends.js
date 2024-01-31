import React, { useEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";

function Friends(props) {
  const { user, friendData } = props.route.params;
  const navigation = useNavigation();
  const Friend = () => {
    if (friendData.length == 0) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            You do not have any friend at the moment.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={friendData}
          renderItem={({ item }) => (
            <ListItem
              title={item.username}
              image={item.profilePic}
              onPress={() =>
                navigation.navigate("InChatScreen", {
                  user: user,
                  friend: item._id,
                  profile: item.profilePic,
                  name: item.username,
                })
              }
            />
          )}
          ItemSeparatorComponent={() => ListItemSeparator()}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Friend />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#747575",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Friends;
