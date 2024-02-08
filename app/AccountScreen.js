import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../components/screens/BackgroundScreen";
import Icon from "../components/Icon";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";
import { auth, database } from "../configs/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

function AccountScreen(props) {
  const navigation = useNavigation();
  const { id } = props.route.params;
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [profile, setProfile] = useState();

  const GetUserData = async () => {
    getDoc(doc(database, "users", id)).then((docSnap) => {
      if (docSnap.exists()) {
        setUsername(docSnap.data().username);
        setProfile(docSnap.data().profilePic);
        setEmail(docSnap.data().providerData.email);
      }
    });
  };
  useEffect(() => {
    GetUserData().catch((error) => console.log("Error! ", error));
  }, []);

  const menuItem = [
    {
      title: "Update Profile",
      icon: {
        name: "account",
      },
      onPress: () => navigation.navigate("ChangeProfileScreen", { id: id }),
    },

    {
      title: "Default Language",
      icon: {
        name: "translate",
      },
      onPress: () => navigation.navigate("DefaultLanguage", { id: id }),
    },
    {
      title: "Security",
      icon: {
        name: "security",
      },
      onPress: () => navigation.navigate("Security"),
    },
  ];
  return (
    <Screen style={{ backgroundColor: "lightgrey", flex: 1 }}>
      <View style={styles.profileContainer}>
        <ListItem
          style={{ backgroundColor: "white" }}
          title={username}
          subTitle={email}
          image={profile}
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
