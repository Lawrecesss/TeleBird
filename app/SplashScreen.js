import React, { useLayoutEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { auth, database } from "../configs/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { SET_USER } from "../contexts/actions/UserAction";
import { onAuthStateChanged } from "firebase/auth";

function SplashScreen({ navigation }) {
  const dispatch = useDispatch();

  const checkLoggedUser = () => {
    onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        getDoc(doc(database, "users", userCred.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              dispatch(SET_USER(docSnap.data()));
            }
          })
          .then(
            setTimeout(() => {
              navigation.replace("Home", { id: userCred.uid });
            }, 2000)
          );
      } else {
        navigation.replace("LogInScreen");
      }
    });
  };
  useLayoutEffect(() => {
    checkLoggedUser();
  }, []);
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <ActivityIndicator size={"large"} color={"dodgerblue"} />
    </View>
  );
}

export default SplashScreen;
