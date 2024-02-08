import { View, Text, StyleSheet, Alert } from "react-native";
import Screen from "../components/screens/Screen";
import CancelNDone from "../components/buttons/CancelNDone";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { AppFormField } from "../components/forms";
import * as Yup from "yup";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../configs/firebase";
function ChangePassword(props) {
  const navigation = useNavigation();
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required().min(8).label("Current Password"),
    newPassword: Yup.string()
      .required()
      .min(8)
      .oneOf([Yup.ref("newPassword"), null], "Does not match with New Password")
      .label("New Password"),
    confirmNewPassword: Yup.string()
      .required()
      .min(8)
      .label("Confirm New Password"),
  });

  return (
    <Screen>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        onSubmit={(values) => {
          const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            values.currentPassword
          );
          reauthenticateWithCredential(auth.currentUser, credential)
            .then(
              updatePassword(auth.currentUser, values.confirmNewPassword)
                .then(() => Alert.alert("Updated successfully!!"))
                .catch((error) => {
                  console.log(error);
                })
            )
            .catch((error) => {
              console.log(error);
            });
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <CancelNDone cancel done={handleSubmit} navigation={navigation} />
            <View style={styles.container}>
              <Text style={styles.text}>Current Password</Text>
              <AppFormField
                name={"currentPassword"}
                placeholder={"Current Password"}
                autoCorrect={false}
                isPass
                autoCapitalize="none"
                icon={"lock"}
                style={{
                  alignSelf: "center",
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              />
              <Text style={styles.text}>New Password</Text>
              <AppFormField
                name={"newPassword"}
                isPass
                placeholder={"New Password"}
                autoCorrect={false}
                autoCapitalize="none"
                icon={"lock"}
                style={{
                  alignSelf: "center",
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              />
              <Text style={styles.text}>Confirm New Password</Text>
              <AppFormField
                name={"confirmNewPassword"}
                isPass
                placeholder={"Confirm New Password"}
                autoCorrect={false}
                autoCapitalize="none"
                icon={"lock"}
                style={{
                  alignSelf: "center",
                  backgroundColor: "white",
                  borderWidth: 1,
                }}
              />
            </View>
          </>
        )}
      </Formik>
    </Screen>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginTop: 20,
    marginVertical: 20,
    marginLeft: 20,
    fontWeight: "500",
  },
  container: {
    marginTop: 50,
    alignSelf: "center",
    borderWidth: 1,
    width: 400,
    borderRadius: 20,
    height: 450,
  },
});

export default ChangePassword;
