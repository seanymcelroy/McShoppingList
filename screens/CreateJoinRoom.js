import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SearchBar from '../components/SearchBar'

export default function CreateJoinRoom({sock, setkey}) {

    const [text, setText]= useState('')
    const [validCode, setValidCode]=useState(false)
    useEffect(() => {
        // Filter data to show selected items
        sock.on('isValidCode', text=>{
            console.log(text)
            setValidCode(text)       
        })
        
    }, []);

    function typing(text){
        text=text.toUpperCase();
        sock.emit('valid_key', text)
        setText(text)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.joinText}>Join Existing Room</Text>
            <Text style={styles.joinText}>(Enter code)</Text>
            <SearchBar style={styles.searchbahr} txt={text} setTxt={typing}/>
            <TouchableOpacity style={validCode? styles.btn: styles.btnDisabled} disabled={!validCode} onPress={()=>setkey(text)}>
                <View >
                    <Text style={styles.btnText}>Join</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.new_room_btn}>
                <View >
                    <Text style={styles.btnText}>Start new room</Text>
                </View>   
            </TouchableOpacity>
        </View>
    )

    
}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f3ed',
        alignItems: 'center',
        width: '100%',
        paddingTop: 60
  
    },
    joinText:{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10 },
    searchbahr:{
        width: '100%',
        backgroundColor: 'black'
    },
    btn:{
        margin: 20,
        backgroundColor: '#5bdb4d',
        height: 60,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        elevation:20
    },
    btnDisabled:{
        margin: 20,
        backgroundColor: '#5f8267',
        height: 60,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        elevation:20
    },
    btnText:{
        color: 'white',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    new_room_btn:{
        position: 'absolute',
        bottom: 60,
        backgroundColor: '#0094c9',
        height: 60,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        elevation:20
    }
});