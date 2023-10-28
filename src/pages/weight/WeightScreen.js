import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import CustomInput from '../../components/inputDefault';
import { TextInput } from 'react-native-gesture-handler';
import InputWeight from '../../components/InputWeight';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import CustomButton from '../../components/btnDefault';
import axios from 'axios';

export default function WeightScreen() {
  const logo = require('../../images/waterdrink.png');
  const Estilo = StyleSheet.create({
    container: {
      backgroundColor: "#E6FCFF",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const [gWeight, setWeightState] = useState("0");

  const handlerWeightChange = (text) => {
    setWeightState(text);
  }

  const dataUpdate = {
    weight:gWeight
  }

  const enviarPeso = () => {
    axios.put("26.103.139.198:8080/tb_user/10", dataUpdate)
    .then((response) => {
      console.log('Requisição PUT bem-sucedida:', response.data);
    })
    .catch((error) => {
      console.error('Erro na requisição PUT:', error);
    });
  }

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  });

  // Verificar se a fonte foi carregada, caso não for, ele retorna nulo.
  if (!fontLoaded) {
    return null;
  }

  const kg = "(KG)";

  return (
    <SafeAreaView style={Estilo.container}>
      <View className={"w-4/5 flex justify-center items-center m-auto h-full pt-10"}>
        <Text style={{ fontSize: 35, fontFamily: "Lato_900Black", paddingBottom: 14 }}>Digite seu peso {kg}:</Text>
        <InputWeight placeholder={""} value={gWeight} onChangeText={handlerWeightChange}></InputWeight>
        <CustomButton title="Enviar" onPress={enviarPeso} />
      </View>
    </SafeAreaView>
  );
}
