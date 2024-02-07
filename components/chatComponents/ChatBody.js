import React, { useState, useEffect } from "react";

import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { database } from "../../configs/firebase";
import Message from "./Message";

const { width } = Dimensions.get("window");

function ChatBody({ user, chat, isEnabled }) {
  const [messages, setMessages] = useState([]);
  const [transcript, setTranscript] = useState({});

  const transcriptionCollection = collection(database, "transcriptions");
  const filterDocs = query(
    transcriptionCollection,
    where("fileName", ">=", "ChatMediaFiles/" + chat)
  );

  const chatRef = doc(database, "chats", chat);
  const messageCollection = collection(chatRef, "messages");
  const orderedMessages = query(
    messageCollection,
    orderBy("timestamp", "desc")
  );
  const GetTranscriptDocs = async () => {
    const transcriptionDocs = await getDocs(filterDocs);
    const transcriptDoc = transcriptionDocs.docs
      .filter((doc) => {
        return doc.data().status !== "FAILED";
      })
      .map((doc) => {
        const transcriptData = doc.data();
        const fileNameString = transcriptData.fileName;
        const parts = fileNameString.split("/");
        const id = parts[2];

        return {
          transcription: transcriptData.transcription["0"][0],
          id: id,
        };
      });
    setTranscript(transcriptDoc);
  };

  const GetMessages = async () => {
    onSnapshot(orderedMessages, async (snapShot) => {
      const allMessages = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      setMessages([allMessages]);
    });
  };
  useEffect(() => {
    GetTranscriptDocs();
    GetMessages();
  }, []);
  return (
    <View style={[styles.container, { paddingBottom: isEnabled ? 20 : 0 }]}>
      <FlatList
        data={messages[0]}
        inverted
        renderItem={({ item }) => (
          <Message
            chat={chat}
            transcript={transcript}
            user={user}
            senderId={item.data.sender}
            message={
              item.data.sender === user
                ? item.data.message
                : item.data.translated[item.data.languages]
            }
            time={item.data.timestamp?.toDate().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            voice={item.data.voice}
            mediaFile={item.data.mediaFile}
            mediaType={item.data.mediaType}
            docID={item.id}
            tran={item.data.transcription}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: "row",
  },
  emojiContainer: {
    marginRight: 10,
    backgroundColor: "lightgrey",
    padding: 3,
    borderRadius: 10,
  },
  userMessage: {
    marginVertical: 5,
    maxWidth: "80%",
    marginLeft: "auto",
  },
  userInner: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "yellow",
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
    backgroundColor: "dodgerblue",
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
  transcribe: {
    backgroundColor: "yellow",
    padding: 5,
    paddingHorizontal: 10,
    maxWidth: "80%",
    borderRadius: 20,
  },
});

export default ChatBody;
