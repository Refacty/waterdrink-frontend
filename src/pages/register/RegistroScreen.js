import React, { useState } from 'react';
import { Text, SafeAreaView, View, Alert, Image } from 'react-native';
import CustomButton from '../../components/btnDefault';
import CustomInput from '../../components/inputDefault';
import CustomInputPass from '../../components/inputPassword';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import bd from '../../services/tbUser/TbUser';

// funçãoo 'Main'
const App = ({navigation}) => { 

  async function iniciarBD() {
    await bd.executar("CREATE TABLE IF NOT EXISTS tb_user (bd_key INTEGER PRIMARY KEY, user_id INTEGER, user_logado INTEGER default(0), user_name VARCHAR(255), user_email VARCHAR(255), user_session VARCHAR(255), user_birthday DATE, user_daily_progress FLOAT, user_profession VARCHAR(255), user_weekly_progress FLOAT, user_weight FLOAT);").then((response) => {
    })
    .catch((error) => {
    })

    await bd.executar("DELETE FROM tb_user;").then((response) => {
    })
    .catch((error) => {
    })
}
  
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
    "weight": 0,
    "birthday": null,
    "profession": null,
    "progress_id": 1,
    "weeklyProgress": 1,
    "dailyProgress": 0.0
  }
 
  //Função assincrona que envia os dados de cadastro para API no back-end.\
  iniciarBD()
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
        const response = await axios.post('http://10.0.0.119:8080/register', userData);
        const newUser = response.data;
        console.log("API: ", JSON.stringify(response.data))
        
        await bd.create_user({
          user_id: parseInt(newUser.user.user_id),
          user_name : newUser.user.name,
          user_email : newUser.user.email,
          user_weight : newUser.user.weight,
          user_birthday : newUser.user.birthday,
          user_profession : newUser.user.profession,
          user_weekly_progress : 0,
          user_daily_progress : 0,
          user_session : newUser.token})
          
         navigation.navigate("WeightScreen")
      } catch (error) {
        console.log('Erro da API:', error.response.data);
        console.log(`STATUS: ${JSON.stringify(error.response.status)} || JSON: ${JSON.stringify(error.response.data)}`);
      }
    } else {
      Alert.alert('Senhas não coincidem.');
    }
  };
  
  
  // Verificar se a fonte foi carregada, caso não for ele retorna nulo.
  if (!fontLoaded) {
    return null;
  }
  const logo = require('../../images/waterdrink.png');
  
  return (
    <SafeAreaView style={{backgroundColor:"#E6FCFF", paddingTop:50}}>
      <View className="w-4/5 flex justify-center items-center m-auto h-full pt-10">
        <Image source={logo} className="w-28 h-28"/>
          
        <Text className="text-5xl text-blue-400 font-lato-900" style={{color:"#007784"}}>Registrar-se</Text>

        <View className="w-full mt-5">
          <CustomInput placeholder={'Nome completo'} onChangeText={handlerNome} value={nome}></CustomInput>
          <CustomInput placeholder={'Email'} onChangeText={handlerEmail} value={email}></CustomInput>

          <CustomInputPass placeholder={'Senha'} onChangeText={handlerSenha} value={senha}></CustomInputPass>
          <CustomInputPass placeholder={'Repita sua senha'} onChangeText={handlerRsenha} value={rsenha} vStyle={{marginTop:20, marginBottom:20}}></CustomInputPass>
          
          <View className="w-full flex flex-row items-center">
            <BouncyCheckbox 
              iconStyle={{ borderColor: "blue" }} 
              fillColor="#007784" 
              text='Lembrar senha'
              textStyle={{
                textDecorationLine: "none",
                color: '#007784',
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
