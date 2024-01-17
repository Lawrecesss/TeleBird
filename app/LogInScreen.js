import React from 'react';
import { StyleSheet} from 'react-native';
import BackgroundScreen from '../components/BackgroundScreen';
import {Formik} from "formik"
import * as Yup from "yup"
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';

const validationSchema = Yup.object({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().min(8).label("Password")
})
function LogInScreen(props) {
    return (
        <BackgroundScreen style={styles.container} source={require("../assets/bg.png")}>
            <Formik 
            initialValues={{username:"", password:""}}
            onSubmit={(values)=> console.log(values)}
            validationSchema={validationSchema}
            >
                {()=>(
                        <>
                        <AppFormField
                        style={styles.input}
                        name={"username"}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        icon={"account"}
                        placeholder="Username"/>
            
                        <AppFormField
                        style={styles.input}
                        secureTextEntry
                        name={"password"}
                        textContentType="password"
                        autoCapitalize = "none"
                        autoCorrect={false}
                        icon={"lock"}
                        placeholder="Password" />
                        <SubmitButton style={styles.btn} title={"Log In"}/>
                        </>
                )}
            
            </Formik>
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
        height:70
    },
    input:{
        width:"70%",
        backgroundColor: "white",

    }
})
export default LogInScreen;