import React from "react";
import { View, StyleSheet } from "react-native";
import TextButton from "./TextButton";

function CancelNDone({ cancel, save }) {
  return (
    <View style={styles.screen}>
      <TextButton
        style={styles.btn}
        backgroundColor="white"
        textColor={"black"}
        title="Cancel"
        onPress={cancel}
      />
      <TextButton
        style={[styles.btn, styles.done]}
        backgroundColor="white"
        textColor={"black"}
        title="Save"
        onPress={save}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
  },
  btn: {
    width: 100,
  },
  done: {
    marginLeft: "auto",
  },
});
export default CancelNDone;
