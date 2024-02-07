import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/screens/Screen";
import IconButton from "../components/buttons/IconButton";
import TextButton from "../components/buttons/TextButton";
import { useNavigation } from "@react-navigation/native";

function ChangeSecurity(props) {
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
