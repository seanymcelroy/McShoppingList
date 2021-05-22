import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './screens/LandingScreen'
import MainScreen from './screens/MainScreen';

export default function App() {
  const [searchTxt, setSearchTxt]= useState('')
  return (
    <View style={styles.container}>
      {/* <LandingScreen/> */}
      <MainScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
