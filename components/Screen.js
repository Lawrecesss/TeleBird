import React from 'react';
import { SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import Constants  from 'expo-constants';
function Screen({children, style}) {
    return (
            <SafeAreaView style={[styles.screen,style]}>
                {children}
            </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    
    screen:{
        paddingVertical: Constants.statusBarHeight,
        flex:1
    }
})

export default Screen;