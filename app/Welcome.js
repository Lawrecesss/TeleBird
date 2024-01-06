import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground } from 'react-native';
import {useDimensions, useDeviceOrientation} from "@react-native-community/hooks"

export default function Welcome(){
    return(
        <ImageBackground style={styles.bg}
        source={{uri:"https://b.kisscc0.com/20230827/hhe/kisscc0-living-room-64eaed6a2d7e90.2963539016931178021864.png"}}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz3f9_ra7nQHh8O0i-8xX9QEZ3iQj6m1ILMg&usqp=CAU"}}/>
              <Text style={styles.text}>This is Logo Text.</Text>
            </View> 
            <View style={styles.btn1}/>
            <View style={styles.btn2}/>
        </ImageBackground>
        
    )
  }
  const styles = StyleSheet.create({
    bg: {
      flex:1,
      justifyContent:'flex-end',
      alignItems:'center',
    },
    btn1:{
      backgroundColor:"tomato",
      width:"100%",
      height:70,
    },
    btn2:{
      backgroundColor:"dodgerblue",
      width:"100%",
      height:70
  
    },
    logo:{
      width:100, 
      height:100, 
    },
    text:{
      fontSize:20,
      fontWeight:'bold'
    },
    logoContainer:{
      position:"absolute",
      top:300,
      alignItems:'center'
  
    }
  
  })