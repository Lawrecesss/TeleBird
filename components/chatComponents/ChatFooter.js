import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import IconButton from "../buttons/IconButton";
import { AppTextInput } from "../forms";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { database, storage } from "../../configs/firebase";
import * as ImagePicker from "expo-image-picker";
import { Video, Audio } from "expo-av";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ChatFooter({ userId, chat, onPress, friendId }) {
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
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [language, setLanguage] = useState("");
  const messageData = {
    message: message,
    voice: { uri: recordingUri, loudness: audioLoudness, id: recordingID },
    transcription: "",
    edited: false,
    mediaFile: imageUri,
    mediaType: mediaType,
    languages: language,
    sender: userId,
    translated: {},
    timestamp: serverTimestamp(),
  };
  const chatDocRef = doc(database, "chats", chat);
  const messageCollection = collection(chatDocRef, "messages");
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
  const startRecording = async () => {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        undefined,
        400
      );
      setRecording(recording);
      recording.setOnRecordingStatusUpdate((status) => {
        if (status.metering) {
          setAudioLoudness((curVal) => [...curVal, status.metering || -100]);
        }
      });
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };
  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    setVoiceMessage(true);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecordingID(generateRandomId());
    setRecordingUri(uri);
  };
  function generateRandomId() {
    const timestamp = Date.now();
    const randomNumber = Math.random().toString(36).substring(2, 15); // Base 36 for alphanumeric characters
    return `${timestamp}-${randomNumber}`;
  }

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
    if (recordingUri !== null) {
      const response = await fetch(recordingUri);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        "ChatMediaFiles/" + chat + "/" + recordingID
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
    setImageUri(null), setVoiceMessage(false);
    setRecordingUri(null), setAudioLoudness([]);
  };
  const getLanguage = async () => {
    const friendData = (await getDoc(doc(database, "users", friendId))).data();
    setLanguage([friendData.language]);
  };
  useEffect(() => {
    getLanguage();
  }, []);
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
          <IconButton
            style={styles.icon}
            name={"microphone"}
            size={30}
            color={recording ? "dodgerblue" : "black"}
            onPress={recording ? stopRecording : startRecording}
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

      {isRecording !== true && voiceMessage !== true && (
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
      )}
      {isRecording === true && (
        <View style={styles.recording}>
          <Text style={{ fontSize: 15 }}>Recording....</Text>
        </View>
      )}
      {voiceMessage === true && (
        <View style={styles.recording}>
          <Text style={{ fontSize: 15 }}>Voice Message is recorded..</Text>
        </View>
      )}
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
export default ChatFooter;
