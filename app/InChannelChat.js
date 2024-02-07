import React, { useEffect, useState } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Screen from "../components/screens/Screen";
import ChatHeader from "../components/chatComponents/ChatHeader";
import ChatFooter from "../components/chatComponents/ChatFooter";
import { useNavigation } from "@react-navigation/native";
import ChannelChatBody from "../components/chatComponents/ChannelChatBody";
import { database } from "../configs/firebase";
import ChannelFooter from "../components/chatComponents/ChannelFooter";
function InChannelChat(props) {
  const navigation = useNavigation();
  const { user, id, name, channelProfile, admin } = props.route.params;
  const channelRef = doc(database, "channels", id);
  const userRef = doc(database, "users", user);
  const [isFollow, setIsFollow] = useState(false);
  const [channelList, setChannelList] = useState([]);
  const getChannelList = async () => {
    const data = (await getDoc(userRef)).data();
    setChannelList(data.channels);
    const idList = channelList.map((doc) => doc.id);
    if (idList.includes(channelRef.id)) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  };

  const follow = async () => {
    channelList.push(channelRef);
    updateDoc(userRef, { channels: channelList });
    setIsFollow(true);
  };
  const unfollow = async () => {
    const updated = channelList.filter((channel) => {
      return channel.id !== channelRef.id;
    });
    updateDoc(userRef, { channels: updated });
    setIsFollow(false);
  };
  useEffect(() => {
    getChannelList();
  }, []);
  return (
    <Screen style={{ flex: 1 }}>
      <ChatHeader
        navigation={navigation}
        profile={channelProfile}
        name={name}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : null}
      >
        <ChannelChatBody
          id={id}
          admin={admin}
          user={user}
          profile={channelProfile}
          name={name}
        />
        {user === admin && <ChannelFooter userId={user} chat={id} />}
        {user !== admin && (
          <TouchableHighlight
            style={styles.follow}
            onPress={() => (isFollow ? unfollow() : follow())}
          >
            <Text style={styles.text}>{isFollow ? "Unfollow" : "Follow"}</Text>
          </TouchableHighlight>
        )}
      </KeyboardAvoidingView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  follow: {
    padding: 10,
    backgroundColor: "lightgrey",
    width: "100%",
    height: 70,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "dodgerblue",
  },
});

export default InChannelChat;
