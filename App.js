
import React, { useState } from 'react';
import {  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegistroScreen from './src/pages/register/RegistroScreen'
import Home from './src/pages/home/HomeScreen';

export default function App(){
  return(
    <NavigationContainer>
        <Home/>
    </NavigationContainer>  
  )
};
