import React, { useState } from 'react';
import {Text, SafeAreaView, View, Alert, Image, TouchableOpacity, StyleSheet} from 'react-native';
import CustomButton from '../../components/btnDefault';
import CustomInput from '../../components/inputDefault';
import CustomInputPass from '../../components/inputPassword';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import bd from '../../services/tbUser/TbUser';
import {registroApi} from "../../api/Api";

const App = ({navigation}) => {

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  });

  const logo = require('../../images/waterdrink.png');

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
  const [press, setPress] = useState(false)
  function handlerPress(press) {
    setPress(press)
    if (press) {
      navigation.navigate('LoginScreen')
    }
  }

  const postData = () => {
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
        if(registroApi(userData)){
          navigation.navigate("WeightScreen")
        }
    } else {
      Alert.alert('Senhas não coincidem.');
    }
  };

  const styles = StyleSheet.create({
    containerPrincipal:{
      backgroundColor:"#E6FCFF",
      paddingBottom: 45,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },
    containerSecundario:{
      height:"100%",
      width:"85%",
      alignItems:"center",
      paddingTop:80
    },
    txtCriarConta:{
      color:"#007784",
      fontSize: 40,
      fontFamily:"Lato_900Black"
    },
    lembrarSenhaTexto:{
      textDecorationLine: "none",
      color: '#007784',
      fontFamily: 'Lato_900Black',
    },
    botaoContainer:{
      width: '100%',
      alignItems: 'center',
      paddingTop: 10
    },
    txtIrLogin:{
      textDecorationLine: 'underline',
      color: 'gray',
      fontSize: 18
    }
  })

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <View style={styles.containerSecundario}>
        <Image source={logo} style={{width: 200, height: 200}}/>
        <Text style={styles.txtCriarConta}>Crie uma conta</Text>
        <View className="w-full mt-5">
          <CustomInput placeholder={'Nome completo'} onChangeText={handlerNome} value={nome}></CustomInput>
          <CustomInput placeholder={'Email'} onChangeText={handlerEmail} value={email}></CustomInput>
          <CustomInputPass placeholder={'Senha'} onChangeText={handlerSenha} value={senha}></CustomInputPass>
          <CustomInputPass placeholder={'Repita sua senha'} onChangeText={handlerRsenha} value={rsenha} vStyle={{marginTop:20, marginBottom:10}}></CustomInputPass><View className="w-full flex flex-row items-center">
          <BouncyCheckbox iconStyle={{ borderColor: "blue" }} fillColor="#007784" text='Lembrar senha' textStyle={styles.lembrarSenhaTexto}/>
          </View>
        </View>
        <View style={styles.botaoContainer}>
          <CustomButton txtStyle={{fontSize: 20}} title={'Registrar-se'} onPress={() => postData()} />
        </View>
        <TouchableOpacity onPress={handlerPress} style={{paddingTop: 10}}><Text style={styles.txtIrLogin}>Ou entre em uma conta</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
