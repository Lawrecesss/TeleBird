import { React } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Switch,
} from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  style,
  time,
  rightIcon,
  seen,
  online,
  story,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={"lightgrey"} onPress={onPress}>
          <View style={[styles.listContainer, style]}>
            {IconComponent}
            {image && (
              <>
                <Image
                  style={[styles.image, { borderWidth: story ? 3 : 0 }]}
                  source={{ uri: image }}
                />
                {online === "true" && <View style={[styles.status]} />}
              </>
            )}
            <View style={styles.nameContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.preview}>
                {subTitle && (
                  <Text numberOfLines={2} style={styles.subTitle}>
                    {subTitle}
                  </Text>
                )}
                {seen === "true" && (
                  <MaterialCommunityIcons
                    style={{ marginHorizontal: 10 }}
                    name="check-all"
                    size={18}
                    color={"dodgerblue"}
                  />
                )}
                {seen === "false" && (
                  <MaterialCommunityIcons
                    style={{ marginHorizontal: 10 }}
                    name="check"
                    size={18}
                    color={"lightgrey"}
                  />
                )}
              </View>
            </View>

            {time && (
              <View style={styles.right}>
                <Text style={{ flex: 0.5 }}>{time}</Text>
                {rightIcon && (
                  <MaterialCommunityIcons
                    name="volume-off"
                    size={20}
                    color={"black"}
                  />
                )}
              </View>
            )}
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "#42abfc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    color: "grey",
    maxWidth: 200,
  },
  listContainer: {
    padding: 20,
    flexDirection: "row",
  },
  nameContainer: {
    marginLeft: 20,
    justifyContent: "center",
  },
  right: {
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  status: {
    backgroundColor: "#05e644",
    width: 15,
    height: 15,
    borderRadius: 10,
    position: "absolute",
    top: 70,
    right: 340,
  },
});

export default ListItem;
