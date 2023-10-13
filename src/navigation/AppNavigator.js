
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroScreen from '../../src/pages/register/RegistroScreen';
import Home from '../../src/pages/home/HomeScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistroScreen">
        <Stack.Screen
          name="RegistroScreen"
          component={RegistroScreen}
          options={{
            headerShown: false, // Exibir o cabeçalho de navegação para esta tela
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true, // Ocultar o cabeçalho de navegação para esta tela
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};
