import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';

const messages = [
    {
        id: 1,
        title: "T1",
        description : "D1",
        image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        id: 2,
        title: "T2",
        description : "D2",
        image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
]

function MessageScreen(props) {
    return (
        <SafeAreaView>
            <FlatList data={messages} 
            keyExtractor={message => message.id.toString()} 
            renderItem={({item}) => 
            <ListItem name={item.title} listings={item.description} image={item.image}/>}
            ItemSeparatorComponent={ListItemSeparator}/>
        </SafeAreaView>
    );
}

export default MessageScreen;