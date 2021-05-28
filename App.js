import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './screens/LandingScreen'
import MainScreen from './screens/MainScreen';
import { io } from "socket.io-client";
const socket=io("ws://192.168.0.14:3000")

export default function App() {
  // const socket = null;

  useEffect(() => {
    socket.on("connect", () => {
      setConnection(true)
    });
  
    socket.on("disconnect", () => {
      setConnection(false)
      socket.connect();
    });
    
    return ()=>socket.close()
  }, [])
  const [connected, setConnection]=useState(false)



  return (
    <View style={styles.container}>
      {!connected && <LandingScreen/>}
      {connected && <MainScreen sock={socket}/>}
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
