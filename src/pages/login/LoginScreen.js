import React from 'react';
import { View, SafeAreaView } from 'react-native';
import inputDefault from "../../components/inputDefault";
import CustomInput from "../../components/inputDefault";
import {color} from "nativewind/dist/tailwind/native/color";
import {white} from "yarn/lib/cli";

export default function Login({navigation}) {
    return (
        <SafeAreaView style={{paddingTop: 50}}>
            <CustomInput placeholder={"Sim"}></CustomInput>
        </SafeAreaView>
    );
}
