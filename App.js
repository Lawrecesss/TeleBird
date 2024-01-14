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
import AppTextInput from './components/AppTextInput.js';
import Screen from './components/BackgroundScreen.js';
import {Picker} from "@react-native-picker/picker"
import {React, useState} from 'react';
import DropdownPicker from "react-native-dropdown-picker"
import AppPicker from './components/AppPicker.js';
import LogInScreen from './app/LogInScreen.js';

const categories = [
  {label:"clothing", value:1},
  {label:"phone", value:2},
  {label:"beer", value:3},
]
export default function App() {
  const [category, setCategory] = useState()
  return (
    <LogInScreen/>
    
  )
}


