import React from "react";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import BackgroundScreen from "../components/screens/BackgroundScreen";
import { AppFormField, SubmitButton } from "../components/forms";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required().label("Username"),
  phoneNumber: Yup.string().required().label("Phone Number"),
  createPassword: Yup.string().required().min(8).label("Create Password"),
  password: Yup.string().required().min(8).label("Password"),
});
function SignUpScreen(props) {
  return (
    <BackgroundScreen
      style={styles.container}
      source={require("../assets/bg.png")}
    >
      <Formik
        initialValues={{
          username: "",
          phoneNumber: "",
          createPassword: "",
          password: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <>
          <AppFormField
            style={styles.input}
            name={"username"}
            autoCapitalize="none"
            autoCorrect={false}
            icon={"account"}
            placeholder="Username"
          />

          <AppFormField
            style={styles.input}
            name={"phoneNumber"}
            icon={"phone"}
            keyboardType="numeric"
            placeholder="Phone Number"
          />

          <AppFormField
            style={styles.input}
            secureTextEntry
            name={"createPassword"}
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            icon={"lock"}
            placeholder="Create Password"
          />

          <AppFormField
            style={styles.input}
            secureTextEntry
            name={"password"}
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            icon={"lock"}
            placeholder="Password"
          />
          <SubmitButton style={styles.btn} title={"Sign Up"} />
        </>
      </Formik>
    </BackgroundScreen>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    alignItems: "center",
  },
  btn: {
    marginTop: 10,
    width: 150,
    height: 70,
  },
  input: {
    // justifyContent:"center",
    width: "70%",
    backgroundColor: "white",
  },
});
export default SignUpScreen;
