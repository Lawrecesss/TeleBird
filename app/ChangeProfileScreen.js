import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Screen from "../components/screens/Screen";
import { Button, Image } from "react-native";

function ChangeProfileScreen(props) {
  const [imageUri, setImageUri] = useState();
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
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) setImageUri(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <Button title="Select Image" onPress={selectImage} />
      <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
    </Screen>
  );
}

export default ChangeProfileScreen;
