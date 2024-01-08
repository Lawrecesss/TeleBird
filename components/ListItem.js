import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
function ListItem({name, listings, image, onPress, renderRightActions}) {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Swipeable renderRightActions={renderRightActions}>
                <TouchableHighlight underlayColor={"lightgrey"} onPress={onPress}>
                    <View style={styles.listContainer}>
                        <Image style={styles.image} source={{uri:image}}/>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.listings}>{listings}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeable>
        </GestureHandlerRootView>

        
    )
}
const styles = StyleSheet.create({
    image:{
        width:70,
        height:70,
        borderRadius:35,

    },
    name:{
        fontWeight: 'bold',
        marginBottom: 10

    },
    listings:{
        color: "grey"
    },
    listContainer:{
        padding:20,
        flexDirection:"row",
    },
    nameContainer:{
        marginLeft:30,

    },


})

export default ListItem;