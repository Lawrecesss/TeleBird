import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground } from 'react-native';
import {useDimensions, useDeviceOrientation} from "@react-native-community/hooks"
import Welcome from "./app/Welcome.js"
import CardScreen from './app/CardScreen.js';
import ListingDetailScreen from './app/ListingDetailScreen.js';
import ViewImage from './app/ViewImage.js';
import MessageScreen from './app/MessageScreen.js';
import AccountScreen from "./app/AccountScreen.js"
import Icon from './components/Icon.js';

export default function App() {
  return <AccountScreen/>;
}


