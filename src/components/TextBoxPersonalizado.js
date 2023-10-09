import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';

const CustomInput = ({ placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [isShort, setIsShort] = useState(false);
  const handleInput = (text) => {
    setInputValue(text);
    setIsShort(text.length < 5 && text !== "");
  };
  const inputStyle = isShort ? InputEs.istoShort : InputEs.isNormal;

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  })

  if (!fontLoaded) {
    return null;
  }

  return (
    <TextInput
      style={[InputEs.estilo, inputStyle]}
      placeholder={placeholder}
      onChangeText={handleInput}
      value={inputValue}
    />
  );
};

const InputEs = StyleSheet.create({
  estilo: {
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '83%',
    borderRadius: 17,
    marginBottom: 20,
    shadowColor: 'blue',
    color: 'black',
    height:50,
    fontFamily:'Lato_900Black',
    shadowOffset: {
        width: 20,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 7,
  },
  istoShort: {
    color: 'red',
    borderWidth: 0.3,
    borderColor: 'red'
  },
  isNormal: {
    color: 'black',
  },
});

export default CustomInput;