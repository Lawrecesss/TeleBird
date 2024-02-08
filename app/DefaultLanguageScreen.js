import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Screen from "../components/screens/Screen";
import Headers from "../components/Headers";
import IconButton from "../components/buttons/IconButton";
import TextButton from "../components/buttons/TextButton";
import { useNavigation } from "@react-navigation/native";
import Languages from "../components/Languages";
import ListItem from "../components/list/ListItem";
import { AppTextInput } from "../components/forms";
import ListItemSeparator from "../components/list/ListItemSeparator";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../configs/firebase";

function DefaultLanguageScreen(props) {
  const { id } = props.route.params;
  const navigation = useNavigation();
  const onPress = (v) => {
    const language = Object.entries(Languages).find(
      ([key, value]) => value === v
    )[0];
    updateDoc(doc(database, "users", id), { language: language });
  };
  return (
    <Screen>
      <View style={styles.header}>
        <IconButton
          name={"chevron-left"}
          size={40}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>Languages</Text>
        <TextButton
          title={"Done"}
          style={styles.done}
          textColor={"dodgerblue"}
        />
      </View>

      <FlatList
        data={Object.values(Languages)}
        renderItem={({ item }) => (
          <View style={{ alignSelf: "center" }}>
            <ListItem
              title={item}
              style={{
                backgroundColor: "white",
                width: 390,
                borderRadius: 20,
                height: 70,
                borderWidth: 1,
                marginVertical: 3,
              }}
              onPress={() => onPress(item)}
            />
          </View>
        )}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingRight: 10,
    flexDirection: "row",
    backgroundColor: "lightgrey",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
  },
  done: {},
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  search: {
    padding: 10,
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 50,
  },
});

export default DefaultLanguageScreen;
