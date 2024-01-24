import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TextButton from "./buttons/TextButton";
import IconButton from "./buttons/IconButton";

function Headers({
  name,
  navigation,
  leftOnPress,
  btnTitle,
  rightBtnTitle,
  rightOnPress,
}) {
  return (
    <View style={styles.container}>
      <TextButton
        title={btnTitle}
        textColor={"dodgerblue"}
        onPress={leftOnPress}
      />
      <Text style={styles.text}>{name}</Text>
      <IconButton
        style={styles.icon}
        name={rightBtnTitle}
        color={"dodgerblue"}
        onPress={rightOnPress}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    height: 70,
    flexDirection: "row",
    padding: 10,
  },
  text: {
    alignSelf: "center",
    marginLeft: "auto",
    fontWeight: "bold",
    fontSize: 20,
  },
  icon: {
    marginLeft: "auto",
    alignSelf: "center",
  },
});

export default Headers;
