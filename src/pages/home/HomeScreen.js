import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from "react-native-modal";
import WaveBorder from "../../components/WaveBorder"
import bd from '../../services/tbUser/TbUser';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function Home({ route }) {

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
      users = await bd.findAll(); 
      if (users && users.length > 0) {
        atualizaQuantidadeAgua(users[0].user_daily_progress)
        atualizaProgresso(((users[0].user_daily_progress) / (users[0].user_weight / 35)) * 100)
        atualizaQtdadeDiaria((users[0].user_weight / 35))
        console.log("BANCO: ", users[0])
      } else {
        console.log('Nenhum usuário encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  };

  BuscaDados() // Chama a função para buscar os dados do usuário.

  const isModalVisible = route.params ? route.params.isModalVisible : false;

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  });

  // Verificar se a fonte foi carregada, caso não for ele retorna nulo.
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

    }
  })

  return (
    <SafeAreaView style={Estilo.container}>
      <Text className="text-lg font-lato-900 text-default">Você bebeu {lsAgua} Litros de água.</Text>
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

            <TouchableOpacity style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', left: 200, bottom: 170 }}>
              <Image
                source={require('../../images/Copo200.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>200ML</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
              <Image
                source={require('../../images/Copo300.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>300ML</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
              <Image
                source={require('../../images/Garrafa500.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>500ML</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 10, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', right: 200, bottom: 170 }}>
              <Image
                source={require('../../images/Garrafa1L.png')}
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
              />
              <Text style={{ fontSize: 12, fontFamily: 'Lato_900Black', color: '#007784', paddingTop: 5 }}>1L</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text className="text-8xl bottom-44 text-default" style={{ fontSize: 80, fontFamily: 'Lato_900Black' }}>{Math.round(lsProgresso)}%</Text>
      <Text className="bottom-20" style={{ fontFamily: 'Lato_900Black', color: '#007784', width: '100%', flexDirection: 'row', fontSize: 15, textAlign: 'center' }}>A quantidade de água necessária de acordo com o seu peso é de {lsQtdadeDiaria.toFixed(2)} litros por dia. </Text>
      <View style={{ borderRadius: 20, width: '132%', height: '25%', backgroundColor:"#D4D4D4"}}>
        <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 10, fontFamily: 'Lato_900Black', color: '#007784', fontSize: 20 }}>Você Sabia?</Text>
        <Image source={require('../../images/bixinho.png')} style={{ width: 240, height: undefined, aspectRatio: 1, right: 80, bottom: 65 }} />
        <Text style={{ bottom: '145%', fontSize: 13.5, textAlign: 'left', width: '60%', left: '35%', fontFamily: 'Lato_900Black', color: '#007784' }}>O cálculo recomendado pelos especialistas é ingerir 35ml de água por cada quilo. Assim, a quantidade de água ingerida se aproxima mais da sua necessidade individual.</Text>
      </View>
    </SafeAreaView>
  );
}