import React from "react";
import { TouchableOpacity, StyleSheet, Text, Alert, View } from "react-native";
import BackgroundScreen from "../components/screens/BackgroundScreen";
import * as Yup from "yup";
import { AppFormField, SubmitButton } from "../components/forms";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../configs/firebase";
import { useDispatch } from "react-redux";
import { SET_USER } from "../contexts/actions/UserAction";
import { doc, getDoc } from "firebase/firestore";

const validationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});
function LogInScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <BackgroundScreen
      style={styles.container}
      source={require("../assets/bg.png")}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          if (values !== "") {
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            )
              .then((userCred) => {
                if (userCred) {
                  getDoc(doc(database, "users", userCred?.user.uid)).then(
                    (docSnap) => {
                      if (docSnap.exists()) {
                        dispatch(SET_USER(docSnap.data()));
                        console.log("Logged In sucessfully"),
                          navigation.replace("Home");
                      }
                    }
                  );
                }
              })
              .catch(() =>
                Alert.alert("Error!", "Incorrect email address or password.")
              );
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
            textContentType="emailAddress"
            icon={"email"}
            placeholder="Email"
          />

          <AppFormField
            style={styles.input}
            name={"password"}
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            icon={"lock"}
            isPass={"true"}
            placeholder="Password"
          />
          <SubmitButton style={styles.btn} title={"Log In"} />
          <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}
          >
            <Text style={{ fontSize: 18 }}>Don't you have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={styles.signUp}>Sign up</Text>
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
  signUp: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
export default LogInScreen;
