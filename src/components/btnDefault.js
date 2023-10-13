import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
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
    <TouchableOpacity className="bg-blue-400 p-4 rounded-4xl items-center justify-center w-full h-16" onPress={onPress} activeOpacity={0.6}>
      <Text className="font-lato-900 text-white text-3xl">{title}</Text>
    </TouchableOpacity>
  );
};


export default CustomButton;