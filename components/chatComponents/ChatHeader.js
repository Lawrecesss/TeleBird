import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import IconButton from "../buttons/IconButton";

function ChatHeader({
  profile,
  name,
  navigation,
  story,
  online,
  chat,
  isEnabled,
  ...otherProps
}) {
  return (
    <View style={styles.container}>
      <IconButton
        style={styles.icon}
        name={"chevron-left"}
        size={40}
        onPress={() => navigation.goBack()}
      />
      <Image
        style={[styles.image, { borderWidth: story ? 3 : 0 }]}
        source={{
          uri: profile,
        }}
        width={60}
        height={60}
      />
      {online === "true" && <View style={[styles.status]} />}
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "lightgrey",
    height: 70,
  },
  icon: { marginRight: 10 },
  image: {
    borderRadius: 60,
    borderColor: "#42abfc",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: 200,
    marginHorizontal: 10,
  },
  leftIcon: {
    marginLeft: "auto",
  },
  status: {
    backgroundColor: "#05e644",
    width: 15,
    height: 15,
    borderRadius: 10,
    position: "absolute",
    top: 50,
    right: 320,
  },
});

export default ChatHeader;
