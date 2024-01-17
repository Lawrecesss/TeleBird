import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {} from 'react-native-gesture-handler';

function ListItemDeleteAction({onPress}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons style={styles.icon} name='delete' size={30} color={"white"}/>
            </View>
        </TouchableWithoutFeedback>
        
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "red",
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    icon:{

    }
})

export default ListItemDeleteAction;