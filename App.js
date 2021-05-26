import { StatusBar } from 'expo-status-bar';
import React, {useState, us} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './screens/LandingScreen'
import MainScreen from './screens/MainScreen';
import { io } from "socket.io-client";

export default function App() {
  // const socket = null;
  const socket=io("ws://192.168.0.14:3000")

  // useEffect(() => {
  // }, [])
  const [connected, setConnection]=useState(false)

  socket.on("connect", () => {
    setConnection(true)
    
  });

  socket.on("disconnect", () => {
    setConnection(false)
    socket.connect();
  });

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
