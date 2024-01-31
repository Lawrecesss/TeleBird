import React, { useEffect } from "react";
import Screen from "../components/screens/Screen";
import ChatBody from "../components/chatComponents/ChatBody";
import ChatHeader from "../components/chatComponents/ChatHeader";
import ChatFooter from "../components/chatComponents/ChatFooter";
import { useNavigation } from "@react-navigation/native";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { database } from "../configs/firebase";
import { KeyboardAvoidingView, Platform } from "react-native";

function InChatScreen(props) {
  const navigation = useNavigation();
  const { user, friend, profile, name, online } = props.route.params;
  const chatId = [user, friend].sort().join("_");
  const members = [
    doc(database, "users", user),
    doc(database, "users", friend),
  ];
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
