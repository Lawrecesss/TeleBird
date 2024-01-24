import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import StoryProfile from "./StoryProfile";

function Story(props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <StoryProfile
          name={"Your Story"}
          user
          image={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
        <StoryProfile
          name={"Alex"}
          online
          image={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
        <StoryProfile
          name={"Alex"}
          online
          image={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
        <StoryProfile
          name={"Alex"}
          image={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
        <StoryProfile
          name={"Alex"}
          image={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
        <StoryProfile
          name={"Alex"}
          image={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 120,
    paddingVertical: 5,
  },
});

export default Story;
