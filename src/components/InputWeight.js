import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';

const InputWeight = ({ placeholder, Value, onChangeText  }) => {
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
      style={[inputStyle, InputEs.shadow, {fontSize:40, textAlign:'center'}]}
      className="pl-3 bg-white w-96 rounded-20 mb-5 text-black h-16 font-lato-900"
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={Value}
      keyboardType='numeric'
    />
  );
};

const InputEs = StyleSheet.create({
  istoShort: {
    color: 'red',
    borderWidth: 0.3,
    borderColor: 'red'
  },
  isNormal: {
    color: 'black',
  },
});

export default InputWeight;