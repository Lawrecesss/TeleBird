import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { AppTextInput } from "./forms";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../configs/firebase";
import ListItem from "../components/list/ListItem";
import TextButton from "./buttons/TextButton";

function SearchBar({ user }) {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const collectionRef = collection(database, "channels");
  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (searchQuery !== "") {
      const allData = await getDocs(
        query(
          collectionRef,
          where("channelName", "<=", text + "\uf8ff"),
          where("channelName", ">=", text)
        )
      );

      const channelData = allData.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      setData(channelData);
    }
  };
  const onPressIn = () => {
    setIsSearch(true);
  };
  const cancel = () => {
    setIsSearch(false);
  };
  return (
    <View>
      <View style={styles.container}>
        <AppTextInput
          icon={"magnify"}
          placeholder="Search"
          style={[styles.search, { width: isSearch ? 320 : 350 }]}
          textSize={18}
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onPressIn={() => onPressIn()}
          onChangeText={(text) => handleSearch(text)}
        />
        {isSearch === true && (
          <TextButton style={styles.cancel} title={"Cancel"} onPress={cancel} />
        )}
      </View>
      {isSearch === true && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              style={{ backgroundColor: "white" }}
              title={item.data.channelName}
              image={item.data.channelProfile}
              onPress={() =>
                navigation.navigate("InChannelChat", {
                  user: user,
                  id: item.id,
                  name: item.data.channelName,
                  channelProfile: item.data.channelProfile,
                  admin: item.data.admin,
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    flexDirection: "row",
  },
  cancel: { marginLeft: 20 },
  search: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 50,
  },
});

export default SearchBar;
