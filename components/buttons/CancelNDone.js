import React from "react";
import { View, StyleSheet } from "react-native";
import TextButton from "./TextButton";

function CancelNDone({ cancel, done, navigation }) {
  return (
    <View style={styles.screen}>
      {cancel && (
        <TextButton
          textColor={"black"}
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
      )}
      {done && (
        <TextButton
          style={[styles.done]}
          textColor={"black"}
          title="Done"
          onPress={done}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    padding: 10,
  },

  done: {
    marginLeft: "auto",
  },
});
export default CancelNDone;
