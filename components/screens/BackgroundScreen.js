import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Constants from "expo-constants";
function BackgroundScreen({ children, style, source }) {
  return (
    <ImageBackground style={[styles.imgBg]} source={source}>
      <View style={style}>{children}</View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imgBg: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default BackgroundScreen;
