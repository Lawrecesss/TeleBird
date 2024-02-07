import React, { useState, useEffect } from "react";
import Screen from "../components/screens/Screen";
import Headers from "../components/Headers";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../components/list/ListItem";
import ListItemSeparator from "../components/list/ListItemSeparator";
import ListItemDeleteAction from "../components/list/ListItemDeleteAction";
import Story from "../components/chatComponents/Story";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  getDoc,
  doc,
  where,
  getDocs,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { database } from "../configs/firebase";
import SearchBar from "../components/SearchBar";

function ChatScreen(props) {
  const navigation = useNavigation();
  const { id } = props.route.params;
  const [chatList, setChatList] = useState();
  const userRef = doc(database, "users", id);

  const GetChats = async () => {
    const chatRef = collection(database, "chats");
    const allChatDoc = await getDocs(
      query(chatRef, where("members", "array-contains", userRef))
    );

    const chatData = await Promise.all(
      allChatDoc.docs.map(async (chatDoc) => {
        const data = chatDoc.data();
        const members = await Promise.all(
          data.members
            .filter((user) => {
              return user.id != id;
            })
            .map(async (user) => {
              const userDoc = await getDoc(user);
              const userData = await userDoc.data();
              const userID = userData._id;
              const username = userData.username;
              const profilePic = userData.profilePic;
              return { userID, username, profilePic };
            })
        );
        const messageRef = collection(chatDoc.ref, "messages");
        const allMessages = await getDocs(
          query(messageRef, orderBy("timestamp", "desc"), limit(1))
        );
        const lastMessage = allMessages?.docs?.length
          ? allMessages.docs[0].data()
          : {};
        return {
          lastMessage,
          otherUser: members[0],
        };
      })
    );

    return chatData;
  };

  useEffect(() => {
    GetChats().then((chatData) => setChatList(chatData));
  }, []);
  return (
    <Screen>
      <Headers
        name={"Chats"}
        btnTitle={"Edit"}
        rightBtnTitle={"pencil-plus"}
        rightOnPress={() => navigation.navigate("Friends")}
      />

      <View style={styles.itemContainer}>
        <FlatList
          data={chatList}
          renderItem={({ item }) => (
            <ListItem
              style={{ backgroundColor: "white" }}
              title={item.otherUser.username}
              subTitle={item.lastMessage.message}
              image={item.otherUser.profilePic}
              time={item.lastMessage.timestamp
                ?.toDate()
                .toLocaleDateString([], {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              // rightIcon={item.rightIcon}
              // seen={item.seen}
              // online={item.online}
              onPress={() =>
                navigation.navigate("InChatScreen", {
                  user: id,
                  friend: item.otherUser.userID,
                  profile: item.otherUser.profilePic,
                  name: item.otherUser.username,
                })
              }
              renderRightActions={() => <ListItemDeleteAction />}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  itemContainer: { flex: 1 },
});

export default ChatScreen;
