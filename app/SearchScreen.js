import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import IconButton from "../components/buttons/IconButton";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../configs/firebase";
import ListItem from "../components/list/ListItem";
import { AppTextInput } from "../components/forms";

function SearchScreen(props) {
  const { user } = props.route.params;
  const navigation = useNavigation();
  const [friendList, setFriendList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState();
  const collectionRef = collection(database, "users");
  const getUserFriendList = async () => {
    const userData = (await getDoc(doc(database, "users", user))).data();
    setFriendList(userData.friends);
  };
  useEffect(() => {
    getUserFriendList();
  }, []);
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
        <AppTextInput
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
                friendRequest={friendList?.includes(item._id) ? false : true}
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
    padding: 10,
  },
  searchBar: {
    padding: 10,
    width: 350,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 50,
  },
  icon: {
    alignSelf: "center",
  },
});
export default SearchScreen;
