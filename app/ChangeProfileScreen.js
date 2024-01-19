import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Screen from "../components/screens/Screen";
import { Button, Image, StyleSheet, Text } from "react-native";
import { AppFormField } from "../components/forms";
import { Formik } from "formik";
import CancelNDone from "../components/CancelNDone";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required().min(4).label("Username"),
});

function ChangeProfileScreen(props) {
  const [
    imageUri = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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

  return (
    <Screen style={styles.screen}>
      <Formik
        initialValues={{ name: "", username: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <CancelNDone save={handleSubmit} />
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.profileContainer}
            />
            <Button title="Select Image" onPress={selectImage} />
            <AppFormField
              style={styles.input}
              name={"name"}
              autoCorrect={false}
              icon={"card-account-details"}
              placeholder="Name"
            />
            <AppFormField
              style={styles.input}
              name={"username"}
              autoCapitalize="none"
              autoCorrect={false}
              icon={"account"}
              placeholder="Username"
            />
            <Text style={styles.text} visi>
              You can only change your name and username onace a week.
            </Text>
          </>
        )}
      </Formik>
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {},
  profileContainer: {
    backgroundColor: "lightgrey",
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 150,
    marginVertical: 20,
  },
  username: {
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
