import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Entypo } from '@expo/vector-icons'; 

const CustomInputPass = ({ placeholder, Value, onChangeText, pStyle, vStyle }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordView = () => {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <View style={[InputStyle.mostrarSenha, InputStyle.estilo, vStyle]} className="relative w-full flex flex-row justify-center">
      <TextInput
        style={[pStyle]}
        className="pl-3 bg-white w-full rounded-20 mb-5 shadow-sm text-black h-12 font-lato-900"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={Value}
        secureTextEntry={!passwordVisible}
        
      />
      <Entypo
        name={passwordVisible ? "eye" : "eye-with-line"}
        size={26}
        color="#007784"
        onPress={togglePasswordView}
        style={InputStyle.iconView}
      />
    </View>
  );
};

const InputStyle = StyleSheet.create({
  iconView: {
    position: 'absolute',
    top: 12,
    right: 16,
  },
  estilo:{
    height:50,
    backgroundColor:"white",
    borderRadius:30,
  }
});

export default CustomInputPass;
