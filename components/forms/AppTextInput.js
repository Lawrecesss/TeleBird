import React, { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppTextInput({ icon, style, textSize, isPass, ...otherProps }) {
  const [showPass, setShowpass] = useState(false);
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <MaterialCommunityIcons style={styles.icon} name={icon} size={20} />
      )}
      <TextInput
        style={[styles.text, { fontSize: textSize }]}
        secureTextEntry={isPass && !showPass}
        {...otherProps}
      />
      <TouchableOpacity onPress={() => setShowpass(!showPass)}>
        {isPass && (
          <MaterialCommunityIcons
            style={styles.icon}
            name={showPass ? "eye" : "eye-off"}
            size={20}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "lightgrey",
    borderRadius: 15,
    width: "90%",
    flexDirection: "row",
    padding: 20,
    marginVertical: 5,
  },
  icon: {
    justifyContent: "center",
    marginRight: 10,
  },
  text: {
    color: "black",
    fontSize: 18,
    width: 300,
  },
});

export default AppTextInput;
