import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
const CustomButton = ({ title, onPress, style, txtStyle}) => {

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  })

  if (!fontLoaded) {
    return null;
  }

  const styles = StyleSheet.create(
      {
        container:{
          alignItems:"center",
          justifyContent:"center",
          height:60,
          width:330,
          borderRadius:50,
          backgroundColor:"#007784",
        },
        texto:{
          color:"white",
          fontSize:30
        }
      }
  )

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]} activeOpacity={0.6}>
      <Text  style={[styles.texto, txtStyle]} className="font-lato-900">{title}</Text>
    </TouchableOpacity>
  );
};



export default CustomButton;
