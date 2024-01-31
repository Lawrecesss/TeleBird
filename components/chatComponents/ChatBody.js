import React, { useRef, useState, useEffect } from "react";
import { Video } from "expo-av";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { database } from "../../configs/firebase";

const { width } = Dimensions.get("window");

function ChatBody({ user, chat }) {
  const flatListRef = useRef();
  const chatRef = doc(database, "chats", chat);
  const messageCollection = collection(chatRef, "messages");
  const orderedMessages = query(
    messageCollection,
    orderBy("timestamp", "desc")
  );
  const [messages, setMessages] = useState([]);
  const GetMessages = async () => {
    onSnapshot(orderedMessages, async (snapShot) => {
      const allMessages = snapShot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([allMessages]);
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
  const UserMessage = ({ message, mediaFile, mediaType, time, seen }) => {
    return (
      <View>
        <View style={[styles.userMessage]}>
          <View style={[styles.userInner]}>
            {mediaType === "image" && mediaFile !== null && (
              <Image
                style={styles.image}
                source={{
                  uri: mediaFile,
                }}
                resizeMode="cover"
              />
            )}
            {mediaType === "video" && mediaFile !== null && (
              <Video
                style={styles.video}
                source={{
                  uri: mediaFile,
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                useNativeControls
              />
            )}
            {message !== null && (
              <Text numberOfLines={1000} style={[styles.text]}>
                {message}
              </Text>
            )}
            <EndComponent time={time} seen={seen} />
          </View>
        </View>
      </View>
    );
  };
  const AnotherUserMessage = ({ message, mediaType, mediaFile, time }) => {
    return (
      <View>
        <View style={[styles.anotherUserMessage]}>
          <View style={styles.anotherUserInner}>
            {mediaType === "image" && mediaFile !== null && (
              <Image
                style={styles.image}
                source={{
                  uri: mediaFile,
                }}
                resizeMode="cover"
              />
            )}
            {mediaType === "video" && mediaFile !== null && (
              <Video
                style={styles.video}
                source={{
                  uri: mediaFile,
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                useNativeControls
              />
            )}
            {message !== null && (
              <Text numberOfLines={1000} style={styles.text}>
                {message}
              </Text>
            )}
            <EndComponent time={time} />
          </View>
        </View>
      </View>
    );
  };
  const Message = ({ senderId, message, mediaType, time, mediaFile, seen }) => {
    return (
      <Pressable>
        {senderId === user && (
          <UserMessage
            message={message}
            time={time}
            seen={seen}
            mediaType={mediaType}
            mediaFile={mediaFile}
          />
        )}
        {senderId !== user && (
          <AnotherUserMessage
            message={message}
            time={time}
            mediaType={mediaType}
            mediaFile={mediaFile}
            seen={seen}
          />
        )}
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages[0]}
          inverted
          renderItem={({ item }) => (
            <Message
              senderId={item.sender}
              message={
                item.sender === user
                  ? item.message
                  : item.translated[item.languages]
              }
              time={item.timestamp?.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              mediaFile={item.mediaFile}
              mediaType={item.mediaType}
              seen={item.seen}
            />
          )}
        />
      </View>
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
    maxWidth: "80%",
    marginLeft: "auto",
  },
  userInner: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "lightgrey",
    borderRadius: 30,
  },
  anotherUserMessage: {
    marginVertical: 5,
    maxWidth: "80%",
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
  image: {
    borderRadius: 10,
    width: width / 1.5,
    height: 150,
    marginBottom: 10,
  },
  video: {
    borderRadius: 10,
    width: width / 1.5,
    height: 150,
    marginBottom: 10,
  },
});

export default ChatBody;
