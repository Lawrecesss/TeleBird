import React from 'react';
import { View, SafeAreaView, Image, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"


function ViewImage(props) {
    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.btnContainer}>
                <MaterialCommunityIcons name='close' color={"white"} size={40}/>
                <MaterialCommunityIcons style={{marginLeft:"auto"}} name='delete' color={"white"} size={40}/>
            </View>
            <View style={styles.imageContainer}>
                <Image  style={styles.image} source={{uri:"https://b.kisscc0.com/20230827/hhe/kisscc0-living-room-64eaed6a2d7e90.2963539016931178021864.png"}}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screenContainer:{
        backgroundColor:"black",
        flex:1,
    },
    image:{
        width:"100%",
        height: "100%",
        resizeMode:'contain',

    },
    btnContainer:{
        flexDirection: "row",
        paddingHorizontal:20,

    },
    imageContainer:{
        alignItems:"center",
        justifyContent:"center"
    }
    
})

export default ViewImage;