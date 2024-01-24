import React from "react";
import Screen from "../components/screens/Screen";
import ChatBody from "../components/chatComponents/ChatBody";
import ChatHeader from "../components/chatComponents/ChatHeader";
import ChatFooter from "../components/chatComponents/ChatFooter";

function InChatScreen({ navigation, route }) {
  const { profile, name, story, online } = route.params;
  return (
    <Screen>
      <ChatHeader
        navigation={navigation}
        profile={profile}
        name={name}
        online={online}
      />
      <ChatBody />
      <ChatFooter />
    </Screen>
  );
}

export default InChatScreen;
