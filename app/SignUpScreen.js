import React from "react";
import { Formik } from "formik";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import BackgroundScreen from "../components/screens/BackgroundScreen";
import { AppFormField, SubmitButton } from "../components/forms";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../configs/firebase";
import { setDoc, doc } from "firebase/firestore";

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  createPassword: Yup.string().required().min(8).label("Create Password"),
  password: Yup.string()
    .required()
    .min(8)
    .oneOf(
      [Yup.ref("createPassword"), null],
      "Does not match with Create Password"
    )
    .label("Password"),
});
function SignUpScreen({ navigation }) {
  return (
    <BackgroundScreen
      style={styles.container}
      source={require("../assets/bg.png")}
    >
      <Formik
        initialValues={{
          email: "",
          createPassword: "",
          password: "",
        }}
        onSubmit={async (values) => {
          if (values.email && values.createPassword && values.password !== "") {
            await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            )
              .then((userCred) => {
                const data = {
                  _id: userCred?.user.uid,
                  username: "",
                  profilePic: "",
                  providerData: userCred.user.providerData[0],
                };
                setDoc(doc(database, "users", userCred?.user.uid), data).then(
                  () => console.log("added to the database"),
                  navigation.navigate("SetProfileScreen", {
                    id: userCred.user.uid,
                  })
                );
              })
              .catch((err) => Alert.alert("Sign up error", err.message));
          }
        }}
        validationSchema={validationSchema}
      >
        <>
          <AppFormField
            style={styles.input}
            name={"email"}
            autoCapitalize="none"
            autoCorrect={false}
            icon={"email"}
            placeholder="Email"
          />

          <AppFormField
            style={styles.input}
            isPass="true"
            name={"createPassword"}
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            icon={"lock"}
            placeholder="Create Password"
          />

          <AppFormField
            style={styles.input}
            isPass="true"
            name={"password"}
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            icon={"lock"}
            placeholder="Password"
          />
          <SubmitButton style={styles.btn} title={"Sign Up"} />
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text style={{ fontSize: 18 }}>Have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LogInScreen")}
            >
              <Text style={styles.LogIn}>Log In</Text>
            </TouchableOpacity>
          </View>
        </>
      </Formik>
    </BackgroundScreen>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 300,
  },
  btn: {
    alignSelf: "center",
    marginTop: 10,
    height: 70,
  },
  input: {
    alignSelf: "center",
    backgroundColor: "white",
  },
  LogIn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
export default SignUpScreen;
