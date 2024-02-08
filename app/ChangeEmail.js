import { View, Text, StyleSheet, Alert } from "react-native";
import Screen from "../components/screens/Screen";
import CancelNDone from "../components/buttons/CancelNDone";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { AppFormField } from "../components/forms";
import * as Yup from "yup";
import {
  EmailAuthCredential,
  sendEmailVerification,
  updateEmail,
} from "firebase/auth";
import { auth } from "../configs/firebase";
function ChangeEmail(props) {
  const navigation = useNavigation();
  const validationSchema = Yup.object({
    email: Yup.string().required().email().label("New Email"),
  });

  return (
    <Screen>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={(values) =>
          updateEmail(auth.currentUser, values.email)
            .then(
              sendEmailVerification(auth.currentUser)
                .then(
                  Alert.alert("Email Update", "Email verification is sent.")
                )
                .catch((error) => console.log(error))
            )
            .catch((error) => console.log(error))
        }
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <CancelNDone cancel done={handleSubmit} navigation={navigation} />
            <View style={styles.container}>
              <Text style={styles.text}>New Email</Text>
              <AppFormField
                name={"email"}
                placeholder={"New Email"}
                autoCorrect={false}
                autoCapitalize="none"
                icon={"email"}
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
    height: 200,
  },
});

export default ChangeEmail;
