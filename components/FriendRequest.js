import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItem from "./list/ListItem";

function FriendRequest({ profile, name }) {
  const AcceptButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.iconContainer, { backgroundColor: "#13ed25" }]}
        >
          <MaterialCommunityIcons
            style={[styles.icon]}
            name="check"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconContainer, { backgroundColor: "#f02228" }]}
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
        {name && profile && (
          <View style={styles.applicationContainer}>
            <ListItem
              image={profile}
              title={name}
              style={{ backgroundColor: "white" }}
            />
            <AcceptButton />
          </View>
        )}
        {!name && !profile && (
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
