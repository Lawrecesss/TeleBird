import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({ name, size, color = "black" }) {
  return (
    <View
      style={[
        styles.icon,
        {
          width: size,
          height: size,
        },
      ]}
    >
      <MaterialCommunityIcons name={name} size={size * 0.5} color={color} />
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Icon;
