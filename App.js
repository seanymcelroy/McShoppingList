import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import LandingScreen from './screens/LandingScreen'
import MainScreen from './screens/MainScreen';
import { io } from "socket.io-client";
const socket=io("ws://192.168.0.14:3000")
// const socket=io("http://mcshoppinglistserver-env.eba-y8cp8p2x.eu-west-1.elasticbeanstalk.com/")


export default function App() {
  // const socket = null;
  const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [connection, setConnection]= useState(false)
  // const [count, setCount]=useState(0)
  useInterval(()=>{
    if (!socket.connected){
      socket.reconnect();
      setCount(count=>count+1)
    }
  }, 1000)

  useEffect(() => {
    // AppState.addEventListener("change", _handleAppStateChange);
    // socket.connect();
    socket.on("connect", () => {
      setConnection(true)
    });
    
  
    socket.on("disconnect", () => {
      setConnection(false)
      socket.reconnect();
    });
    
    return ()=>{
      socket.close()
    }
  }, [])

    console.log(socket.connected)
  return (
    <View style={styles.container}>
      {!connection && <LandingScreen/>}
      {connection && <MainScreen sock={socket}/>}
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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
