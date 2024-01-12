import React from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';

function Card({title, subtitle, image}) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' style={styles.image} source={{uri:image}}/>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:250,
        marginBottom:20,
    },
    cardContainer:{
        width:"100%",
        padding: 20,
        
    },
    imageContainer:{
        backgroundColor: "white",
        borderRadius: 20,
        overflow:"hidden"
    },
    text: {
        marginLeft: 20,
        marginRight:20,
        marginBottom: 20,
        fontWeight: 'bold'

    },
    subtitle: {
        marginLeft: 20,
        marginBottom: 20,
        color: "green",
        fontWeight: 'bold'
    }
})

export default Card;