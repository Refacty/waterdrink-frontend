
import React, { useState } from 'react';
import {  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegistroScreen from './src/pages/register/RegistroScreen'

export default function App(){
  return(
    <NavigationContainer>
        <RegistroScreen/>
    </NavigationContainer>  
  )
};
