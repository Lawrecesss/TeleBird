import React from 'react';
import { TextInput, View , StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"


function AppTextInput({icon,style, ...otherProps}) {
    return (
        <View style={[styles.container, style]}>
            {icon && <MaterialCommunityIcons style={styles.icon} name={icon} size={20}/>}
            <TextInput style={[styles.text]} {...otherProps}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "lightgrey",
        borderRadius:35,
        width:"100%",
        flexDirection:"row",
        padding:15,
        marginVertical:5,
    },
    icon:{
        justifyContent:"center",
        marginRight:10

    },
    text:{
        color:"black",
        fontSize:18

    }
})

export default AppTextInput;