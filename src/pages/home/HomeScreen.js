import React, { useState, useEffect } from 'react';
import {SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from "react-native-modal";
import WaveBorder from "../../components/WaveBorder"
import {atualizaProgressoBd, BuscaDadosUsuario} from "../../api/Api";
export default function Home({ route }) {
  async function buscarDados() {
    try {
      const PegarDados = await BuscaDadosUsuario();
      atualizaQuantidadeAgua(PegarDados[0].user_daily_progress);
      atualizaProgresso((PegarDados[0].user_daily_progress / (PegarDados[0].user_weight / 35)) * 100);
      atualizaQtdadeDiaria(PegarDados[0].user_weight * 0.035);
    } catch (error) {
      Alert.alert("Erro ao buscar dados", error.message);
    }
  }

  function atualizarProgresso(astrTipo, astrQtdade){
    try{
      const AtualizarDados = atualizaProgressoBd(astrTipo, astrQtdade)
      if (AtualizarDados){
        handleRefresh()
      }
    }
    catch (error){
      Alert.alert("Erro ao atualizar dados", error.message)
    }
  }

  buscarDados()

  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

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

            <TouchableOpacity onPress={() => {atualizarProgresso("D", 0.200)}} style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', left: 200, bottom: 170 }}>
              <Image
                source={require('../../images/Copo200.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>200ml</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {atualizarProgresso("D", 0.500)}} style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
              <Image
                source={require('../../images/Garrafa500.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>500ml</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {atualizarProgresso("D", 1)}} style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
              <Image
                source={require('../../images/Garrafa1L.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>1L</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {atualizarProgresso("D", 1)}} style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', right: 200, bottom: 170 }}>
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
