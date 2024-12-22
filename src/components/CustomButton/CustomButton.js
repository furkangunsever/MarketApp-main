// components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { right_arrow } from '../../assets/icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.buttonText}>{text}</Text>
        <Image source={right_arrow} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: windowHeight * 0.02,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: windowWidth * 0.04,
    color: '#333',
    marginLeft: windowWidth * 0.03,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    marginRight: windowWidth * 0.04,
  },
});

export default CustomButton;
