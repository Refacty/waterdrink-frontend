import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Entypo } from '@expo/vector-icons'; 

const CustomInputPass = ({ placeholder, Value, onChangeText, pStyle }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordView = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <View style={InputStyle.mostrarSenha}>
      <TextInput
        style={[InputStyle.estilo, pStyle]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={Value}
        secureTextEntry={!passwordVisible}
      />
      <Entypo
        name={passwordVisible ? "eye" : "eye-with-line"}
        size={26}
        color="#67a4f5"
        onPress={togglePasswordView}
        style={{ right: 45, marginTop: 13 }}
      />
    </View>
  );
};

const InputStyle = StyleSheet.create({
  estilo: {
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '83%',
    borderRadius: 17,
    marginBottom: 20,
    shadowColor: 'blue',
    color: 'black',
    height: 50,
    fontFamily: 'Lato_900Black',
    shadowOffset: {
      width: 20,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 7
  },
  mostrarSenha: {
    width: '100%',
    left: 33,
    display: 'flex',
    flexDirection: 'row'
  },
});

export default CustomInputPass;
