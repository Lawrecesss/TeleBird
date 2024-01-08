import React from "react";
import { View, SafeAreaView, StyleSheet, Image} from "react-native";
import Card from "../components/Card"


export default function ImageView(){
    return(
        <SafeAreaView style={{backgroundColor: "#f8f4f4", flex:1}}>
            <View style={styles.viewContainer}>
                <View style={styles.btn1}/>
                <View style={styles.btn2}/>
            </View>
            <Card title={"Red jacket for sale!"} subtitle={"100$"} image={"https://www.superdry.sg/cdn/shop/products/Y5010159A5PP_4_1200x.jpg?v=1657768433"}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    viewContainer:{
        flexDirection: "row",
        padding:10
    },
    btn1:{
        backgroundColor:"tomato",
        width:50,
        height:50,
        borderRadius: 50,
    },
    btn2:{
        backgroundColor:"dodgerblue",
        width:50,
        height:50,
        marginLeft:"auto",
        borderRadius: 50,
    },
    
    
})