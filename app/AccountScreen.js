import React from 'react';
import { View } from 'react-native';
import Screen from '../components/Screen';
import Icon from '../components/Icon';
import ListItem from '../components/ListItem';

function AccountScreen(props) {
    return (
       <Screen>
            <View>
                <ListItem title={"Lawrence"} subTitle={"lhshein14@gmail.com"} image={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/> 
            </View>
       </Screen>
    );
}

export default AccountScreen;