import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
const CustomButton = ({ title, onPress, style, txtStyle}) => {

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  })

  if (!fontLoaded) {
    return null;
  }

  return (
    <TouchableOpacity className="p-4 rounded-35 items-center justify-center w-full h-17" onPress={onPress} style={[{backgroundColor:"#007784"}, style]} activeOpacity={0.6}>
      <Text  style={[{color:"white"}, txtStyle]} className="font-lato-900"> {title}</Text>
    </TouchableOpacity>
  );
};



export default CustomButton;
