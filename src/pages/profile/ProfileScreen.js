import React, {useState} from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import CustomInput from "../../components/inputDefault";
import {BuscaDadosUsuario} from "../../api/Api";
export default function Profile() {

 const pegarDados = async () => {
  try{
   const Dados  = await BuscaDadosUsuario()
   atualizaNomeUsuario(Dados[0].user_name)
   atualizaProfissaoUsuario(Dados[0].user_profession)
  }
  catch(error){
   Alert.alert("Erro ao buscar dados do usuário:", error)
  }
 }
 pegarDados()

 const[nome, setNome] = useState("")
const atualizaNomeUsuario = (nome) => {
  setNome(nome)
}

const [profissao, setProfissao] = useState("")
 const atualizaProfissaoUsuario = (profissao) => {
  setProfissao(profissao)
 }

 const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#E6FCFF',
   paddingBottom: 170,
  },
  profileContainer: {
   alignItems: 'center',
   paddingBottom:350
  },
  progressContainer: {
   alignItems: 'center',
   position:"absolute",
   paddingTop:200
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
  textoProgresso: {
   marginTop:3,
   fontSize: 14,
   fontFamily: 'Lato_900Black',
   color: '#007784',
   paddingRight:175,
   paddingBottom:5
  },
  imagemPerfil: {
   backgroundColor: '#DEDEDE',
   width: 150,
   height: 150,
   borderRadius: 75,
  },
  dataInput:{
    marginTop:20,
   backgroundColor: "#DEDEDE"
  }
 });

 return (
     <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
       <Text style={styles.textoPerfil}>Seu perfil</Text>
       <View style={styles.imagemPerfil}></View>
       <Text style={styles.textoNome}>{nome}</Text>
       <Text style={styles.textoProfissao}>{profissao}</Text>
      </View>

     <View style={styles.progressContainer}>
         <Text style={styles.textoProgresso}>Progresso semanal:</Text>
         <Progress.Bar progress={0.3} width={300} height={22} style={{marginBottom:20}} color={"#007784"}/>
         <CustomInput style={styles.dataInput} editable={false}></CustomInput>
         <CustomInput style={styles.dataInput} editable={false}></CustomInput>
         <CustomInput style={styles.dataInput} editable={false}></CustomInput>
         <CustomInput style={styles.dataInput} editable={false}></CustomInput>
     </View>
     </SafeAreaView>
 );
}

