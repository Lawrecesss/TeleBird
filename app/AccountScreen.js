import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/screens/BackgroundScreen";
import Icon from "../components/Icon";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";

const menuItem = [
  {
    title: "Update Username",
    icon: {
      name: "account-edit",
      backgroundColor: "blue",
    },
  },
  {
    title: "Update Profile Picture",
    icon: {
      name: "image-edit",
      backgroundColor: "green",
    },
  },
  {
    title: "Theme",
    icon: {
      name: "theme-light-dark",
      backgroundColor: "brown",
    },
  },
  {
    title: "Default Language",
    icon: {
      name: "translate",
      backgroundColor: "orange",
    },
  },
  {
    title: "Privacy",
    icon: {
      name: "security",
      backgroundColor: "black",
    },
  },
];
function AccountScreen(props) {
  return (
    <Screen style={{ backgroundColor: "#38B6FF", flex: 1 }}>
      <View style={styles.profileContainer}>
        <ListItem
          style={{ backgroundColor: "white" }}
          title={"Lawrence"}
          subTitle={"lhshein14@gmail.com"}
          image={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
      </View>
      <View style={styles.itemContainer}>
        <FlatList
          data={menuItem}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              style={{ backgroundColor: "white" }}
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                  size={40}
                  color={"white"}
                />
              }
              Switch={item.switch}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
      <View style={styles.logOut}>
        <ListItem
          style={{ backgroundColor: "white" }}
          title={"Log Out"}
          IconComponent={
            <Icon
              name={"logout"}
              backgroundColor={"red"}
              color={"white"}
              size={40}
            />
          }
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  profileContainer: {
    marginBottom: 10,
  },
  itemContainer: {},
  logOut: {
    marginTop: 10,
  },
});

export default AccountScreen;
