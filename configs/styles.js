import { Platform }from 'react-native';

export default{
    colors:{
        dark: "dark",
        light: "lightgrey",
        medium: "mediumgrey",
        white: "white",
        black: "black",

    },
    text:{
        fontSize: 18,
        color:"dark",
        fontFamily: Platform.OS === "android"? "Roboto": "Avenir"
    }
}