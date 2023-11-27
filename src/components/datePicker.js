import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Keyboard } from 'react-native';
import { Lato_900Black, Lato_100Thin, useFonts } from '@expo-google-fonts/lato';
import CustomInput from "./inputDefault";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ iconStyle, inputStyle, containerStyle, onChangeDate, onIconPress, isShow, Date }) => {
    const [fontLoaded] = useFonts({
        Lato_100Thin,
        Lato_900Black
    });

    if (!fontLoaded) {
        return null;
    }


    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        },
        dataPicker: {
            width: 310,
            height: "100%",
            textAlign: "center",
            fontSize: 25
        },
        iconOpacity: {
            paddingLeft: 5,
            paddingBottom: 10
        }
    });

    return (
        <View style={[styles.container, containerStyle]}>
            <CustomInput value={`${Date.getDate() < 10 ? '0' + Date.getDate() : Date.getDate()}/${Date.getMonth() + 1 < 10 ? '0' + (Date.getMonth() + 1) : Date.getMonth() + 1}/${Date.getFullYear()}`} style={[styles.dataPicker, inputStyle]} editable={false} />
            <TouchableOpacity style={styles.iconOpacity}>
                <MaterialCommunityIcons name="calendar" size={30} color="#007784" style={[iconStyle, styles.iconOpacity]} />
            </TouchableOpacity>
            <DateTimePicker value={Date} onChange={onChangeDate} />
        </View>
    );
};

export default DatePicker;
