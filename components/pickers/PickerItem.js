import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import defaultStyles from "../../configs/styles"


function PickerItem({label, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text>{label}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: defaultStyles.colors.light,
        padding:15,
        borderBottomColor: defaultStyles.colors.dark,
    },
    
})
export default PickerItem;