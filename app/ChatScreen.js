import React from "react";
import Screen from "../components/screens/Screen";
import Headers from "../components/Headers";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";
import ListItemDeleteAction from "../components/list/ListItemDeleteAction";
import Story from "../components/chatComponents/Story";
import { useNavigation } from "@react-navigation/native";

function ChatScreen(props) {
  const navigation = useNavigation();
  const { id } = props.route.params;
  const messages = [
    {
      title: "Alex",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      rightIcon: "true",
      seen: "true",
      online: "true",
      story: "true",
      onPress: () =>
        navigation.navigate("InChatScreen", {
          profile: messages[0].image,
          name: messages[0].title,
          story: messages[0].story,
          online: messages[0].online,
        }),
    },
    {
      title: "David",
      subTitle: "Nice, I will come tomorrow. Wait me at the foodcourt.",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      seen: "false",
      online: "false",
      story: "true",
      onPress: () =>
        navigation.navigate("InChatScreen", {
          profile: messages[1].image,
          name: messages[1].title,
          story: messages[0].story,
          online: messages[1].online,
        }),
    },
    {
      title: "Mia",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      seen: "false",
      online: "true",
      onPress: () =>
        navigation.navigate("InChatScreen", {
          profile: messages[2].image,
          name: messages[2].title,
          online: messages[2].online,
        }),
    },
    {
      title: "Franco",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      seen: "true",
      online: "true",
      onPress: () =>
        navigation.navigate("InChatScreen", {
          profile: messages[3].image,
          name: messages[3].title,
          online: messages[3].online,
        }),
    },
    {
      title: "Qill",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      rightIcon: "true",
      seen: "true",
      online: "true",
      onPress: () =>
        navigation.navigate("InChatScreen", {
          profile: messages[4].image,
          name: messages[4].title,
          online: messages[4].online,
        }),
    },
    {
      title: "Jack",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      seen: "false",
      online: "true",
      onPress: () =>
        navigation.navigate("InChatScreen", {
          profile: messages[5].image,
          name: messages[5].title,
          online: messages[5].online,
        }),
    },
    {
      title: "Pop",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      seen: "false",
      online: "false",
      onPress: () =>
        navigation.navigate("InChatScreen", {
          profile: messages[6].image,
          name: messages[6].title,
          online: messages[6].online,
        }),
    },
    {
      title: "Hugo",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      seen: "true",
      online: "false",
      onPress: () =>
        navigation.navigate("InChatScreen", {
          profile: messages[7].image,
          name: messages[7].title,
          online: messages[7].online,
        }),
    },
  ];
  return (
    <Screen>
      <Headers
        name={"Chats"}
        btnTitle={"Edit"}
        rightBtnTitle={"pencil-plus"}
        rightOnPress={() => navigation.navigate("SearchFriend")}
      />
      <View style={styles.itemContainer}>
        <FlatList
          data={messages}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              style={{ backgroundColor: "white" }}
              title={item.title}
              subTitle={item.subTitle}
              image={item.image}
              time={item.time}
              rightIcon={item.rightIcon}
              seen={item.seen}
              online={item.online}
              onPress={item.onPress}
              renderRightActions={() => <ListItemDeleteAction />}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  itemContainer: { flex: 1 },
});

export default ChatScreen;
