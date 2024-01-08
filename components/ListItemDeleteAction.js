import React from 'react';
import { View, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"

function ListItemDeleteAction() {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name='delete' size={30} color={"white"}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "red",
        width: 70,
    }
})

export default ListItemDeleteAction;