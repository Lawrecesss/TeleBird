import React from 'react';
import AppTextInput from '../components/forms/AppTextInput';
import AppButton from '../components/AppButton';
import { StyleSheet } from 'react-native';
import BackgroundScreen from '../components/screens/BackgroundScreen';
function SignUpScreen(props) {
    return (
        <BackgroundScreen style={styles.container} source={require("../assets/bg.png")}>
            <AppTextInput
            style={styles.input}
            autoCapitalize = "none"
            autoCorrect={false}
            icon={'account'}
            placeholder="Username"/>
            <AppTextInput 
            style={styles.input}
            keyboardType="numeric"
            textContentType="telephoneNumber"
            icon={"phone"}
            placeholder="Phone Number"/>
            <AppTextInput
            style={styles.input}
            autoCapitalize = "none"
            autoCorrect={false}
            secureTextEntry
            icon={"lock"}
            textContentType="password"
            placeholder="Create Password"/>
            <AppTextInput 
            style={styles.input}
            autoCapitalize = "none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
            icon={"lock"}
            placeholder="Password"/>
            <AppButton style={styles.btn}title={"Sign Up"}/>
        </BackgroundScreen>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop:300,
        alignItems:"center",
    },
    btn:{
        marginTop: 10,
        width:150,
        height:70,
    },
    input:{
        // justifyContent:"center",
        width:"70%",
        backgroundColor: "white",

    }
})
export default SignUpScreen;