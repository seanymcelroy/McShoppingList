import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'

export default function MainScreen() {

    const [searchTxt, setSearchTxt] =useState('')

    useEffect(() => {
        console.log(searchTxt)
      }, [searchTxt]);
    return (
        <View style={styles.container}>
            <SearchBar style={styles.searchbahr} txt={searchTxt} setTxt={setSearchTxt}/>
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
