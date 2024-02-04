import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import SearchBar from "../components/SearchBar";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { database } from "../configs/firebase";
import ListItem from "../components/list/ListItem";
import { useNavigation } from "@react-navigation/native";
import ListItemSeparator from "../components/list/ListItemSeparator";

function Channels(props) {
  const navigation = useNavigation();
  const { user } = props.route.params;
  const userRef = doc(database, "users", user);
  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    const data = (await getDoc(userRef)).data();
    const mapData = await Promise.all(
      data.channels.map(async (channel) => {
        const channelDoc = await getDoc(channel);
        return {
          id: channelDoc.id,
          data: channelDoc.data(),
        };
      })
    );
    setUserData(mapData);
  };
  useEffect(() => {
    getUserData();
  }, [SearchBar, ListItem]);
  return (
    <View>
      <SearchBar user={user} />
      <FlatList
        data={userData}
        renderItem={({ item }) => (
          <ListItem
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
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}

export default Channels;
