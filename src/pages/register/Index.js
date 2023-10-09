import React, { useState } from 'react';
import { Text, SafeAreaView, View, CheckBox } from 'react-native';
import CustomButton from '../../components/BtnPersonalizado';
import CustomInput from '../../components/TextBoxPersonalizado';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const App = () => {

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  })

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'top', alignItems: 'center', backgroundColor: '#e3f6fc', marginTop: 30 }}>
      <Text style={{ fontSize: 60, fontFamily: 'Lato_900Black', color: '#67a4f5', marginBottom: 20, marginTop: 50 }}>Registrar-se</Text>

      <View style={{ width: '100%', alignItems: 'center', paddingTop: 70 }}>
        <CustomInput placeholder={'Email'}></CustomInput>

        <CustomInput placeholder={'Senha'}></CustomInput>

        <CustomInput placeholder={'Repita sua senha'}></CustomInput>
        
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <BouncyCheckbox style={{marginLeft: 40}} iconStyle={{ borderColor: "blue" }} fillColor="#67a4f5"></BouncyCheckbox>
          <Text style={{ fontFamily: 'Lato_900Black', color: '#67a4f5', marginTop: 2.5, right:10}}>Lembrar senha</Text>
        </View>
      </View>

      <View style={{ marginTop: 230, width: '100%', alignItems: 'center' }}>
        <CustomButton title={'Registrar-se'} />
      </View>


    </SafeAreaView>
  );
};
export default App;