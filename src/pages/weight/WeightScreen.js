import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import CustomInput from '../../components/inputDefault';
import { TextInput } from 'react-native-gesture-handler';
import InputWeight from '../../components/InputWeight';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import CustomButton from '../../components/btnDefault';

export default function WeightScreen() {
const logo = require('../../images/waterdrink.png');
 const Estilo = StyleSheet.create({
    container:{
        backgroundColor:"#E6FCFF",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
 })
 
 const [fontLoaded] = useFonts({
  Lato_100Thin,
  Lato_900Black
});

// Verificar se a fonte foi carregada, caso não for ele retorna nulo.
if (!fontLoaded) {
  return null;
}

 return (
   <SafeAreaView style={Estilo.container}>
    <View className={"w-4/5 flex justify-center items-center m-auto h-full pt-10"}>
      <Text style={{fontSize:40, fontFamily:"Lato_900Black", paddingBottom:10}}>Digite seu peso:</Text>
      <InputWeight placeholder={""}></InputWeight>
      <CustomButton title="Enviar"/>
    </View>
   </SafeAreaView>

  );
}