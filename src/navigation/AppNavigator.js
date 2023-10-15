import React from 'react';
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

const handleIconPress = () => {
  
  return console.log("Botão clickado!");
}

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
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 15,
          borderRadius: 30,
          height: 60,
          elevation: 0,
          flex: 1,
          borderWidth: 0
        }
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown:false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? <Ionicons name="home" size={30} color="white" /> : <Ionicons name="home-outline" size={30} color="white" />;
          },
        }}
      />
      <Tab.Screen
        name="ActionButton"
        component={View}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleIconPress();
          },
        }}
        options={{
          tabBarIcon: ({ color, size, focused }) => {return focused ? <Ionicons name="water" size={30} color="white" /> : <Ionicons name="water" size={30} color="white" />;}
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown:false,
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
        <Stack.Screen name="RegistroScreen" component={RegistroScreen} options={{ headerShown: false }} />  
        <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
