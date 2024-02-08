import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EditDeleteTranscriptTranslate({ style, edit, deletE, transcribe }) {
  return (
    <View style={[styles.container, style]}>
      {edit && (
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="comment-edit"
            size={25}
            color={"dodgerblue"}
            onPress={edit}
          />
        </TouchableOpacity>
      )}
      {deletE && (
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="delete-forever"
            size={25}
            color={"dodgerblue"}
            onPress={deletE}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="subtitles"
          size={25}
          color={"dodgerblue"}
          onPress={transcribe}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
    padding: 5,
    borderRadius: 20,
    gap: 5,
  },
});
export default EditDeleteTranscriptTranslate;
