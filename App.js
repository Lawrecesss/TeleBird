import React from "react";
import LogInScreen from "./app/LogInScreen.js";
import SignUpScreen from "./app/SignUpScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "./app/AccountScreen.js";
import ChangeProfileScreen from "./app/ChangeProfileScreen.js";
import ChatScreen from "./app/ChatScreen.js";
import FriendScreen from "./app/FriendScreen.js";
import ChannelScreen from "./app/ChannelScreen.js";
import SetProfileScreen from "./app/SetProfileScreen.js";
import { Provider } from "react-redux";
import Store from "./contexts/Store.js";
import SplashScreen from "./app/SplashScreen.js";
import BottomIcon from "./components/BottomIcon.js";
import InChatScreen from "./app/InChatScreen.js";
import SearchScreen from "./app/SearchScreen.js";
import CreateChannel from "./app/CreateChannel.js";
import InChannelChat from "./app/InChannelChat.js";

const NStack = createNativeStackNavigator();
const BStack = createBottomTabNavigator();

function HomeStack(props) {
  const { id } = props.route.params;

  return (
    <BStack.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "dodgerblue",
      }}
    >
      <BStack.Screen
        name="Chats"
        component={ChatScreen}
        initialParams={{ id: id }}
        options={{
          tabBarIcon: ({ color }) => <BottomIcon name={"chat"} color={color} />,
        }}
      />
      <BStack.Screen
        name="Channels"
        component={ChannelScreen}
        initialParams={{ id: id }}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomIcon name={"account-group"} color={color} />
          ),
        }}
      />
      <BStack.Screen
        name="Friends"
        component={FriendScreen}
        initialParams={{ id: id }}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomIcon name={"account-multiple-plus"} color={color} />
          ),
        }}
      />
      <BStack.Screen
        name="Settings"
        component={AccountScreen}
        initialParams={{ id: id }}
        options={{
          tabBarIcon: ({ color }) => <BottomIcon name={"cog"} color={color} />,
        }}
      />
    </BStack.Navigator>
  );
}

function Stacks() {
  return (
    <NStack.Navigator screenOptions={{ headerShown: false }}>
      <NStack.Screen name="SlpashScreen" component={SplashScreen} />
      <NStack.Screen name="LogInScreen" component={LogInScreen} />
      <NStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <NStack.Screen
        name="ChangeProfileScreen"
        component={ChangeProfileScreen}
      />
      <NStack.Screen name="SetProfileScreen" component={SetProfileScreen} />
      <NStack.Screen
        name="Home"
        component={HomeStack}
        initialParams={{ id: "" }}
      />
      <NStack.Screen
        name="InChatScreen"
        component={InChatScreen}
        initialParams={{ user: "", friend: "", profile: "", name: "" }}
      />
      <NStack.Screen name="CreateChannel" component={CreateChannel} />
      <NStack.Screen
        name="InChannelChat"
        component={InChannelChat}
        initialParams={{
          user: "",
          id: "",
          name: "",
          channelProfile: "",
          admin: "",
        }}
      />
      <NStack.Group screenOptions={{ presentation: "modal" }}>
        <NStack.Screen
          name="Search"
          component={SearchScreen}
          initialParams={{ user: "" }}
        />
      </NStack.Group>
    </NStack.Navigator>
  );
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <Stacks />
      </Provider>
    </NavigationContainer>
  );
}
export default function App() {
  return <RootNavigator />;
}
