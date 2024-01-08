import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from "react-native"

function AppButton({title, onPress, color}) {
    return (
        <TouchableOpacity style={[styles.btn, {backgroundColor: color}]} onPress={()=> console.log(title)}>
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
        alignItems: "center",
        
    },
    btnText:{
        fontSize: 20,
        color:"white",
        fontWeight:"bold",
        position: "absolute",
        bottom:25
    }
    
})
export default AppButton;