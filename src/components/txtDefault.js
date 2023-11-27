import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';

const InputWeight = ({iText, Style}) => {
    return (
        <Text style={[Style, {color: "#007784", fontFamily: 'Lato_900Black'}]}>{iText}</Text>
    )
};

export default InputWeight;