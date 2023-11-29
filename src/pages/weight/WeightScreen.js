import React, { useState } from 'react';
import {View, SafeAreaView, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import CustomInput from '../../components/inputDefault';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import InputWeight from '../../components/InputWeight';
import { enviarPeso } from "../../api/Api";
import TxtDefault from "../../components/txtDefault";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import BtnDefault from "../../components/btnDefault";
import InputDefault2 from "../../components/InputDefault2";

export default function WeightScreen({ navigation }) {
    const [gbirthday, setBirthDay] = useState(new Date(Date.now()));
    const [gprofession, setProfession] = useState("")
    const [gWeight, setWeightState] = useState("");
    const handlerWeightChange = (text) => {
        setWeightState(text);
    }
    const handlerProfessionChange = (text) => {
        setProfession(text)
    }
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const showDatePicker = () => {
        setShowDateTimePicker(true);
    }
    const handlerDateChange = (event, selectedDate) => {
        setShowDateTimePicker(false);
        if (selectedDate) {
            setBirthDay(selectedDate);
        }
    }
    const dataUpdate = {
        weight: gWeight.replace(",", "."),
        birthday: gbirthday.toISOString().split('T')[0],
        profession: gprofession
    }
    const enviarPesoAPI = async (data) => {
        try {
            const enviouDados = await enviarPeso(data)
            if (enviouDados) {
                navigation.navigate("MainStack")
            }
        }
        catch (error) {
            Alert.alert("Erro:", error.message)
        }
    }
    const [fontLoaded] = useFonts({
        Lato_100Thin,
        Lato_900Black
    });
    if (!fontLoaded) {
        return null;
    }


    const styles = StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E6FCFF',
            paddingTop:100
        },
        segundoContainer:{
            height:"100%",
            width:"100%",
            alignItems:"center",
            paddingTop:100
        },
        txtPeso:{
            fontSize:35,
            paddingBottom:20
        },
        DateView:{
            flexDirection:"row",
            width:"80%"
        },
        DateIcon:{
            paddingTop:10,
            position:"absolute",
            right:20
        },
        DateInput:{
            textAlign:"center",
            fontSize:25
        },
        input:{
            fontSize:30
        },
        professionInput:{
            width:"90%",
            height:"16%"
        },
    })


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.segundoContainer}>
                <TxtDefault Style={styles.txtPeso} iText={"Qual seu peso? (KG)"}></TxtDefault>
                <InputWeight onChangeText={handlerWeightChange} style={styles.input}></InputWeight>

                <TxtDefault Style={styles.txtPeso} iText={"Qual sua profissão?"}></TxtDefault>
                <InputDefault2 onChangeText={handlerProfessionChange} style={styles.input}></InputDefault2>

                <TxtDefault Style={styles.txtPeso} iText={"Que dia você nasceu?"}></TxtDefault>
                <View style={styles.DateView}>
                <CustomInput value={`${gbirthday.getDate() < 10 ? '0' + gbirthday.getDate() : gbirthday.getDate()}/${gbirthday.getMonth() + 1 < 10 ? '0' + (gbirthday.getMonth() + 1) : gbirthday.getMonth() + 1}/${gbirthday.getFullYear()}`} style={styles.DateInput} editable={false} />
                <TouchableOpacity  onPress={showDatePicker}>
                    <MaterialCommunityIcons name="calendar" style={styles.DateIcon} size={30} color="#007784" />
                </TouchableOpacity>
                {showDateTimePicker && <DateTimePicker value={gbirthday} onChange={handlerDateChange} />}
                </View>

                <BtnDefault title={"Enviar"} onPress={() => {enviarPesoAPI(dataUpdate)}}></BtnDefault>
            </View>
        </SafeAreaView>
    );
}
