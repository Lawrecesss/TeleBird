import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, B } from 'react-native';
import AppButton from '../components/AppButton';

export default function Welcome(){
    return(
        <ImageBackground blurRadius={5} style={styles.bg}
        source={{uri:"https://b.kisscc0.com/20230827/hhe/kisscc0-living-room-64eaed6a2d7e90.2963539016931178021864.png"}}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={{uri:"https://images-platform.99static.com//catmpnsSBvdoCodFC29ZD04FOEs=/203x2607:996x3400/fit-in/500x500/99designs-contests-attachments/90/90105/attachment_90105410"}}/>
              <Text style={styles.text}>Shuga</Text>
            </View> 
            <View style={styles.btnContainer}>
                <AppButton title={"LogIn"} color={"tomato"} />
                <AppButton title={"Register"} color={"dodgerblue"}/>
            </View>
        </ImageBackground>
        
    )
  }
  const styles = StyleSheet.create({
    bg: {
      flex:1,
      justifyContent:'flex-end',
      alignItems:'center',
    },
    logo:{
      width:100, 
      height:100, 
      borderColor: "tomato",
      borderWidth: 10,
      borderRadius:60,
    },
    text:{
      fontSize:20,
      fontWeight:'bold',
      color: "tomato",
      padding:10,
      textTransform: 'uppercase',
    },
    logoContainer:{
      position:"absolute",
      top:300,
      alignItems:'center'
    },
    btnContainer:{
        padding:20,
        width:"100%"
    }
    
  
  })