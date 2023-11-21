import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, Text} from 'react-native';
import CustomInput from "../../components/inputDefault";
import CustomInputPass from "../../components/inputPassword";
import BtnDefault from "../../components/btnDefault";
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import axios from 'axios';
import bd from '../../services/tbUser/TbUser';

export default function Login({navigation}) {

    const [getEmail, setEmail] = useState("")
    function handlerEmail(email) {
        setEmail(email)
    }

    const [getPassword, setPassword] = useState("")
    function handlerPassword(password) {
        setPassword(password)
    }


    async function login() {
        const Data = {
            "email": getEmail,
            "password": getPassword
        }

        const response = await axios.post('http://10.0.0.119:8080/login', Data)
            .then(
                        response => {
                            console.log(response.data)
                            bd.executar("UPDATE tb_user SET user_session = ?, user_id = ?;", [response.data.token, response.data.id])
                                .then(
                                response => {
                                    console.log("Update feito com sucesso no BD.")
                                })
                                .catch(error => {
                                    console.error("Erro no BD:", error)
                                }
                            )
             .catch(
                        error => {
                            console.error("Erro na chamada para api:", JSON.stringify(error.data))
                            })
            }
        );

    }


    // Carregar as fonts
    const [fontLoaded] = useFonts({
        Lato_100Thin,
        Lato_900Black
    });

    // Verificar se a fonte foi carregada, caso não for ele retorna nulo.
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
            paddingBottom: 170
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
            paddingBottom: 35
        }
    })

    return (
            <SafeAreaView style={styles.container}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.title}>Faça seu login</Text>
                <CustomInput onChangeText={handlerEmail} style={styles.input} placeholder={"Digite seu email"}></CustomInput>
                <CustomInputPass onChangeText={handlerPassword} pStyle={styles.textPassword} vStyle={[styles.input, styles.password]} placeholder={"Digite sua senha"}></CustomInputPass>
                <BtnDefault onPress={login} txtStyle={styles.textInput} style={styles.submit} title={"Entrar"}></BtnDefault>
            </SafeAreaView>

    );
}
