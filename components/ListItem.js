import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
function ListItem({name, listings, image}) {
    return (
        <View style={styles.listContainer}>
            <Image style={styles.image} source={{uri:image}}/>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.listings}>{listings}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    image:{
        width:60,
        height:60,
        borderRadius:50,

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