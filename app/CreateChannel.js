import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import IconButton from "../components/buttons/IconButton";
import Screen from "../components/screens/Screen";
import TextButton from "../components/buttons/TextButton";
import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "../configs/firebase";
import { useNavigation } from "@react-navigation/native";

function CreateChannel(props) {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const [channelName, setChannelName] = useState(null);
  const [description, setDescription] = useState(null);
  const [
    imageUri = "https://static.vecteezy.com/system/resources/thumbnails/006/998/431/small/photo-camera-icons-photo-camera-icon-design-illustration-photo-camera-simple-sign-photo-camera-image-vector.jpg",
    setImageUri,
  ] = useState();
  const requetPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      alert("You will need to grant the permission to access the media");
  };
  useEffect(() => {
    requetPermission();
  }, []);
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.canceled) setImageUri(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };
  const data = {
    channelName: channelName,
    description: description,
    channelProfile: imageUri,
    admin: id,
  };
  const Create = async () => {
    addDoc(collection(database, "channels"), data).then(
      () => console.log("Successfully created!!"),
      navigation.goBack()
    );
  };
  return (
    <Screen>
      <View style={styles.header}>
        <IconButton
          name={"chevron-left"}
          onPress={() => navigation.goBack()}
          size={50}
          color={"dodgerblue"}
        />
        <Text style={styles.text}>Create Channel</Text>
        <TextButton
          title={"Create"}
          style={{ marginLeft: "auto" }}
          textColor={"dodgerblue"}
          onPress={Create}
        />
      </View>
      <View style={styles.channelName}>
        <TouchableOpacity style={{ alignSelf: "center" }} onPress={selectImage}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: imageUri,
            }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Channel Name"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(name) => setChannelName(name)}
          value={channelName}
        />
      </View>
      <Text style={styles.description}>DESCRIPTION</Text>
      <View style={styles.descriptionName}>
        <TextInput
          placeholder="Description"
          style={styles.input}
          multiline
          onChangeText={(des) => setDescription(des)}
          value={description}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "lightgrey",
    height: 70,
    justifyContent: "center",
  },
  channelName: {
    borderColor: "grey",
    marginVertical: 40,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "white",
    flexDirection: "row",
    height: 100,
    width: 350,
  },
  descriptionName: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "grey",
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "white",
    flexDirection: "row",
    height: 100,
    width: 350,
  },
  image: {
    marginHorizontal: 20,
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 40,
  },
  input: {
    width: 200,
    fontSize: 18,
  },
  description: {
    marginLeft: 45,
    fontSize: 15,
    fontWeight: "500",
  },
  text: {
    alignSelf: "center",
    marginLeft: "auto",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default CreateChannel;
