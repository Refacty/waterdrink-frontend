import React, { useState } from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import CustomButton from '../../components/btnTelaRegistro';
import CustomInput from '../../components/txtTelaRegistro';
import CustomInputPass from '../../components/txtTelaRegistroSenha';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';

// funçãoo 'Main'
const App = () => {
  
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
        const response = await axios.post('http://10.0.0.119:8080/tb_user', userData);
        Alert.alert('Resposta:', JSON.stringify(response.data));
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

  //Retorna os elementos da tela.
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'top', alignItems: 'center', backgroundColor: '#e3f6fc', marginTop: 30 }}>
      <Text style={{ fontSize: 60, fontFamily: 'Lato_900Black', color: '#67a4f5', marginBottom: 20, marginTop: 50 }}>Registrar-se</Text>

      <View style={{ width: '100%', alignItems: 'center', paddingTop: 70 }}>
        <CustomInput placeholder={'Nome completo'} onChangeText={handlerNome} value={nome}></CustomInput>
        <CustomInput placeholder={'Email'} onChangeText={handlerEmail} value={email}></CustomInput>

        <CustomInputPass placeholder={'Senha'} onChangeText={handlerSenha} value={senha}></CustomInputPass>
        <CustomInputPass placeholder={'Repita sua senha'} onChangeText={handlerRsenha} value={rsenha}></CustomInputPass>
        
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <BouncyCheckbox style={{marginLeft: 40}} iconStyle={{ borderColor: "blue" }} fillColor="#67a4f5"></BouncyCheckbox>
          <Text style={{ fontFamily: 'Lato_900Black', color: '#67a4f5', marginTop: 2.5, right:10}}>Lembrar senha</Text>
        </View>
      </View>

      <View style={{ marginTop: 165, width: '100%', alignItems: 'center' }}>
        <CustomButton title={'Registrar-se'} onPress={() => postData()} />
      </View>
    </SafeAreaView>
  );
};

export default App;
