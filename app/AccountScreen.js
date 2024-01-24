import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/screens/BackgroundScreen";
import Icon from "../components/Icon";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";
import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";

function AccountScreen({ navigation }) {
  const menuItem = [
    {
      title: "Update Profile",
      icon: {
        name: "account",
      },
      onPress: () => navigation.navigate("ChangeProfileScreen"),
    },
    {
      title: "Theme",
      icon: {
        name: "theme-light-dark",
      },
    },
    {
      title: "Default Language",
      icon: {
        name: "translate",
      },
    },
    {
      title: "Security",
      icon: {
        name: "security",
      },
    },
  ];
  return (
    <Screen style={{ backgroundColor: "lightgrey", flex: 1 }}>
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
          scrollEnabled="false"
          data={menuItem}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              style={{ backgroundColor: "white" }}
              title={item.title}
              onPress={item.onPress}
              IconComponent={
                <Icon name={item.icon.name} size={50} color={"black"} />
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
          IconComponent={<Icon name={"logout"} color={"black"} size={50} />}
          onPress={() => {
            signOut(auth).then(
              () => (
                console.log("Logged Out sucessfully"),
                navigation.replace("LogInScreen")
              )
            );
          }}
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
