import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function btnAgua() {
 return (
    <TouchableOpacity style={Gota.container}>
    <Text style={Gota.botao}></Text>
  </TouchableOpacity>
  );
}

const Gota = StyleSheet.create({
    container:{
        width:50,
        height:50,
        color:'red'
    },
    botao:{

    }
})