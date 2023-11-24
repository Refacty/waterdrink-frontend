import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from "react-native-modal";
import WaveBorder from "../../components/WaveBorder"
import bd from '../../services/tbUser/TbUser';
import axios from 'axios';

export default function Home({ route }) {

  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  //[Tipo se refere se é o progresso (D)iario/(S)emanal, qtdade se refere ao qtdade em litros de água tomada.]
  async function atualizaProgressoBd(astrTipo, astrQtdade) {
    if (astrTipo !== "D" && astrTipo !== "W") {
      throw new Error("Invalid astrTipo value. It should be 'D' or 'W'.");
    }

    const lstrSQL = astrTipo === "D"
        ? "UPDATE tb_user SET user_daily_progress = user_daily_progress + ?"
        : "UPDATE tb_user SET user_weekly_progress = user_weekly_progress + ?";

    try {
      const response = await bd.executar(lstrSQL, [astrQtdade]);
      console.log( "O usuario consumiu ", astrQtdade, " de água.");
      handleRefresh()
      try {
        bd.consultar("SELECT user_daily_progress, user_weekly_progress, user_session, user_id from tb_user;").then(response =>{
          if (response.length > 0){

            const data = {
              weeklyProgress: response[0].user_weekly_progress,
              dailyProgress : response[0].user_daily_progress
            }

            const headers = { 'Authorization': response[0].user_session };
            const id = response[0].user_id
            const url = "http://192.168.3.60:8080/tb_user/" + parseInt(id)

            console.log("REQUEST: ", url, data, { headers })
            console.log("O QUE VAI PRA API:", data)
            const api = axios.put(url, data, { headers })
            .then(response => {
              console.log("API: ", JSON.stringify(response.status))
            })
            .catch(error => {
              Alert.alert("ERRO: ", error)
            })
          }
        })
      }
      catch (error){
        Alert.alert(error)
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const [lsAgua, setLsAgua] = useState(0);
  const atualizaQuantidadeAgua = lsAgua => {
      return setLsAgua(lsAgua);
  }

  const [lsProgresso, setLsProgresso] = useState(0)
  const atualizaProgresso = value => {
      return setLsProgresso(value)
  }

  const [lsQtdadeDiaria, setQtdadeDiaria] = useState(0)
  const atualizaQtdadeDiaria = value => {
    return setQtdadeDiaria(value)
}

  const BuscaDados = async () => {
    try {
      const users = await bd.findAll();
      if (users && users.length > 0) {
        atualizaQuantidadeAgua(users[0].user_daily_progress)
        atualizaProgresso(((users[0].user_daily_progress) / (users[0].user_weight / 35)) * 100)
        atualizaQtdadeDiaria((users[0].user_weight * 0.035))
      } else {
        console.log('Nenhum usuário encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  };

  BuscaDados()

  const isModalVisible = route.params ? route.params.isModalVisible : false;

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  });

  if (!fontLoaded) {
    return null;
  }

  const Estilo = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'top',
      padding: 70,
      width: '100%',
      zIndex:2
    },
    Modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 400,
      marginBottom: -70,
      width: 450,
      left: -25,
    },
    textoKg: {
      fontFamily: 'Lato_900Black',
      color: '#007784',
      width: '100%',
      flexDirection: 'row',
      fontSize: 15,
      textAlign: 'center'
    }
  })

  return (
    <SafeAreaView style={Estilo.container}>
      <Text className="text-lg font-lato-900 text-default">Você bebeu {lsAgua.toFixed(1)} Litros de água.</Text>
      <AnimatedCircularProgress
        size={250}
        width={18}
        fill={lsProgresso}
        tintColor="#007784"
        backgroundColor="#d9d9d9"
        style={{ paddingTop: 27 }} />

      <Modal isVisible={isModalVisible} style={{ alignItems: 'center'}} coverScreen={false}>
        <View>
          <WaveBorder />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: -900 }}>

            <TouchableOpacity onPress={() => {atualizaProgressoBd("D", 0.200)}} style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', left: 200, bottom: 170 }}>
              <Image
                source={require('../../images/Copo200.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>200ml</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {atualizaProgressoBd("D", 0.500)}} style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
              <Image
                source={require('../../images/Garrafa500.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>500ml</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {atualizaProgressoBd("D", 1)}} style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
              <Image
                source={require('../../images/Garrafa1L.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>1L</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {atualizaProgressoBd("D", 1)}} style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', right: 200, bottom: 170 }}>
              <Image
                source={require('../../images/editwater.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>PERSONALIZADO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text className="text-8xl bottom-44 text-default" style={{ fontSize: 80, fontFamily: 'Lato_900Black' }}>{lsProgresso < 100?Math.round(lsProgresso):100}%</Text>

      <Text className="bottom-20" style={Estilo.textoKg}>
        A quantidade de água necessária de
      acordo com o seu peso é de {lsQtdadeDiaria.toFixed(1)} litros por dia. </Text>

      <View style={{ borderRadius: 20, width: '132%', height: '25%', backgroundColor:"#D4D4D4"}}>
        <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Lato_900Black', color: '#007784', fontSize: 20 }}>Você Sabia?</Text>
        <Image source={require('../../images/bixinho.png')} style={{ width: 240, height: undefined, aspectRatio: 1, right: 80, bottom: 65 }} />
        <Text style={{ bottom: '145%', fontSize: 13.5, textAlign: 'left', width: '60%', left: '35%', fontFamily: 'Lato_900Black', color: '#007784' }}>O cálculo recomendado pelos especialistas é ingerir 35ml de água por cada quilo. Assim, a quantidade de água ingerida se aproxima mais da sua necessidade individual.</Text>
      </View>
    </SafeAreaView>
  );
}
