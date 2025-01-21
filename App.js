import React from "react";
import HomeScreen from "./screens/HomeScreen";
import MeetingScreen from "./screens/MeetingScreen";
import ChatScreen from "./screens/ChatScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Image, Text, Pressable } from "react-native";

const Tab = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{tabBarActiveTintColor:'midnightblue', tabBarInactiveTintColor:'grey'}}>
        <Tab.Screen name='Home' component={HomeScreen} options={{tabBarIcon: () => (<Ionicons name="home" size={20} color='black'/>),headerLeft:() => {}, headerRight:() => (<View style={{display:'flex',flexDirection:'row', alignContent:'space-between', marginHorizontal:15}}><Pressable onPress={()=>console.log('Notifications pressed')}><Ionicons name="notifications" size={28} color='black'/></Pressable><Pressable onPress={()=>console.log('Profile pressed')} style={{marginLeft:15}}><Ionicons name="person-circle" size={28} color='black'/></Pressable></View>), headerTitle:'Bona', headerTitleStyle:{fontWeight:700, fontSize:32}, headerStyle:{backgroundColor:'white'} }}/>
        <Tab.Screen name='Chat' component={ChatScreen} options={{tabBarIcon: () => (<Ionicons name="chatbubbles" size={20} color='black'/>), tabBarBadge: 3}} />
        <Tab.Screen name='Meetings' component={MeetingScreen} options={{tabBarIcon: () => (<Ionicons name="videocam" size={20} color='black'/>), tabBarBadge: 3}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}