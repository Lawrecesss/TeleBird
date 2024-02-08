import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Screen from "../components/screens/Screen";
import IconButton from "../components/buttons/IconButton";
import TextButton from "../components/buttons/TextButton";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";
import { auth } from "../configs/firebase";
import Icon from "../components/Icon";

function ChangeSecurity(props) {
  const email = auth.currentUser.email;
  const functions = [
    {
      name: "Change Password",
      subtitle: "********",
      icon: "form-textbox-password",
      onPress: () => navigation.navigate("ChangePassword"),
    },
  ];
  const navigation = useNavigation();
  return (
    <Screen>
      <View style={styles.header}>
        <IconButton
          name={"chevron-left"}
          size={40}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>Security</Text>
        <TextButton
          title={"Done"}
          style={styles.done}
          textColor={"dodgerblue"}
        />
      </View>
      <FlatList
        data={functions}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subTitle={item.subtitle}
            onPress={item.onPress}
            IconComponent={<Icon name={item.icon} size={50} color="black" />}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingRight: 10,
    flexDirection: "row",
    backgroundColor: "lightgrey",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
  },
  done: {},
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ChangeSecurity;
