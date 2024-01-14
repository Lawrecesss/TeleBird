import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, FlatList} from 'react-native';
import Screen from '../components/BackgroundScreen';
import Card from '../components/Card';


const listings = [
    {
        id:1,
        title: "Red Jacket For Sale!",
        subtitle: "100",
        image: "https://www.superdry.sg/cdn/shop/products/Y5010159A5PP_4_1200x.jpg?v=1657768433",
    },
    {
        id:2,
        title: "Percy Jackson Collection!!",
        subtitle: "150",
        image: "https://m.media-amazon.com/images/I/817bp+OOARL._AC_UF1000,1000_QL80_.jpg"
    }
]
function ListingDetailScreen(props) {
    return (
        <Screen style={{backgroundColor:"lightgrey"}}>
            <FlatList
            data={listings}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({item}) => (
                <Card 
                title={item.title}
                subtitle={"$" + item.subtitle}
                image={item.image}/>
            )}/>
        </Screen>
    );
}
const styles = StyleSheet.create({
    
    
})
export default ListingDetailScreen;