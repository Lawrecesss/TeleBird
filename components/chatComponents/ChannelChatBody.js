import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { database } from "../../configs/firebase";

function ChannelChatBody({ id, admin, user, profile, name }) {
  const channelDocRef = doc(database, "channels", id);
  const postCollectionRef = collection(channelDocRef, "posts");
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    onSnapshot(postCollectionRef, async (snapShot) => {
      const postData = snapShot.docs.map((doc) => {
        return doc.data();
      });
      setPosts(postData);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const PostContainer = ({ post, time }) => {
    return (
      <View style={styles.postContainer}>
        <View style={styles.poster}>
          <Image style={styles.profile} source={{ uri: profile }} />
          <Text>{name}</Text>
        </View>
        <View style={styles.post}>
          <Text>{post}</Text>
        </View>
        <View style={{ marginTop: 10, marginLeft: "auto" }}>
          <Text>{time}</Text>
        </View>
      </View>
    );
  };
  const Post = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostContainer
              post={item.message}
              time={item.timestamp?.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          )}
        />
      </View>
    );
  };
  return <Post />;
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  poster: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 10,
  },
  post: {
    marginTop: 20,
    width: 350,
    borderWidth: 1,
    height: "auto",
    padding: 20,
    borderRadius: 20,
  },
  postContainer: {
    padding: 20,
    backgroundColor: "white",
    height: "auto",
    width: 400,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "black",
  },
});

export default ChannelChatBody;
