
import React, { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegistroScreen from './src/pages/register/RegistroScreen';
import Home from './src/pages/home/HomeScreen';

export default function App(){
  return(
    <NavigationContainer>
        <RegistroScreen/>
    </NavigationContainer>  
  )
};
