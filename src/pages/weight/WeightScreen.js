import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/inputDefault';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import CustomButton from '../../components/btnDefault';
import axios from 'axios';
import bd from '../../services/tbUser/TbUser';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import InputWeight from '../../components/InputWeight';

export default function WeightScreen({ navigation }) {
  const Estilo = StyleSheet.create({
    container: {
      backgroundColor: "#E6FCFF",
      flex: 1,
      position: "absolute",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: 1000,
      paddingBottom: 100,
    },
  });
  const [gbirthday, setBirthDay] = useState(new Date(Date.now()));
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const showDatePicker = () => {
    setShowDateTimePicker(true);
  }
  const handleDateChange = (event, selectedDate) => {
    setShowDateTimePicker(false);
    if (selectedDate) {
      setBirthDay(selectedDate);
    }
  }

  const [gWeight, setWeightState] = useState("");
  const handlerWeightChange = (text) => {
    setWeightState(text);
  }

  const dataUpdate = {
    weight: gWeight.replace(",", "."),
    birthday: gbirthday.toISOString().split('T')[0], // Formato "yyyy-MM-dd"
  }

  const enviarPeso = () => {
    if (!(gWeight === "")) {
      bd.consultar("SELECT user_id, user_session FROM tb_user").then((result) => {
        const headers = { 'Authorization': `${result[0].user_session}` }
        mId = result[0].user_id;
        console.log("BANCO: ", result);
        console.log("ID: ", mId);
        console.log("TOKEN: ", headers);
        const url = ("http://26.103.139.198:8080/tb_user/" + mId);
        console.log("URL: ", url);
        console.log("REQUEST: ", dataUpdate, headers);
        axios.put(url, dataUpdate, { headers })
          .then((response) => {
            console.log('Requisição PUT bem-sucedida:', response.data);

            bd.executar("UPDATE tb_user SET user_weight = ?, user_birthday = ?", [dataUpdate.weight, dataUpdate.birthday]).then(response => {
              console.log(response);
            })
              .catch(error => {
                console.error(error);
              });

            navigation.navigate("MainStack");
          })
          .catch((error) => {
            console.error('Erro na requisição PUT:', error.response.data);
          });
      })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Alert.alert("Campo de peso não pode estar vazio.");
    }
  }

  const [fontLoaded] = useFonts({
    Lato_100Thin,
    Lato_900Black
  });

  // Verificar se a fonte foi carregada, caso não for, ele retorna nulo.
  if (!fontLoaded) {
    return null;
  }

  const kg = "(KG)";

  return (
    <SafeAreaView style={Estilo.container}>
      <Text style={{ fontSize: 35, fontFamily: "Lato_900Black", paddingBottom: 14, color:"#007784" }}>Digite seu peso {kg}:</Text>
      <InputWeight placeholder={""} value={gWeight} onChangeText={handlerWeightChange} style={{ backgroundColor: "white", width:"90%", height:"6%", fontSize:25}}></InputWeight>
      <Text style={{ fontSize: 35, fontFamily: "Lato_900Black", top:30, color:"#007784" }}>Data de Nascimento:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: "100%", height:"100%", marginRight: 50, paddingBottom:15, position:"absolute", paddingTop:55, paddingLeft:40 }}>
      <CustomInput value={`${gbirthday.getDate() < 10 ? '0' + gbirthday.getDate() : gbirthday.getDate()}/${gbirthday.getMonth() + 1 < 10 ? '0' + (gbirthday.getMonth() + 1) : gbirthday.getMonth() + 1}/${gbirthday.getFullYear()}`} style={{width:"80%", height:"6%", marginBottom:10, textAlign:"center", fontSize:2}} editable={false}></CustomInput>
        <TouchableOpacity style={{marginLeft:10}} onPress={showDatePicker}>
        <MaterialCommunityIcons name="calendar" size={30} color="#007784" />
        </TouchableOpacity>
      </View>
      {showDateTimePicker && (
        <DateTimePicker value={gbirthday} onChange={handleDateChange} />
      )}
      <CustomButton title="Enviar" onPress={enviarPeso} style={{ width: "80%", marginTop:100}} />
    </SafeAreaView>
  );
}
