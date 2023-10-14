import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import bixo from '../../images/bixinho.png'

export default function Home() {
    const [fontLoaded] = useFonts({
        Lato_100Thin,
        Lato_900Black
      });
      
// Verificar se a fonte foi carregada, caso não for ele retorna nulo.
  if (!fontLoaded) {
    return null;
  }

  const Estilo = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'top',
        padding:70,
        width:'100%'
    }
})

    return (
        <SafeAreaView style={Estilo.container}>
            <Text className="text-lg" style={{fontFamily:'Lato_900Black', color:'#687cc6'}}>Você bebeu 20 Litros de água.</Text>
            
            <AnimatedCircularProgress
            size={250}
            width={18}
            fill={80}
            tintColor="#4e5c92"
            backgroundColor="#d9d9d9"
            style={{paddingTop:27}} /> 

            
             
            <Text className="text-8xl bottom-44" style={{fontSize:80, fontFamily:'Lato_900Black', color:'#4e5c92'}}>80%</Text>
            <Text className="bottom-20" style={{fontFamily:'Lato_900Black', color:'#687cc6', width:'100%', flexDirection:'row', fontSize:15, textAlign:'center'}}>A quantidade de água necessária de acordo com o seu peso é de 2,45 litros por dia. </Text>
            
            <View className="bg-slate-300" style={{borderRadius:20, width:'132%', height:'25%'}}>
            <Text style={{textAlign:'center', fontSize:15, marginTop:10, fontFamily:'Lato_900Black', color:'#687cc6', fontSize:20}}>Você Sabia?</Text>
            <Image source={require('../../images/bixinho.png')} style={{width:240, height:undefined, aspectRatio:1, right:80, bottom:65}} />
            <Text style={{bottom:'154%', fontSize:13.5, textAlign:'left', width:'60%', left:'35%', fontFamily:'Lato_900Black', color:'#687cc6' }}>O cálculo recomendado pelos especialistas é ingerir 35ml de água por cada quilo. Assim, a quantidade de água ingerida se aproxima mais da sua necessidade individual.</Text>
            </View>
           
        </SafeAreaView>
    );


}