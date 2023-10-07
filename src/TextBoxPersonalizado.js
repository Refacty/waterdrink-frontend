import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const CustomInput = ({ placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLong, setIsLong] = useState(false);

  const handleInput = (text) => {
    setInputValue(text);
    setIsLong(text.length > 5);
  };

  const inputStyle = isLong ? InputEs.istoLong : InputEs.isNormal;

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
    width: '80%',
    borderRadius: 7,
    marginBottom: 20,
    shadowColor: 'blue',
    color: 'black',
    height:45,
    shadowOffset: {
        width: 0,
        height: 20,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5,
  },
  istoLong: {
    color: 'red',
    borderWidth: 0.3,
    borderColor: 'red'
  },
  isNormal: {
    color: 'black',
  },
});

export default CustomInput;