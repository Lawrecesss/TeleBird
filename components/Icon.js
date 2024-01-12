import React from 'react';
import { View, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"

function Icon({name, size, backgroundColor="black", color="white"}) {
    return (
        <View style={[styles.icon,{
            width:size,
            height:size,
            borderRadius: size/2,
            backgroundColor: backgroundColor,

        }]}>
            <MaterialCommunityIcons name={name} size={size * 0.5} color={color}/>
        </View>
    );
}
const styles = StyleSheet.create({
    icon:{
        alignItems:"center",
        justifyContent:"center",
        
    }
    
})

export default Icon;