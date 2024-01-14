import React from 'react';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { StyleSheet } from 'react-native';
import BackgroundScreen from '../components/BackgroundScreen';
function LogInScreen(props) {
    return (
        <BackgroundScreen style={styles.container} source={require("../assets/bg.png")}>
            <AppTextInput
            style={styles.input}
            placeholder="Username"/>
            <AppTextInput 
            style={styles.input}
            secureTextEntry
            placeholder="Password" />
            <AppButton style={styles.btn}title={"Log In"}/>
        </BackgroundScreen>
    );
}
const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        
    
    },
    btn:{
        width:150,
        height:50
    },
    input:{
        justifyContent:"center",
        width:"70%"
    }
})
export default LogInScreen;