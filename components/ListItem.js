import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
function ListItem({title, subTitle, image, IconComponent, onPress, renderRightActions, style}) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderRightActions}>
                <TouchableHighlight underlayColor={"lightgrey"} onPress={onPress}>
                    <View style={[styles.listContainer, style]}>
                        {IconComponent}
                        {image && <Image style={styles.image} source={{uri:image}}/>}
                        <View style={styles.nameContainer}>
                            <Text style={styles.title}>{title}</Text>
                            {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeable>
        </GestureHandlerRootView>

        
    )
}
const styles = StyleSheet.create({
    image:{
        width:70,
        height:70,
        borderRadius:35,

    },
    title:{
        fontWeight: 'bold',
        marginBottom: 10

    },
    subTitle:{
        color: "grey"
    },
    listContainer:{
        padding:20,
        flexDirection:"row",
        
    
    },
    nameContainer:{
        marginLeft:20,
        justifyContent: "center"

    },
    


})

export default ListItem;