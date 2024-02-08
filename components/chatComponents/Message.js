import React, { useState, useEffect } from "react";
import { Video } from "expo-av";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../configs/firebase";
import VoiceMessage from "./VoiceMessage";
import EmojiBar from "./EmojiBar";
import EditDeleteTranscriptTranslate from "./EditDeleteTranscriptTranslate";

const { width } = Dimensions.get("window");
function Message({
  edit,
  chat,
  transcript,
  user,
  tran,
  docID,
  senderId,
  message,
  voice,
  mediaType,
  time,
  mediaFile,
  seen,
}) {
  const chatRef = doc(database, "chats", chat);
  const messageCollection = collection(chatRef, "messages");
  const [emoji, setEmoji] = useState(null);
  const [isPress, setIsPress] = useState(false);
  const [transcribe, setTranscribe] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [editedMessage, setEditedMessage] = useState(null);
  const EndComponent = ({ time, seen, emoji, sender }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {emoji !== null && (
          <View style={[styles.emojiContainer]}>
            <MaterialCommunityIcons
              name={emoji}
              color={emoji === "cards-heart" ? "red" : "yellow"}
              size={20}
              style={{ alignSelf: "baseline" }}
            />
          </View>
        )}

        <View style={styles.timeContainer}>
          {edit === true && (
            <Text
              style={{ fontSize: 10, color: "dodgerblue", marginRight: 10 }}
            >
              edited
            </Text>
          )}
          <Text
            style={{
              fontSize: 12,
              color: sender === user ? "dodgerblue" : "yellow",
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
            <MaterialCommunityIcons
              name="check"
              color={"dodgerblue"}
              size={20}
            />
          )}
        </View>
      </View>
    );
  };

  const UserMessage = ({
    message,
    emoji,
    voice,
    mediaFile,
    mediaType,
    time,
    seen,
    sender,
  }) => {
    return (
      <View>
        <View style={[styles.userMessage]}>
          <View style={[styles.userInner]}>
            {voice && voice.uri !== null && (
              <VoiceMessage voice={voice} sender={sender} user={user} />
            )}
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
            {message && message !== null && (
              <TextInput
                numberOfLines={1000}
                style={[
                  styles.text,
                  {
                    borderWidth: isEditing ? 2 : 0,
                    borderRadius: 10,
                    minWidth: isEditing ? 50 : "auto",
                    padding: isEditing ? 5 : 0,
                    borderColor: "lightgrey",
                  },
                ]}
                editable={isEditing}
                value={edited === true ? editedMessage : message}
                autoFocus
                onChangeText={(message) => {
                  setEdited(true);
                  setEditedMessage(message);
                }}
              ></TextInput>
            )}
            <EndComponent
              time={time}
              seen={seen}
              emoji={emoji}
              sender={sender}
            />
          </View>
        </View>
      </View>
    );
  };
  const AnotherUserMessage = ({
    message,
    emoji,
    mediaType,
    voice,
    mediaFile,
    time,
    sender,
  }) => {
    return (
      <View>
        <View style={[styles.anotherUserMessage]}>
          <View style={styles.anotherUserInner}>
            {voice && voice.uri !== null && (
              <VoiceMessage voice={voice} sender={sender} user={user} />
            )}
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
                shouldPlay={false}
                useNativeControls
              />
            )}
            {message && message !== null && (
              <Text numberOfLines={1000} style={[styles.text]}>
                {message}
              </Text>
            )}
            <EndComponent time={time} emoji={emoji} sender={sender} />
          </View>
        </View>
      </View>
    );
  };

  const renderTranscript = async () => {
    if (Array.isArray(transcript)) {
      const trancription = transcript
        .filter((doc) => {
          return doc.id === voice.id;
        })
        .map((doc) => {
          return doc.transcription;
        });

      if (tran === "" || tran.length === 0) {
        await updateDoc(doc(messageCollection, docID), {
          transcription: trancription,
        });
      }

      const getTranslated = getDoc(doc(messageCollection, docID));
      const language = (await getTranslated).data().languages[0];
      if ((await getTranslated).data().translatedTranscription) {
        const translatedIndex = (await getTranslated).data()
          .translatedTranscription["0"];
        if (translatedIndex && translatedIndex[language]) {
          const translatedTranscription = translatedIndex[language];

          setSubtitle(
            senderId === user ? trancription : translatedTranscription
          );
        }
      } else {
        setSubtitle("Loading...");
      }
    }
  };
  useEffect(() => {
    renderTranscript();
  }, [transcribe]);
  const RenderTranscribe = () => {
    return (
      <View
        style={[
          styles.transcribe,
          {
            marginLeft: senderId === user ? "auto" : 0,
            marginRight: senderId !== user ? "auto" : 0,
            backgroundColor: senderId !== user ? "dodgerblue" : "yellow",
          },
        ]}
      >
        <Text>{subtitle}</Text>
      </View>
    );
  };
  const updateEditedMessage = async () => {
    await updateDoc(doc(messageCollection, docID), {
      message: editedMessage,
      edited: edited,
    });
  };
  const deleteMessage = async () => {
    await deleteDoc(doc(messageCollection, docID));
  };
  return (
    <View>
      {isPress === true && isEditing === false && senderId === user && (
        <EditDeleteTranscriptTranslate
          style={{
            marginLeft: senderId === user ? "auto" : 0,
            width: 95,
          }}
          transcribe={() => setTranscribe(!transcribe)}
          edit={() => setIsEditing(!isEditing)}
          deletE={() => deleteMessage()}
        />
      )}
      {isPress === true && isEditing === false && senderId !== user && (
        <EditDeleteTranscriptTranslate
          style={{
            marginLeft: senderId === user ? "auto" : 0,
            width: 35,
          }}
          transcribe={() => setTranscribe(!transcribe)}
        />
      )}
      {isEditing === true && (
        <View style={[styles.iconContainer]}>
          <TouchableOpacity
            onPress={() => (
              setIsPress(!isPress),
              setIsEditing(!isEditing),
              updateEditedMessage(),
              setEdited(true)
            )}
          >
            <MaterialCommunityIcons
              name="check"
              size={20}
              color={"dodgerblue"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => (setIsPress(!isPress), setIsEditing(!isEditing))}
          >
            <MaterialCommunityIcons name="cancel" size={20} color={"red"} />
          </TouchableOpacity>
        </View>
      )}
      {senderId === user && (
        <Pressable onPressIn={() => setIsPress(!isPress)}>
          <UserMessage
            message={message}
            time={time}
            seen={seen}
            mediaType={mediaType}
            mediaFile={mediaFile}
            voice={voice}
            emoji={emoji}
            sender={senderId}
            edited={edit}
          />
        </Pressable>
      )}
      {senderId !== user && (
        <Pressable onPressIn={() => setIsPress(!isPress)}>
          <AnotherUserMessage
            message={message}
            time={time}
            mediaType={mediaType}
            mediaFile={mediaFile}
            voice={voice}
            emoji={emoji}
            edited={edit}
            sender={senderId}
          />
        </Pressable>
      )}

      {transcribe === true && <RenderTranscribe />}

      {isPress === true && (
        <View>
          <EmojiBar
            style={{ marginLeft: senderId === user ? "auto" : 0, width: 185 }}
            heart={() => (
              setIsPress(false),
              emoji === null
                ? setEmoji("cards-heart")
                : emoji === "cards-heart"
                ? setEmoji(null)
                : setEmoji("cards-heart")
            )}
            happy={() => (
              setIsPress(false),
              emoji === null
                ? setEmoji("emoticon")
                : emoji === "emoticon"
                ? setEmoji(null)
                : setEmoji("emoticon")
            )}
            cry={() => (
              setIsPress(false),
              emoji === null
                ? setEmoji("emoticon-cry")
                : emoji === "emoticon-cry"
                ? setEmoji(null)
                : setEmoji("emoticon-cry")
            )}
            angry={() => (
              setIsPress(false),
              emoji === null
                ? setEmoji("emoticon-angry")
                : emoji === "emoticon-angry"
                ? setEmoji(null)
                : setEmoji("emoticon-angry")
            )}
            wow={() => (
              setIsPress(false),
              emoji === null
                ? setEmoji("emoticon-frown")
                : emoji === "emoticon-frown"
                ? setEmoji(null)
                : setEmoji("emoticon-frown")
            )}
            like={() => (
              setIsPress(false),
              emoji === null
                ? setEmoji("thumb-up")
                : emoji === "thumb-up"
                ? setEmoji(null)
                : setEmoji("thumb-up")
            )}
          />
        </View>
      )}
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
  iconContainer: {
    backgroundColor: "lightgrey",
    flexDirection: "row",
    marginLeft: "auto",
    gap: 10,
    padding: 5,
    borderRadius: 20,
  },
});
export default Message;
