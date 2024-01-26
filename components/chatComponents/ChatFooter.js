import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from "../buttons/IconButton";
import { AppTextInput } from "../forms";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  Timestamp,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore";
import { database } from "../../configs/firebase";

function ChatFooter({ userId, chat, onPress }) {
  const [message, setMessage] = useState("");
  const [hide, setEnableHide] = useState(false);

  const messageData = {
    message: message,
    sender: userId,
    timestamp: serverTimestamp(),
  };
  const chatDocRef = doc(database, "chats", chat);
  const messageCollection = collection(chatDocRef, "messages");
  const send = async () => {
    await addDoc(messageCollection, messageData);
    setMessage(""), setEnableHide(false);
  };

  return (
    <View style={styles.container}>
      {!hide && (
        <View style={{ flexDirection: "row" }}>
          <IconButton style={styles.icon} name={"attachment"} size={30} />
          <IconButton style={styles.icon} name={"emoticon"} size={30} />
          <IconButton style={styles.icon} name={"image"} size={30} />
          <IconButton style={styles.icon} name={"microphone"} size={30} />
        </View>
      )}
      {hide && (
        <IconButton
          style={styles.icon}
          name={"chevron-right"}
          size={40}
          onPress={() => setEnableHide(false)}
        />
      )}

      <AppTextInput
        style={[styles.input, { width: hide ? 310 : 200 }]}
        placeholder="Message..."
        textSize={18}
        onChangeText={(message) => setMessage(message)}
        onPressIn={() => setEnableHide(true)}
        value={message}
      />
      <IconButton
        style={styles.icon}
        name={"send"}
        size={30}
        onPress={() => (onPress, send())}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 20,
    paddingLeft: 5,
    flexDirection: "row",
    backgroundColor: "lightgrey",
    height: 100,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    marginHorizontal: 5,
    borderRadius: 30,
    padding: "auto",
    paddingLeft: 10,
    backgroundColor: "white",
    width: 200,
    height: 40,
  },
});
export default ChatFooter;
