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

function DefaultLanguageScreen(props) {
  const navigation = useNavigation();
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
      <View
        style={{
          alignItems: "center",
        }}
      >
        <AppTextInput
          icon={"magnify"}
          placeholder="Search"
          style={[styles.search]}
          textSize={18}
          autoCapitalize="none"
          autoCorrect={false}

          //   value={searchQuery}
          //   onPressIn={() => onPressIn()}
          //   onChangeText={(text) => handleSearch(text)}
        />
      </View>
      <FlatList
        data={Object.values(Languages)}
        renderItem={({ item }) => <ListItem title={item} />}
        ItemSeparatorComponent={ListItemSeparator}
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
