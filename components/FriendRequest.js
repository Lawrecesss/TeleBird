import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItem from "./list/ListItem";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../configs/firebase";

function FriendRequest({ profile, name, userID, requestID, friendList }) {
  const userRef = doc(database, "users", userID);
  const requestRef = doc(database, "users", requestID);
  const [requestList, setRequestList] = useState([]);
  const [friendsList, setFriendsList] = useState(friendList);
  const [freindFriendList, setFriendFriendList] = useState([]);
  const requestFieldData = async () => {
    const requestData = await getDoc(userRef).then(async (docSnap) => {
      const data = docSnap.data().requests;
      return data;
    });
    setRequestList(requestData);
  };
  const requestFriendFieldData = async () => {
    const requestData = await getDoc(requestRef).then(async (docSnap) => {
      const data = docSnap.data().friends;
      return data;
    });
    setFriendFriendList(requestData);
  };

  useEffect(() => {
    requestFieldData().then(() => requestFriendFieldData());
  }, []);
  const filteredList = requestList.filter((id) => id !== requestID);
  friendsList.push(requestID);
  freindFriendList.push(userID);
  const AcceptButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.iconContainer, { backgroundColor: "#13ed25" }]}
          onPress={() => {
            updateDoc(userRef, {
              requests: filteredList,
              friends: friendsList,
            });
            updateDoc(requestRef, { friends: freindFriendList });
            console.log("Accepted");
          }}
        >
          <MaterialCommunityIcons
            style={[styles.icon]}
            name="check"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconContainer, { backgroundColor: "#f02228" }]}
          onPress={() => {}}
        >
          <MaterialCommunityIcons
            style={[styles.icon]}
            name="close"
            size={30}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <TouchableHighlight
      onPress={() => console.log("clicked")}
      underlayColor={"lightgrey"}
    >
      <View
        style={{
          flex: 1,
          justifyContent: !name && !profile ? "center" : "flex-start",
          backgroundColor: "white",
        }}
      >
        {requestList != [] && (
          <View style={styles.applicationContainer}>
            <ListItem
              image={profile}
              title={name}
              style={{ backgroundColor: "white" }}
            />
            <AcceptButton />
          </View>
        )}
        {requestList == [] && (
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.text}>
              You do not recieve any friend request at the moment.
            </Text>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  applicationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  icon: {
    color: "white",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "#747575",
  },
});

export default FriendRequest;
