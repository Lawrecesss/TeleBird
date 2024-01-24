import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

function AppButton({
  title,
  onPress,
  backgroundColor = "black",
  style,
  textColor = "white",
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={[styles.btnText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    marginBottom: 10,
    width: "90%",
    height: 70,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
export default AppButton;
