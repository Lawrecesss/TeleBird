import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function StoryProfile({ image, user, online, name }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={[styles.image, { borderWidth: online ? 3 : 0 }]}
          source={{ uri: image }}
        />
      </TouchableOpacity>

      {user && (
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons style={styles.icon} name="plus" size={30} />
        </TouchableOpacity>
      )}

      <Text style={[styles.text, { color: user ? "#737373" : "black" }]}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    marginHorizontal: 10,
    alignItems: "center",
    position: "relative",
  },
  image: {
    borderColor: "dodgerblue",
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#42abfc",
    marginVertical: 10,
  },
  text: {
    alignSelf: "auto",
    maxWidth: 100,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: -5,
  },
  icon: {
    alignSelf: "center",
  },
});

export default StoryProfile;
