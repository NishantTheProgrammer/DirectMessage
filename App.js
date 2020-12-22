import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons'

import jsonResponse from './CountryCodes.json'

export default function App() {

  const [country, setCountry] = useState('+91');
  const [phone, setPhone] = useState('');

  const submitHandler = () => {

    let phoneNumber = country + phone;
    phoneNumber = phoneNumber.substring(1, phoneNumber.length)

    const url = `https://api.WhatsApp.com/send?phone=${phoneNumber}`

    Linking.openURL(url);
    console.log(url);
  }

  return (
    <ImageBackground style={styles.background} source={require('./assets/background.jpg')}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Picker 
            selectedValue={country}
            style={styles.dropdown}
            onValueChange={(newCountry) => setCountry(newCountry)
            }>
            { jsonResponse.map(item => <Picker.Item key={item.dial_code} label={item.name} value={item.dial_code} />) }
          </Picker>
          <TextInput 
            style={styles.input}
            value={phone}
            keyboardType={'numeric'}
            placeholder="Enter number"
            onChangeText={phone => setPhone(phone)}
          />
          <TouchableOpacity style={styles.icon} onPress={submitHandler}>
            <FontAwesome name="whatsapp"  size={35} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '85%',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  form: {
    flexDirection: 'row',
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 4,
    width: 60,
    marginLeft: 5
  },
  input: { 
    backgroundColor: 'white',
    flexGrow: 1
  },
  icon: {
    width: 45,
    height: 45,
    backgroundColor: 'rgb(194, 194, 163)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 25,
  },
});
