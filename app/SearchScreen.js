import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import IconButton from "../components/buttons/IconButton";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../configs/firebase";
import ListItem from "../components/list/ListItem";

function SearchScreen(props) {
  const { user } = props.route.params;
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
          where("username", ">=", text),
          where("username", "<=", text + "\uf8ff")
        )
      );
      const userData = allData.docs
        .filter((doc) => {
          return doc.id != user;
        })
        .map((doc) => {
          return doc.data();
        });
      setData(userData);
    }
  };
  const handleRequest = (id) => {
    updateDoc(doc(database, "users", id), { requests: [user] });
  };
  return (
    <>
      <View style={styles.container}>
        <IconButton
          name={"chevron-left"}
          size={40}
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <SearchBar
          style={styles.searchBar}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      {data && (
        <>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ListItem
                title={item.username}
                image={item.profilePic}
                friendRequest
                friendRequestOnPress={() => handleRequest(item._id)}
              />
            )}
          />
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgrey",
  },
  searchBar: {},
  icon: {
    alignSelf: "center",
  },
});
export default SearchScreen;
