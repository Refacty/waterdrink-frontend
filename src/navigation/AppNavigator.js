
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import RegistroScreen from '../../src/pages/register/RegistroScreen';
import Home from '../../src/pages/home/HomeScreen';
import { Ionicons } from '@expo/vector-icons'; 
import btnAgua from '../components/btnAgua';

const Tab = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer style={{backgroundColor:"black"}}>
      
      <Tab.Navigator initialRouteName="RegistroScreen" screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle:{
            backgroundColor:"#4e5c92",
            borderTopWidth:0,
            marginLeft:20,
            marginRight:20,
            marginBottom:15,
            borderRadius:30,
            height:60,
            elevation:0,
        },
      }}>
        <Tab.Screen
          name="RegistroScreen"
          component={RegistroScreen}
          options={{
            headerShown: false, // Exibir o cabeçalho de navegação para esta tela
            tabBarIcon: ({color, size, focused}) => {
              if (focused){
                return <Ionicons name="home" size={30} color="white"/>
              }
              else{
                return <Ionicons name="home-outline" size={30} color="white"/>
              }
            }
          }}
        />
        <Tab.Screen
          name="RegistroScreen"
          component={RegistroScreen}
          options={{
            headerShown: false, // Exibir o cabeçalho de navegação para esta tela
            tabBarIcon: ({color, size, focused}) => {
              if (focused){
                return <Ionicons name="home" size={30} color="white"/>
              }
              else{
                return <Ionicons name="home-outline" size={30} color="white"/>
              }
            }
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false, // Ocultar o cabeçalho de navegação para esta tela
            tabBarIcon:({color, size, focused}) => {
              if (focused){
                return <Ionicons name="person" size={30} color="white"/>
              }
              else{
                return <Ionicons name="person-outline" size={30} color="white"/>
              }
            }
              
            }
          }
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
};
