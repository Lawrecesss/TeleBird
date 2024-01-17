import React, { useState } from 'react';
import { Text, View , StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import Screen from '../screens/BackgroundScreen';
import PickerItem from './PickerItem';

function AppPicker({icon, items, onSelectedItem, placeholder, selectedItem}) {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <TouchableWithoutFeedback onPress={()=> setVisible(true)}>
            <View style={styles.container}>
                {icon && <MaterialCommunityIcons style={styles.icon} name={icon} size={20}/>}
                <Text>{selectedItem? selectedItem.label: placeholder}</Text>
                <View style={styles.dropDown}>
                    <MaterialCommunityIcons name='chevron-down' size={20}/>
                </View>
            </View>
            </TouchableWithoutFeedback>
            <Modal visible={visible} animationType='slide'>
                <Screen>
                    <Button title='close' onPress={()=> setVisible(false)}></Button>
                    <FlatList 
                    data={items}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({item})=> <PickerItem 
                    label={item.label}
                    onPress={()=> {
                        setVisible(false)
                        onSelectedItem(item)
                    }}/>}/>
                </Screen>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "lightgrey",
        borderRadius:35,
        width:"100%",
        flexDirection:"row",
        padding:15,
        marginVertical:10,
    },
    icon:{
        justifyContent:"center",
        marginRight:10

    },
    text:{
        color:"dark",
        fontSize:18

    },
    dropDown:{
        marginLeft: "auto"
    }

})

export default AppPicker;