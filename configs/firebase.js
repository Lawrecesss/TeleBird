import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Constants } from "expo-constants";
import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
window.navigator.userAgent = "ReactNative"; // javascript
const firebaseConfig = {
  apiKey: "AIzaSyAmzWB78N-XxWrXDPbGFPDvJ38DEfDjVbM",
  authDomain: "telebird-46364.firebaseapp.com",
  projectId: "telebird-46364",
  storageBucket: "telebird-46364.appspot.com",
  messagingSenderId: "313603458075",
  appId: "1:313603458075:web:fb1a3c15167c413b0864be",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const database = getFirestore(app);
