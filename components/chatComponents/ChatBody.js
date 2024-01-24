import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ChatBody() {
  const flatListRef = useRef();

  const messages = [
    {
      messageId: 1,
      user: "1",
      message: "hello",
      time: "9:30 AM",
      seen: "true",
    },
    {
      messageId: 2,
      user: "2",
      message: "hello",
      time: "9 AM",
      seen: "true",
    },
    {
      messageId: 3,
      user: "1",
      message: "When will you come?",
      time: "9 AM",
      seen: "false",
    },
    {
      messageId: 4,
      user: "1",
      message: "hello",
      time: "9:30 AM",
      seen: "true",
    },
    {
      messageId: 5,
      user: "2",
      message: "hello",
      time: "9 AM",
      seen: "true",
    },
    {
      messageId: 6,
      user: "1",
      message: "When will you come?",
      time: "9 AM",
      seen: "false",
    },
    {
      messageId: 7,
      user: "1",
      message: "hello",
      time: "9:30 AM",
      seen: "true",
    },
    {
      messageId: 8,
      user: "2",
      message: "hello",
      time: "9 AM",
      seen: "true",
    },
    {
      messageId: 9,
      user: "1",
      message: "When will you come?",
      time: "9 AM",
      seen: "false",
    },
    {
      messageId: 10,
      user: "1",
      message:
        "The most basic use case is to plop down a TextInput and subscribe to the onChangeText events to read the user input. There are also other events, such as onSubmitEditing and onFocus that can be subscribed to. A minimal example:",
      time: "9:30 AM",
      seen: "true",
    },
    {
      messageId: 11,
      user: "2",
      message: "hello",
      time: "9 AM",
      seen: "true",
    },
    {
      messageId: 12,
      user: "1",
      message: "When will you come?",
      time: "9 AM",
      seen: "false",
    },
  ];
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
  const Message = ({ userId, message, time, seen }) => {
    return (
      <View>
        {userId === "1" && (
          <UserMessage message={message} time={time} seen={seen} />
        )}
        {userId === "2" && (
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
          keyExtractor={(messages) => messages.messageId}
          renderItem={({ item }) => (
            <Message
              userId={item.user}
              message={item.message}
              time={item.time}
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
