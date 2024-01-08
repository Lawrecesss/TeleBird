import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet} from 'react-native';
import ListItem from '../components/ListItem';

function ListingDetailScreen(props) {
    return (
        <SafeAreaView>
            <Image style={styles.image} source={{uri:"https://www.superdry.sg/cdn/shop/products/Y5010159A5PP_4_1200x.jpg?v=1657768433"}}/>
            <Text style={styles.text}>Red jacket for sale!</Text>
            <Text style={styles.subtitle}>100$</Text>
            <ListItem name={"Lawrence"} listings={"5 Listings"} image={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:300,
        marginBottom: 20,
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
export default ListingDetailScreen;