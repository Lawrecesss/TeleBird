import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function IconButton({ name, color, onPress, style, size = 30 }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <MaterialCommunityIcons name={name} color={color} size={size} />
    </TouchableOpacity>
  );
}

export default IconButton;
