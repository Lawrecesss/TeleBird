import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Screen from "../components/screens/Screen";
import { Button, Image, StyleSheet } from "react-native";
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
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) setImageUri(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={styles.screen}>
      <Formik
        initialValues={{ username: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <>
          <CancelNDone />
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
            placeholder="Username"
          />
        </>
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
});
export default ChangeProfileScreen;
