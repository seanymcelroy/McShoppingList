import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function SearchBar({txt, setTxt}) {
    return (
        <View style={styles.searchBox}>
            <TextInput underlineColorAndroid="transparent" style={styles.input} defaultValue={txt} onChangeText={text => setTxt(text)} placeholder="Type Item here!"/>
             
        </View>
    )
}


const styles= StyleSheet.create({
    searchBox: {
      width: '90%',
      height: 80,
      borderRadius: 50,
      backgroundColor: '#fff',
      justifyContent: 'center'
    },
    input:{
        width: '100%',
        paddingLeft: 20,
        paddingRight: 10,
        fontSize: 23
    }

});
