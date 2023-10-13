import React, { useState } from 'react';
import { Text, SafeAreaView, View, Alert, Image } from 'react-native';
import CustomButton from '../../components/btnDefault';
import CustomInput from '../../components/inputDefault';
import CustomInputPass from '../../components/inputPassword';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';

// funçãoo 'Main'
const App = ({navigation}) => { 
  
  // Carregar as fonts
  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  });

  // Estado para o nome, email, senha e confirmação de senha.
  const [nome, setNome] = useState("");
  const handlerNome = (inputValue) => {
    setNome(inputValue);

  }
  const [email, setEmail] = useState("");
  const handlerEmail = (inputValue) => {
    setEmail(inputValue);
 
  }
  const [senha, setSenha] = useState("");
  const handlerSenha = (inputValue) => {
    setSenha(inputValue);

  }
  const [rsenha, setRsenha] = useState("");
  const handlerRsenha = (inputValue) => {
    setRsenha(inputValue);
    
  }

  const userData = {
    "name": nome,
    "email": email,
    "password": senha,
    "weight": null,
    "birthday": null,
    "profession": null,
    "progress": {
      "progress_id": 1,
      "weeklyProgress": 1,
      "dailyProgress": 0.0
    }
  }
 
  //Função assincrona que envia os dados de cadastro para API no back-end.
  const postData = async () => {
    if (nome === "") {
      Alert.alert('Nome vazio');
      return;
    }
  
    if (email === "") {
      Alert.alert('Email vazio');
      return;
    }
  
    if (senha === "") {
      Alert.alert('Senha vazia');
      return;
    }
  
    if (senha === rsenha) {
      try {
        await axios.post('http://refacty.com:8080/tb_user', userData);
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert(JSON.stringify(error));
      }
    } else {
      Alert.alert('Senhas não coincidem.');
    }
  };
  
  
  // Verificar se a fonte foi carregada, caso não for ele retorna nulo.
  if (!fontLoaded) {
    return null;
  }
  const logo = require('../../images/logo.jpg');

  //Retorna os elementos da tela.
  return (
    <SafeAreaView className="bg-blue-100">
      <View className="w-4/5 flex justify-center items-center m-auto h-full">
        <Image source={logo} className="w-28 h-28"/>
          
        <Text className="text-5xl text-blue-400 font-lato-900">Registrar-se</Text>

        <View className="w-full mt-5">
          <CustomInput placeholder={'Nome completo'} onChangeText={handlerNome} value={nome}></CustomInput>
          <CustomInput placeholder={'Email'} onChangeText={handlerEmail} value={email}></CustomInput>

          <CustomInputPass placeholder={'Senha'} onChangeText={handlerSenha} value={senha}></CustomInputPass>
          <CustomInputPass placeholder={'Repita sua senha'} onChangeText={handlerRsenha} value={rsenha}></CustomInputPass>
          
          <View className="w-full flex flex-row items-center">
            <BouncyCheckbox 
              iconStyle={{ borderColor: "blue" }} 
              fillColor="#67a4f5" 
              text='Lembrar senha'
              textStyle={{
                textDecorationLine: "none",
                color: '#67a4f5',
                fontFamily: 'Lato_900Black',
              }}
            />
          </View>
        </View>

        <View className="m-auto text-center w-full mt-3">
          <CustomButton title={'Registrar-se'} onPress={() => postData()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
