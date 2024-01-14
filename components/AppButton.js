import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from "react-native"

function AppButton({title, onPress, color="black", style}) {
    return (
        <TouchableOpacity style={[styles.btn, {backgroundColor: color}, style]} onPress={onPress}>
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    btn:{
        marginBottom:10,
        width:"100%",
        height:70,
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center"
        
    },
    btnText:{
        fontSize: 20,
        color:"white",
        fontWeight:"bold",
        
    }
    
})
export default AppButton;