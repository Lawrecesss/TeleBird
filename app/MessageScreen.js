import React, {useState} from 'react';
import { SafeAreaView, FlatList, View} from 'react-native';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import Screen from '../components/BackgroundScreen';

const initialMessages = [
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
    const [messages, setMessages] = useState(initialMessages)
    const [refreshing, setRefreshing] = useState(false);

    const handleDelete = (message) =>{
        setMessages(messages.filter((m) => m.id !== message.id))

    }
    return (
        <Screen>
            <FlatList data={messages} 
            keyExtractor={message => message.id.toString()} 
            renderItem={({item}) => 
            (<ListItem 
                title={item.title} 
                subTitle={item.description} 
                image={item.image} 
                onPress={()=> console.log("selected" + item.title)}
                renderRightActions={()=> <ListItemDeleteAction onPress={()=> handleDelete(item)}/>}/> 
                )}
            ItemSeparatorComponent={ListItemSeparator}
            refreshing={refreshing}
            onRefresh={()=>{
                setMessages([
                    {
                        id: 2,
                        title: "T2",
                        description : "D2",
                        image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    },
                ])
            }
            }
            />
        </Screen>

    );
}

export default MessageScreen;