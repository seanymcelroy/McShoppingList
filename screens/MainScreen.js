import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'


export default function MainScreen({sock}) {
    
    const [searchTxt, setSearchTxt] =useState()

    sock.on('searchText', text=>{
        setSearchTxt(text)
        console.log(text)
    })
    
    function typing(text){
        setSearchTxt(text)
        sock.emit('message', 'search '+text)
    }
    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchbahr} txt={searchTxt} setTxt={typing}/>
            <Text>{searchTxt}</Text>        
        </View>
    )

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f3ed',
      alignItems: 'center',
      width: '100%',
      paddingTop: 60

    },
    searchbahr:{
        width: '20%'
    }
});
