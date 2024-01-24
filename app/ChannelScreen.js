import React from "react";
import Screen from "../components/screens/Screen";
import Headers from "../components/Headers";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";
import ListItemDeleteAction from "../components/list/ListItemDeleteAction";

function ChannelScreen({ navigation }) {
  const messages = [
    {
      title: "PSB",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
      rightIcon: "true",
    },
    {
      title: "SCS",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
    },
    {
      title: "CS",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
    },
    {
      title: "CU",
      subTitle: "Okey",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      time: "9AM",
    },
  ];
  return (
    <Screen>
      <Headers
        name={"Channels"}
        btnTitle={"Edit"}
        rightBtnTitle={"pencil-plus"}
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

export default ChannelScreen;
