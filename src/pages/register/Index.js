import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import logo from './images/logo.jpg'
import CustomButton from './src/BtnPersonalizado';
import CustomInput from './src/TextBoxPersonalizado';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';

const App = () => {

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  })

  if (!fontLoaded) {
    return null;
  }

 
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 130 }}>
      <Text style={{fontSize:50, fontFamily:'Lato_900Black', color:'#67a4f5'}}>Registrar-se</Text>
      
      <Image source={logo} style={{ width: 165, height: 165 }} />
      
      <CustomInput placeholder={'Email'}></CustomInput>
      
      <CustomInput placeholder={'Senha'}></CustomInput>
      
      <CustomInput placeholder={'Repita sua senha'}></CustomInput>
      
      <CustomButton title={'Registrar'} />

    </SafeAreaView>
  );
};
export default App;