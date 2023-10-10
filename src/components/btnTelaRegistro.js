import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
const CustomButton = ({ title, onPress }) => {

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  })

  if (!fontLoaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.6}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#67a4f5',
    padding: 15,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 60
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Lato_900Black'
  },
});

export default CustomButton;