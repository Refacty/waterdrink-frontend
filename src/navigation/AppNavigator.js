import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../src/pages/home/HomeScreen';
import Profile from '../pages/profile/Profile';
import RegistroScreen from '../../src/pages/register/RegistroScreen';
import { View, Text, TouchableOpacity, Button } from 'react-native';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      options={{ headerShown: false }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#007784",
          borderTopWidth: 0,
          width: "100%",
          height: 70,
          elevation: 0,
          flex: 1,
          borderWidth: 0,
          zIndex: 0
        }
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? <Ionicons name="home" size={30} color="white" /> : <Ionicons name="home-outline" size={30} color="white" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? <Ionicons name="person" size={30} color="white" /> : <Ionicons name="person-outline" size={30} color="white" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistroScreen">

        <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
