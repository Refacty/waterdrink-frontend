import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#67a4f5',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 50,
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default CustomButton;