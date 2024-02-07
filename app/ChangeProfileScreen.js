import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Screen from "../components/screens/Screen";
import { Button, Image, StyleSheet, Text } from "react-native";
import { AppFormField } from "../components/forms";
import { Formik } from "formik";
import CancelNDone from "../components/buttons/CancelNDone";
import * as Yup from "yup";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { database } from "../configs/firebase";
import { useNavigation } from "@react-navigation/native";

function ChangeProfileScreen(props) {
  const navigation = useNavigation();
  const { id } = props.route.params;
  const [
    imageUri = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    setImageUri,
  ] = useState();
  const [username, setUsername] = useState("");
  const requetPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      alert("You will need to grant the permission to access the media");
  };
  const getUserData = async () => {
    const userData = (await getDoc(doc(database, "users", id))).data();
    setImageUri(userData.profilePic);
    setUsername(userData.username);
  };
  const validationSchema = Yup.object({
    username:
      username !== ""
        ? Yup.string().min(4).label("Username")
        : Yup.string().required().min(4).label("Username"),
  });
  useEffect(() => {
    getUserData();
    requetPermission();
  }, []);
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!result.canceled) setImageUri(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={styles.screen}>
      <Formik
        initialValues={{ username: "" }}
        onSubmit={(values) => (
          console.log("Changed sucessfully"),
          updateDoc(doc(database, "users", id), {
            username: values.username,
            profilePic: imageUri,
          }),
          navigation.replace("Home", { id: id, screen: "Settings" })
        )}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <CancelNDone navigation={navigation} done={handleSubmit} cancel />
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.profileContainer}
            />
            <Button title="Select Image" onPress={selectImage} />
            <AppFormField
              style={styles.input}
              name={"username"}
              autoCapitalize="none"
              autoCorrect={false}
              icon={"account"}
              defaultValue={username}
              placeholder="Username"
            />

            <Text style={styles.text}>
              You can only change your name and username onace a week.
            </Text>
          </>
        )}
      </Formik>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: { backgroundColor: "white" },
  profileContainer: {
    backgroundColor: "lightgrey",
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 150,
    marginVertical: 20,
  },
  input: {
    marginVertical: 10,
    width: 400,
    alignSelf: "center",
  },
  save: {
    marginTop: "auto",
  },
  text: {
    padding: 15,
    color: "black",
  },
});
export default ChangeProfileScreen;
