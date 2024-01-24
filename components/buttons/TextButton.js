import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

function TextButton({ title, onPress, style, textColor }) {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <Text style={[styles.btnText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    marginBottom: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
export default TextButton;
