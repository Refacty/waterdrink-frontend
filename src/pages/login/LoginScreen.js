import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import CustomInput from "../../components/inputDefault";
import CustomInputPass from "../../components/inputPassword";
import BtnDefault from "../../components/btnDefault";
import { Lato_900Black, Lato_400Regular, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import {login} from "../../api/Api";

export default function Login({navigation}) {
    const [getEmail, setEmail] = useState("")
    function handlerEmail(email) {
        setEmail(email)
    }

    const [getPassword, setPassword] = useState("")
    function handlerPassword(password) {
        setPassword(password)
    }

    const [press, setPress] = useState(false)
    function handlerPress(press) {
        setPress(press)
        if (press) {
            navigation.navigate('RegistroScreen')
        }
    }

    const Fazerlogin = () => {
        if (login(getEmail, getPassword)){
            navigation.navigate("MainStack");
        }
    }

    const [fontLoaded] = useFonts({
        Lato_100Thin,
        Lato_900Black, Lato_400Regular,

    });

    if (!fontLoaded) {
        return null;
    }

    const logo = require('../../images/waterdrink.png');

    const styles = StyleSheet.create({
        textInput: {
            fontSize: 20
        },
        input: {
            backgroundColor: "white",
            color: 'black',
            height: 55,
            width: '85%',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E6FCFF',
            paddingBottom: 170,
        },
        submit: {
            width: '85%',
            height: 55,
        },
        password: {
            marginBottom: 20,
            borderRadius: 20,
        },
        textPassword: {
            marginBottom: 0,
            height: '100%'
        },
        logo: {
            height: 250,
            width: 250
        },
        title: {
            color: "#007784",
            fontSize: 35,
            fontFamily: 'Lato_900Black',
            paddingBottom: 20
        },
        segundoContainer:{
            height:"100%",
            width:"100%",
            alignItems:"center",
            paddingTop:100
        },
        criarConta:{
            paddingTop: 12,
            textDecorationLine: 'underline',
            fontFamily:'Lato_400Regular',
            fontSize: 18,
            color: 'gray'
        }
    })

    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.segundoContainer}>
                    <Image source={logo} style={styles.logo}/>
                    <Text style={styles.title}>Faça seu login</Text>
                    <CustomInput onChangeText={handlerEmail} style={styles.input} placeholder={"Digite seu email"}></CustomInput>
                    <CustomInputPass onChangeText={handlerPassword} pStyle={styles.textPassword} vStyle={[styles.input, styles.password]} placeholder={"Digite sua senha"}></CustomInputPass>
                    <BtnDefault onPress={Fazerlogin} txtStyle={styles.textInput} style={styles.submit} title={"Entrar"}></BtnDefault>
                    <TouchableOpacity onPress={handlerPress}><Text style={styles.criarConta}>Ou crie sua conta</Text></TouchableOpacity>
                </View>
            </SafeAreaView>

    );
}
