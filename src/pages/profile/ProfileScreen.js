import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
export default function Profile() {
 const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  },
  profileContainer: {
   alignItems: 'center',
   marginBottom: 500,
  },
  textoPerfil: {
   fontSize: 20,
   fontFamily: 'Lato_900Black',
   color: '#007784',
   marginBottom: 8,
  },
  textoNome: {
   fontSize: 30,
   fontFamily: 'Lato_900Black',
   color: '#007784',
  },
  textoProfissao: {
   marginTop:3,
   fontSize: 14,
   fontFamily: 'Lato_900Black',
   color: '#AAAAAA',
  },
  imagemPerfil: {
   backgroundColor: '#DEDEDE',
   width: 150,
   height: 150,
   borderRadius: 75,
  },
 });

 return (
     <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
       <Text style={styles.textoPerfil}>Seu perfil</Text>
       <View style={styles.imagemPerfil}></View>
       <Text style={styles.textoNome}>Teste da Silva</Text>
       <Text style={styles.textoProfissao}>Vagabundo</Text>
      </View>
     </SafeAreaView>
 );
}

