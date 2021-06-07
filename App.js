import { StatusBar } from 'expo-status-bar';
import React, {useRef, useState, useEffect} from 'react';
import { AppState, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LandingScreen from './screens/LandingScreen'
import MainScreen from './screens/MainScreen';
import { io } from "socket.io-client";
import CreateJoinRoom from './screens/CreateJoinRoom'
const socket=io("ws://192.168.0.14:3000")
// const socket=io("http://mcshoppinglistserver-env.eba-y8cp8p2x.eu-west-1.elasticbeanstalk.com/")


export default function App() {
  // const socket = null;
  const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [connection, setConnection]= useState(false)
  const [roomKey, setRoomKey]=useState('')
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
      getData()
    });
    
  
    socket.on("disconnect", () => {
      setConnection(false)
      socket.reconnect();
    });
    
    return ()=>{
      socket.close()
    }
  }, [])

    // console.log(socket.connected)

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('key')
        if(value !== null) {
          // value previously stored
          setRoomKey(value)
        }
      } catch(e) {
        // error reading value
        console.log("error getting key")
      }
    }

    const setKey = async (value) => {
      try {
        await AsyncStorage.setItem('key', value).then(()=>setRoomKey(value))
      } catch (e) {
        // saving error
        console.log(e)
      }
    }
  return (
    <View style={styles.container}>
      {!connection && <LandingScreen/>}
      {connection && roomKey!="" && <MainScreen sock={socket} key={roomKey}/>}
      {connection && roomKey=="" && <CreateJoinRoom sock={socket} setkey={setKey}/>}
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
