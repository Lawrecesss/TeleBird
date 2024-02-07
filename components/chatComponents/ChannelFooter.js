import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import IconButton from "../buttons/IconButton";
import { AppTextInput } from "../forms";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { database, storage } from "../../configs/firebase";
import * as ImagePicker from "expo-image-picker";
import { Video, Audio } from "expo-av";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ChannelFooter({ userId, chat, onPress }) {
  const [message, setMessage] = useState(null);
  const [hide, setEnableHide] = useState(false);
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState(null);
  const [audioLoudness, setAudioLoudness] = useState([]);
  const [download, setDownload] = useState();
  const [voiceMessage, setVoiceMessage] = useState(false);
  const [recordingID, setRecordingID] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [mediaType, setMediaType] = useState("");

  const language = ["my"];
  const messageData = {
    message: message,
    mediaFile: imageUri,
    mediaType: mediaType,
    languages: language,
    sender: userId,
    translated: {},
    timestamp: serverTimestamp(),
  };
  const chatDocRef = doc(database, "channels", chat);
  const messageCollection = collection(chatDocRef, "posts");
  const uploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsMultipleSelection: true,
      });
      if (!result.canceled) {
        setMediaType(result.assets[0].type);
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const send = async () => {
    if (imageUri !== null) {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        "ChatMediaFiles/" + chat + "/" + new Date().getTime()
      );
      const upload = uploadBytesResumable(storageRef, blob);
      upload.on(
        "state_changed",
        // (snapShot) => {},
        () => {
          getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
            setDownload(downloadURL);
          });
        }
      );
    }

    await addDoc(messageCollection, messageData);
    setMessage(null), setEnableHide(false);
    setImageUri(null);
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: imageUri !== null ? 175 : 75,
          alignItems: imageUri !== null ? "flex-end" : "center",
          paddingBottom: imageUri !== null ? 15 : 0,
        },
      ]}
    >
      {!hide && (
        <View style={{ flexDirection: "row" }}>
          <IconButton style={styles.icon} name={"attachment"} size={30} />
          {/* <IconButton style={styles.icon} name={"emoticon"} size={30} /> */}
          <IconButton
            style={[styles.icon]}
            name={"image"}
            size={30}
            onPress={() => uploadImage()}
          />
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
        style={[
          styles.input,
          {
            width: hide ? 310 : 240,
            height: imageUri !== null ? 150 : 50,
            alignItems: imageUri !== null ? "flex-end" : "center",
            paddingBottom: imageUri !== null ? 10 : 0,
          },
        ]}
        placeholder="Message..."
        textSize={18}
        numberOfLines={5}
        multiline={true}
        onChangeText={(message) => setMessage(message)}
        onPressIn={() => setEnableHide(true)}
        value={message}
      />

      {mediaType === "image" && imageUri !== null && (
        <Image
          style={[styles.image, { right: hide ? 255 : 185 }]}
          source={{ uri: imageUri }}
        />
      )}
      {mediaType === "video" && imageUri !== null && (
        <Video
          style={[styles.image, { right: hide ? 255 : 185 }]}
          source={{ uri: imageUri }}
        />
      )}
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
    elevation: 5,
    justifyContent: "space-evenly",
    paddingBottom: 5,
    paddingLeft: 5,
    flexDirection: "row",
    backgroundColor: "white",
    height: 75,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "lightgrey",
    padding: "auto",
    paddingLeft: 10,
    backgroundColor: "white",
    width: "80%",
    height: 50,
  },
  image: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "lightgrey",
    height: 100,
    width: 100,
    position: "absolute",
    right: 185,
    top: 15,
  },
  recording: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "lightgrey",
    padding: "auto",
    paddingLeft: 10,
    backgroundColor: "white",
    width: 240,
    height: 50,
  },
});
export default ChannelFooter;
