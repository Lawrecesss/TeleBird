import React, { useEffect, useState } from "react";
import Screen from "../components/screens/Screen";
import ChatBody from "../components/chatComponents/ChatBody";
import ChatHeader from "../components/chatComponents/ChatHeader";
import ChatFooter from "../components/chatComponents/ChatFooter";
import { useNavigation } from "@react-navigation/native";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { database } from "../configs/firebase";
import { KeyboardAvoidingView, Platform } from "react-native";
import Voice from "@react-native-voice/voice";
import { Text } from "react-native";

function InChatScreen(props) {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");
  const { user, friend, profile, name, online } = props.route.params;
  const chatId = [user, friend].sort().join("_");
  const members = [
    doc(database, "users", user),
    doc(database, "users", friend),
  ];

  const keywords = ["send message", "read message"];

  const start = async () => {
    setIsEnabled(true);

    try {
      await Voice.start("en-US");
      console.log(result);
    } catch (error) {
      setError(error);
    }
  };
  const stop = async () => {
    setIsEnabled(false);
    try {
      await Voice.stop();
      await Voice.destroy();
    } catch (error) {
      setError(error);
    }
  };
  // useEffect(() => {
  //   Voice.onSpeechStart = () => setIsRecording(true);
  //   Voice.onSpeechEnd = () => setIsRecording(false);
  //   Voice.onSpeechError = (err) => setError(err.error);
  //   Voice.onSpeechResults = (r) => setResult(r.value);
  // }, []);
  const GenerateChat = async () => {
    await getDoc(doc(database, "chats", chatId)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("chat already created.");
      } else {
        setDoc(doc(database, "chats", chatId), { members });
      }
    });
  };
  useEffect(() => {
    GenerateChat();
  }, []);
  return (
    <Screen style={{ flex: 1 }}>
      <ChatHeader
        navigation={navigation}
        profile={profile}
        name={name}
        online={online}
        chat
        isEnabled={isEnabled}
        onPress={() => (isEnabled ? stop() : start())}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : null}
      >
        <ChatBody user={user} chat={chatId} />
        <ChatFooter userId={user} chat={chatId} />
      </KeyboardAvoidingView>
    </Screen>
  );
}

export default InChatScreen;
