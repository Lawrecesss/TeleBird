import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../../configs/firebase";

function ChatBody({ user, chat }) {
  const flatListRef = useRef();
  const chatRef = doc(database, "chats", chat);
  const messageCollection = collection(chatRef, "messages");
  const orderedMessages = query(
    messageCollection,
    orderBy("timestamp", "desc")
  );
  const messages = [];
  const GetMessages = async () => {
    (await getDocs(orderedMessages)).forEach((doc) => {
      messages.push(doc.data());
    });
  };

  useEffect(() => {
    GetMessages();
  }, []);

  const EndComponent = ({ time, seen }) => {
    return (
      <View style={styles.timeContainer}>
        <Text
          style={{
            fontSize: 12,
            color: "dodgerblue",
            marginHorizontal: seen ? 10 : 0,
            marginVertical: 5,
          }}
        >
          {time}
        </Text>
        {seen === "true" && (
          <MaterialCommunityIcons
            name="check-all"
            color={"dodgerblue"}
            size={20}
          />
        )}
        {seen === "false" && (
          <MaterialCommunityIcons name="check" color={"dodgerblue"} size={20} />
        )}
      </View>
    );
  };
  const UserMessage = ({ message, time, seen }) => {
    return (
      <View>
        <View style={[styles.userMessage]}>
          <View style={styles.userInner}>
            <Text numberOfLines={1000} style={[styles.text]}>
              {message}
            </Text>
            <EndComponent time={time} seen={seen} />
          </View>
        </View>
      </View>
    );
  };
  const AnotherUserMessage = ({ message, time }) => {
    return (
      <View>
        <View style={[styles.anotherUserMessage]}>
          <View style={styles.anotherUserInner}>
            <Text numberOfLines={100} style={styles.text}>
              {message}
            </Text>
            <EndComponent time={time} />
          </View>
        </View>
      </View>
    );
  };
  const Message = ({ senderId, message, time, seen }) => {
    return (
      <View>
        {senderId === user && (
          <UserMessage message={message} time={time} seen={seen} />
        )}
        {senderId !== user && (
          <AnotherUserMessage message={message} time={time} seen={seen} />
        )}
      </View>
    );
  };
  const ScrollDown = ({ onPress }) => {
    return (
      <TouchableOpacity style={styles.scrollDown} onPress={onPress}>
        <MaterialCommunityIcons name="chevron-down-circle" size={40} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <Message
              senderId={item.sender}
              message={item.message}
              time={item.time.toDate().toDateString()}
              seen={item.seen}
            />
          )}
        />
      </View>

      {<ScrollDown onPress={() => flatListRef.current.scrollToEnd()} />}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: "row",
  },
  userMessage: {
    marginVertical: 5,
    marginLeft: "auto",
  },
  userInner: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "lightgrey",
    borderRadius: 30,
  },
  anotherUserMessage: {
    marginVertical: 5,
    marginRight: "auto",
  },
  anotherUserInner: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "lightgrey",
    borderRadius: 30,
  },
  text: {
    fontSize: 15,
  },
  timeContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "baseline",
  },
  scrollDown: {
    width: 40,
    height: 40,
    alignSelf: "center",
    top: 790,
    position: "absolute",
  },
});

export default ChatBody;
