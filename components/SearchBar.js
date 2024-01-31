import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { AppTextInput } from "./forms";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../configs/firebase";
import ListItem from "../components/list/ListItem";

function SearchBar({ style, ...otherProps }) {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState();
  const collectionRef = collection(database, "users");
  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (searchQuery !== "") {
      const allData = await getDocs(
        query(
          collectionRef,
          where("username", "<=", text),
          where("username", ">=", text)
        )
      );

      const userData = allData.docs.map((doc) => {
        return doc.data();
      });
      setData(userData);
    }
  };
  return (
    <View style={styles.container}>
      <AppTextInput
        icon={"magnify"}
        placeholder="Search"
        style={[styles.search, style]}
        textSize={18}
        autoCapitalize="none"
        autoCorrect={false}
        {...otherProps}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
    height: 50,
  },
  search: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 50,
  },
});

export default SearchBar;
