import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EmojiBar({ style, heart, happy, angry, wow, cry, like, other }) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={heart}>
        <MaterialCommunityIcons name="cards-heart" size={25} color={"red"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={happy}>
        <MaterialCommunityIcons name="emoticon" size={25} color={"yellow"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={angry}>
        <MaterialCommunityIcons
          name="emoticon-angry"
          size={25}
          color={"yellow"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={cry}>
        <MaterialCommunityIcons
          name="emoticon-cry"
          size={25}
          color={"yellow"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={wow}>
        <MaterialCommunityIcons
          name="emoticon-frown"
          size={25}
          color={"yellow"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={like}>
        <MaterialCommunityIcons name="thumb-up" size={25} color={"yellow"} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={other}>
        <MaterialCommunityIcons name="dots-vertical" size={25} />
      </TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 5,
    backgroundColor: "lightgrey",
    padding: 5,
    borderRadius: 20,
    flexDirection: "row",
  },
});

export default EmojiBar;
